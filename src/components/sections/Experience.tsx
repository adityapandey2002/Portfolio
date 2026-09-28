'use client';

import { ExternalLink, HeartPulse, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { experience } from '@/lib/data/experience';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  return (
    <section id="experience" className="relative flex w-full flex-col px-5 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col">
        {/* Fixed header area */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="/* 04 · EXPERIENCE */"
            className="mb-4"
            static
            titleSize="clamp(24px, 3vw, 40px)"
            title={
              <>
                What I&apos;ve <span className="text-gradient">actually</span> been up to
              </>
            }
          />
          <Link
            href="/health"
            className="group mb-4 inline-flex items-center gap-2.5 rounded-lg border border-[var(--line)] bg-bg-2 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_12px_30px_-12px_var(--primary-glow)]"
          >
            <HeartPulse size={15} className="text-primary" />
            Live field dashboard
            <ArrowDownRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
        </div>

        {/* Timeline — the panel is content-sized and the document scrolls
            through it, so nothing inside is a scroll box. */}
        <div className="relative ml-2 mt-6 border-l border-[var(--line)] pl-5 lg:pl-8">
          {experience.map((xp) => (
            <article key={xp.role} className="relative mb-9 last:mb-4">
              <span
                className={`absolute -left-[calc(1.5rem+7px)] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-bg ${
                  xp.current ? 'border-primary' : 'border-[var(--line)]'
                }`}
              >
                {xp.current && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-[18px] font-semibold text-ink">{xp.role}</h3>
                {xp.current && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-primary">
                    Current
                  </span>
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink-3">
                <span className="font-medium text-primary/90">
                  {xp.orgUrl ? (
                    <a href={xp.orgUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {xp.org} <ExternalLink size={13} />
                    </a>
                  ) : (
                    xp.org
                  )}
                </span>
                <span className="text-ink-4">·</span>
                <span className="font-mono">{xp.period}</span>
              </div>

              <ul className="mt-2 list-disc space-y-1 pl-4 text-[14px] leading-relaxed text-ink-2 marker:text-primary/60">
                {xp.bullets.map((b, bi) => (
                  <li key={bi} className="xp-bullet" dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {xp.tags.map((t) => (
                  <span key={t} className="rounded bg-bg-3 px-2 py-0.5 font-mono text-[11.5px] text-ink-3">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
