'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FolderGit2,
  Maximize2,
  MessageSquareText,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  PORTFOLIO_SYSTEMS,
  RECRUITER_WORK_KPIS,
  type PortfolioSystem,
} from '@/lib/data/systems';
import {
  WORK_FILTERS,
  countByFilter,
  filterSystems,
  type WorkFilterId,
} from '@/lib/workCatalog';

interface SiteHealthEntry {
  ok: boolean;
  status: number;
  latencyMs: number;
}

const KPI_ACCENT_STYLES = {
  default:
    'bg-surface-container-lowest dark:bg-[#1b1b1f] text-on-surface border-primary dark:border-[#3f3f46]',
  yellow:
    'bg-primary-container dark:bg-[#facc15] text-on-primary-container dark:text-[#121214] border-primary dark:border-[#3f3f46]',
  blue:
    'bg-surface-container dark:bg-[#1e222b] text-on-surface border-primary dark:border-[#3f3f46]',
  red:
    'bg-surface-container-lowest dark:bg-[#22191c] text-on-surface border-primary dark:border-[#3f3f46]',
} as const;

export function WorkShowcaseClient() {
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [siteStatuses, setSiteStatuses] = useState<Record<string, SiteHealthEntry>>({});
  const [modalSystem, setModalSystem] = useState<PortfolioSystem | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/site-status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.statuses) {
          setSiteStatuses(data.statuses);
        }
      })
      .catch(() => {
        // Non-blocking live probe
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!modalSystem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalSystem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalSystem]);

  const filteredSystems = useMemo(
    () => filterSystems(PORTFOLIO_SYSTEMS, activeFilter, searchQuery),
    [activeFilter, searchQuery],
  );

  const flagshipSystems = useMemo(
    () => filteredSystems.filter((s) => s.tier === 'flagship'),
    [filteredSystems],
  );
  const specializedSystems = useMemo(
    () => filteredSystems.filter((s) => s.tier === 'specialized'),
    [filteredSystems],
  );

  const openModal = (sys: PortfolioSystem) => {
    setModalSystem(sys);
    setModalImageIdx(0);
  };

  const modalGallery = useMemo(() => {
    if (!modalSystem) return [];
    return [
      { src: modalSystem.previewImage, caption: `${modalSystem.title} — Primary View` },
      ...(modalSystem.secondaryImages ?? []),
    ];
  }, [modalSystem]);

  return (
    <div className="min-h-screen bg-surface text-on-surface dark:bg-[#121214]">
      {/* Hero + Recruiter KPI Strip */}
      <section className="border-b-4 border-primary bg-surface px-4 py-10 dark:border-[#3f3f46] dark:bg-[#161619] sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 border-2 border-primary bg-primary-container px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-widest text-on-primary-container shadow-[3px_3px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000]">
                Engineering &amp; Public Health Systems Catalog
              </div>
              <h1 className="font-headline text-4xl font-extrabold uppercase tracking-tight text-on-surface sm:text-5xl lg:text-6xl leading-[1.02]">
                Work &amp; Production Systems
              </h1>
              <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Every flagship and specialized system sourced directly from GitHub documentation and live production deployments — inspect site previews on the left, recruiter highlights on the right, or open any project&apos;s dedicated architecture page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/adityapandey2002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary bg-surface-container-lowest px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
              >
                <FolderGit2 size={15} aria-hidden="true" />
                <span>GitHub Profile</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <Link
                href="/ask"
                className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
              >
                <Sparkles size={15} aria-hidden="true" />
                <span>Ask AI About Projects</span>
              </Link>
            </div>
          </div>

          {/* 4-Card Tech + Public Health Recruiter KPI Strip */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECRUITER_WORK_KPIS.map((kpi) => (
              <div
                key={kpi.kicker}
                className={`flex flex-col justify-between border-2 p-5 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#000000] ${KPI_ACCENT_STYLES[kpi.accent]}`}
              >
                <span
                  className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                    kpi.accent === 'yellow'
                      ? 'text-on-primary-container/80 dark:text-[#121214]/80'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {kpi.kicker}
                </span>
                <div className="my-3">
                  <div className="font-headline text-4xl font-extrabold tracking-tight tabular-nums leading-none">
                    {kpi.value}
                  </div>
                  <div
                    className={`mt-1.5 font-headline text-xs font-bold uppercase tracking-wide ${
                      kpi.accent === 'yellow'
                        ? 'text-on-primary-container dark:text-[#121214]'
                        : kpi.accent === 'blue'
                          ? 'text-tertiary'
                          : kpi.accent === 'red'
                            ? 'text-secondary'
                            : 'text-primary dark:text-[#facc15]'
                    }`}
                  >
                    {kpi.headline}
                  </div>
                </div>
                <p
                  className={`font-body text-xs leading-relaxed ${
                    kpi.accent === 'yellow'
                      ? 'text-on-primary-container/90 dark:text-[#121214]/90'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {kpi.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Category Filter + Instant Search Bar */}
      <div className="sticky-below-nav sticky top-[var(--header-h)] z-30 border-b-2 border-primary bg-surface-container/95 px-4 py-3 backdrop-blur-sm transition-[top] duration-300 ease-out dark:border-[#3f3f46] dark:bg-[#161619]/95 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
          >
            {WORK_FILTERS.map((f) => {
              const active = activeFilter === f.id;
              const count = countByFilter(PORTFOLIO_SYSTEMS, f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  aria-pressed={active}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-2 px-3 py-1.5 font-headline text-xs font-bold uppercase tracking-wider transition-colors ${
                    active
                      ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0px_#1a1a1a] dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[2px_2px_0px_#000000]'
                      : 'border-primary/40 bg-surface-container-lowest text-on-surface hover:border-primary hover:bg-primary-container hover:text-on-primary-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:hover:border-[#facc15]'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="font-mono text-[10px] opacity-80 tabular-nums">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative flex items-center lg:w-72">
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 text-on-surface-variant"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, repo, or metric..."
              aria-label="Search projects"
              className="w-full border-2 border-primary bg-surface-container-lowest py-1.5 pl-8 pr-3 font-body text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:border-secondary focus:outline-none dark:border-[#3f3f46] dark:bg-[#121214] dark:focus:border-[#facc15]"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-8 lg:px-12 lg:py-12">
        {filteredSystems.length === 0 && (
          <div className="border-2 border-primary bg-surface-container-lowest p-10 text-center dark:border-[#3f3f46] dark:bg-[#1b1b1f]">
            <p className="font-headline text-lg font-bold uppercase text-on-surface">
              No projects match &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 border-2 border-primary bg-primary-container px-4 py-2 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Flagship Systems — Side-by-Side Split Layout */}
        {flagshipSystems.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-col justify-between gap-2 border-b-2 border-primary pb-3 dark:border-[#3f3f46] sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                  Ranked by Operational &amp; Engineering Impact
                </span>
                <h2 className="font-headline text-2xl font-extrabold uppercase tracking-tight text-on-surface sm:text-3xl">
                  Flagship Production Systems ({flagshipSystems.length})
                </h2>
              </div>
              <span className="font-mono text-xs text-on-surface-variant">
                Live Preview · Recruiter Brief · Full Architecture Page
              </span>
            </div>

            <div className="space-y-8">
              {flagshipSystems.map((sys) => {
                const probe = siteStatuses[sys.slug];
                return (
                  <article
                    key={sys.slug}
                    className="overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[6px_6px_0px_#000000]"
                  >
                    <div className={`h-1.5 w-full ${sys.accentClass}`} aria-hidden="true" />

                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* LEFT SIDE (5 cols): Browser-Framed Live Site Preview + Tightly Coupled Links & Docs Index */}
                      <div className="flex flex-col gap-3 border-b-2 border-primary bg-surface-container p-4 dark:border-[#3f3f46] dark:bg-[#141417] lg:col-span-5 lg:border-b-0 lg:border-r-2 sm:p-5">
                        {/* Browser Window Frame (uncropped 16:10 full desktop view) */}
                        <div className="overflow-hidden border-2 border-primary bg-surface dark:border-[#3f3f46] dark:bg-[#0e0e10]">
                          <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-on-surface">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <span className="h-2.5 w-2.5 shrink-0 bg-accent-red" aria-hidden="true" />
                              <span className="h-2.5 w-2.5 shrink-0 bg-primary-container dark:bg-[#facc15]" aria-hidden="true" />
                              <span className="h-2.5 w-2.5 shrink-0 bg-tertiary" aria-hidden="true" />
                              <span className="ml-1.5 truncate font-mono text-[11px] font-semibold text-primary-container dark:text-[#facc15]">
                                {sys.domain}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => openModal(sys)}
                              aria-label={`Expand preview of ${sys.title}`}
                              title="Expand full-size preview"
                              className="inline-flex h-6 w-6 shrink-0 items-center justify-center border border-white/25 bg-white/10 text-white transition-colors hover:bg-white hover:text-black"
                            >
                              <Maximize2 size={12} aria-hidden="true" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => openModal(sys)}
                            aria-label={`Inspect ${sys.title} preview`}
                            className="group relative block aspect-[16/10] w-full overflow-hidden bg-surface-container text-left dark:bg-[#0e0e10]"
                          >
                            <img
                              src={sys.previewImage}
                              alt={`${sys.title} live interface preview`}
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-black bg-[#facc15] px-2.5 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <Maximize2 size={12} aria-hidden="true" />
                              <span>Expand Preview</span>
                            </span>
                          </button>
                        </div>

                        {/* Immediately Below Preview: Live Status + Open Live Site + GitHub Repo */}
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-2 border border-outline/30 bg-surface-container-lowest px-3 py-2 font-mono text-[11px] dark:border-[#3f3f46] dark:bg-[#1b1b1f]">
                            <span className="font-semibold text-on-surface">
                              {sys.deploymentLabel}
                            </span>
                            {sys.isLivePublic ? (
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                                <CheckCircle2 size={13} aria-hidden="true" />
                                {probe
                                  ? probe.ok
                                    ? `HTTP ${probe.status} · ${probe.latencyMs}ms`
                                    : 'Live Production'
                                  : 'Live Production'}
                              </span>
                            ) : (
                              <span className="font-semibold text-on-surface-variant">
                                Open-Source / On-Prem
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {sys.liveUrl && (
                              <a
                                href={sys.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-primary px-3.5 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                              >
                                <span>Open Live Site</span>
                                <ArrowUpRight size={14} aria-hidden="true" />
                              </a>
                            )}
                            {sys.githubUrl && (
                              <a
                                href={sys.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-surface-container-lowest px-3.5 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[3px_3px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                              >
                                <FolderGit2 size={14} aria-hidden="true" />
                                <span>GitHub Repo</span>
                                <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Compact Repository Docs Quick-Index — expands cleanly to eliminate any empty gap */}
                        {sys.docs.length > 0 && (
                          <div className="flex flex-1 flex-col justify-between border border-primary/25 bg-surface-container-lowest p-3.5 dark:border-[#3f3f46] dark:bg-[#1b1b1f]">
                            <div>
                              <div className="mb-2.5 flex items-center justify-between gap-2 border-b border-primary/15 pb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:border-[#3f3f46]">
                                <span className="truncate">{sys.repoName ?? 'Repository Docs'}</span>
                                <span className="shrink-0 text-secondary dark:text-[#facc15]">
                                  {sys.docs.length} Docs Indexed
                                </span>
                              </div>
                              <ul className="space-y-2">
                                {sys.docs.slice(0, 3).map((doc) => (
                                  <li key={doc.path} className="space-y-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                      <Link
                                        href={`/work/${sys.slug}`}
                                        className="truncate font-mono text-[11px] font-semibold text-on-surface hover:text-secondary dark:hover:text-[#facc15]"
                                      >
                                        {doc.title}
                                      </Link>
                                      <span className="shrink-0 font-mono text-[10px] text-on-surface-variant">
                                        {doc.path}
                                      </span>
                                    </div>
                                    <p className="line-clamp-1 font-body text-[11px] text-on-surface-variant">
                                      {doc.summary}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-primary/15 pt-2 font-mono text-[10px] text-on-surface-variant dark:border-[#3f3f46]">
                              <span>Source verified from GitHub docs</span>
                              <Link
                                href={`/work/${sys.slug}`}
                                className="font-bold uppercase tracking-wider text-on-surface hover:text-secondary dark:hover:text-[#facc15]"
                              >
                                Read All →
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* RIGHT SIDE (7 cols): Recruiter-Ready Impact, Metrics, Highlights & Detail CTA */}
                      <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-7">
                        <div className="space-y-4">
                          {/* Unboxed Metadata */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-on-surface-variant">
                              <span className="font-bold tabular-nums text-primary dark:text-[#facc15]">
                                {sys.rank}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-bold uppercase text-secondary">
                                {sys.categoryLabel}
                              </span>
                              {sys.nativeTitle && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-medium text-on-surface">{sys.nativeTitle}</span>
                                </>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                              {sys.audience.includes('tech') && <span>Tech</span>}
                              {sys.audience.length === 2 && <span aria-hidden="true">×</span>}
                              {sys.audience.includes('health') && <span>Public Health</span>}
                            </div>
                          </div>

                          {/* Title & Subtitle */}
                          <div className="space-y-1">
                            <h3 className="font-headline text-2xl font-extrabold uppercase tracking-tight text-on-surface sm:text-3xl leading-tight">
                              <Link
                                href={`/work/${sys.slug}`}
                                className="hover:text-secondary dark:hover:text-[#facc15] transition-colors"
                              >
                                {sys.title}
                              </Link>
                            </h3>
                            <p className="font-headline text-xs font-bold uppercase tracking-wide text-on-surface-variant dark:text-[#facc15]">
                              {sys.subtitle}
                            </p>
                          </div>

                          {/* Summary */}
                          <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                            {sys.summary}
                          </p>

                          {/* 4 Compact Recruiter Metrics */}
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {sys.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="border border-primary/25 bg-surface p-2.5 dark:border-[#3f3f46] dark:bg-[#141417]"
                              >
                                <div className="font-headline text-lg font-extrabold tabular-nums text-on-surface leading-tight">
                                  {m.value}
                                </div>
                                <div className="font-mono text-[10px] font-bold uppercase text-secondary dark:text-[#facc15] mt-0.5">
                                  {m.label}
                                </div>
                                {m.context && (
                                  <div className="font-body text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                                    {m.context}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Recruiter Highlights */}
                          <div className="space-y-1.5">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                              Key Engineering &amp; Impact Highlights
                            </div>
                            <ul className="divide-y divide-outline/20 border-y border-outline/25 dark:divide-[#3f3f46]/70 dark:border-[#3f3f46]">
                              {sys.recruiterHighlights.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2.5 py-2 font-body text-xs sm:text-sm text-on-surface leading-snug"
                                >
                                  <span
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary dark:bg-[#facc15]"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Unboxed Tech Stack */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-medium text-on-surface-variant">
                            <span className="font-bold uppercase text-on-surface">Stack:</span>
                            {sys.stack.map((tech, idx) => (
                              <span key={tech} className="inline-flex items-center gap-2">
                                {idx > 0 && <span aria-hidden="true">·</span>}
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right Column Action Footer */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-primary/15 pt-4 dark:border-[#3f3f46]">
                          <Link
                            href={`/work/${sys.slug}`}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-primary bg-primary-container px-5 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[3px_3px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                          >
                            <span>Explore Detailed System View</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>

                          <Link
                            href={`/ask?project=${encodeURIComponent(sys.slug)}&q=${encodeURIComponent(sys.askPrompt)}`}
                            className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-secondary dark:hover:text-[#facc15]"
                          >
                            <MessageSquareText size={14} aria-hidden="true" />
                            <span>Ask AI About This</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Specialized Systems */}
        {specializedSystems.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col justify-between gap-2 border-b-2 border-primary pb-3 dark:border-[#3f3f46] sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-tertiary">
                  ML Capstone · Real-Time Full-Stack · Embedded Hardware
                </span>
                <h2 className="font-headline text-2xl font-extrabold uppercase tracking-tight text-on-surface sm:text-3xl">
                  Specialized Engineering &amp; Research ({specializedSystems.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {specializedSystems.map((sys) => (
                <article
                  key={sys.slug}
                  className="flex flex-col overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[5px_5px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[5px_5px_0px_#000000]"
                >
                  <div className={`h-1.5 w-full ${sys.accentClass}`} aria-hidden="true" />

                  <button
                    type="button"
                    onClick={() => openModal(sys)}
                    aria-label={`Inspect ${sys.title}`}
                    className="group relative block aspect-[16/10] w-full overflow-hidden border-b-2 border-primary bg-surface-container dark:border-[#3f3f46] dark:bg-[#0e0e10]"
                  >
                    <img
                      src={sys.previewImage}
                      alt={`${sys.title} visual preview`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
                        <span className="font-bold tabular-nums text-primary dark:text-[#facc15]">
                          {sys.rank}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-secondary">{sys.categoryLabel}</span>
                      </div>

                      <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface leading-snug">
                        <Link
                          href={`/work/${sys.slug}`}
                          className="hover:text-secondary dark:hover:text-[#facc15]"
                        >
                          {sys.title}
                        </Link>
                      </h3>

                      <p className="font-body text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                        {sys.summary}
                      </p>

                      <div className="grid grid-cols-3 gap-2 border-y border-outline/25 py-2.5 dark:border-[#3f3f46]">
                        {sys.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <div className="font-headline text-sm font-extrabold tabular-nums text-on-surface">
                              {m.value}
                            </div>
                            <div className="truncate font-mono text-[10px] uppercase text-on-surface-variant">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2.5">
                      <Link
                        href={`/work/${sys.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-primary-container px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider text-on-primary-container shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[2px_2px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                      >
                        <span>Full Details</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {sys.githubUrl && (
                        <a
                          href={sys.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-surface px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider text-on-surface shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#141417] dark:shadow-[2px_2px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                        >
                          <FolderGit2 size={13} aria-hidden="true" />
                          <span>Repo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Consolidated Comparison Matrix */}
        <section className="space-y-4">
          <div className="border-b-2 border-primary pb-3 dark:border-[#3f3f46]">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Quick Recruiter Index
            </span>
            <h2 className="font-headline text-2xl font-extrabold uppercase tracking-tight text-on-surface">
              All 10 Repositories &amp; Live Links
            </h2>
          </div>

          <div className="overflow-x-auto border-2 border-primary bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[4px_4px_0px_#000000]">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-primary bg-primary text-on-primary font-mono text-[11px] uppercase tracking-wider dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-[#facc15]">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">System</th>
                  <th className="px-4 py-3">Domain</th>
                  <th className="px-4 py-3">Key Proof</th>
                  <th className="px-4 py-3">Core Stack</th>
                  <th className="px-4 py-3 text-right">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/25 font-body text-xs dark:divide-[#3f3f46]">
                {PORTFOLIO_SYSTEMS.map((sys) => (
                  <tr
                    key={sys.slug}
                    className="transition-colors hover:bg-surface-container/60 dark:hover:bg-[#232329]"
                  >
                    <td className="px-4 py-3 font-mono font-bold tabular-nums text-on-surface-variant">
                      {sys.rank}
                    </td>
                    <td className="px-4 py-3 font-headline font-bold text-on-surface">
                      <Link
                        href={`/work/${sys.slug}`}
                        className="hover:text-secondary dark:hover:text-[#facc15]"
                      >
                        {sys.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-secondary">
                      {sys.categoryLabel}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] font-semibold tabular-nums text-on-surface">
                      {sys.metrics[0]?.value} {sys.metrics[0]?.label}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-on-surface-variant">
                      {sys.stack.slice(0, 3).join(' · ')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-3 font-mono text-[11px] font-bold">
                        <Link
                          href={`/work/${sys.slug}`}
                          className="text-on-surface underline-offset-2 hover:underline dark:text-[#facc15]"
                        >
                          Details
                        </Link>
                        {sys.liveUrl && (
                          <a
                            href={sys.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-tertiary underline-offset-2 hover:underline"
                          >
                            Live ↗
                          </a>
                        )}
                        {sys.githubUrl && (
                          <a
                            href={sys.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-on-surface-variant underline-offset-2 hover:text-on-surface hover:underline"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {modalSystem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${modalSystem.title} preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setModalSystem(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border-[3px] border-primary bg-surface shadow-[8px_8px_0px_#000000] dark:border-[#facc15] dark:bg-[#161619]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary bg-primary px-4 py-3 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-white">
              <div className="flex items-center gap-3">
                <span className="font-headline text-sm font-bold uppercase tracking-wider">
                  {modalSystem.title}
                </span>
                <span className="hidden font-mono text-xs text-primary-container dark:text-[#facc15] sm:inline">
                  {modalSystem.domain}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {modalSystem.liveUrl && (
                  <a
                    href={modalSystem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border border-white/30 bg-white/10 px-2.5 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
                  >
                    <span>Open Live Site</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                )}
                <Link
                  href={`/work/${modalSystem.slug}`}
                  onClick={() => setModalSystem(null)}
                  className="inline-flex items-center gap-1 border border-[#facc15] bg-[#facc15] px-2.5 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-black hover:bg-white"
                >
                  <span>Detailed View</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setModalSystem(null)}
                  aria-label="Close preview"
                  className="inline-flex h-8 w-8 items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-accent-red"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {modalGallery.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 border-b border-outline/30 bg-surface-container px-4 py-2 dark:border-[#3f3f46] dark:bg-[#1b1b1f]">
                {modalGallery.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setModalImageIdx(idx)}
                    className={`border px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      modalImageIdx === idx
                        ? 'border-primary bg-primary text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]'
                        : 'border-outline/40 bg-surface text-on-surface-variant hover:text-on-surface dark:border-[#3f3f46]'
                    }`}
                  >
                    {idx + 1}. {img.caption}
                  </button>
                ))}
              </div>
            )}

            <div className="relative max-h-[75vh] w-full overflow-auto bg-surface-container dark:bg-[#0e0e10]">
              {modalGallery[modalImageIdx] && (
                <img
                  src={modalGallery[modalImageIdx].src}
                  alt={modalGallery[modalImageIdx].caption}
                  referrerPolicy="no-referrer"
                  className="h-auto w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
