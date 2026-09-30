'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { glide } from '@/lib/glideEngine';

/**
 * Pinned deck: the active block is a function of scroll position.
 * The deck used to own wheel and keys in the capture phase and pace one block
 * per gesture while the document stayed frozen — six screens of no visible
 * motion and then a hard jump. Geometry is now the single source of truth: the
 * glide engine publishes one stop per card across the sticky travel, so
 * scrolling and clicking a rail row run the same code path and cannot
 * disagree, and touch, scrollbar drags and find-in-page advance the deck too.
 */
export function useStageStepper(count: number, ref: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);
  const geo = useRef<{ start: number; travel: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const sticky = ref.current;
      const pin = sticky?.closest<HTMLElement>('[data-chapter-pin]');
      if (!sticky || !pin) return;
      const nav =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
      const travel = Math.max(1, pin.offsetHeight - sticky.offsetHeight);
      geo.current = {
        start: pin.getBoundingClientRect().top + window.scrollY - (nav - 6),
        travel,
      };
    };
    measure();

    let raf = 0;
    const update = () => {
      raf = 0;
      const g = geo.current;
      if (!g) return;
      const p = (window.scrollY - g.start) / g.travel;
      const idx = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro && ref.current) ro.observe(ref.current);
    if (ro && ref.current?.firstElementChild) ro.observe(ref.current.firstElementChild);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [count, ref]);

  const goTo = (i: number) => {
    const g = geo.current;
    if (!g) return;
    glide.goTo(g.start + (i * g.travel) / Math.max(1, count - 1));
  };

  return [active, goTo] as const;
}