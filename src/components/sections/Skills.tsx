'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Eraser, Hammer, Rocket, Radar } from 'lucide-react';
import { pipelineStages, radar } from '@/lib/data/skills';
import { SectionHeading } from './SectionHeading';
import { RadarChart } from './RadarChart';

const STAGE_ICONS = [Database, Eraser, Hammer, Rocket];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="/* 05 · SKILLS */"
            className="mb-4"
            title={
              <>
                A stack that spans the <span className="text-gradient">whole pipeline</span>
              </>
            }
            sub="From an ODK form in a village to an Nginx server in production."
          />
        </div>

        <div ref={ref} className="grid min-h-0 flex-1 gap-4 lg:grid-cols-5">
          {pipelineStages.map((s, i) => {
            const Icon = STAGE_ICONS[i] ?? Database;
            return (
              <motion.div
                key={s.index}
                className="group relative flex flex-col rounded-2xl border border-[var(--line)] bg-bg-2/60 p-5 transition-colors duration-300 hover:border-primary/50"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold tracking-widest text-primary">{s.index}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon size={17} />
                  </span>
                </div>
                <h4 className="mt-4 font-mono text-[13px] font-semibold uppercase tracking-[0.18em] text-ink">{s.name}</h4>
                <p className="mt-2 text-[12.5px] leading-[1.65] text-ink-2">{s.line}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.pills.map((p) => (
                    <span key={p} className="skill-pill">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
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

          <motion.div
            className="relative flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] bg-bg-2/60 p-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              <Radar size={12} className="text-primary" />
              Self-assessment radar
            </span>
            <RadarChart labels={radar.labels} data={radar.data} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}