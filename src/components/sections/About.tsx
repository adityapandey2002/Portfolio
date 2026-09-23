'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Languages, Zap, Building2, Home, LocateFixed } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { SectionHeading } from './SectionHeading';

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
    <section id="about" className="relative flex h-full w-full items-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div ref={ref}>
          <SectionHeading
            eyebrow="/* 03 · ABOUT */"
            className="mb-6"
            title={
              <>
                Full stack AI and <br />
                <span className="text-gradient">data engineer</span>
              </>
            }
            sub={profile.tagline}
          />

          {/* Only first 2 paragraphs — keeps it scannable */}
          <div className="space-y-3 text-[13.5px] leading-[1.75] text-ink-2">
            {profile.aboutParagraphs.slice(0, 2).map((p, i) => (
              <motion.div
                key={i}
                className="about-fade"
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
              <span key={t} className="rounded-full border border-[var(--line)] bg-bg-2/70 px-2.5 py-0.5 font-mono text-[10px] text-ink-2">
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.aside
          className="h-fit rounded-2xl border border-[var(--line)] bg-bg-2/60 p-5"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">Identity card</span>
            <MapPin size={14} className="text-primary" />
          </div>
          <div className="divide-y divide-[var(--line)]">
            {profile.quickFacts.map((f) => {
              const Icon = FACTS_ICONS[f.k as keyof typeof FACTS_ICONS];
              return (
                <div key={f.k} className="flex items-center gap-3 py-2.5">
                  {Icon ? <Icon size={14} className="shrink-0 text-ink-3" /> : <span className="h-[14px] w-[14px] shrink-0" />}
                  <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-3">{f.k}</span>
                  <span className="text-[13px] font-medium text-ink">{f.v}</span>
                </div>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
