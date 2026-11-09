import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  href?: string;
  className?: string;
}

// Shared brutalist shell: 2px border, zero radius, hard offset shadow
// (black in light mode, white in dark mode), active state slams the
// button down 4px/4px and collapses the shadow.
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-0 border-2 font-display uppercase tracking-wider focus-visible:outline-none active:translate-[4px_4px] active:shadow-none transition-transform duration-100';

const SHADOW = 'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent-yellow dark:bg-primary-yellow text-black border-primary dark:border-white',
  secondary: 'bg-surface dark:bg-surface-l1 text-white border-white',
  ghost: 'bg-transparent text-white border-white shadow-none dark:shadow-none',
  destructive: 'bg-vermilion text-black border-vermilion dark:border-vermilion',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className,
}: ButtonProps) {
  const classes = clsx(BASE, SHADOW, VARIANTS[variant], SIZES[size], className);

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}



