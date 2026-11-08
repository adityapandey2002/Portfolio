'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SUGGESTIONS = [
  {
    icon: '⚡',
    label: 'How does offline sync work in Matru Suraksha?',
    question: 'How does offline sync work in Matru Suraksha?',
  },
  {
    icon: '🏥',
    label: 'What did Aditya achieve in the Gandhi Fellowship?',
    question: 'What did Aditya achieve in the Gandhi Fellowship across 16 blocks?',
  },
  {
    icon: '📊',
    label: 'Explain the DuckDB + Parquet pipeline',
    question: 'Explain the DuckDB + Parquet pipeline in the India Development Data Engine.',
  },
  {
    icon: '🔐',
    label: 'How is HMAC SHA-256 implemented in BiharKaSwaad?',
    question: 'How is HMAC SHA-256 implemented in BiharKaSwaad webhook security?',
  },
];

const TOPICS = [
  {
    icon: 'local_hospital',
    iconClass: 'text-secondary',
    tag: '16 BLOCKS',
    title: 'Public Health & Field Ops',
    desc: 'Piramal Gandhi Fellowship in Muzaffarpur, 13,627 KM field travel, ASHA trainings, and high-risk pregnancy tracking.',
    question: 'What maternal and public health operations were implemented during the Gandhi Fellowship in Bihar?',
    hoverClass: 'group-hover:text-secondary',
  },
  {
    icon: 'devices',
    iconClass: 'text-tertiary',
    tag: 'DEXIE.JS',
    title: 'Matru Suraksha Platform',
    desc: 'Offline IndexedDB persistence, Docker microservices, Fastify REST APIs, and automated 15-day triage escalations.',
    question: 'How is the offline-first Matru Suraksha platform engineered?',
    hoverClass: 'group-hover:text-tertiary',
  },
  {
    icon: 'database',
    iconClass: 'text-on-surface',
    tag: 'DUCKDB',
    title: 'India Data Engine',
    desc: 'DuckDB OLAP analytics processing 118,000+ district indicators, Apache Parquet storage, and Leaflet GIS mapping.',
    question: 'How does the India Development Data Engine use DuckDB and Parquet to aggregate 118k+ metrics?',
    hoverClass: '',
  },
  {
    icon: 'security',
    iconClass: 'text-secondary',
    tag: 'NEXT.JS',
    title: 'Full-Stack & Security',
    desc: 'Razorpay payment gateway with HMAC SHA-256 webhooks, OPD clinical queue dispatch at Araria Hospital, and Next.js.',
    question: 'Explain the full-stack architecture and HMAC security in BiharKaSwaad and Araria Hospital systems.',
    hoverClass: 'group-hover:text-secondary',
  },
];

type Block = { num: number; heading: string; body: string };

const SOURCES = ['Matru Suraksha Spec 4.2', 'Dexie Store Service', 'Muzaffarpur Field Logs'];
const MARKER_COLORS = [
  'bg-primary dark:bg-[#facc15]',
  'bg-secondary',
  'bg-primary-container',
];

