'use client';

import { useRef, type ReactNode } from 'react';

export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'translate(0,0)';
      setTimeout(() => {
        if (el) el.style.transform = '';
      }, 350);
    }
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', willChange: 'transform', display: 'inline-block' }}>
      {children}
    </div>
  );
}
