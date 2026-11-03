'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects, projectFilters } from '@/lib/data/projects';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

export function ProjectGrid({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]['id']>('all');

  const shown = featured
    ? projects.slice(0, 3)
    : filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  if (featured) {
    return (
      <section id="work" className="border-b-4 border-primary dark:border-white">
        <Section className="py-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
                09 · SELECTED WORK
              </span>
              <h2 className="mt-2 font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
                Built, deployed, shipped
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">
                A few things I built end-to-end — from field forms to live production apps.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border-2 border-primary bg-surface px-3 sm:px-4 py-1.5 sm:py-2 font-headline text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary shadow-[4px_4px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] dark:border-white dark:bg-surface-l1 dark:text-white dark:shadow-[4px_4px_0_#ffffff] dark:hover:shadow-[2px_2px_0_#ffffff]"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div layout className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <Card key={p.id} padding="p-4 sm:p-5">
                  <h3 className="font-headline text-lg font-bold text-on-surface dark:text-ink-dark">{p.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tags?.slice(0, 4).map((t: string) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </Card>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>
      </section>
    );
  }

  return (
    <section id="work" className="border-b-4 border-primary dark:border-white">
      <Section className="py-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`border-2 px-3 sm:px-4 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f.id
                  ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0_#000000] dark:border-white dark:bg-white dark:text-primary dark:shadow-[2px_2px_0_#ffffff]'
                  : 'border-primary bg-surface text-primary shadow-[2px_2px_0_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-surface-l1 dark:text-white dark:shadow-[2px_2px_0_#ffffff]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <Card key={p.id} padding="p-4 sm:p-5">
                <h3 className="font-headline text-lg font-bold text-on-surface dark:text-ink-dark">{p.title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags?.slice(0, 4).map((t: string) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </Card>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </section>
  );
}