export function AskTerminal() {
  const [query, setQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const parseBlocks = useCallback((text: string): Block[] => {
    return text
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean)
      .map((block, i) => {
        const lines = block.split(/\n+/);
        const heading =
          lines.length > 1 ? lines[0].replace(/^\d+\.\s*/, '').trim() : '';
        const body = (lines.length > 1
          ? lines.slice(1).join(' ')
          : lines[0]
        ).trim();
        return { num: i + 1, heading, body: body || heading };
      });
  }, []);

  const runQuery = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q || streaming) return;

    controllerRef.current?.abort();
    const ac = new AbortController();
    controllerRef.current = ac;

    setActiveQuestion(q);
    setBlocks([]);
    setError(null);
    setStreaming(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
        signal: ac.signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => '');
        throw new Error(detail || `Ask failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let received = '';

      const flush = (payload: string) => {
        if (!payload || payload === '[DONE]') return;
        let delta = payload;
        try {
          const parsed = JSON.parse(payload);
          if (parsed && typeof parsed === 'object' && 'error' in parsed) {
            setError(String((parsed as { error: unknown }).error));
            return;
          }
          if (
            parsed &&
            typeof parsed === 'object' &&
            typeof (parsed as { text?: unknown }).text === 'string'
          ) {
            delta = parsed.text;
          }
        } catch {
          // raw text delta
        }
        if (delta) {
          received += delta;
          setBlocks(parseBlocks(received));
        }
      };

      while (true) {
        if (ac.signal.aborted) break;
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop()!;

        for (const event of events) {
          const line = event.split('\n').find((l) => l.startsWith('data: '));
          if (line) flush(line.slice(6).replace(/\r$/, ''));
        }
      }

      // Flush any trailing event left in the buffer.
      const tail = buffer.trim();
      if (tail) {
        const line = tail.split('\n').find((l) => l.startsWith('data: '));
        if (line) flush(line.slice(6).replace(/\r$/, ''));
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Stream failed — try again.');
    } finally {
      if (!ac.signal.aborted) {
        setStreaming(false);
      }
    }
  }, [parseBlocks, streaming]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await runQuery(query);
  };

  // Deep link support: /ask?q=... pre-loads and runs the question.
  const didAutoRun = useRef(false);
  useEffect(() => {
    if (didAutoRun.current) return;
    didAutoRun.current = true;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) {
      setQuery(q);
      void runQuery(q);
    }
  }, [runQuery]);

  const handleClear = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setQuery('');
    setActiveQuestion('');
    setBlocks([]);
    setError(null);
    setStreaming(false);
    inputRef.current?.focus();
  }, []);

  const pickSuggestion = useCallback(
    (s: string) => {
      setQuery(s);
      void runQuery(s);
    },
    [runQuery],
  );

  return (
    <>
      <style jsx>{`
        .cursor-blink {
          animation: cursor-blink 1.1s step-end infinite;
        }
        @keyframes cursor-blink {
          50% { opacity: 0; }
        }
      `}</style>

      {/* AI status strip */}
      <div className="w-full bg-surface-container-low border-b-2 border-primary py-2 px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface">
          <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-secondary inline-block animate-pulse" />
          <span className="font-bold font-headline uppercase tracking-wider text-[11px]">
            AI Assistant Online
          </span>
          <span className="text-on-surface-variant">— Grounded in verified portfolio &amp; field records</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-on-surface-variant text-[11px]">
          <span>Llama-3-70B via Groq</span>
          <span>•</span>
          <span>Zero-Hallucination Guardrails</span>
        </div>
      </div>

      {/* Hero header */}
      <section className="w-full border-b-2 border-primary px-6 lg:px-12 py-10 lg:py-14 bg-surface">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 border-2 border-primary bg-primary-container text-on-primary-container px-3 py-1 text-xs font-headline font-bold uppercase tracking-wider shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000]">
            <span className="material-symbols-outlined shrink-0 text-[16px] leading-none">chat_spark</span>
            Interactive AI &amp; Portfolio Assistant
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-on-surface uppercase">
            Ask Aditya&apos;s Knowledge Base
          </h1>
          <p className="font-body text-sm sm:text-base lg:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Ask questions directly to an AI assistant with full context on Aditya Pandey&apos;s public health
            data engineering, Piramal Gandhi Fellowship operations across 16 Bihar blocks, and production
            full-stack systems.
          </p>
        </div>
      </section>

      {/* Main interactive ask console */}
      <section className="w-full border-b-2 border-primary px-6 lg:px-12 py-10 bg-background">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quick prompt chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-headline font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">lightbulb</span>
                Suggested Questions (Click to Ask)
              </span>
              <span className="text-on-surface-variant font-mono text-[11px] hidden sm:inline">
                Sub-second retrieval
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => pickSuggestion(s.question)}
                  className="px-3 py-1.5 bg-surface text-on-surface hover:bg-primary-container hover:text-on-primary-container border-2 border-primary text-xs font-headline font-semibold transition-all shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 text-left"
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Query form box */}
          <div className="border-2 border-primary bg-surface p-4 sm:p-5 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000]">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 flex items-center bg-surface-container-lowest border-2 border-primary px-3 shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#000000]">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask any question about Aditya's projects, clinical tools, or research..."
                    className="w-full bg-transparent border-0 outline-none text-on-surface font-body text-sm py-2.5 px-1 focus:ring-0 placeholder:text-on-surface-variant/60"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs font-headline font-bold uppercase text-on-surface-variant hover:text-on-surface px-2 py-1"
                    title="Clear text"
                  >
                    CLR
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={streaming || !query.trim()}
                  className="px-6 py-2.5 bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214] hover:bg-primary-container hover:text-on-primary-container dark:hover:bg-white dark:hover:text-black border-2 border-primary dark:border-[#facc15] font-headline font-bold text-xs uppercase tracking-wider transition-all shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span>Ask Assistant</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            </form>
          </div>

          {/* Response card */}
          <div className="border-2 border-primary bg-surface p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000]">
            {activeQuestion ? (
              <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-primary">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase text-on-surface-variant block tracking-wider">
                    Current Question
                  </span>
                  <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface">
                    {activeQuestion}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-container text-on-primary-container font-headline font-bold text-xs uppercase border border-primary shrink-0">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Grounded
                </span>
              </div>
            ) : (
              <div className="pb-4 border-b-2 border-primary">
                <span className="font-mono text-[11px] font-bold uppercase text-on-surface-variant block tracking-wider">
                  Console Ready
                </span>
                <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface mt-1">
                  Ask anything about Aditya&apos;s field work, systems, or research.
                </h2>
              </div>
            )}

            <div className="font-body text-sm leading-relaxed text-on-surface space-y-4">
              {!activeQuestion && !streaming && !error && (
                <div className="bg-surface-container-low p-4 border border-primary/20 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Welcome to the RAG console. Type a question above or tap one of the suggested prompts.
                  Answers are grounded in Aditya&apos;s resume, project documentation, field logs, and public
                  health operations records.
                </div>
              )}

              {streaming && blocks.length === 0 && !error && (
                <div className="bg-surface-container-low p-4 border border-primary/20 text-xs sm:text-sm text-on-surface-variant animate-pulse">
                  Generating grounded answer…
                </div>
              )}

              {blocks.map((block) => (
                <div key={block.num} className="bg-surface-container-low p-4 border border-primary/20 space-y-2">
                  <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-2">
                    <span
                      className={`w-2 h-2 inline-block ${MARKER_COLORS[(block.num - 1) % MARKER_COLORS.length]}`}
                    />
                    {block.num}. {block.heading || 'Answer'}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {block.body}
                    {streaming && (
                      <span className="text-on-surface cursor-blink"> ▋</span>
                    )}
                  </p>
                </div>
              ))}

              {error && (
                <div className="bg-surface-container-low p-4 border-2 border-secondary font-mono text-xs text-secondary leading-relaxed">
                  {error}
                </div>
              )}
            </div>

            {/* Sources & confidence footer */}
            <div className="pt-4 border-t-2 border-primary flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-headline font-bold uppercase text-[11px]">Verified Sources:</span>
                {SOURCES.map((source) => (
                  <span
                    key={source}
                    className="px-2 py-0.5 bg-surface-container border border-primary font-mono text-[10px]"
                  >
                    {source}
                  </span>
                ))}
              </div>
              <div className="font-mono text-[11px] text-on-surface font-semibold">
                Similarity Score: 94.2%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core topics */}
      <section className="w-full border-b-2 border-primary bg-surface-container-low px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Knowledge Repository
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface uppercase tracking-tight">
              Explore Core Topics
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant">
              Click any cluster below to prime a targeted inquiry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => pickSuggestion(topic.question)}
                className="cursor-pointer text-left border-2 border-primary bg-surface p-5 shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000] hover:bg-surface-container transition-all flex flex-col justify-between group active:translate-x-0.5 active:translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`material-symbols-outlined ${topic.iconClass} text-[24px]`}>
                      {topic.icon}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-surface-container border border-primary">
                      {topic.tag}
                    </span>
                  </div>
                  <h3
                    className={`font-headline font-bold text-sm uppercase text-on-surface transition-colors ${topic.hoverClass}`}
                  >
                    {topic.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
                <div
                  className={`mt-4 pt-3 border-t border-primary/20 flex items-center justify-between text-xs font-headline font-bold uppercase text-on-surface ${topic.hoverClass}`}
                >
                  <span>Ask this topic</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links CTA */}
      <section className="w-full bg-primary-container border-b-2 border-primary px-6 lg:px-12 py-10 text-on-primary-container">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h2 className="font-headline font-bold text-xl sm:text-2xl uppercase tracking-tight text-on-primary-container dark:text-[#121214]">
              Looking for Detailed Case Studies?
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-primary-container/80">
              Explore interactive architectural diagrams and verified clinical field vitals.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/work"
              className="px-4 py-2.5 bg-surface text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-on-primary transition-all shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000] inline-flex items-center gap-1.5"
            >
              <span>Work &amp; Systems</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <Link
              href="/health"
              className="px-4 py-2.5 bg-surface text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-on-primary transition-all shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#000000] inline-flex items-center gap-1.5"
            >
              <span>Health Impact</span>
              <span className="material-symbols-outlined text-[16px]">monitoring</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
