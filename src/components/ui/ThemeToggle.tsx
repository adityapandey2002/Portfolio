'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * V2 ThemeToggle — matches the design exactly.
 *
 * - Material Symbols icon (light_mode / dark_mode)
 * - "THEME: LIGHT" / "THEME: DARK" label in JetBrains Mono
 * - Thick 2px border, hard offset shadow (3px 3px 0 #000000)
 * - Active state slams down 4px/4px + shadow collapses
 * - Works in both light and dark mode via Tailwind `dark:` variants
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`
        inline-flex items-center gap-1.5
        px-3 py-2
        font-headline font-bold text-xs uppercase tracking-wider
        border-2 border-primary
        ${isDark ? 'bg-dark-surface-dark dark:text-on-surface dark:border-white' : 'bg-surface text-on-surface border-primary'}
        shadow-[3px_3px_0px_#1a1a1a]
        ${isDark ? 'dark:shadow-[3px_3px_0px_#ffffff]' : ''}
        hover:bg-accent-yellow hover:text-primary
        ${isDark ? 'dark:hover:bg-primary-yellow dark:hover:text-on-primary' : ''}
        transition-all duration-100
        active:translate-x-0.5 active:translate-y-0.5
        active:shadow-[2px_2px_0px_#1a1a1a]
        ${isDark ? 'dark:active:shadow-[2px_2px_0px_#ffffff]' : ''}
        cursor-pointer
      `}
    >
      <span className="material-symbols-outlined text-[16px]">
        {isDark ? 'dark_mode' : 'light_mode'}
      </span>
      <span className="font-mono text-[11px]">
        THEME: {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}

