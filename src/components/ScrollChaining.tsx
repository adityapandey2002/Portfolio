'use client';

import { useEffect } from 'react';

/* One discrete wheel gesture moves exactly ONE snap-section, so a single
   flick lands on the next panel instead of creeping toward it (the page
   uses proximity snap, which on its own needs two flicks per panel).
   Inner scrollable boxes — a section whose content overflows on short
   screens, palette lists, chat — keep their own scroll and hand the
   gesture back to the page only once they reach their edge. */
export function ScrollChaining() {
  useEffect(() => {
    // Touch devices keep native snap; /health is gated per-event below
    // (data-scroll is set by RouteScrollMode's own effect, after ours).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const GESTURE_END = 240;    // ms of quiet that ends a gesture
    const MOMENTUM_GUARD = 300; // ignore a step this soon after the last one
    const SETTLE = 900;         // ms to consider the smooth scroll done

    let inGesture = false;
    let lastStep = 0;
    let animating = false;
    let gestureTimer = 0;
    let settleTimer = 0;

    const panelList = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));

    const panelTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

    const scrollableAncestor = (start: Element | null) => {
      let el = start as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight - el.clientHeight > 1) return el;
        el = el.parentElement;
      }
      return null;
    };

    const endGesture = () => {
      window.clearTimeout(gestureTimer);
      inGesture = false;
    };

    const settle = () => {
      window.clearTimeout(settleTimer);
      animating = false;
      // Parked exactly on a panel (wheel step, anchor jump, scrollbar):
      // put proximity snap back in charge of gentle settling.
      const html = document.documentElement;
      if (html.style.scrollSnapType === 'none') {
        const y = window.scrollY;
        if (panelList().some((el) => Math.abs(panelTop(el) - y) <= 2)) html.style.scrollSnapType = '';
      }
    };

    const step = (dir: 1 | -1) => {
      const list = panelList();
      if (!list.length) return false;
      const y = window.scrollY;

      let target: number | null = null;
      let toFooter = false;
      if (dir === 1) {
        for (const el of list) {
          const t = panelTop(el);
          if (t > y + 8) { target = t; break; }
        }
        if (target === null) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          if (y >= max - 1) return false;   // footer already shown: release
          target = max;                     // past the last panel: reveal footer
          toFooter = true;
        }
      } else {
        for (let i = list.length - 1; i >= 0; i -= 1) {
          const t = panelTop(list[i]);
          if (t < y - 8) { target = t; break; }
        }
        if (target === null) return false;  // top of page: release to native
      }

      const now = performance.now();
      if (now - lastStep < MOMENTUM_GUARD) return true;
      lastStep = now;

      if (toFooter) {
        // Proximity snap yanks a footer jump back onto the last panel, so
        // park there with snap off; it is restored the moment we step back
        // onto a panel (below, or on scrollend in settle()).
        document.documentElement.style.scrollSnapType = 'none';
        window.scrollTo({ top: target });
      } else {
        document.documentElement.style.scrollSnapType = '';
        animating = true;
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(settle, SETTLE);
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      const target = e.target instanceof Element ? e.target : null;
      if (!target || target.closest('[role="dialog"]')) return;
      // /health owns its own pinned WHO chapters — never step it here.
      if (document.documentElement.dataset.scroll === 'health') return;
      if (target.closest('.who-stage')) return;
      if (!panelList().length) return;

      // An inner box that can still move takes the gesture first.
      const box = scrollableAncestor(target);
      if (box) {
        const down = e.deltaY > 0;
        const atEdge = down
          ? box.scrollTop + box.clientHeight >= box.scrollHeight - 1
          : box.scrollTop <= 1;
        if (!atEdge) return;
      }

      if (animating) {
        e.preventDefault();
        return;
      }

      // Trackpad inertia decays into small deltas — they must not read as a
      // fresh gesture, or one flick would advance two panels.
      if (Math.abs(e.deltaY) < 12) return;
      if (inGesture) return;
      inGesture = true;
      window.clearTimeout(gestureTimer);
      gestureTimer = window.setTimeout(endGesture, GESTURE_END);

      if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };

    const interactive = (el: Element | null) =>
      !!el &&
      (el.closest(
        'input, textarea, select, button, a, [contenteditable="true"], [role="dialog"]'
      ) !== null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (document.documentElement.dataset.scroll === 'health') return;
      if (!panelList().length) return;
      if (interactive(document.activeElement)) return;

      let dir: 1 | -1 | null = null;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
      if (dir === null) return;

      const target = e.target instanceof Element ? e.target : null;
      const box = scrollableAncestor(target);
      if (box) {
        const down = dir === 1;
        const atEdge = down
          ? box.scrollTop + box.clientHeight >= box.scrollHeight - 1
          : box.scrollTop <= 1;
        if (!atEdge) return;
      }

      if (animating) {
        e.preventDefault();
        return;
      }
      if (step(dir)) e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scrollend', settle);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(gestureTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('keydown', onKeyDown);
      // Leaving the route: never strand the page with snap switched off.
      if (document.documentElement.style.scrollSnapType === 'none') {
        document.documentElement.style.scrollSnapType = '';
      }
    };
  }, []);

  return null;
}
