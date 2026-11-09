'use client';

import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * MobileHeader — fixed top bar for small screens.
 *
 * - AP mark, Home title and field location
 * - Light/dark theme toggle
 * - Person glyph
 *
 * Page navigation lives in MobileTabBar; desktop uses DesktopNav.
 */
export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 lg:hidden ${
        isDark
          ? 'dark:bg-surface dark:border-white border-b border-white/10'
          : 'bg-surface border-b border-primary'
      }`}
      aria-label="Mobile header"
    >
      <div className="flex items-center justify-between px-3">
        {/* Left: AP logo + Home title + location */}
        <div className="flex items-center gap-2">
          <Link
            href="/#hero"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline font-bold text-[10px] uppercase tracking-tighter"
          >
            AP
          </Link>
          <div className="flex flex-col">
            <Link
              href="/#hero"
              className="font-headline text-[10px] font-bold uppercase tracking-tight text-on-surface dark:text-on-surface"
            >
              Home
            </Link>
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className="w-1.5 h-1.5 shrink-0 bg-accent-yellow dark:bg-primary-yellow animate-pulse"
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant">
                MUZAFFARPUR · 38°C
              </span>
            </div>
          </div>
        </div>

        {/* Right: theme toggle + person icon */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 ${
              isDark
                ? 'border-white text-white bg-transparent'
                : 'border-primary text-primary bg-transparent'
            } hover:bg-accent-yellow dark:hover:bg-primary-yellow hover:text-primary dark:hover:text-on-primary transition-colors`}
          >
            {isDark ? (
              <span className="material-symbols-outlined text-[16px]">dark_mode</span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">light_mode</span>
            )}
          </button>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 ${
              isDark
                ? 'border-white bg-transparent text-white'
                : 'border-primary bg-accent-yellow text-black dark:border-white dark:bg-primary-yellow dark:text-black'
            }">
            <span className="material-symbols-outlined text-[16px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
