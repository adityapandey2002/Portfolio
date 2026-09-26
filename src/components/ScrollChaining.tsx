'use client';

import { useEffect } from 'react';

/* Home and /health move in screen-sized steps driven by explicit intent: a
   wheel notch, a committed flick, or a full screen of trackpad scroll.
   Everything else a gesture produces is swallowed — the old code leaked
   native scroll mid-gesture (inGesture returned without preventDefault),
   which drifted the document and fought the smooth step. Steps chain from
   the in-flight target, so a held wheel or fast stream glides panel to
   panel instead of stalling while one animates. Each step is at most one
   viewport: between adjacent panels that lands exactly on the next panel
   top (home); through /health's long flowing chapters it advances one
   screen at a time instead of trying to leap to a panel kilometres away.
   Snap is off globally, so nothing ever yanks a committed scroll back.
   Inner scrollable boxes keep their native scroll and hand the gesture
   over at their edge. The pinned WHO deck on /health owns its own
   gestures — it flags data-deck and this bails out. */
export function ScrollChaining() {
  useEffect(() => {
    // Touch devices keep native scroll; the pinned WHO deck yields via
    // its data-deck flag (kept in sync by PillarsOfWork's stepper).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const NOISE = 8; // deltas below this are trackpad jitter
    const GESTURE_END = 220; // ms of quiet that ends a gesture
    const COOLDOWN = 160; // ms after a step before the next may fire
    const REPEAT = 400; // held wheel: minimum ms between steps
    const NOTCH = 100; // a single notch / fling-sized delta
    const FLICK = 120; // committed flick that ends a gesture
    const SETTLE = 900; // ms to consider a smooth scroll finished
    const QUEUE = 2.2; // screens of scroll allowed ahead of the viewport

    let acc = 0;
    let lastDir = 0;
    let mouseish = false;
    let stepped = false;
    let lastStep = 0;
    let animating = false;
    let targetY: number | null = null;
    let gestureTimer = 0;
    let settleTimer = 0;

    const panelList = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));

    const panelTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

    const scrollableAncestor = (start: Element | null) => {
      let el = start as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight - el.clientHeight > 1) {
          // Only real wheel-scroll containers count. overflow:visible
          // children (flex items with min-h-0, grids) report overflow but
          // Chrome skips them and scrolls the document instead — treating
          // them as boxes leaked native scroll mid-gesture and drifted the
          // page away from the panel the step was aiming at.
          const oy = getComputedStyle(el).overflowY;
          if (oy === 'auto' || oy === 'scroll') return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const settle = () => {
      window.clearTimeout(settleTimer);
      // A box-level scrollend can bubble while the page is still gliding to
      // a panel — re-arm instead of dropping the chain target.
      if (animating && targetY !== null && Math.abs(window.scrollY - targetY) > 2) {
        settleTimer = window.setTimeout(settle, SETTLE);
        return;
      }
      animating = false;
      targetY = null;
    };

    const step = (dir: 1 | -1) => {
      const list = panelList();
      if (!list.length) return false;

      // Base on the in-flight target so consecutive steps chain forward
      // instead of re-measuring a document that is still animating.
      const y0 =
        targetY !== null && Math.abs(window.scrollY - targetY) <= window.innerHeight
          ? targetY
          : window.scrollY;

      let target: number | null = null;
      if (dir === 1) {
        for (const el of list) {
          const t = panelTop(el);
          if (t > y0 + 8) {
            target = t;
            break;
          }
        }
        if (target === null) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          if (y0 >= max - 1) return false; // footer already shown: release
          target = max; // past the last panel: reveal the footer
        }
        // Cap the hop at one screen: never leap past the next panel — land
        // on its top exactly. Home's panels are one viewport apart, so the
        // cap never bites there; on /health's tall flowing sections it
        // keeps every flick a single screenful instead of one giant jump.
        target = Math.min(y0 + window.innerHeight, target);
      } else {
        for (let i = list.length - 1; i >= 0; i -= 1) {
          const t = panelTop(list[i]);
          if (t < y0 - 8) {
            target = t;
            break;
          }
        }
        if (target === null) return false; // top of page: release to native
        target = Math.max(y0 - window.innerHeight, target);
      }

      // Too far ahead: let the current glide catch up (the caller retries).
      if (Math.abs(target - window.scrollY) > QUEUE * window.innerHeight) return false;

      animating = true;
      targetY = target;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, SETTLE);
      window.scrollTo({ top: target, behavior: 'smooth' });
      return true;
    };

    const endGesture = () => {
      window.clearTimeout(gestureTimer);
      // A committed flick that never crossed a mid-gesture threshold still
      // earns one panel — but only if this gesture stepped nowhere yet.
      const now = performance.now();
      if (!stepped && Math.abs(acc) >= FLICK && now - lastStep >= COOLDOWN) {
        if (step(acc > 0 ? 1 : -1)) lastStep = now;
      }
      acc = 0;
      lastDir = 0;
      mouseish = false;
      stepped = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      const target = e.target instanceof Element ? e.target : null;
      if (!target || target.closest('[role="dialog"]')) return;
      // The pinned WHO deck on /health owns wheel and keys: its stepper
      // preventDefaults in the capture phase and paces one block per
      // gesture. Yield so the two never fight over the same event.
      if (document.documentElement.dataset.deck === 'pinned') return;
      if (!panelList().length) return;

      // An inner box that can still move takes the gesture first.
      const box = scrollableAncestor(target);
      let atEdge = false;
      if (box) {
        const down = e.deltaY > 0;
        atEdge = down
          ? box.scrollTop + box.clientHeight >= box.scrollHeight - 1
          : box.scrollTop <= 1;
        if (!atEdge) return;
      }

      // At a page end in this direction, hand the gesture back untouched.
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ((e.deltaY < 0 && y <= 1) || (e.deltaY > 0 && y >= max - 1)) return;

      // Own the gesture completely from here: swallowing every delta (the
      // old inGesture path skipped preventDefault) stops wheel tails and
      // trackpad momentum from drifting the document between steps.
      e.preventDefault();

      const d =
        e.deltaMode === 1
          ? e.deltaY * 16
          : e.deltaMode === 2
            ? e.deltaY * window.innerHeight
            : e.deltaY;
      if (Math.abs(d) < NOISE) return;

      const now = performance.now();
      window.clearTimeout(gestureTimer);
      gestureTimer = window.setTimeout(endGesture, GESTURE_END);

      const dir = d > 0 ? 1 : -1;
      if (dir !== lastDir) {
        acc = 0;
        mouseish = false;
        stepped = false;
        lastDir = dir;
      }
      if (Math.abs(d) >= NOTCH) mouseish = true;
      acc += d;

      let fire = false;
      if (now - lastStep >= COOLDOWN) {
        if (atEdge && !stepped && Math.abs(d) >= NOISE * 2) fire = true; // box handed over
        else if (mouseish && !stepped) fire = true; // a notch / fling start
        else if (Math.abs(acc) >= window.innerHeight) fire = true; // a full screen of stream
        else if (
          mouseish &&
          stepped &&
          now - lastStep >= REPEAT &&
          Math.abs(acc) >= 150
        )
          fire = true; // held wheel
      }

      if (fire && step(dir)) {
        lastStep = now;
        stepped = true;
        acc = 0;
      }
    };

    const interactive = (el: Element | null) =>
      !!el &&
      (el.closest(
        'input, textarea, select, button, a, [contenteditable="true"], [role="dialog"]'
      ) !== null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (document.documentElement.dataset.deck === 'pinned') return;
      if (!panelList().length) return;
      if (interactive(document.activeElement)) return;

      let dir: 1 | -1 | null = null;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
      if (dir === null) return;

      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('[role="dialog"]')) return;
      const box = scrollableAncestor(target);
      if (box) {
        const down = dir === 1;
        const atEdge = down
          ? box.scrollTop + box.clientHeight >= box.scrollHeight - 1
          : box.scrollTop <= 1;
        if (!atEdge) return;
      }

      // Keyboard intent is discrete: one press, one panel — chained from
      // whatever glide is already in flight, never dropped mid-animation.
      e.preventDefault();
      if (step(dir)) lastStep = performance.now();
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
    };
  }, []);

  return null;
}
