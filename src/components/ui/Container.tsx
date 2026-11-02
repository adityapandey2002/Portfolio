import React from 'react';
import { clsx } from 'clsx';

export type ContainerMaxWidth =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Tailwind max-width scale. Default '7xl' (80rem / 1280px). Use 'none' to disable. */
  maxWidth?: ContainerMaxWidth;
}

/**
 * Page container with max-width and responsive gutters.
 *
 * Mobile  (<768px):  margin 1rem,  gutter 1rem   -> mx-4 px-4
 * Tablet  (768–1023px): margin 1.5rem, gutter 1rem -> md:mx-6 md:px-4
 * Desktop (≥1024px):    margin 2rem,  gutter 1.5rem -> lg:mx-8 lg:px-6
 *
 * All spacing follows the 8pt rhythm (multiples of 0.25rem). Layout-only —
 * no colours — so it works identically in light and dark mode.
 */
export function Container({ children, className, maxWidth = '7xl' }: ContainerProps) {
  return (
    <div
      className={clsx(
        'w-full',
        maxWidth === 'none' ? '' : `max-w-${maxWidth}`,
        'mx-4 px-4',
        'md:mx-6 md:px-4',
        'lg:mx-8 lg:px-6',
        className
      )}
    >
      {children}
    </div>
  );
}
