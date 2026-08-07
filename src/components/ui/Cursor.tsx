'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], .proj, .tilt';

/**
 * Custom cursor: dot + lerped ring. No SVG filters or per-frame
 * layer repaints, so it stays cheap on all GPUs.
 * Disabled on touch devices via CSS (see globals.css).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hover = false;
    let grab = false;
    let hidden = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || !el.closest) return;
      const t = el.closest(INTERACTIVE);
      hover = Boolean(t);
      grab = Boolean(el.closest('[data-grab]'));
    };

    const onLeaveDoc = () => {
      hidden = true;
    };
    const onEnterDoc = () => {
      hidden = false;
    };

    const tick = () => {
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${hidden ? 0 : 1})`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      ring.classList.toggle('hover', hover);
      ring.classList.toggle('grab', grab && !hover);
      ring.style.opacity = hidden ? '0' : '0.6';
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeaveDoc);
    document.addEventListener('mouseenter', onEnterDoc);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('mouseenter', onEnterDoc);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
