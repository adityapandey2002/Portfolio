'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const MOBILE_SECTIONS = [
  { id: 'hero', label: 'Home', icon: 'home' },
  { id: 'work', label: 'Work', icon: 'work' },
  { id: 'health', label: 'Health', icon: 'health_and_safety' },
  { id: 'ask', label: 'Ask AI', icon: 'smart_toy' },
  { id: 'contact', label: 'Contact', icon: 'alternate_email' },
];

/**
 * MobileHeader — bottom tab bar + sticky jump strip + sliding drawer.
 *
 * Matches the mobile design exactly:
 * - Fixed bottom tab bar with 5 items
 * - Sticky jump nav strip below header
 * - Sliding drawer menu from right
 * - Hidden on desktop (lg:hidden); DesktopNav handles desktop viewports.
 */
export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      {/* Top header bar - mobile only */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 lg:hidden ${
          isDark
            ? 'dark:bg-surface dark:border-white border-b border-white/10'
            : 'bg-surface border-b border-primary'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-3">
          {/* Left: AP logo + Home title + location */}
          <div className="flex items-center gap-2">
            <Link
              href="#hero"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline font-bold text-[10px] uppercase tracking-tighter"
              onClick={() => setOpen(false)}
            >
              AP
            </Link>
            <div className="flex flex-col">
              <Link
                href="#hero"
                className="font-headline text-[10px] font-bold uppercase tracking-tight text-on-surface dark:text-on-surface"
                onClick={() => setOpen(false)}
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

          {/* Right: theme toggle + person icon + hamburger */}
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
            <button
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 ${
                isDark ? 'border-white text-white' : 'border-primary text-primary'
              }`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? (
                <span className="material-symbols-outlined text-[16px]">close</span>
              ) : (
                <Menu size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky jump nav strip */}
      <div
        className={`sticky top-16 z-30 px-3 py-2 ${
          isDark
            ? 'dark:bg-surface dark:border-white border-b border-white/10 shadow-[0_4px_0_#ffffff]'
            : 'bg-surface border-b border-primary shadow-[0_4px_0_#1a1a1a]'
        } lg:hidden`}
      >
        <span className={`font-mono text-[9px] font-bold uppercase tracking-widest mr-2 ${
          isDark ? 'text-primary-yellow' : 'text-accent-yellow'
        }`}>
          JUMP //
        </span>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {MOBILE_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`whitespace-nowrap border-2 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                isDark
                  ? 'border-transparent text-on-surface-variant hover:border-white hover:text-on-surface'
                  : 'border-transparent text-on-surface-variant hover:border-primary hover:text-on-surface'
              }`}
              onClick={() => setOpen(false)}
            >
              {section.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Sliding drawer menu */}
      {open && (
        <div
          className={`fixed inset-0 z-60 ${
            isDark ? 'dark:bg-surface' : 'bg-surface'
          }`}
        >
          <div className="absolute inset-0 bg-black dark:bg-black opacity-50 dark:opacity-50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface dark:bg-surface dark:border-white border-l shadow-2xl transform transition-transform duration-300 translate-x-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface">
                  MENU
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-0 border-2 border-primary dark:border-white text-on-surface dark:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <nav className="space-y-1">
                {MOBILE_SECTIONS.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between px-4 py-3 border-b border-primary dark:border-white text-on-surface dark:text-on-surface hover:bg-accent-yellow dark:hover:bg-accent-yellow hover:text-black dark:hover:text-black transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">
                      {section.label.toUpperCase()}
                    </span>
                    <span className="material-symbols-outlined text-[14px]">{getIcon(section.id)}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-primary dark:border-white">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-on-surface dark:text-on-surface hover:text-primary-yellow dark:hover:text-accent-yellow"
                  >
                    <span className="material-symbols-outlined text-[16px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                    THEME: {isDark ? 'LIGHT' : 'DARK'}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getIcon(sectionId: string): string {
  const icons: Record<string, string> = {
    hero: 'home',
    work: 'work',
    health: 'health_and_safety',
    ask: 'smart_toy',
    contact: 'alternate_email',
  };
  return icons[sectionId] || 'help';
}



