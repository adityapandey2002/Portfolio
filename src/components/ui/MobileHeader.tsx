'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

function getRouteLabel(pathname: string): string {
  if (pathname.startsWith('/work')) return 'Work & Systems';
  if (pathname.startsWith('/health')) return 'Health Impact';
  if (pathname.startsWith('/ask')) return 'Ask AI';
  return 'Aditya Pandey';
}

/**
 * MobileHeader — compact fixed top bar for narrow (<768px) screens.
 */
export function MobileHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const routeLabel = getRouteLabel(pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 md:hidden ${
        isDark
          ? 'border-b-2 border-outline bg-surface'
          : 'border-b-2 border-primary bg-surface'
      }`}
      aria-label="Mobile header"
    >
      <div className="flex h-full items-center justify-between gap-2 px-3">
        {/* Left: AP logo + active route title + location */}
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/"
            className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-primary bg-accent-yellow font-headline text-[10px] font-bold uppercase tracking-tighter text-black dark:border-primary-yellow dark:bg-primary-yellow dark:text-black"
          >
            AP
          </Link>
          <div className="flex min-w-0 flex-col leading-none">
            <Link
              href="/"
              className="truncate font-headline text-xs font-bold uppercase tracking-tight text-on-surface"
            >
              {routeLabel}
            </Link>
            <div className="mt-1 flex items-center gap-1">
              <span
                className="h-1.5 w-1.5 shrink-0 animate-pulse bg-accent-red dark:bg-primary-yellow"
                aria-hidden="true"
              />
              <span className="truncate font-mono text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
                MUZAFFARPUR · BIHAR
              </span>
            </div>
          </div>
        </div>

        {/* Right: theme toggle + person badge */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 transition-colors ${
              isDark
                ? 'border-outline bg-surface-low text-primary-yellow hover:bg-primary-yellow hover:text-black'
                : 'border-primary bg-surface text-primary hover:bg-accent-yellow hover:text-black'
            }`}
          >
            {isDark ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
          </button>
          <div
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 ${
              isDark
                ? 'border-outline bg-primary-yellow text-black'
                : 'border-primary bg-primary text-primary-container'
            }`}
          >
            <User size={15} />
          </div>
        </div>
      </div>
    </header>
  );
}
