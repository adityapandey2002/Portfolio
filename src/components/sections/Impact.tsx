'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { SectionHeading } from './SectionHeading';
import { CountUp } from './CountUp';

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="impact" className="relative flex h-full w-full flex-col justify-center px-5 lg:px-10">
      <div className="mx-auto w-full max-w-[1500px]">
        <SectionHeading
          eyebrow="/* FIELD IMPACT */"
          className="mb-8"
          title={
            <>
              Numbers from the <span className="text-gradient">field</span>, not a dashboard
            </>
          }
          sub="The fellowship puts real people behind every number. These are the ones I can count."
        />

        <div ref={ref} className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 xl:grid-cols-4">
          {profile.impact.map((item, i) => (
            <motion.div
              key={item.label}
              className="group relative flex flex-col justify-between gap-4 bg-bg-2/95 p-5"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-ink-3">{item.label}</span>
                {item.up && <TrendingUp size={13} className="text-primary" />}
              </div>
              <div>
                <div className="font-serif text-[clamp(34px,3vw,52px)] leading-none tracking-tight text-ink">
                  <CountUp target={item.value} suffix={item.suffix} className="text-gradient" />
                </div>
                <div className="mt-1.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-3">{item.foot}</div>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
