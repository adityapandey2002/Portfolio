'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DualLayer({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {layer.items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            className="pillar-layer group relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--line)] hover:shadow-[0_18px_50px_-20px_var(--primary-glow)]"
            style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
            initial={{ opacity: 0, y: 24, rotateX: 12 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.14, ease: EASE }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-[3px] opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(to bottom, var(--layer-color), transparent)',
                transition: 'opacity 0.3s',
              }}
            />
            <div className="pillar-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative flex items-start gap-4">
              <div className="relative">
                <motion.span
                  className="pillar-ripple absolute inset-0 rounded-lg"
                  animate={inView ? { scale: [1, 1.8], opacity: [0.4, 0] } : {}}
                  transition={{ duration: 2.6, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover:border-[var(--layer-color)]/30 group-hover:bg-[var(--layer-color)]/10"
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                >
                  <Icon size={19} className="text-[var(--layer-color)]" />
                </motion.div>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-ink">{item.label}</h4>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}