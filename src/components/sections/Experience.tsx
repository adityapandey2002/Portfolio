'use client';

import { ExternalLink, HeartPulse, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { experience } from '@/lib/data/experience';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

export function Experience() {
  return (
    <section id="experience" className="border-b-4 border-primary dark:border-white">
      <Section className="py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
              04 · EXPERIENCE
            </span>
            <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
              What I&apos;ve actually been up to
            </h2>
          </div>
          <Link
            href="/health"
            className="inline-flex items-center gap-2 border-2 border-primary bg-surface px-4 py-2 font-headline text-xs font-bold uppercase tracking-wider text-primary shadow-[4px_4px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] dark:border-white dark:bg-surface-l1 dark:text-white dark:shadow-[4px_4px_0_#ffffff] dark:hover:shadow-[2px_2px_0_#ffffff]"
          >
            <HeartPulse size={15} />
            Live field dashboard
            <ArrowDownRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {experience.map((xp) => (
            <Card key={xp.role} padding="p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-headline text-lg font-bold text-on-surface dark:text-ink-dark">{xp.role}</h3>
                {xp.current && (
                  <span className="border-2 border-primary bg-primary-container px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-primary-container dark:border-white dark:bg-primary-yellow dark:text-on-primary">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-on-surface-variant dark:text-ink-dark/70">
                <span className="font-medium text-primary dark:text-white">
                  {xp.orgUrl ? (
                    <a href={xp.orgUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {xp.org} <ExternalLink size={13} />
                    </a>
                  ) : (
                    xp.org
                  )}
                </span>
                <span className="text-outline dark:text-ink-dark/40">·</span>
                <span className="font-mono text-xs">{xp.period}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-on-surface-variant dark:text-ink-dark/80">
                {xp.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary dark:bg-vermilion" />
                    <span dangerouslySetInnerHTML={{ __html: b }} />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {xp.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </section>
  );
}
