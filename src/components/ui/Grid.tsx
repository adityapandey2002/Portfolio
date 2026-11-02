import React from 'react';
import { clsx } from 'clsx';

export interface GridProps {
  children: React.ReactNode;
  /** Desktop column count. Tablet fixed at 6, mobile fixed at 4. Default 12. */
  cols?: number;
  /** Gap token ('gutter' | 'tight' | 'spacious' | 'none') or any raw Tailwind gap class. Default 'gutter'. */
  gap?: string;
  className?: string;
}

const GRID_GAP_TOKENS: Record<string, string> = {
  none: 'gap-0',
  tight: 'gap-2',
  gutter: 'gap-4 lg:gap-6',
  spacious: 'gap-6 lg:gap-8',
};

/**
 * 12-column desktop grid that collapses to 6 columns on tablet (768–1023px)
 * and 4 columns on mobile (<768px).
 *
 * Mobile-first Tailwind prefixes: the <768px collapse is real (a desktop-first
 * `grid-cols-12` base would stay 12 columns below the `sm` breakpoint).
 *
 * Spacing follows the 8pt rhythm: gap-4 = 1rem (mobile/tablet), gap-6 =
 * 1.5rem (desktop). Layout-only — no colours — so it works identically in
 * light and dark mode.
 */
export function Grid({ children, cols = 12, gap = 'gutter', className }: GridProps) {
  const gapClass = GRID_GAP_TOKENS[gap] ?? gap;

  return (
    <div
      className={clsx(
        'grid',
        'grid-cols-4 sm:grid-cols-4 md:grid-cols-6',
        `lg:grid-cols-${cols}`,
        gapClass,
        className
      )}
    >
      {children}
    </div>
  );
}
