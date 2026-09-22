'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { easeOutCubic } from '@/lib/utils';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ target, suffix = '', duration = 1500, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const [value, setValue] = useState(target);
  const [sprung, setSprung] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    setValue(0);
    setLive(true);
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.floor(easeOutCubic(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setValue(target);
        setSprung(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  // Safety net: if the observer never fires, snap to the final value so the
  // number is never stuck hidden at 0.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!live) {
        setValue(target);
        setSprung(true);
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [live, target]);

  return (
    <span
      ref={ref}
      className={className}
      style={sprung ? { animation: 'overshoot 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards' } : undefined}
    >
      {value}
      {suffix && <span className="ml-1 text-2xl font-medium text-ink-3">{suffix}</span>}
    </span>
  );
}
