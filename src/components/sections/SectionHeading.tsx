'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, sub, className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={cn('relative mb-5', className)}>
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {eyebrow}
      </motion.span>
      <h2
        className={cn('draw-title mt-2.5 leading-[1.05] tracking-tight', inView && 'in')}
        style={{ fontSize: 'clamp(24px, 3vw, 44px)', maxWidth: '24ch' }}
      >
        {title}
      </h2>
      {sub && (
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
