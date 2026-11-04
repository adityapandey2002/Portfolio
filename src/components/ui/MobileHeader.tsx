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
 * MobileHeader — fixed bottom bar for mobile viewports (< 1024px).
 *
 * Mirrors the mobile design exactly:
 * - Bottom nav bar with 5 items (Home, Work, Health, Ask AI, Contact)
 * - Sliding drawer menu triggered by hamburger icon
 * - Hidden on desktop (lg:hidden); DesktopNav handles desktop viewports.
 */
export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      {/* Bottom mobile nav bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 h-16 ${
        isDark
          ? 'bg-dark-surface dark:border-white border-t border-white/10'
          : 'bg-surface border-t border-primary'
        } lg:hidden`}>
        <div className="flex items-center justify-center gap-1 px-2 py-1">
          {MOBILE_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="flex flex-col items-center justify-center gap-0.5 h-full w-full px-2 py-1 transition-colors duration-100"
              onClick={() => setOpen(false)}
            >
              <span className={`material-symbols-outlined text-[16px] ${isDark ? 'text-white' : 'text-on-surface-variant'}`}>
                {getIcon(section.id)}
              </span>
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-on-surface-variant'}`}>
                {section.label.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sliding drawer menu */}
      {open && (
        <div
          className={`fixed inset-0 z-60 ${
            isDark
              ? 'bg-dark-surface dark:bg-dark-surface'
              : 'bg-surface bg-surface'
          }`}
        >
          <div className="absolute inset-0 bg-black dark:bg-black opacity-50 dark:opacity-50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface dark:bg-surface dark:border-white border-l border-white shadow-2xl transform transition-transform duration-300 translate-x-0">
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
