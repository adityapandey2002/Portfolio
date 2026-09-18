'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects, projectFilters } from '@/lib/data/projects';
import { SectionHeading } from '../sections/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { LiveTicker } from './LiveTicker';
import { useLiveStatus } from '@/hooks/useLiveStatus';

export function ProjectGrid({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]['id']>('all');
  const liveStatus = useLiveStatus();

  const shown = featured
    ? projects.slice(0, 3)
    : filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  // ─── FEATURED (homepage snap-section) — one row of three ─────────────
  if (featured) {
    return (
      <section id="work" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
        <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="/* 10 · SELECTED WORK */"
              className="mb-4"
              title={
                <>
                  Built, deployed, <span className="text-gradient">shipped</span>
                </>
              }
              sub="A few things I built end-to-end — from field forms to live production apps."
            />
            <div className="mb-4 flex items-center gap-2">
              <Link href="/work" className="btn-ghost inline-flex items-center gap-2">
                View all <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <motion.div layout className="section-inner-scroll grid min-h-0 flex-1 content-start grid-cols-1 gap-6 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} liveInfo={liveStatus[p.id] ?? null} compact />
              ))}
            </AnimatePresence>
          </motion.div>

          <LiveTicker status={liveStatus} />
        </div>
      </section>
    );
  }

  // ─── FULL WORK PAGE — original vertical grid ──────────────────────────
  return (
    <section id="work" className="relative py-16">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                filter === f.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[var(--line)] bg-bg-2/50 text-ink-3 hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vertical grid — original layout */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
