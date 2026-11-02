'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Languages, Zap, Building2, Home, LocateFixed } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const FACTS_ICONS = {
  Education: GraduationCap,
  'Current role': Briefcase,
  Organization: Building2,
  Base: LocateFixed,
  Hometown: Home,
  Focus: Zap,
  Languages: Languages,
} as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="border-b-4 border-primary dark:border-white">
      <Section className="py-12">
        <div className="mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
            03 · ABOUT
          </span>
          <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
            Full stack AI and data engineer
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div ref={ref}>
            <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant dark:text-ink-dark/80">
              {profile.aboutParagraphs.slice(0, 2).map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>
            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {profile.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </motion.div>
          </div>
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card padding="p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
                  Identity card
                </span>
                <MapPin size={14} className="text-primary dark:text-white" />
              </div>
              <div className="divide-y divide-outline-variant dark:divide-surface-l2">
                {profile.quickFacts.map((f) => {
                  const Icon = FACTS_ICONS[f.k as keyof typeof FACTS_ICONS];
                  return (
                    <div key={f.k} className="flex items-center gap-3 py-2.5">
                      {Icon ? <Icon size={14} className="shrink-0 text-on-surface-variant dark:text-ink-dark/60" /> : <span className="h-[14px] w-[14px] shrink-0" />}
                      <span className="w-28 shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60">{f.k}</span>
                      <span className="text-sm font-medium text-on-surface dark:text-ink-dark">{f.v}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.aside>
        </div>
      </Section>
    </section>
  );
}
