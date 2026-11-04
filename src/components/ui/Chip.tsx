import { clsx } from 'clsx';

export type ChipVariant = 'default' | 'operational' | 'technical';

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  className?: string;
}

const VARIANTS: Record<ChipVariant, string> = {
  default: 'border-[#71717a] bg-surface bg-dark-surface-l1 text-[#a1a1aa] dark:text-[#71717a]',
  operational: 'border-[#facc15] text-[#facc15]',
  technical: 'border-[#3b82f6] text-[#3b82f6]',
};

export function Chip({
  children,
  variant = 'default',
  className,
}: ChipProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-0 border px-2 py-0.5 font-mono uppercase text-[10px] tracking-wider leading-none',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

