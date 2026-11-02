import { clsx } from 'clsx';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Centred container with V2 gutters.
 *
 * Mobile: 1rem margin/gutter  (px-4)
 * Desktop: 1.5rem gutter (md:px-6) with auto side margins against the
 * max-width (≈2rem margin at common desktop viewport widths).
 */
export function Section({ children, className }: SectionProps) {
  return (
    <section className={clsx('mx-auto w-full max-w-7xl px-4 md:px-6', className)}>
      {children}
    </section>
  );
}
