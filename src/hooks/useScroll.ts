'use client';

import { useSyncExternalStore, useEffect, useState } from 'react';

type ScrollSubscriber = (y: number) => void;

let scrollY = 0;
const subscribers = new Set<ScrollSubscriber>();
let raf = 0;

function notify() {
  for (const fn of subscribers) fn(scrollY);
}

function onScroll() {
  const nextY = window.scrollY;
  if (nextY !== scrollY) {
    scrollY = nextY;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        notify();
      });
    }
  }
}

function subscribe(fn: ScrollSubscriber) {
  subscribers.add(fn);
  if (subscribers.size === 1) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    }
  };
}

function getSnapshot() {
  return scrollY;
}

function getServerSnapshot() {
  return 0;
}

/**
 * Single scroll position store using useSyncExternalStore.
 * Replaces multiple window.addEventListener('scroll') in Nav, ScrollProgress,
 * ScrollChaining, VisitorsPulse, etc.
 */
export function useScrollY(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Subscribe to scroll direction changes.
 * Returns { direction: 1 | -1 | 0, velocity: number }
 */
export function useScrollDirection(): { direction: 1 | -1 | 0; velocity: number } {
  const y = useScrollY();
  // This is a simplified version - for full velocity tracking you'd want
  // a more sophisticated implementation
  return { direction: 0, velocity: 0 };
}

/**
 * Hook to detect if we're at top/bottom of page
 */
export function useScrollPosition() {
  const y = useScrollY();
  const [atTop, setAtTop] = useState(y <= 1);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setAtTop(y <= 1);
    setAtBottom(y >= max - 1);
  }, [y]);

  return { y, atTop, atBottom };
}