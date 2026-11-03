'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const SPOTLIGHT = {
  icon: Palette,
  title: 'Sangam — cultural group, founded & led',
  body: 'Founded and managed Sangam, the university cultural group — building teams, programming events, running them end-to-end, and supporting peer integration for incoming students.',
  tags: ['Leadership', 'Event Ops', 'Teamwork'],
};

export function BeyondField() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="beyond" className="border-b-4 border-primary dark:border-white">
      <Section className="py-8">
        <div className="mb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
            08 · BEYOND THE FIELD
          </span>
          <h2 className="mt-2 font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
            Off the field, still building
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant dark:text-ink-dark/70">
            The fellowship is the centre of the week — not all of it.
          </p>
        </div>
        <motion.div
          ref={ref}
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card padding="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center border-2 border-primary bg-primary-container text-primary dark:border-white dark:bg-primary-yellow dark:text-on-primary">
                <SPOTLIGHT.icon size={22} />
              </span>
              <div>
                <h3 className="font-headline text-lg font-bold text-on-surface dark:text-ink-dark">{SPOTLIGHT.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant dark:text-ink-dark/80">
                  {SPOTLIGHT.body}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {SPOTLIGHT.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </section>
  );
}
