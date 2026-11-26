'use client';

import { FormEvent, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquareText,
  RotateCcw,
  Send,
  Sparkles,
} from 'lucide-react';
import { parseAnswerBlocks, type AnswerBlock } from '@/lib/askParser';

const STARTER_QUESTIONS = [
  {
    topic: 'Clinical Voice AI',
    label: 'How does the Ambient Clinical AI Scribe fill 181 maternity fields?',
    question: 'How does the Ambient Clinical AI Scribe transcribe Hindi consultations and fill 181 maternity case-sheet fields?',
  },
  {
    topic: 'Field Impact',
    label: 'What did Aditya achieve during the Gandhi Fellowship?',
    question: 'What did Aditya achieve in the Gandhi Fellowship across 16 Bihar blocks?',
  },
  {
    topic: 'Offline PWA',
    label: 'How does Matru Suraksha work without internet?',
    question: 'How does Matru Suraksha handle offline sync, 6-tier clinical escalation, and tablet security?',
  },
  {
    topic: 'Macro Data & Commerce',
    label: 'Explain the India Dashboard & BiharKaSwaad architectures',
    question: 'How did Aditya optimize the India Development Data Dashboard database queries and build its TF-IDF RAG assistant?',
  },
];

interface StreamSource {
  title: string;
  href: string;
  tag: string;
  external?: boolean;
}

