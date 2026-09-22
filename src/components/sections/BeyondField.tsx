'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const SPOTLIGHT = {
  icon: Palette,
  title: 'Sangam — cultural group, founded & led',
  body: 'Founded and managed <strong>Sangam</strong>, the university cultural group — building teams, programming events, running them end-to-end, and supporting peer integration for incoming students.',
  tags: ['Leadership', 'Event Ops', 'Teamwork'],
};

export function BeyondField() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="beyond" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col" ref={ref}>
        <SectionHeading
          eyebrow="/* 08 · BEYOND THE FIELD */"
          className="mb-6"
          title={
            <>
              Off the field, <span className="text-gradient">still building</span>
            </>
          }
          sub="The fellowship is the centre of the week — not all of it."
        />
        <motion.div
          className="group relative mx-auto flex w-full max-w-[760px] flex-col gap-5 overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2/60 p-6 transition-colors duration-300 hover:border-primary/50 sm:flex-row sm:items-center sm:gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <SPOTLIGHT.icon size={26} />
          </span>
          <div>
            <h3 className="text-[18px] font-semibold leading-snug text-ink">{SPOTLIGHT.title}</h3>
            <p
              className="mt-2 text-[14px] leading-[1.75] text-ink-2"
              dangerouslySetInnerHTML={{ __html: SPOTLIGHT.body }}
            />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {SPOTLIGHT.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--line-2)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
        </motion.div>
      </div>
    </section>
  );
}