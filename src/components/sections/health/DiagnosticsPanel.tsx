'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownLeft, Activity } from 'lucide-react';
import { DIAGNOSTICS, EASE } from './constants';

export function DiagnosticsPanel() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
      <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
        {DIAGNOSTICS.map((d, i) => (
          <motion.div
            key={d.name}
            className="flex flex-col gap-3 border-b border-[var(--line-2)] p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: i % 2 ? 'var(--bg-2)' : 'var(--bg-3)' }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="flex items-center gap-3">
              <Activity size={15} className="shrink-0 text-primary" />
              <span className="text-[14px] text-ink">{d.name}</span>
            </div>
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-widest ${
                d.tone === 'green' ? 'text-primary' : 'text-accent'
              }`}
              style={{
                border: '1px solid currentColor',
                background: d.tone === 'green' ? 'var(--primary-glow)' : 'var(--accent-glow)',
              }}
            >
              <span className={d.tone === 'green' ? 'h-1.5 w-1.5 rounded-full bg-primary' : 'blip h-1.5 w-1.5 rounded-full bg-accent'} />
              {d.status}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-lg border border-[var(--line)] bg-bg-2 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_12px_30px_-12px_var(--primary-glow)]"
        >
          <ArrowDownLeft size={15} />
          Back to the field
        </Link>
      </div>
    </section>
  );
}