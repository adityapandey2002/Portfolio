'use client';

import { FormEvent, useCallback, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';

const SUGGESTIONS = [
  'How does offline sync work in Matru Suraksha?',
  'What did Aditya achieve in the Gandhi Fellowship across 16 Bihar blocks?',
  'Explain the DuckDB + Parquet pipeline in the India Development Data Engine.',
  'How is HMAC SHA-256 implemented in BiharKaSwaad webhook security?',
  'What is the 15-day high-risk pregnancy escalation flow in Matru Suraksha?',
];

type Block = { num: number; heading: string; body: string };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
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
        throw new Error(`Ask failed (${res.status})`);
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
          if (line) flush(line.slice(6).trim());
        }
      }

      // Flush any trailing event left in the buffer.
      const tail = buffer.trim();
      if (tail) {
        const line = tail.split('\n').find((l) => l.startsWith('data: '));
        if (line) flush(line.slice(6).trim());
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Stream failed — try again.');
    } finally {
      if (!ac.signal.aborted) {
        setStreaming(false);
      }
    }
  };

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

  const pickSuggestion = useCallback((s: string) => {
    setQuery(s);
    inputRef.current?.focus();
  }, []);

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

      <Section>
        <div className="mx-auto w-full max-w-4xl">
          {/* Page header */}
          <header className="mb-10 lg:mb-14 shrink-0">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-on-surface dark:text-ink-dark">
              10 · THE AI
            </span>
            <h1 className="mt-3 font-display font-bold text-[clamp(34px,5.5vw,56px)] uppercase tracking-tight text-on-surface dark:text-ink-dark leading-none">
              This portfolio has a RAG brain
            </h1>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant dark:text-ink-dark/80 max-w-[64ch]">
              Every experience, project and skill on this site is chunked into a vector database. Ask it anything — &apos;what did you build in Bihar?&apos; — and an LLM answers with the actual knowledge base as context, streamed word by word.
            </p>
          </header>

          {/* Status bar */}
          <div className="mb-8 flex w-full items-center justify-between gap-3 px-4 py-3 border-b-2 border-primary dark:border-white bg-surface dark:bg-surface-dark text-xs">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-yellow dark:bg-primary-yellow animate-pulse" />
                <span
                  className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent-yellow dark:bg-primary-yellow opacity-50 animate-pulse"
                  style={{ animationDelay: '400ms' }}
                />
              </span>
              <span className="font-bold text-on-surface dark:text-ink-dark">
                AI Assistant Online
              </span>
              <span className="text-on-surface-variant dark:text-ink-dark/60">
                — Grounded in verified portfolio &amp; field records
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-on-surface-variant dark:text-ink-dark/60 hidden md:flex">
              <span>Llama-3-70B via Groq</span>
              <span className="mx-1">·</span>
              <span>Zero-Hallucination Guardrails</span>
            </div>
          </div>

          {/* Terminal */}
          <div className="border-2 border-primary dark:border-white bg-surface dark:bg-surface-dark shadow-[4px_4px_0_#000000] overflow-hidden">
            {/* Quick prompt chips */}
            <div className="px-4 py-4 border-b-2 primary dark:border-white bg-surface dark:bg-surface-dark">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60 flex items-center gap-1.5">
                  💡 Suggested Questions
                </span>
                <span className="text-[11px] text-on-surface-variant dark:text-ink-dark/40/60 hidden sm:inline">
                  Sub-second retrieval
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pickSuggestion(s)}
                    className="min-w-[150px] px-3 py-1.5 bg-surface dark:bg-surface-dark text-[11px] sm:text-xs font-mono font-semibold text-left text-on-surface dark:text-ink-dark border-2 border-primary dark:border-white shadow-[2px_2px_0_#000000] hover:-translate-y-1 hover:shadow-[3px_3px_0_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Query form */}
            <form onSubmit={handleSubmit} className="px-4 py-4 border-b-2 primary dark:border-white bg-surface dark:bg-surface-dark">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 flex items-center border-2 border-primary dark:border-white shadow-[2px_2px_0_#000000]">
                  <span className="text-on-surface-variant dark:text-ink-dark/60 mx-1.5">🔍</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
                      }
                    }}
                    placeholder="Ask anything about Aditya&apos;s projects, clinical tools, or research…"
                    className="w-full bg-transparent border-0 outline-none text-[13px] font-mono text-on-surface dark:text-ink-dark py-2.5 px-1 placeholder:text-on-surface-variant dark:placeholder:text-ink-dark/60"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[11px] font-mono font-bold uppercase text-on-surface-variant dark:text-ink-dark/60 hover:text-primary dark:hover:text-ink-dark px-2 py-1"
                    title="Clear text"
                  >
                    CLR
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={streaming || !query.trim()}
                  className="px-6 py-2.5 bg-accent-yellow dark:bg-primary-yellow text-[#1a1a1a] dark:text-[#131315] font-mono font-bold text-[12px] uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0_#000000] hover:shadow-[2px_2px_0_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-100"
                >
                  Ask Assistant
                </button>
              </div>
            </form>

            {/* Active question header */}
            {activeQuestion && (
              <div className="px-4 pb-4 border-b-2 primary dark:border-white bg-surface dark:bg-surface-dark">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60 block">
                      Current Question
                    </span>
                    <h2 className="font-display font-bold text-base sm:text-lg text-on-surface dark:text-ink-dark leading-snug">
                      {activeQuestion}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent-yellow dark:bg-primary-yellow text-[#1a1a1a] dark:text-[#131315] font-mono font-bold text-[11px] uppercase border-2 border-primary dark:border-white shrink-0">
                    🔖 Grounded
                  </span>
                </div>
              </div>
            )}

            {/* Response container */}
            <div className="p-4 sm:p-5 space-y-3" aria-live="polite">
              {!activeQuestion && !streaming && !error && (
                <div className="p-6 border-2 border-primary dark:border-white bg-surface-dark dark:bg-surface-l1 text-center font-mono text-xs text-on-surface-variant dark:text-ink-dark/60 space-y-1">
                  <span>Empty — no active question.</span>
                  <span className="text-on-surface-variant dark:text-ink-dark/40/60">
                    Type above or tap a chip, then hit Ask Assistant.
                  </span>
                </div>
              )}

              {streaming && blocks.length === 0 && !error && (
                <div className="p-6 border-2 border-primary dark:border-white bg-surface-dark dark:bg-surface-l1 text-center font-mono text-xs animate-pulse text-on-surface-variant dark:text-ink-dark/60">
                  Generating grounded answer…
                </div>
              )}

              {blocks.length > 0 && (
                blocks.map((block) => (
                  <div
                    key={block.num}
                    className="border-2 border-primary dark:border-white bg-surface-dark dark:bg-surface-l1 p-4 space-y-2"
                  >
                    {block.heading && (
                      <h3 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface dark:text-ink-dark flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-yellow dark:bg-primary-yellow" />
                        {block.num}. {block.heading}
                      </h3>
                    )}
                    <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant dark:text-ink-dark/80">
                      {block.body}
                    </p>
                    {streaming && (
                      <span className="font-mono text-on-surface dark:text-ink-dark cursor-blink">
                        ▋
                      </span>
                    )}
                  </div>
                ))
              )}

              {error && (
                <div className="border-2 border-accent-red dark:border-vermilion bg-surface-dark dark:bg-surface-l1 p-4 font-mono text-xs text-accent-red dark:text-vermilion leading-relaxed">
                  {error}
                </div>
              )}
            </div>

            {/* Terminal prompt */}
            <div className="px-4 py-4 border-t-2 primary dark:border-white bg-surface dark:bg-surface-dark">
              <div className="flex items-center gap-2 font-mono text-[12px]">
                <span className="text-on-surface dark:text-ink-dark">
                  aditya@portfolio:~$
                </span>
                <span className="text-on-surface-variant dark:text-ink-dark/60">
                  try: help · projects · hire · ask
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}



