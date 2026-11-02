'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Button that toggles between light and dark mode.
 *
 * Shows a moon icon in light mode (switch to dark) and a sun icon in dark
 * mode (switch to light). Built on the V2 ThemeProvider context.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center border-2 border-primary bg-transparent text-primary hover:bg-accent-yellow hover:text-primary transition-colors active:translate-y-0.5"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={2} aria-hidden="true" />
      )}
      <span className="sr-only">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
