'use client';

import { useRef, useState, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg) translateY(-4px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--hue', `${Math.round(px * 360)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={coarse ? undefined : onMove}
      onMouseLeave={coarse ? undefined : onLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease, border-color 0.2s, box-shadow 0.3s' }}
    >
      {children}
    </div>
  );
}
