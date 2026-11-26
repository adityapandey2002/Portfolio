'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  FolderGit2,
  Layers,
  Maximize2,
  MessageSquareText,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import type { PortfolioSystem } from '@/lib/data/systems';

interface ProjectDetailClientProps {
  system: PortfolioSystem;
  prev: PortfolioSystem | null;
  next: PortfolioSystem | null;
}

type DetailTab = 'overview' | 'architecture' | 'security' | 'stack';

const TABS: { id: DetailTab; label: string; Icon: typeof Layers }[] = [
  { id: 'overview', label: 'Overview & Impact', Icon: CheckCircle2 },
  { id: 'architecture', label: 'Architecture & Flow', Icon: Workflow },
  { id: 'security', label: 'Security & QA Gates', Icon: ShieldCheck },
  { id: 'stack', label: 'Stack & Repo Docs', Icon: FileText },
];

export function ProjectDetailClient({ system, prev, next }: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const gallery = useMemo(
    () => [
      { src: system.previewImage, caption: 'Primary Production Interface' },
      ...(system.secondaryImages ?? []),
    ],
    [system],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="min-h-screen bg-surface text-on-surface dark:bg-[#121214]">
      {/* Top Breadcrumb & Quick Actions */}
      <section className="border-b-4 border-primary bg-surface px-4 py-8 dark:border-[#3f3f46] dark:bg-[#161619] sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-on-surface dark:hover:text-[#facc15]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Back to All 10 Projects</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
              <span className="font-bold text-primary dark:text-[#facc15]">
                SYSTEM {system.rank}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold uppercase text-secondary">{system.categoryLabel}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl space-y-2.5">
              {system.nativeTitle && (
                <span className="block font-mono text-sm font-semibold text-on-surface-variant">
                  {system.nativeTitle}
                </span>
              )}
              <h1 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-on-surface sm:text-5xl leading-[1.04]">
                {system.title}
              </h1>
              <p className="font-headline text-sm font-bold uppercase tracking-wide text-secondary dark:text-[#facc15]">
                {system.subtitle}
              </p>
              <p className="max-w-3xl font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {system.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {system.liveUrl && (
                <a
                  href={system.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap border-2 border-primary bg-primary px-5 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                >
                  <span>Visit Live Site</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {system.githubUrl && (
                <a
                  href={system.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap border-2 border-primary bg-surface-container-lowest px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                >
                  <FolderGit2 size={15} aria-hidden="true" />
                  <span>GitHub Repository</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
              <Link
                href={`/ask?project=${encodeURIComponent(system.slug)}&q=${encodeURIComponent(system.askPrompt)}`}
                className="inline-flex items-center gap-2 whitespace-nowrap border-2 border-primary bg-primary-container px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#232329] dark:text-on-surface dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
              >
                <MessageSquareText size={14} aria-hidden="true" />
                <span>Ask AI About This</span>
              </Link>
            </div>
          </div>

          {/* Hero Split: Live Preview Frame + Key Verified Metrics */}
          <div className="grid grid-cols-1 gap-6 pt-2 lg:grid-cols-12">
            {/* Browser Frame Preview (7 cols) */}
            <div className="space-y-3 lg:col-span-7">
              <div className="overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:shadow-[6px_6px_0px_#000000]">
                <div className={`h-1.5 w-full ${system.accentClass}`} aria-hidden="true" />
                <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3.5 py-2 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-on-surface">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="h-2.5 w-2.5 shrink-0 bg-accent-red" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 shrink-0 bg-primary-container dark:bg-[#facc15]" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 shrink-0 bg-tertiary" aria-hidden="true" />
                    <span className="ml-1.5 truncate font-mono text-[11px] font-semibold text-primary-container dark:text-[#facc15]">
                      {system.domain}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Open full-screen preview"
                    className="inline-flex items-center gap-1 border border-white/25 bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white hover:bg-white hover:text-black"
                  >
                    <Maximize2 size={11} aria-hidden="true" />
                    <span>Expand</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="block aspect-[16/10] w-full overflow-hidden bg-surface-container text-left dark:bg-[#0e0e10]"
                >
                  <img
                    src={gallery[activeImgIdx]?.src ?? system.previewImage}
                    alt={`${system.title} — ${gallery[activeImgIdx]?.caption ?? 'preview'}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              </div>

              {gallery.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {gallery.map((item, idx) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActiveImgIdx(idx)}
                      className={`border-2 px-3 py-1.5 font-mono text-[11px] font-semibold transition-colors ${
                        activeImgIdx === idx
                          ? 'border-primary bg-primary text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]'
                          : 'border-primary/30 bg-surface-container-lowest text-on-surface-variant hover:border-primary dark:border-[#3f3f46] dark:bg-[#1b1b1f]'
                      }`}
                    >
                      0{idx + 1} · {item.caption}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Verified Metrics + Executive Summary (5 cols) */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {system.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="border-2 border-primary bg-surface-container-lowest p-4 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="font-headline text-2xl sm:text-3xl font-extrabold tabular-nums text-on-surface">
                      {m.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] font-bold uppercase text-secondary dark:text-[#facc15]">
                      {m.label}
                    </div>
                    {m.context && (
                      <p className="mt-1 font-body text-xs text-on-surface-variant leading-snug">
                        {m.context}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-2 border-primary bg-surface-container p-5 space-y-3 dark:border-[#3f3f46] dark:bg-[#1b1b1f]">
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Deployment &amp; Repository
                </div>
                <div className="space-y-1.5 font-body text-sm text-on-surface">
                  <p>
                    <strong className="font-semibold">Status:</strong> {system.deploymentLabel}
                  </p>
                  {system.repoName && (
                    <p className="font-mono text-xs text-on-surface-variant">
                      Repo: {system.repoName}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-outline/25 pt-3 font-mono text-[11px] text-on-surface-variant dark:border-[#3f3f46]">
                  {system.stack.map((tech, idx) => (
                    <span key={tech} className="inline-flex items-center gap-2">
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detailed Engineering Tabs */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12 lg:py-12 space-y-8">
        <div
          role="tablist"
          aria-label="Project detail sections"
          className="flex flex-wrap gap-2 border-b-2 border-primary pb-4 dark:border-[#3f3f46]"
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 border-2 px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? 'border-primary bg-primary text-on-primary shadow-[3px_3px_0px_#1a1a1a] dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000]'
                    : 'border-primary/40 bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:hover:border-[#facc15]'
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Impact */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="border-2 border-primary bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-3">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                  Problem &amp; Domain Context
                </h2>
                <p className="font-body text-sm sm:text-base leading-relaxed text-on-surface-variant">
                  {system.problemSolved}
                </p>
              </div>

              <div className="border-2 border-primary bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-3">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                  Operational Impact
                </h2>
                <p className="font-body text-sm sm:text-base leading-relaxed text-on-surface-variant">
                  {system.operationalImpact}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full border-2 border-primary bg-surface-container p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-4">
                <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                  Recruiter Highlights
                </h2>
                <ul className="divide-y divide-outline/25 dark:divide-[#3f3f46]">
                  {system.recruiterHighlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 py-3 font-body text-sm leading-relaxed text-on-surface"
                    >
                      <span
                        className="mt-2 h-2 w-2 shrink-0 bg-secondary dark:bg-[#facc15]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture & Flow */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {system.architectureSteps.map((step) => (
              <div
                key={step.step}
                className="border-2 border-primary bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-2.5"
              >
                <span className="inline-block border border-primary bg-primary-container px-2 py-0.5 font-mono text-xs font-bold tabular-nums text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]">
                  STAGE {step.step}
                </span>
                <h3 className="font-headline text-lg font-bold uppercase text-on-surface">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Security & QA Gates */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {system.qualityGates.map((gate) => (
                <div
                  key={gate.label}
                  className="border-2 border-primary bg-surface-container p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000]"
                >
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    {gate.label}
                  </div>
                  <div className="mt-1.5 font-headline text-sm font-bold text-on-surface">
                    {gate.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-2 border-primary bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000] space-y-3">
              <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                Verified Security &amp; Quality Engineering
              </h2>
              <ul className="divide-y divide-outline/25 dark:divide-[#3f3f46]">
                {system.securityAndQuality.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 py-3 font-body text-sm leading-relaxed text-on-surface"
                  >
                    <ShieldCheck
                      size={16}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-secondary dark:text-[#facc15]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Stack & Repo Docs */}
        {activeTab === 'stack' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                Layered Tech Stack
              </h2>
              <div className="space-y-3">
                {system.stackGroups.map((group) => (
                  <div
                    key={group.layer}
                    className="border-2 border-primary bg-surface-container-lowest p-4 dark:border-[#3f3f46] dark:bg-[#1b1b1f]"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-secondary dark:text-[#facc15]">
                      {group.layer}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-sm text-on-surface">
                      {group.items.map((tech, idx) => (
                        <span key={tech} className="inline-flex items-center gap-2.5">
                          {idx > 0 && <span className="text-on-surface-variant" aria-hidden="true">·</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <h2 className="font-headline text-xl font-bold uppercase text-on-surface">
                GitHub Documentation &amp; Source
              </h2>
              <div className="space-y-3">
                {system.docs.map((doc) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-2 border-primary bg-surface-container-lowest p-4 shadow-[3px_3px_0px_#1a1a1a] transition-all hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-headline text-sm font-bold uppercase">
                          {doc.title}
                        </div>
                        <div className="font-mono text-[11px] opacity-75">{doc.path}</div>
                      </div>
                      <ExternalLink size={15} className="shrink-0" aria-hidden="true" />
                    </div>
                    <p className="mt-2 font-body text-xs opacity-90 leading-relaxed">
                      {doc.summary}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Previous / Next System Navigation */}
        <nav
          aria-label="Adjacent projects"
          className="grid grid-cols-1 gap-4 border-t-2 border-primary pt-8 dark:border-[#3f3f46] sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex items-center justify-between gap-3 border-2 border-primary bg-surface-container-lowest p-4 shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ArrowLeft size={16} className="shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase text-on-surface-variant">
                    Previous · {prev.rank}
                  </div>
                  <div className="truncate font-headline text-sm font-bold uppercase text-on-surface">
                    {prev.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between gap-3 border-2 border-primary bg-surface-container-lowest p-4 text-right shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase text-on-surface-variant">
                  Next · {next.rank}
                </div>
                <div className="truncate font-headline text-sm font-bold uppercase text-on-surface">
                  {next.title}
                </div>
              </div>
              <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${system.title} full screen preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border-[3px] border-primary bg-surface shadow-[8px_8px_0px_#000000] dark:border-[#facc15] dark:bg-[#161619]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b-2 border-primary bg-primary px-4 py-3 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-white">
              <span className="font-headline text-sm font-bold uppercase tracking-wider">
                {system.title} — {gallery[activeImgIdx]?.caption}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close preview"
                className="inline-flex h-8 w-8 items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-accent-red"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto bg-surface-container dark:bg-[#0e0e10]">
              <img
                src={gallery[activeImgIdx]?.src ?? system.previewImage}
                alt={gallery[activeImgIdx]?.caption ?? system.title}
                referrerPolicy="no-referrer"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
