'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { SectionHeading } from './SectionHeading';
import { FieldMap } from './FieldMap';
import { CountUp } from './CountUp';
import { useFieldTour } from '@/components/ui/FieldTour';

export function FieldSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { open } = useFieldTour();

  return (
    <section id="field" className="relative flex h-full w-full items-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div ref={ref}>
          <SectionHeading
            eyebrow="/* THE FIELD */"
            className="mb-6"
            title={
              <>
                The data starts on a <span className="text-gradient">dusty road</span>
              </>
            }
          />

          <motion.blockquote
            className="relative border-l-2 border-primary pl-5 font-serif text-[clamp(17px,1.5vw,22px)] italic leading-relaxed text-ink-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.fieldQuote}
            <footer className="mt-3 font-mono text-[11px] uppercase not-italic tracking-[0.2em] text-ink-3">{profile.fieldAuthor}</footer>
          </motion.blockquote>

          <motion.div
            className="mt-7 grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {profile.mapStats.map((s) => (
              <div key={s.id} className="rounded-xl border border-[var(--line)] bg-bg-2/70 p-3.5">
                <div className="font-serif text-[clamp(24px,2.5vw,36px)] text-ink">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <button onClick={open} className="btn-primary inline-flex items-center gap-2">
              <MapPin size={15} />
              Watch a day in the field
            </button>
          </motion.div>
        </div>

        {/* Map capped at 50vh so it never overflows */}
        <div className="hidden max-h-[50vh] overflow-hidden rounded-2xl lg:block">
          <FieldMap />
        </div>
      </div>
    </section>
  );
}