export function AiTerminal() {
  const [input, setInput] = useState('');
  const [askedQuestion, setAskedQuestion] = useState('');
  const [blocks, setBlocks] = useState<AnswerBlock[]>([]);
  const [sources, setSources] = useState<StreamSource[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const askQuestion = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;

    controllerRef.current?.abort();
    const ac = new AbortController();
    controllerRef.current = ac;

    setAskedQuestion(q);
    setInput(q);
    setBlocks([]);
    setSources([]);
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
        throw new Error('Could not reach the assistant right now. Please try again.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let received = '';

      const flush = (payload: string) => {
        if (!payload || payload === '[DONE]') return;
        let delta = '';
        try {
          const parsed = JSON.parse(payload);
          if (parsed && typeof parsed === 'object') {
            if ('error' in parsed) {
              setError(String((parsed as { error: unknown }).error));
              return;
            }
            if ('meta' in parsed && parsed.meta && typeof parsed.meta === 'object') {
              const meta = parsed.meta as { sources?: StreamSource[] };
              if (Array.isArray(meta.sources)) {
                setSources(meta.sources);
              }
              return;
            }
            if (typeof (parsed as { text?: unknown }).text === 'string') {
              delta = (parsed as { text: string }).text;
            }
          }
        } catch {
          delta = payload;
        }
        if (delta) {
          received += delta;
          setBlocks(parseAnswerBlocks(received));
        }
      };

      while (true) {
        if (ac.signal.aborted) break;
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const event of events) {
          const line = event.split('\n').find((l) => l.startsWith('data: '));
          if (line) flush(line.slice(6).replace(/\r$/, ''));
        }
      }

      const tail = buffer.trim();
      if (tail) {
        const line = tail.split('\n').find((l) => l.startsWith('data: '));
        if (line) flush(line.slice(6).replace(/\r$/, ''));
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(
        err instanceof Error ? err.message : 'Something went wrong — please try again.',
      );
    } finally {
      if (!ac.signal.aborted) {
        setStreaming(false);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void askQuestion(input);
  };

  const handleReset = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setInput('');
    setAskedQuestion('');
    setBlocks([]);
    setSources([]);
    setError(null);
    setStreaming(false);
    inputRef.current?.focus();
  };

  return (
    <section
      id="vector-terminal"
      className="border-b-4 border-primary bg-surface px-4 py-12 dark:border-[#3f3f46] dark:bg-[#161619] sm:px-8 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b-2 border-primary pb-4 dark:border-[#3f3f46] sm:flex-row sm:items-end">
          <div>
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-secondary">
              07 · Interactive Portfolio Assistant
            </span>
            <h2 className="mt-1 font-headline text-3xl font-bold uppercase tracking-tight text-on-surface sm:text-5xl">
              Ask Anything About My Work
            </h2>
          </div>

          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 border-primary pb-1 font-headline text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-secondary dark:border-[#facc15] dark:text-[#facc15] dark:hover:text-white"
          >
            <span>Open Full Assistant Page</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Friendly Assistant Workspace */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Starter Questions (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <div className="space-y-2">
              <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                Want the quick version of my resume, Bihar public health work, or how any of my 10 projects was
                built? Tap a question below or ask anything in your own words.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                Popular Questions
              </div>
              {STARTER_QUESTIONS.map((item) => {
                const isCurrent = askedQuestion === item.question;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => void askQuestion(item.question)}
                    className={`group flex w-full flex-col gap-1 border-2 p-3.5 text-left transition-all ${
                      isCurrent
                        ? 'border-primary bg-primary text-on-primary shadow-[3px_3px_0px_#1a1a1a] dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000]'
                        : 'border-primary bg-surface-container-lowest text-on-surface shadow-[3px_3px_0px_#1a1a1a] hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#1e1e23] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:bg-[#27272e] dark:hover:text-white'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                        isCurrent
                          ? 'text-primary-container dark:text-[#121214]/75'
                          : 'text-secondary dark:text-[#facc15]'
                      }`}
                    >
                      {item.topic}
                    </span>
                    <span className="font-headline text-sm font-bold leading-snug">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Q&A Box (8 cols) */}
          <div className="flex flex-col justify-between border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[6px_6px_0px_#000000] lg:col-span-8">
            {/* Assistant Top Header */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-primary bg-surface-container px-5 py-3.5 dark:border-[#3f3f46] dark:bg-[#232329]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center border-2 border-primary bg-primary-container text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]">
                  <Sparkles size={15} aria-hidden="true" />
                </span>
                <div>
                  <div className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
                    Aditya&apos;s Portfolio Assistant
                  </div>
                  <div className="font-body text-xs text-on-surface-variant">
                    Grounded in all 10 GitHub projects, resume &amp; Bihar field records
                  </div>
                </div>
              </div>

              {(askedQuestion || blocks.length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 border-2 border-primary bg-surface px-2.5 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-on-surface transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Conversation / Answer Area */}
            <div
              data-testid="ai-assistant-output"
              className="min-h-[290px] flex-1 space-y-5 p-5 sm:p-6"
            >
              {!askedQuestion && !streaming && !error && (
                <div className="flex h-full flex-col justify-center space-y-4 py-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center border-2 border-primary bg-surface-container text-primary dark:border-[#3f3f46] dark:bg-[#232329] dark:text-[#facc15]">
                    <MessageSquareText size={20} aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline text-xl font-bold text-on-surface">
                      Ask a question in plain English
                    </h3>
                    <p className="max-w-xl font-body text-sm leading-relaxed text-on-surface-variant">
                      Whether you&apos;re a recruiter checking full-stack experience, a public
                      health leader curious about Bihar field systems, or a fellow engineer asking
                      about architecture—just ask below.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-on-surface-variant">
                    <span>Covers: All 10 Projects</span>
                    <span aria-hidden="true">·</span>
                    <span>Gandhi Fellowship</span>
                    <span aria-hidden="true">·</span>
                    <span>Clinical Voice AI</span>
                    <span aria-hidden="true">·</span>
                    <span>Skills &amp; Education</span>
                  </div>
                </div>
              )}

              {askedQuestion && (
                <div className="space-y-4">
                  <div className="border-b-2 border-primary/15 pb-3 dark:border-[#3f3f46]">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Your Question
                    </span>
                    <p className="mt-1 font-headline text-base font-bold text-on-surface sm:text-lg">
                      {askedQuestion}
                    </p>
                  </div>

                  {streaming && blocks.length === 0 && !error && (
                    <div
                      role="status"
                      className="border-2 border-primary/25 bg-surface p-4 font-body text-sm text-on-surface-variant dark:border-[#3f3f46] dark:bg-[#141417]"
                    >
                      Looking up Aditya&apos;s project docs and drafting an answer…
                    </div>
                  )}

                  {blocks.length > 0 && (
                    <div className="space-y-3">
                      {blocks.map((block) => (
                        <div
                          key={block.num}
                          className="border border-primary/25 bg-surface p-4 dark:border-[#3f3f46] dark:bg-[#141417]"
                        >
                          {block.heading && (
                            <h4 className="font-headline text-sm font-bold text-on-surface">
                              {block.num}. {block.heading}
                            </h4>
                          )}
                          <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
                            {block.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sources.length > 0 && !streaming && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline/25 dark:border-[#3f3f46]">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Sources:
                      </span>
                      {sources.map((src) =>
                        src.external ? (
                          <a
                            key={src.href}
                            href={src.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-primary/40 bg-surface-container px-2 py-0.5 font-mono text-[11px] font-medium text-on-surface hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                          >
                            {src.title} ↗
                          </a>
                        ) : (
                          <Link
                            key={src.href}
                            href={src.href}
                            className="border border-primary/40 bg-surface-container px-2 py-0.5 font-mono text-[11px] font-medium text-on-surface hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                          >
                            {src.title} →
                          </Link>
                        ),
                      )}
                    </div>
                  )}

                  {error && (
                    <div
                      role="alert"
                      className="border-2 border-secondary bg-surface p-4 font-body text-sm text-secondary dark:bg-[#141417]"
                    >
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Input Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-primary bg-surface-container p-4 dark:border-[#3f3f46] dark:bg-[#232329]"
            >
              <label htmlFor="home-ai-question" className="sr-only">
                Ask a question about Aditya Pandey
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  ref={inputRef}
                  id="home-ai-question"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a question — e.g. What stack powers BiharKaSwaad?"
                  autoComplete="off"
                  className="flex-1 border-2 border-primary bg-surface-container-lowest px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:border-secondary focus:outline-none dark:border-[#3f3f46] dark:bg-[#141417] dark:focus:border-[#facc15]"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-primary bg-primary px-6 py-3 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                >
                  <span>{streaming ? 'Answering…' : 'Ask'}</span>
                  <Send size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
