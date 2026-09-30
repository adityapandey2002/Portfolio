'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { glide, normalizeWheel, WHEEL_NOISE } from '@/lib/glideEngine';

/* A panel with only a few px of "overflow" has rounding, not a scroll range.
   Full-bleed sections land a handful of px taller than their band as fonts
   and canvases settle — measured at 5px on the home hero at 1600x700 — and
   counting that as scrollable let the box swallow a whole notch to move 5px
   before handing the gesture over. */
const PANEL_NOISE = 12;

/* Input layer for the glide engine — it owns the gesture, this file decides
   whether the gesture belongs to the page at all.
 *
   Home and /health move in screen-sized steps driven by explicit intent: a
   wheel notch, a key press, or a continuous trackpad stream applied 1:1. The
   engine owns the transport (see src/lib/glideEngine.ts), so there are no
   cooldowns, no full-viewport accumulator and no `behavior: 'smooth'` to
   cancel mid-flight. Stop positions are cached there and never measured in a
   handler.
 *
   Inner scrollable boxes keep their native scroll and hand the gesture over
   at their edge. At a page end the gesture is returned untouched so native
   chaining still works, and the engine adopts anything it did not write
   itself (scrollbar drag, find-in-page, an anchor jump). */
export function ScrollChaining() {
  const pathname = usePathname();

  /* Home and health set their type one step larger than the shared section
     components render at everywhere else, so the stylesheet can find the page
     from a single attribute instead of every section carrying a modifier class. */
  useEffect(() => {
    if (pathname === '/') document.documentElement.dataset.page = 'home';
    else if (pathname.startsWith('/health')) document.documentElement.dataset.page = 'health';
    else delete document.documentElement.dataset.page;
  }, [pathname]);

  useEffect(() => {
    // Touch devices keep native scroll entirely.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    glide.rescan();

    const scrollableAncestor = (start: Element | null) => {
      let el = start as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        // Only real wheel-scroll containers count: overflow:visible
        // children (flex items with min-h-0, grids) report overflow but
        // Chrome skips them and scrolls the document instead.
        if (el.scrollHeight - el.clientHeight > PANEL_NOISE) {
          const oy = getComputedStyle(el).overflowY;
          if (oy === 'auto' || oy === 'scroll') return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const atEdge = (box: HTMLElement, down: boolean) =>
      down ? box.scrollTop + box.clientHeight >= box.scrollHeight - 1 : box.scrollTop <= 1;

    const interactive = (el: Element | null) =>
      !!el &&
      el.closest('input, textarea, select, button, a, [contenteditable="true"], [role="dialog"]') !==
        null;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      const under = e.target instanceof Element ? e.target : null;
      if (under?.closest('[role="dialog"]')) return;
      if (!glide.active()) return;

      // An inner box that can still move takes the gesture first.
      const box = scrollableAncestor(under);
      if (box && !atEdge(box, e.deltaY > 0)) return;

      // At a page end in this direction, hand the gesture back untouched.
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ((e.deltaY < 0 && y <= 1) || (e.deltaY > 0 && y >= max - 1)) return;

      const d = normalizeWheel(e);
      if (Math.abs(d) < WHEEL_NOISE) return;

      e.preventDefault();
      glide.feed(d);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (interactive(document.activeElement)) return;
      if (!glide.active()) return;

      let dir: 1 | -1 | null = null;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
      if (dir === null) return;

      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('[role="dialog"]')) return;
      const box = scrollableAncestor(target);
      if (box && !atEdge(box, dir === 1)) return;

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ((dir === -1 && y <= 1) || (dir === 1 && y >= max - 1)) return;

      e.preventDefault();
      glide.step(dir);
    };

    // Anything the engine did not write itself is adopted, never fought.
    const onScroll = () => glide.adopt(window.scrollY);
    const release = () => glide.release();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', release);
    window.addEventListener('pointercancel', release);
    return () => {
      glide.cancel();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', release);
      window.removeEventListener('pointercancel', release);
    };
  }, [pathname]);

  return null;
}
