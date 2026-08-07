import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-IN').format(n);
}

export function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 900px)').matches || 'ontouchstart' in window;
}
