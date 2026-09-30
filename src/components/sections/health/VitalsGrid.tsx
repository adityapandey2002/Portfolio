'use client';

import { motion } from 'framer-motion';
import { CountUp } from '../CountUp';
import { HeartPulse } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { VITALS } from './constants';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function VitalsGrid() {
  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-col gap-4 px-5 lg:px-10">
      <SectionHeading
        eyebrow="/* VITALS */"
        title={
          <>
            What the field <span className="text-gradient">reads back</span>
          </>
        }
        sub="Capacity built, data cleaned, systems moving. These are the vitals I track week to week."
      />
      <div
        className="grid min-h-0 flex-1 grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 xl:grid-cols-4"
      >
        {VITALS.map((v, i) => (
          <motion.div
            key={v.label}
            className="group relative flex min-h-0 flex-col justify-between gap-4 overflow-hidden p-4 lg:p-5"
            style={{ background: 'var(--bg-2)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">{v.label}</span>
              <HeartPulse size={14} className="text-primary" />
            </div>
            <div>
              <div className="font-serif text-[clamp(32px,2.7vw,44px)] leading-none tracking-tight text-ink">
                <CountUp target={v.value} suffix={v.suffix} />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-3)]">
                <motion.div
                  className="relative h-full overflow-hidden rounded-full"
                  style={{
                    background:
                      'repeating-linear-gradient(90deg, var(--primary) 0 10px, var(--bg-2) 10px 12px)',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${v.pct}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.3, delay: 0.2 + i * 0.1, ease: EASE }}
                />
              </div>
              <div className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{v.foot}</div>
            </div>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}