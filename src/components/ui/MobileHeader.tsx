'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const MOBILE_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'health', label: 'Health' },
  { id: 'ask', label: 'Ask AI' },
  { id: 'contact', label: 'Contact' },
];

/**
 * MobileHeader — fixed top bar for mobile viewports (< 1024px).
 *
 * Mirrors the mobile design exactly:
 * - AP logo circle + "Home" title + location pill
 * - Person icon + theme toggle
 * - Sticky jump nav strip below with section links
 * - Hamburger drawer for section navigation
 *
 * Hidden on desktop (lg:hidden).
 */
export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      {/* Fixed top header bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 ${
          isDark
            ? 'bg-dark-surface dark:border-white border-b border-white/10'
            : 'bg-surface border-b border-primary'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-3">
          {/* Left: AP logo + Home title + location */}
          <div className="flex items-center gap-2">
            <Link
              href="#hero"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-0 border-2 border-primary dark:border-white bg-accent-yellow dark:bg-primary-yellow text-black dark:text-white font-headline font-bold text-[10px] uppercase tracking-tighter"
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
              isDark ? 'border-white bg-transparent text-white' : 'border-primary bg-accent-yellow text-black dark:border-white dark:bg-primary-yellow dark:text-white'
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
                <XIcon size={16} />
              ) : (
                <Menu size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky jump nav strip */}
      <div
        className={`sticky top-16 z-30 -mx-3 px-3 py-2 ${
          isDark
            ? 'bg-dark-surface dark:border-white border-b border-white/10 shadow-[0_4px_0_#ffffff]'
            : 'bg-surface border-b border-primary shadow-[0_4px_0_#1a1a1a]'
        }`}
      >
        <span className={`font-mono text-[9px] font-bold uppercase tracking-widest mr-2 ${
          isDark ? 'text-primary-yellow' : 'text-accent-yellow'
        }`}>
          JUMP //
        </span>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {MOBILE_SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={`whitespace-nowrap border-2 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                isDark
                  ? 'border-transparent text-on-surface-variant hover:border-white hover:text-on-surface'
                  : 'border-transparent text-on-surface-variant hover:border-primary hover:text-on-surface'
              }`}
              onClick={() => setOpen(false)}
            >
              {s.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className={`fixed inset-0 z-50 ${
            isDark ? 'bg-dark-surface dark:border-white' : 'bg-surface border-primary'
          } border-b border-primary dark:border-white`}
        >
          <div className="p-4">
            {MOBILE_SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={`block border-b border-primary dark:border-white px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  isDark
                    ? 'text-on-surface hover:border-white hover:text-on-surface'
                    : 'text-on-surface hover:border-primary hover:text-on-surface'
                }`}
                onClick={() => setOpen(false)}
              >
                {s.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
