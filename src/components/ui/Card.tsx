import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Inner padding, defaults to p-6 (1.5rem). */
  padding?: string;
  /** Stronger shadow (6px offset) for elevated panels. */
  elevated?: boolean;
}

export function Card({
  children,
  className,
  padding = 'p-6',
  elevated = false,
}: CardProps) {
  return (
    <section
      className={clsx(
        // Surface fill, thick border, zero radius, hard offset shadow
        // (identical in both themes per the design system).
        'rounded-0 border-2 border-primary dark:border-white bg-surface dark:bg-surface-l1 shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#000000]',
        elevated && 'shadow-[6px_6px_0_#000000] dark:shadow-[6px_6px_0_#000000]',
        padding,
        className,
      )}
    >
      {children}
    </section>
  );
}
