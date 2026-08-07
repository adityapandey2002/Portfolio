'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BarChart2, Cpu, Radar } from 'lucide-react';
import { skillBars, techCats, radar } from '@/lib/data/skills';
import { SectionHeading } from './SectionHeading';
import { RadarChart } from './RadarChart';
import { useScrollEscape } from '@/hooks/useScrollEscape';

type Tab = 'bars' | 'stack' | 'radar';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'bars',  label: 'Proficiency',  icon: <BarChart2 size={14} /> },
  { id: 'stack', label: 'Tech Stack',   icon: <Cpu size={14} /> },
  { id: 'radar', label: 'Radar',        icon: <Radar size={14} /> },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [tab, setTab] = useState<Tab>('bars');
  useScrollEscape(ref);

  return (
    <section id="skills" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="/* 07 · SKILLS */"
            className="mb-4"
            title={
              <>
                A stack that spans the <span className="text-gradient">whole pipeline</span>
              </>
            }
            sub="From an ODK form in a village to an Nginx server in production."
          />

          {/* Tab switcher */}
          <div className="mb-4 flex items-center gap-1 rounded-lg border border-[var(--line)] bg-bg-2/60 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex items-center gap-1.5 rounded-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200"
                style={{
                  color: tab === t.id ? 'var(--bg)' : 'var(--ink-3)',
                }}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-md"
                    style={{ background: 'var(--primary)' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {t.icon}
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content — fixed height so it never overflows */}
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2/40"
          style={{ height: 'clamp(260px, 44vh, 460px)' }}
        >
          <AnimatePresence mode="wait">
            {tab === 'bars' && (
              <motion.div
                key="bars"
                className="section-inner-scroll h-full p-6"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="space-y-4">
                  {skillBars.map((s, i) => (
                    <div key={s.name} className="group">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[13px] font-medium text-ink-2">{s.name}</span>
                        <span className="font-mono text-[11px] text-primary">{s.pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-bg-3">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent skill-fill"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${s.pct}%` } : {}}
                          transition={{ duration: 1.1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'stack' && (
              <motion.div
                key="stack"
                className="section-inner-scroll h-full p-6"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {techCats.map((cat, i) => (
                    <motion.div
                      key={cat.title}
                      className="rounded-xl border border-[var(--line)] bg-bg-2/60 p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                    >
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">{cat.title}</h4>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cat.pills.map((p) => (
                          <span key={p} className="skill-pill">
                            {p}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'radar' && (
              <motion.div
                key="radar"
                className="flex h-full flex-col items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Self-assessment radar</span>
                <RadarChart labels={radar.labels} data={radar.data} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
