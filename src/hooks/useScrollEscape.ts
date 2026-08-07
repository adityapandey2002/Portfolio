'use client';

import { useRef, useEffect, RefObject } from 'react';

/**
 * When the user scrolls an inner container to its bottom (or top),
 * allow the next wheel/touch event to propagate to the page snap scroll.
 * This prevents the inner scroll from "trapping" the user inside a section.
 */
export function useScrollEscape(innerRef: RefObject<HTMLElement | null>) {
  const atBottom = useRef(false);
  const atTop = useRef(true);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const updateEdges = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      atTop.current = scrollTop <= 2;
      atBottom.current = scrollTop + clientHeight >= scrollHeight - 2;
    };

    // Wheel: when at boundary, remove scroll-snap containment briefly
    // so the page-level snap can take over
    const onWheel = (e: WheelEvent) => {
      updateEdges();
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && atBottom.current) || (scrollingUp && atTop.current)) {
        // Stop this event from scrolling the inner container
        // and let the snap container handle it
        e.stopPropagation();
        // Manually nudge the parent snap scroll
        const snapRoot = document.documentElement;
        snapRoot.scrollBy({ top: scrollingDown ? window.innerHeight : -window.innerHeight, behavior: 'smooth' });
      }
    };

    // Touch: track start position
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      updateEdges();
      const delta = touchStartY - e.changedTouches[0].clientY;
      const scrollingDown = delta > 10;
      const scrollingUp = delta < -10;

      if ((scrollingDown && atBottom.current) || (scrollingUp && atTop.current)) {
        const snapRoot = document.documentElement;
        snapRoot.scrollBy({ top: scrollingDown ? window.innerHeight : -window.innerHeight, behavior: 'smooth' });
      }
    };

    el.addEventListener('scroll', updateEdges, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    updateEdges();

    return () => {
      el.removeEventListener('scroll', updateEdges);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [innerRef]);
}
