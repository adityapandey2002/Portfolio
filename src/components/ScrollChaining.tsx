'use client';

import { useEffect } from 'react';

/**
 * Chains wheel scrolling out of inner scroll containers into the page
 * scroller. When an `.section-inner-scroll` reaches its bottom (scrolling
 * down) or top (scrolling up), the remaining wheel delta is handed to the
 * window so the next snap-section advances — instead of the page freezing
 * at the container's edge.
 */
export function ScrollChaining() {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!(target instanceof Element)) return;
      const box = target.closest('.section-inner-scroll') as HTMLElement | null;
      if (!box) return;

      const { scrollTop, clientHeight, scrollHeight } = box;
      if (scrollHeight <= clientHeight + 1) return;

      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const atTop = scrollTop <= 1;
      if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return null;
}