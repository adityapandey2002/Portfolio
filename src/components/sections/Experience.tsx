'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import {
  EXPERIENCE_TRACKS,
  experience,
  filterExperience,
  type ExperienceTrack,
} from '@/lib/data/experience';

export function Experience() {
  const [activeTrack, setActiveTrack] = useState<ExperienceTrack>('all');

  const visibleItems = filterExperience(experience, activeTrack);
  const featuredRole = visibleItems.find((item) => item.featured);
  const gridRoles = visibleItems.filter((item) => !item.featured);

  const trackCounts: Record<ExperienceTrack, number> = {
    all: experience.length,
    health: experience.filter((item) => item.track === 'health').length,
    engineering: experience.filter((item) => item.track === 'engineering').length,
  };

  return (
    <section
      id="experience"
      className="border-b-4 border-primary bg-surface px-4 py-12 dark:border-[#3f3f46] dark:bg-[#161619] sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Section Header + Interactive Track Filter */}
        <div className="flex flex-col justify-between gap-5 border-b-2 border-primary pb-5 dark:border-[#3f3f46] lg:flex-row lg:items-end">
          <div className="space-y-1.5">
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-secondary">
              03 · Career &amp; Field Record
            </span>
            <h2
              className="font-headline text-3xl font-extrabold uppercase tracking-tight text-on-surface sm:text-4xl lg:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Field &amp; Systems Experience
            </h2>
            <p className="max-w-2xl font-body text-sm text-on-surface-variant">
              Hands-on public health strengthening across Bihar paired with production full-stack engineering, secure commerce, and open-source hardware.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <span className="font-mono text-xs font-medium text-on-surface-variant">
              2024 – Present · 4 Verified Roles
            </span>
            <div
              role="group"
              aria-label="Filter experience by track"
              className="inline-flex flex-wrap items-center gap-1.5"
            >
              {EXPERIENCE_TRACKS.map((track) => {
                const isActive = activeTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTrack(track.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-2 px-3 py-1.5 font-headline text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive
                        ? 'border-primary bg-primary text-on-primary dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214]'
                        : 'border-primary/40 bg-surface-container-lowest text-on-surface hover:border-primary dark:border-[#3f3f46] dark:bg-[#1e1e23] dark:text-on-surface dark:hover:border-[#facc15]'
                    }`}
                  >
                    <span>{track.label}</span>
                    <span className="font-mono text-[11px] opacity-80 tabular-nums">
                      ({trackCounts[track.id]})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Anchor Role — Gandhi Fellowship (Asymmetrical Editorial Split) */}
        {featuredRole && (
          <article className="overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1c1c21] dark:shadow-[6px_6px_0px_#000000]">
            <div className={`h-1.5 w-full ${featuredRole.accentClass}`} aria-hidden="true" />

            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              {/* Left 8 Columns: Structured Role Narrative & 2x2 Outcome Grid */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8">
                <div className="space-y-5">
                  {/* Clean Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-on-surface-variant">
                    <span className="font-bold text-on-surface">{featuredRole.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-secondary">{featuredRole.trackLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{featuredRole.period}</span>
                    {featuredRole.current && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-bold uppercase tracking-wider text-secondary">
                          Current Role
                        </span>
                      </>
                    )}
                  </div>

                  {/* Role Title & Organization */}
                  <div className="space-y-1.5">
                    <h3
                      className="font-headline text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl"
                      style={{ textWrap: 'balance' }}
                    >
                      {featuredRole.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-on-surface-variant">
                      <span className="font-semibold text-on-surface">{featuredRole.org}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} className="shrink-0 text-secondary" aria-hidden="true" />
                        <span>{featuredRole.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="max-w-3xl font-body text-sm leading-relaxed text-on-surface-variant sm:text-[15px]">
                    {featuredRole.summary}
                  </p>

                  {/* 2x2 Structured Impact Highlights */}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-primary/15 pt-5 dark:border-[#3f3f46] sm:grid-cols-2">
                    {featuredRole.highlights.map((item) => (
                      <div key={item.lead} className="space-y-1">
                        <h4 className="font-headline text-sm font-bold text-on-surface">
                          {item.lead}
                        </h4>
                        <p className="font-body text-xs leading-relaxed text-on-surface-variant sm:text-[13px]">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unboxed Skills Metadata Footer */}
                <div className="mt-6 border-t border-primary/15 pt-4 font-mono text-xs text-on-surface-variant dark:border-[#3f3f46]">
                  <span className="mr-2 font-semibold uppercase tracking-wider text-on-surface">
                    Focus:
                  </span>
                  {featuredRole.skills.join(' · ')}
                </div>
              </div>

              {/* Right 4 Columns: High-Contrast Verified Field Proof Panel */}
              <div className="flex flex-col justify-between border-t-2 border-primary bg-primary p-6 text-on-primary dark:border-[#3f3f46] dark:bg-[#0e0e11] dark:text-[#f4f4f5] sm:p-7 lg:col-span-4 lg:border-l-2 lg:border-t-0">
                <div className="space-y-5">
                  <div className="space-y-1 border-b border-white/15 pb-3">
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-primary-container dark:text-[#facc15]">
                      Verified Field Footprint
                    </span>
                    <p className="font-body text-xs text-white/75">
                      Muzaffarpur &amp; Araria · 16 Administrative Blocks
                    </p>
                  </div>

                  {featuredRole.metrics && (
                    <div className="grid grid-cols-2 gap-3">
                      {featuredRole.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="border border-white/15 bg-white/[0.04] p-3.5"
                        >
                          <div className="font-headline text-2xl font-extrabold tracking-tight text-primary-container tabular-nums dark:text-[#facc15]">
                            {metric.value}
                          </div>
                          <div className="mt-1 font-mono text-[11px] leading-snug text-white/80">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="font-body text-xs leading-relaxed text-white/75">
                    Inspect the full fellowship record — WHO building block alignment, ODK validation logs, and the 13,627 KM field travel ledger.
                  </p>
                </div>

                <div className="mt-6 space-y-2.5 pt-2">
                  <Link
                    href="/health"
                    className="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border-2 border-primary-container bg-primary-container px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container transition-all hover:-translate-y-0.5 hover:bg-white hover:text-black dark:border-[#facc15] dark:bg-[#facc15] dark:text-[#121214] dark:hover:bg-white dark:hover:text-black"
                  >
                    <span>Open Health Field Ledger</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border border-white/25 px-4 py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-primary-container hover:text-primary-container dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
                  >
                    <span>View Health Tech Builds</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Balanced 3-Column Row for Engineering & Open-Hardware Roles */}
        {gridRoles.length > 0 && (
          <div className="space-y-4">
            {featuredRole && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Production Engineering &amp; Hardware Track
                </h3>
                <span className="font-mono text-xs text-on-surface-variant">
                  Commerce · Full-Stack APIs · Sustainable Fabrication
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {gridRoles.map((xp) => (
                <article
                  key={xp.id}
                  className="flex flex-col overflow-hidden border-[3px] border-primary bg-surface-container-lowest shadow-[5px_5px_0px_#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 dark:border-[#3f3f46] dark:bg-[#1c1c21] dark:shadow-[5px_5px_0px_#000000]"
                >
                  <div className={`h-1.5 w-full ${xp.accentClass}`} aria-hidden="true" />

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-4">
                      {/* Clean Unboxed Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-on-surface">{xp.index}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{xp.period}</span>
                        </div>
                        {xp.current && (
                          <span className="font-bold uppercase tracking-wider text-secondary">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Title & Org */}
                      <div className="space-y-1">
                        <h4 className="font-headline text-xl font-extrabold leading-snug tracking-tight text-on-surface">
                          {xp.role}
                        </h4>
                        <p className="font-body text-xs font-semibold text-on-surface-variant">
                          {xp.org} · {xp.location}
                        </p>
                      </div>

                      <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                        {xp.summary}
                      </p>

                      {/* Structured Highlights */}
                      <ul className="space-y-3 border-t border-primary/15 pt-4 dark:border-[#3f3f46]">
                        {xp.highlights.map((item) => (
                          <li key={item.lead} className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary dark:bg-[#facc15]"
                              aria-hidden="true"
                            />
                            <p className="font-body text-xs leading-relaxed text-on-surface-variant sm:text-[13px]">
                              <strong className="font-semibold text-on-surface">
                                {item.lead}:
                              </strong>{' '}
                              {item.detail}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer: Quiet Unboxed Skills + Action Links */}
                    <div className="mt-6 space-y-3 border-t border-primary/15 pt-4 dark:border-[#3f3f46]">
                      <p className="font-mono text-[11px] leading-relaxed text-on-surface-variant">
                        {xp.skills.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        {xp.links.map((link) =>
                          link.external ? (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 whitespace-nowrap font-headline text-xs font-bold uppercase tracking-wider text-on-surface underline decoration-primary/40 underline-offset-4 transition-colors hover:text-secondary hover:decoration-secondary dark:decoration-white/30 dark:hover:text-[#facc15] dark:hover:decoration-[#facc15]"
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight size={13} aria-hidden="true" />
                            </a>
                          ) : (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="inline-flex items-center gap-1 whitespace-nowrap font-headline text-xs font-bold uppercase tracking-wider text-on-surface underline decoration-primary/40 underline-offset-4 transition-colors hover:text-secondary hover:decoration-secondary dark:decoration-white/30 dark:hover:text-[#facc15] dark:hover:decoration-[#facc15]"
                            >
                              <span>{link.label}</span>
                              <ArrowRight size={13} aria-hidden="true" />
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
