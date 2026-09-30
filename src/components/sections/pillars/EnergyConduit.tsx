'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function EnergyConduit({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={cn('relative flex justify-center py-1', className)}>
      <div className="relative h-14 w-px translate-y-2.5 overflow-visible">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{
            background:
              'linear-gradient(to bottom, transparent, var(--primary) 30%, var(--cyan) 70%, transparent)',
            filter: 'drop-shadow(0 0 4px var(--primary-glow))',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: i % 2 ? 'var(--cyan)' : 'var(--primary)',
              boxShadow: i % 2 ? '0 0 8px var(--accent-glow)' : '0 0 8px var(--primary-glow)',
            }}
            initial={{ top: '0%', opacity: 0 }}
            animate={inView ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.8, delay: i * 0.55, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>
    </div>
  );
}