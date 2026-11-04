'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Code2, Bot, Users } from 'lucide-react';
import { skillThemes } from '@/lib/data/skills';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const STAGE_ICONS = [Database, Code2, Bot, Users];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="border-b-4 border-primary dark:border-white">
      <Section className="py-8">
        <div className="mb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
            05 · SKILLS
          </span>
          <h2 className="mt-2 font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
            Four lanes, one pipeline
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">
            Data science, web development, automation and community — the skills that move a project from field to production.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {skillThemes.map((s, i) => {
            const Icon = STAGE_ICONS[i] ?? Database;
            return (
              <motion.div
                key={s.index}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card padding="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-xs font-bold tracking-widest text-primary dark:text-white">{s.index}</span>
                    <span className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center border-2 border-primary bg-primary-container text-primary dark:border-white dark:bg-primary-yellow dark:text-on-primary">
                      <Icon size={14} />
                    </span>
                  </div>
                  <h4 className="mt-2 font-headline text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface dark:text-ink-dark">{s.name}</h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-on-surface-variant dark:text-ink-dark/70">{s.line}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.pills.slice(0, 6).map((p) => (
                      <Chip key={p} className="text-[8px]">{p}</Chip>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant dark:text-ink-dark/60">{s.barLabel}</span>
                      <span className="font-mono text-[10px] font-bold text-primary dark:text-white">{s.barPct}%</span>
                    </div>
                    <div className="h-1.5 border-2 border-primary bg-surface dark:border-white bg-dark-surface-l1">
                      <motion.div
                        className="h-full bg-primary dark:bg-white"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.barPct}%` } : {}}
                        transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </section>
  );
}

