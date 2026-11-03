'use client';

import { Menu, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Mobile header bar — fixed at top on screens < 1024px.
 * Mirrors the mobile design: AP logo, "Home" title, location pill, person icon,
 * theme toggle, plus a hamburger menu for section navigation.
 *
 * Hidden on desktop (lg:block → hidden) since desktop uses the full nav shell.
 */
export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'health', label: 'Health' },
    { id: 'ask', label: 'Ask AI' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className="fixed top-0 z-50 w-full bg-surface dark:bg-surface-dark border-b border-primary dark:border-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="h-16 px-3 flex items-center justify-between">
        {/* Left: AP logo + Home title */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white bg-primary-container dark:bg-primary-yellow">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-black dark:text-on-primary">
              AP
            </span>
          </div>
          <div className="flex flex-col">
            <Link
              href="#hero"
              className="font-display text-xs font-bold uppercase tracking-tight text-black dark:text-ink-dark"
              onClick={() => {}}
            >
              Home
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-accent-red dark:bg-vermilion animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                MUZAFFARPUR · 38°C
              </span>
            </div>
          </div>
        </div>

        {/* Right: theme toggle + person icon + menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white text-black dark:text-white hover:bg-accent-yellow dark:hover:bg-primary-yellow"
          >
            {isDark ? (
              <span className="text-[18px]">☀</span>
            ) : (
              <span className="text-[18px]">☾</span>
            )}
          </button>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 border-primary dark:border-white bg-primary dark:bg-surface-dark">
            <User size={18} className="text-black dark:text-white" aria-hidden="true" />
          </div>
          <button
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white text-black dark:text-white"
            aria-label="Open menu"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Section jump links — sticky below header */}
      <div className="sticky top-16 z-30 -mx-3 px-3 py-2 bg-surface dark:bg-surface-dark border-b border-primary dark:border-white shadow-[0_4px_0_#000000] dark:shadow-[0_4px_0_#ffffff] lg:hidden">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mr-2">
          JUMP //
        </span>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap border-2 border-transparent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-white hover:text-black dark:hover:text-white transition-colors"
              onClick={() => {}}
            >
              {s.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
