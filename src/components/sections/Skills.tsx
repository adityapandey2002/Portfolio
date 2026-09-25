'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Code2, Bot, Users } from 'lucide-react';
import { skillThemes } from '@/lib/data/skills';
import { SectionHeading } from './SectionHeading';

const STAGE_ICONS = [Database, Code2, Bot, Users];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="/* 05 · CAPABILITIES */"
            className="mb-4"
            title={
              <>
                Four lanes, <span className="text-gradient">one pipeline</span>
              </>
            }
            sub="Data science, web development, automation and community — the skills that move a project from field to production."
          />
        </div>

        <div ref={ref} className="grid min-h-0 flex-1 gap-3 lg:grid-cols-4">
          {skillThemes.map((s, i) => {
            const Icon = STAGE_ICONS[i] ?? Database;
            return (
              <motion.div
                key={s.index}
                className="group relative flex flex-col rounded-2xl border border-[var(--line)] bg-bg-2/60 p-4 transition-colors duration-300 hover:border-primary/50"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] font-semibold tracking-widest text-primary">{s.index}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon size={15} />
                  </span>
                </div>
                <h4 className="mt-3 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">{s.name}</h4>
                <p className="mt-1.5 text-[11.5px] leading-[1.6] text-ink-2">{s.line}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.pills.map((p) => (
                    <span key={p} className="skill-pill">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-3">{s.barLabel}</span>
                    <span className="font-mono text-[11px] text-primary">{s.barPct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-bg-3">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent skill-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.barPct}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}