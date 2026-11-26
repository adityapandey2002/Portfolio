'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Copy,
  Layers,
  MessageSquareText,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { PORTFOLIO_SYSTEMS } from '@/lib/data/systems';
import { parseAnswerBlocks, type AnswerBlock } from '@/lib/askParser';

type LensId = 'all' | 'tech' | 'health' | 'deep-dive';

interface StreamSource {
  title: string;
  href: string;
  tag: string;
  external?: boolean;
}

interface ConversationTurn {
  id: string;
  question: string;
  projectSlug?: string;
  rawText: string;
  blocks: AnswerBlock[];
  sources: StreamSource[];
  followUps: string[];
  streaming: boolean;
  error: string | null;
}

const LENSES: {
  id: LensId;
  label: string;
  Icon: typeof Sparkles;
  prompts: { tag: string; label: string; question: string; projectSlug?: string }[];
}[] = [
  {
    id: 'all',
    label: 'All Topics',
    Icon: Sparkles,
    prompts: [
      {
        tag: 'Executive Brief',
        label: 'Compare Aditya’s 7 flagship projects at a glance',
        question: 'Compare all flagship projects in Aditya Pandey’s portfolio for a recruiter.',
      },
      {
        tag: 'Clinical Voice AI',
        label: 'How does the Ambient Clinical AI Scribe fill 181 maternity fields?',
        question: 'How does the Ambient Clinical AI Scribe transcribe Hindi consultations and fill 181 maternity case-sheet fields with minimal LLM cost?',
        projectSlug: 'ambient-clinical-scribe',
      },
      {
        tag: 'Public Health',
        label: 'What did Aditya achieve in the Gandhi Fellowship across Bihar?',
        question: 'What did Aditya achieve in the Gandhi Fellowship across 16 Bihar blocks?',
      },
      {
        tag: 'Macro Data',
        label: 'How were queries cut by 97% in India in the World Dashboard?',
        question: 'How did Aditya optimize the India Development Data Dashboard database queries and build its TF-IDF RAG assistant?',
        projectSlug: 'india-dashboard',
      },
    ],
  },
  {
    id: 'tech',
    label: 'Tech Roles',
    Icon: Code2,
    prompts: [
      {
        tag: 'Payments & Security',
        label: 'Explain BiharKaSwaad HMAC SHA-256 & 29/29 Playwright E2E',
        question: 'Explain the payment security, MySQL indexing, and order lifecycle architecture of BiharKaSwaad.',
        projectSlug: 'biharkaswaad',
      },
      {
        tag: 'Monorepo & Dual ORM',
        label: 'Walk through District Hospital Araria (Next.js + NestJS + 86 tests)',
        question: 'Walk me through the monorepo architecture, dual-ORM setup, and security controls in District Hospital Araria.',
        projectSlug: 'araria-hospital',
      },
      {
        tag: 'Zero-Egress Static App',
        label: 'How does the VHSND pipeline run 212 Vitest tests & AES-256 offline?',
        question: 'Explain how the offline VHSND & PMSMA pipeline validates 253 survey columns and guarantees zero data upload.',
        projectSlug: 'vhsnd-pipeline',
      },
      {
        tag: 'Stack & Testing',
        label: 'Summarize Aditya’s full engineering stack & QA discipline',
        question: 'What is Aditya Pandey’s full engineering tech stack, databases, and automated testing experience?',
      },
    ],
  },
  {
    id: 'health',
    label: 'Public Health',
    Icon: Stethoscope,
    prompts: [
      {
        tag: 'Offline Maternal PWA',
        label: 'How does Matru Suraksha enforce 15-day HRP escalation offline?',
        question: 'How does Matru Suraksha handle offline sync, 6-tier clinical escalation, and tablet security?',
        projectSlug: 'matru-suraksha',
      },
      {
        tag: 'Frontline Scale',
        label: '700+ ASHAs, 185-hr clinical refresher & 154 NQAS audits',
        question: 'What maternal and public health operations did Aditya lead during the Gandhi Fellowship in Bihar?',
      },
      {
        tag: 'Labour Room AI',
        label: 'How does the Bihar PHC voice scribe protect clinician control?',
        question: 'How does the Ambient Clinical AI Scribe handle nurse confirmation locks and Hindi/English audio in PHCs?',
        projectSlug: 'ambient-clinical-scribe',
      },
      {
        tag: 'Field Survey QA',
        label: 'How does VHSND adjudication prevent reporting errors?',
        question: 'How does the VHSND & PMSMA pipeline adjudicate 37 cross-field survey contradictions before Monday district reviews?',
        projectSlug: 'vhsnd-pipeline',
      },
    ],
  },
  {
    id: 'deep-dive',
    label: 'Profile',
    Icon: Compass,
    prompts: [
      {
        tag: 'Education',
        label: 'Degrees, Pondicherry University MCA & IBM / NPTEL certs',
        question: 'What is Aditya Pandey’s education background and verified certifications?',
      },
      {
        tag: 'ML Capstone',
        label: 'SpaceX Falcon 9 launch recovery ML pipeline (83.3% accuracy)',
        question: 'Summarize Aditya’s SpaceX Falcon 9 launch recovery machine learning capstone.',
        projectSlug: 'spacex-recovery-ml',
      },
      {
        tag: 'Hardware Lab',
        label: 'Auroville FabLab & MinVayu open wind-turbine telemetry',
        question: 'What hardware and wind turbine telemetry work did Aditya do at Auroville FabLab?',
        projectSlug: 'auroville-minvayu-hardware',
      },
      {
        tag: 'Direct Contact',
        label: 'How to contact Aditya Pandey for roles or collaborations',
        question: 'How can I contact Aditya Pandey by email, phone, GitHub, or LinkedIn?',
      },
    ],
  },
];

