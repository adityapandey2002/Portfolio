'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react';
import { getHomeFeaturedSystems } from '@/lib/workCatalog';
import type { PortfolioSystem } from '@/lib/data/systems';

const FEATURED_SYSTEMS = getHomeFeaturedSystems();

export function SelectedSystems() {
  const [modalSystem, setModalSystem] = useState<PortfolioSystem | null>(null);

  useEffect(() => {
    if (!modalSystem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalSystem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalSystem]);

  return (
    <section
      id="systems"
      className="border-b-4 border-primary bg-surface-container-low px-4 py-12 dark:border-[#3f3f46] dark:bg-[#121214] sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with prominent top-right CTA to /work */}
        <div className="flex flex-col justify-between gap-4 border-b-2 border-primary pb-5 dark:border-[#3f3f46] sm:flex-row sm:items-end">
          <div className="space-y-1">
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-secondary">
              04 · Selected Production Builds
            </span>
            <h2 className="font-headline text-3xl font-extrabold uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              Production Systems
            </h2>
            <p className="max-w-xl font-body text-sm text-on-surface-variant">
              Three live flagship systems at a glance — open the full catalog for all 10 projects, GitHub docs, and deep-dive pages.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap border-2 border-primary bg-primary-container px-5 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container shadow-[4px_4px_0px_#1a1a1a] transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[4px_4px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
          >
            <span>View All 10 Projects</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Strictly 3 in a single row on desktop — concise & scannable */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_SYSTEMS.map((sys) => (
            <article
              key={sys.slug}
              className="group flex flex-col overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[5px_5px_0px_#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 dark:border-[#3f3f46] dark:bg-[#1b1b1f] dark:shadow-[5px_5px_0px_#000000]"
            >
              <div className={`h-1.5 w-full ${sys.accentClass}`} aria-hidden="true" />

              {/* Browser Chrome + Live Site Screenshot */}
              <div className="border-b-2 border-primary bg-surface-container dark:border-[#3f3f46] dark:bg-[#121214]">
                <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-1.5 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e10] dark:text-on-surface">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="h-2 w-2 shrink-0 bg-accent-red" aria-hidden="true" />
                    <span className="h-2 w-2 shrink-0 bg-primary-container dark:bg-[#facc15]" aria-hidden="true" />
                    <span className="h-2 w-2 shrink-0 bg-tertiary" aria-hidden="true" />
                    <span className="ml-1 truncate font-mono text-[10px] font-semibold text-primary-container dark:text-[#facc15]">
                      {sys.domain}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalSystem(sys)}
                    aria-label={`Expand preview of ${sys.title}`}
                    title="Expand preview"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center border border-white/25 bg-white/10 text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <Maximize2 size={11} aria-hidden="true" />
                  </button>
                </div>

                <Link
                  href={`/work/${sys.slug}`}
                  aria-label={`Open details for ${sys.title}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-surface dark:bg-[#0e0e10]"
                >
                  <img
                    src={sys.previewImage}
                    alt={`${sys.title} live website screenshot`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-black bg-[#facc15] px-2 py-0.5 font-headline text-[10px] font-bold uppercase tracking-wider text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Inspect System <ArrowRight size={11} aria-hidden="true" />
                  </span>
                </Link>
              </div>

              {/* Concise Card Body */}
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
                    {sys.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm leading-relaxed text-on-surface-variant line-clamp-2">
                    {sys.tagline}
                  </p>

                  {/* Compact 3-Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 border-y border-outline/25 py-2.5 dark:border-[#3f3f46]">
                    {sys.metrics.slice(0, 3).map((m) => (
                      <div key={m.label} className="min-w-0">
                        <div className="font-headline text-base font-extrabold tabular-nums text-on-surface leading-tight">
                          {m.value}
                        </div>
                        <div className="mt-0.5 font-mono text-[9.5px] uppercase leading-tight text-on-surface-variant">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clean 2-Button Footer */}
                <div className="mt-4 flex items-center gap-2.5">
                  {sys.liveUrl && (
                    <a
                      href={sys.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-primary px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider text-on-primary shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:shadow-[2px_2px_0px_#000000] dark:hover:bg-white dark:hover:text-black"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                  <Link
                    href={`/work/${sys.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-2 border-primary bg-surface px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider text-on-surface shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-[#3f3f46] dark:bg-[#141417] dark:shadow-[2px_2px_0px_#000000] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Expanded Screenshot Lightbox Modal */}
      {modalSystem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${modalSystem.title} preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setModalSystem(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border-[3px] border-primary bg-surface shadow-[8px_8px_0px_#000000] dark:border-[#facc15] dark:bg-[#161619]"
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
                  <span>Full Details</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setModalSystem(null)}
                  aria-label="Close preview"
                  className="inline-flex h-8 w-8 items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-accent-red hover:text-white"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative max-h-[76vh] w-full overflow-auto bg-surface-container dark:bg-[#0e0e10]">
              <img
                src={modalSystem.previewImage}
                alt={`${modalSystem.title} full live site preview`}
                referrerPolicy="no-referrer"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
