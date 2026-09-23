'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  className?: string;
  /** Render without reveal animations — for headings that flicker in snap sections. */
  static?: boolean;
}

export function SectionHeading({ eyebrow, title, sub, className, static: isStatic = false }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  if (isStatic) {
    return (
      <div className={cn('relative mb-4 shrink-0', className)}>
        <span className="eyebrow">{eyebrow}</span>
        <h2
          className="mt-2 leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', maxWidth: '24ch' }}
        >
          {title}
        </h2>
        {sub && <p className="section-sub mt-1.5">{sub}</p>}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('relative mb-4 shrink-0', className)}>
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {eyebrow}
      </motion.span>
      <h2
        className={cn('draw-title mt-2 leading-[1.05] tracking-tight', inView && 'in')}
        style={{ fontSize: 'clamp(24px, 3vw, 40px)', maxWidth: '24ch' }}
      >
        {title}
      </h2>
      {sub && (
        <motion.p
          className="section-sub mt-1.5"
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