const MARKER_COLORS = [
  'bg-primary dark:bg-[#facc15]',
  'bg-secondary',
  'bg-tertiary',
];

export function AskTerminal() {
  const [lens, setLens] = useState<LensId>('all');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [query, setQuery] = useState('');
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const streamingRef = useRef(false);

  const activeLens = useMemo(
    () => LENSES.find((l) => l.id === lens) ?? LENSES[0],
    [lens],
  );

  const isStreaming = turns.some((t) => t.streaming);

  const runQuery = useCallback(
    async (raw: string, overrideProjectSlug?: string) => {
      const q = raw.trim();
      if (!q || streamingRef.current) return;

      const projectSlug =
        overrideProjectSlug !== undefined
          ? overrideProjectSlug || undefined
          : selectedProject || undefined;

      controllerRef.current?.abort();
      const ac = new AbortController();
      controllerRef.current = ac;
      streamingRef.current = true;

      const turnId = `turn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      const historyPayload = turns.slice(-3).flatMap((t) =>
        t.rawText
          ? [
              { role: 'user' as const, content: t.question },
              { role: 'assistant' as const, content: t.rawText },
            ]
          : [],
      );

      setTurns((prev) => [
        ...prev,
        {
          id: turnId,
          question: q,
          projectSlug,
          rawText: '',
          blocks: [],
          sources: [],
          followUps: [],
          streaming: true,
          error: null,
        },
      ]);
      setQuery('');

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            projectSlug,
            history: historyPayload,
          }),
          signal: ac.signal,
        });

        if (!res.ok || !res.body) {
          const detail = await res.text().catch(() => '');
          throw new Error(detail || `Assistant request failed (${res.status})`);
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
                const msg = String((parsed as { error: unknown }).error);
                setTurns((prev) =>
                  prev.map((t) => (t.id === turnId ? { ...t, error: msg } : t)),
                );
                return;
              }
              if ('meta' in parsed && parsed.meta && typeof parsed.meta === 'object') {
                const meta = parsed.meta as {
                  sources?: StreamSource[];
                  followUps?: string[];
                };
                setTurns((prev) =>
                  prev.map((t) =>
                    t.id === turnId
                      ? {
                          ...t,
                          sources: Array.isArray(meta.sources) ? meta.sources : t.sources,
                          followUps: Array.isArray(meta.followUps) ? meta.followUps : t.followUps,
                        }
                      : t,
                  ),
                );
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
            const parsedBlocks = parseAnswerBlocks(received);
            setTurns((prev) =>
              prev.map((t) =>
                t.id === turnId
                  ? { ...t, rawText: received, blocks: parsedBlocks }
                  : t,
              ),
            );
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
        const msg = err instanceof Error ? err.message : 'Stream failed — please try again.';
        setTurns((prev) =>
          prev.map((t) => (t.id === turnId ? { ...t, error: msg } : t)),
        );
      } finally {
        streamingRef.current = false;
        if (!ac.signal.aborted) {
          setTurns((prev) =>
            prev.map((t) => (t.id === turnId ? { ...t, streaming: false } : t)),
          );
        }
      }
    },
    [selectedProject, turns],
  );

  // Support deep link: /ask?q=...&project=...
  const didAutoRun = useRef(false);
  useEffect(() => {
    if (didAutoRun.current) return;
    didAutoRun.current = true;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const proj = params.get('project') ?? '';
    if (proj) setSelectedProject(proj);
    if (q) {
      void runQuery(q, proj);
    }
  }, [runQuery]);

  useEffect(() => {
    if (turns.length > 0) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [turns.length]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void runQuery(query);
  };

  const handleReset = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    streamingRef.current = false;
    setTurns([]);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleCopy = async (turn: ConversationTurn) => {
    try {
      await navigator.clipboard.writeText(turn.rawText);
      setCopiedId(turn.id);
      setTimeout(() => setCopiedId((curr) => (curr === turn.id ? null : curr)), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  const selectedProjectObj = useMemo(
    () => PORTFOLIO_SYSTEMS.find((s) => s.slug === selectedProject),
    [selectedProject],
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface dark:bg-[#121214]">
      {/* Header */}
      <section className="border-b-4 border-primary bg-surface px-4 py-10 dark:border-[#3f3f46] dark:bg-[#161619] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 border-2 border-primary bg-primary-container px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-widest text-on-primary-container shadow-[3px_3px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000]">
              <Sparkles size={14} aria-hidden="true" />
              <span>Interactive Portfolio RAG Studio</span>
            </div>
            <div className="font-mono text-xs text-on-surface-variant">
              Indexed: 10 GitHub Projects · Gandhi Fellowship · Skills &amp; Resume
            </div>
          </div>

          <h1 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-on-surface sm:text-5xl leading-[1.03]">
            Ask Aditya&apos;s Knowledge Base
          </h1>
          <p className="max-w-3xl font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Pick a recruiter lens, focus on any specific repository, or ask multi-turn questions in plain English. Every response cites real project pages and GitHub source repositories.
          </p>
        </div>
      </section>

      {/* Interactive Split Workspace */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Rail: Lenses + Project Context + Curated Prompts (4 cols) */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Project Context Selector */}
            <div className="border-2 border-primary bg-surface-container-lowest p-4 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ask-project-scope"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface"
                >
                  <Layers size={14} aria-hidden="true" className="text-secondary" />
                  <span>Focus on Project</span>
                </label>
                {selectedProject && (
                  <button
                    type="button"
                    onClick={() => setSelectedProject('')}
                    className="font-mono text-[10px] font-bold uppercase text-secondary hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <select
                id="ask-project-scope"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full border-2 border-primary bg-surface px-3 py-2 font-body text-xs font-medium text-on-surface focus:border-secondary focus:outline-none dark:border-[#3f3f46] dark:bg-[#121214]"
              >
                <option value="">All 10 Projects + Fellowship &amp; Resume</option>
                {PORTFOLIO_SYSTEMS.map((sys) => (
                  <option key={sys.slug} value={sys.slug}>
                    {sys.rank} · {sys.title}
                  </option>
                ))}
              </select>

              {selectedProjectObj && (
                <div className="flex items-center justify-between gap-2 border-t border-outline/25 pt-2.5 text-[11px] font-mono dark:border-[#3f3f46]">
                  <Link
                    href={`/work/${selectedProjectObj.slug}`}
                    className="font-semibold text-on-surface hover:text-secondary dark:hover:text-[#facc15]"
                  >
                    Open Project Details →
                  </Link>
                  <button
                    type="button"
                    onClick={() => void runQuery(selectedProjectObj.askPrompt, selectedProjectObj.slug)}
                    className="font-bold text-secondary hover:underline dark:text-[#facc15]"
                  >
                    Ask Default
                  </button>
                </div>
              )}
            </div>

            {/* Recruiter Lens Tabs */}
            <div className="space-y-3">
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                Choose a Recruiter Lens
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LENSES.map(({ id, label, Icon }) => {
                  const active = lens === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLens(id)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 border-2 px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        active
                          ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0px_#1a1a1a] dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[2px_2px_0px_#000000]'
                          : 'border-primary/40 bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#1b1b1f]'
                      }`}
                    >
                      <Icon size={13} aria-hidden="true" />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Starter Prompt Cards for Selected Lens */}
              <div className="space-y-2.5 pt-1">
                {activeLens.prompts.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => {
                      if (p.projectSlug) setSelectedProject(p.projectSlug);
                      void runQuery(p.question, p.projectSlug ?? '');
                    }}
                    className="group flex w-full flex-col gap-1 border-2 border-primary bg-surface-container-lowest p-3.5 text-left shadow-[3px_3px_0px_#1a1a1a] transition-all hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:bg-[#232329] dark:hover:text-white"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-[#facc15]">
                      {p.tag}
                    </span>
                    <span className="font-headline text-xs sm:text-sm font-bold leading-snug">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Console: Multi-Turn Conversation + Composer (8 cols) */}
          <div className="flex flex-col border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[6px_6px_0px_#000000] lg:col-span-8">
            {/* Console Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary bg-surface-container px-5 py-3.5 dark:border-[#3f3f46] dark:bg-[#232329]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center border-2 border-primary bg-primary-container text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]">
                  <MessageSquareText size={16} aria-hidden="true" />
                </span>
                <div>
                  <div className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
                    {selectedProjectObj ? `Scoped: ${selectedProjectObj.title}` : 'Full Portfolio Assistant'}
                  </div>
                  <div className="font-mono text-[11px] text-on-surface-variant">
                    {turns.length === 0
                      ? 'Ready for questions across all 10 repos & field work'
                      : `${turns.length} ${turns.length === 1 ? 'exchange' : 'exchanges'} in this session`}
                  </div>
                </div>
              </div>

              {turns.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 border-2 border-primary bg-surface px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-on-surface transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  <span>New Thread</span>
                </button>
              )}
            </div>

            {/* Thread Area */}
            <div
              data-testid="ask-conversation-thread"
              className="min-h-[420px] flex-1 space-y-6 p-5 sm:p-6"
            >
              {turns.length === 0 && (
                <div className="flex h-full flex-col justify-center space-y-5 py-6">
                  <div className="space-y-2">
                    <h2 className="font-headline text-2xl font-extrabold uppercase tracking-tight text-on-surface">
                      Ask Anything About Aditya&apos;s Systems
                    </h2>
                    <p className="max-w-xl font-body text-sm leading-relaxed text-on-surface-variant">
                      Try asking about the <strong className="text-on-surface">Ambient Clinical AI Scribe</strong>,{' '}
                      <strong className="text-on-surface">District Hospital Araria</strong>,{' '}
                      <strong className="text-on-surface">Matru Suraksha</strong>,{' '}
                      <strong className="text-on-surface">India in the World Dashboard</strong>,{' '}
                      <strong className="text-on-surface">VHSND Offline Pipeline</strong>, or{' '}
                      <strong className="text-on-surface">Gandhi Fellowship</strong> impact in Bihar.
                    </p>
                  </div>

                  {/* Quick Project Jump Chips */}
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Or Click a Project to Query Immediately
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {PORTFOLIO_SYSTEMS.slice(0, 7).map((sys) => (
                        <button
                          key={sys.slug}
                          type="button"
                          onClick={() => {
                            setSelectedProject(sys.slug);
                            void runQuery(sys.askPrompt, sys.slug);
                          }}
                          className="border-2 border-primary/50 bg-surface px-3 py-1.5 font-mono text-[11px] font-semibold text-on-surface transition-colors hover:border-primary hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                        >
                          {sys.rank} · {sys.title.split('—')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {turns.map((turn, idx) => (
                <article
                  key={turn.id}
                  className="space-y-4 border-b-2 border-primary/15 pb-6 last:border-b-0 last:pb-0 dark:border-[#3f3f46]"
                >
                  {/* User Question Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-[#facc15]">
                        Question {String(idx + 1).padStart(2, '0')}
                        {turn.projectSlug ? ` · Scoped to ${turn.projectSlug}` : ''}
                      </span>
                      <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
                        {turn.question}
                      </h3>
                    </div>

                    {!turn.streaming && turn.rawText && (
                      <button
                        type="button"
                        onClick={() => void handleCopy(turn)}
                        className="inline-flex shrink-0 items-center gap-1 border border-outline/40 bg-surface px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-on-surface-variant transition-colors hover:border-primary hover:text-on-surface dark:border-[#3f3f46] dark:bg-[#141417]"
                        title="Copy answer"
                      >
                        {copiedId === turn.id ? (
                          <>
                            <Check size={12} aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Loading */}
                  {turn.streaming && turn.blocks.length === 0 && !turn.error && (
                    <div
                      role="status"
                      className="border border-primary/25 bg-surface p-4 font-body text-sm text-on-surface-variant dark:border-[#3f3f46] dark:bg-[#141417]"
                    >
                      Retrieving verified project docs &amp; field records…
                    </div>
                  )}

                  {/* Structured Answer Blocks */}
                  {turn.blocks.length > 0 && (
                    <div className="space-y-3">
                      {turn.blocks.map((block) => (
                        <div
                          key={block.num}
                          className="border border-primary/25 bg-surface p-4 space-y-1.5 dark:border-[#3f3f46] dark:bg-[#141417]"
                        >
                          <h4 className="flex items-center gap-2 font-headline text-xs sm:text-sm font-bold uppercase tracking-wide text-on-surface">
                            <span
                              className={`inline-block h-2 w-2 shrink-0 ${MARKER_COLORS[(block.num - 1) % MARKER_COLORS.length]}`}
                              aria-hidden="true"
                            />
                            <span>
                              {block.num}. {block.heading || 'Answer'}
                            </span>
                          </h4>
                          <p className="font-body text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                            {block.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {turn.error && (
                    <div
                      role="alert"
                      className="border-2 border-secondary bg-surface p-4 font-mono text-xs text-secondary dark:bg-[#141417]"
                    >
                      {turn.error}
                    </div>
                  )}

                  {/* Dynamic Verified Sources */}
                  {!turn.streaming && turn.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Verified Sources:
                      </span>
                      {turn.sources.map((src) =>
                        src.external ? (
                          <a
                            key={src.href}
                            href={src.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 border border-primary/40 bg-surface-container px-2.5 py-1 font-mono text-[11px] font-semibold text-on-surface transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                          >
                            <span>{src.title}</span>
                            <ArrowUpRight size={12} aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            key={src.href}
                            href={src.href}
                            className="inline-flex items-center gap-1 border border-primary/40 bg-surface-container px-2.5 py-1 font-mono text-[11px] font-semibold text-on-surface transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                          >
                            <span>{src.title}</span>
                            <ArrowRight size={12} aria-hidden="true" />
                          </Link>
                        ),
                      )}
                    </div>
                  )}

                  {/* Interactive Follow-Up Suggestions (only on latest completed turn) */}
                  {!turn.streaming &&
                    idx === turns.length - 1 &&
                    turn.followUps.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                          Continue Exploring
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {turn.followUps.map((fq) => (
                            <button
                              key={fq}
                              type="button"
                              onClick={() => void runQuery(fq, '')}
                              className="border border-primary/50 bg-surface-container-low px-3 py-1.5 text-left font-body text-xs font-medium text-on-surface transition-colors hover:border-primary hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#232329] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                            >
                              {fq}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </article>
              ))}
              <div ref={threadEndRef} />
            </div>

            {/* Bottom Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-primary bg-surface-container p-4 dark:border-[#3f3f46] dark:bg-[#232329]"
            >
              <label htmlFor="ask-page-input" className="sr-only">
                Ask a question about Aditya Pandey’s projects, field work, or background
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex flex-1 items-center border-2 border-primary bg-surface-container-lowest px-3 dark:border-[#3f3f46] dark:bg-[#141417]">
                  <Search
                    size={16}
                    aria-hidden="true"
                    className="mr-2 shrink-0 text-on-surface-variant"
                  />
                  <input
                    ref={inputRef}
                    id="ask-page-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      selectedProjectObj
                        ? `Ask anything about ${selectedProjectObj.title}...`
                        : 'Ask about any project, tech stack, Bihar field work, or resume...'
                    }
                    autoComplete="off"
                    className="w-full border-0 bg-transparent py-2.5 font-body text-sm text-on-surface outline-none placeholder:text-on-surface-variant/65"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isStreaming || !query.trim()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-primary bg-primary px-6 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                >
                  <span>{isStreaming ? 'Answering…' : 'Ask'}</span>
                  <Send size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Cross-Links */}
      <section className="border-t-4 border-primary bg-primary-container px-4 py-10 text-on-primary-container dark:border-[#3f3f46] dark:bg-[#facc15] dark:text-[#121214] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="space-y-1">
            <h2 className="font-headline text-xl sm:text-2xl font-extrabold uppercase tracking-tight">
              Want to Inspect Live Sites &amp; Source Code?
            </h2>
            <p className="font-body text-xs sm:text-sm opacity-85">
              Browse side-by-side live previews, dedicated architecture pages, and verified Bihar field metrics.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 border-2 border-primary bg-surface px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#121214] dark:bg-[#121214] dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <span>All 10 Projects</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/health"
              className="inline-flex items-center gap-1.5 border-2 border-primary bg-surface px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#121214] dark:bg-[#121214] dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <span>Health Impact</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
