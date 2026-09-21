'use client';

import { useEffect, useRef } from 'react';

/**
 * Chains wheel scrolling out of inner scroll containers into the page
 * scroller. When an `.section-inner-scroll` reaches its bottom (scrolling
 * down) or top (scrolling up), the page advances by exactly ONE snap-section
 * per discrete gesture — never a fling to the page ends.
 */
export function ScrollChaining() {
  const lockedRef = useRef(false);
  const timerRef = useRef(0);

  useEffect(() => {
    const unlock = () => {
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
      lockedRef.current = false;
    };

    const scheduleUnlock = () => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(unlock, 750);
    };

    const advance = (box: HTMLElement, down: boolean) => {
      if (lockedRef.current) return false;
      const section = box.closest('.snap-section') as HTMLElement | null;
      if (!section) return false;

      const neighbor = down ? section.nextElementSibling : section.previousElementSibling;
      if (!(neighbor instanceof HTMLElement)) return false;
      if (!neighbor.classList.contains('snap-section')) return false;

      lockedRef.current = true;
      scheduleUnlock();
      window.scrollTo({
        top: neighbor.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!(target instanceof Element)) return;
      const box = target.closest('.section-inner-scroll') as HTMLElement | null;
      if (!box) return;

      const { scrollTop, clientHeight, scrollHeight } = box;
      if (scrollHeight <= clientHeight + 1) return;

      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const atTop = scrollTop <= 1;
      if (!((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0))) return;

      e.preventDefault();
      advance(box, e.deltaY > 0);
    };

    const onScrollEnd = () => unlock();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scrollend', onScrollEnd);
    return () => {
      window.clearTimeout(timerRef.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);

  return null;
}