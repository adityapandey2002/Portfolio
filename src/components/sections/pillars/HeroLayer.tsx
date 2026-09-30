'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroLayer({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const item = layer.items[0];
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[720px]"
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="pillar-border-anim group relative overflow-hidden rounded-2xl bg-bg-2 p-8 text-center transition-shadow duration-500 hover:shadow-[0_0_60px_-15px_var(--primary-glow)]">
        <div className="pillar-sheen absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <motion.span
              className="pillar-ripple absolute inset-0 rounded-2xl"
              animate={inView ? { scale: [1, 1.7], opacity: [0.55, 0] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
              animate={inView ? { rotate: [0, -6, 6, 0] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={28} className="text-primary" style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow))' }} />
            </motion.div>
            <span className="pillar-orb pointer-events-none absolute -right-2 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="pillar-orb pointer-events-none absolute -bottom-1 -left-2 h-2 w-2 rounded-full bg-cyan" />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">{layer.eyebrow}</p>
          <h3
            className={cn('draw-title font-serif text-[clamp(24px,3.2vw,40px)] font-semibold leading-[1.05] tracking-tight', inView && 'in')}
          >
            {item.label}
          </h3>
          <p className="max-w-[540px] text-[13px] leading-relaxed text-ink-2">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}