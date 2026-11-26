'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, User } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { useTheme } from '@/components/providers/ThemeProvider';
import { shouldHideStatusStrip } from '@/lib/scrollSpy';

const DESKTOP_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work & Systems' },
  { href: '/health', label: 'Health & Field Impact' },
  { href: '/ask', label: 'Interactive AI' },
  { href: '/#dispatch', label: 'Contact' },
];

/**
 * DesktopNav — persistent desktop header with a collapsible live status strip.
 *
 * Row 1 (64px): AP mark, primary navigation, Get in Touch CTA, theme toggle.
 * Row 2 (32px): Black status strip that slides upward and collapses away as
 * soon as the visitor scrolls downward, freeing vertical space.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [statusHidden, setStatusHidden] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const sync = () => {
      rafId = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      setStatusHidden((prev) => {
        const next = shouldHideStatusStrip(y, prev);
        document.documentElement.dataset.statusHidden = next ? 'true' : 'false';
        return next;
      });
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(sync);
      }
    };

    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      delete document.documentElement.dataset.statusHidden;
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden w-full border-b-2 border-outline bg-surface dark:border-outline dark:bg-surface lg:block">
      <div className="flex w-full flex-col">
        {/* Row 1 — identity, primary nav, actions */}
        <div className="relative z-20 flex h-16 items-center justify-between bg-surface px-6 dark:bg-surface lg:px-12">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2 whitespace-nowrap">
              <span className="border border-outline bg-primary px-2 py-1 font-headline text-base font-bold tracking-wider text-primary-container dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[2px_2px_0px_#facc15]">
                {profile.initials}
              </span>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-headline text-sm font-bold uppercase tracking-tighter text-primary dark:text-white md:text-base">
                  Aditya Pandey
                </span>
                <span className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant dark:text-primary-yellow">
                  Systems &amp; Health AI
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden h-full items-center gap-0.5 lg:flex">
            {DESKTOP_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex h-full items-center whitespace-nowrap px-4 font-headline text-xs font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? 'border-b-2 border-outline bg-primary-container text-on-primary-container dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[0_2px_0px_#facc15]'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface dark:text-on-surface-variant dark:hover:bg-surface-container-high dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#dispatch"
              className="hidden items-center justify-center whitespace-nowrap border-2 border-outline bg-primary px-3.5 py-2 font-headline text-xs font-bold uppercase tracking-widest text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-outline dark:bg-surface-container dark:text-on-surface dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:border-primary-yellow dark:hover:text-primary-yellow md:inline-flex"
            >
              Get in Touch
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap border-2 border-outline bg-surface px-2.5 py-1.5 font-headline text-[11px] font-bold uppercase tracking-wider text-primary shadow-[2px_2px_0px_#1a1a1a] transition-transform hover:bg-surface-variant active:translate-x-0.5 active:translate-y-0.5 dark:border-outline dark:bg-surface-low dark:text-primary-yellow dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:bg-surface-container"
            >
              {isDark ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
              <span>{isDark ? 'Dark' : 'Light'}</span>
            </button>
            <div
              aria-hidden="true"
              className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-outline bg-primary text-primary-container dark:border-outline dark:bg-primary-yellow dark:text-black"
            >
              <User size={16} />
            </div>
          </div>
        </div>

        {/* Row 2 — status strip that slides upward and collapses away when scrolling down */}
        <div
          data-testid="status-strip"
          data-collapsed={statusHidden ? 'true' : 'false'}
          aria-hidden={statusHidden}
          className={`relative z-10 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
            statusHidden
              ? 'pointer-events-none max-h-0 -translate-y-full opacity-0'
              : 'max-h-8 translate-y-0 opacity-100'
          }`}
        >
          <div className="flex h-8 select-none items-center justify-between overflow-hidden border-t-2 border-outline bg-primary px-6 font-headline text-[11px] font-bold tracking-widest text-primary-container dark:border-outline-variant/60 dark:bg-surface-lowest dark:text-primary-yellow lg:px-12">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-red" />
              <span>
                STATUS: FIELD ACTIVE // BIHAR PUBLIC HEALTH &amp; COMMERCIAL COMMERCE ENGINE // LIVE
                DEPLOYMENTS
              </span>
            </div>
            <div className="hidden items-center gap-4 text-[10px] uppercase tracking-widest dark:text-on-surface-variant md:flex">
              <span>MUZAFFARPUR · BIHAR</span>
              <span>26.1209°N, 85.3647°E</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
