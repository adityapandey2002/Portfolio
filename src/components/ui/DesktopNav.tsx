'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, User } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { useTheme } from '@/components/providers/ThemeProvider';
import { shouldHideStatusStrip } from '@/lib/scrollSpy';

const DESKTOP_LINKS = [
  { href: '/', label: 'Home', shortLabel: 'Home' },
  { href: '/work', label: 'Work & Systems', shortLabel: 'Work' },
  { href: '/health', label: 'Health & Field Impact', shortLabel: 'Health' },
  { href: '/ask', label: 'Interactive AI', shortLabel: 'Ask AI' },
  { href: '/#dispatch', label: 'Contact', shortLabel: 'Contact' },
];

/**
 * DesktopNav — persistent desktop header with a collapsible live status strip.
 *
 * Active from md (768px) upward so laptops zoomed to 125%–175% keep desktop
 * navigation instead of dropping into a mobile bottom tab bar.
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
    <header className="fixed inset-x-0 top-0 z-50 hidden w-full border-b-2 border-outline bg-surface dark:border-outline dark:bg-surface md:block">
      <div className="flex w-full flex-col">
        {/* Row 1 — identity, primary nav, actions */}
        <div className="relative z-20 flex h-14 items-center justify-between gap-2 bg-surface px-4 dark:bg-surface lg:h-16 lg:px-6 xl:px-12">
          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/" className="group flex items-center gap-2 whitespace-nowrap">
              <span className="border border-outline bg-primary px-2 py-1 font-headline text-sm font-bold tracking-wider text-primary-container dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[2px_2px_0px_#facc15] lg:text-base">
                {profile.initials}
              </span>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-headline text-sm font-bold uppercase tracking-tighter text-primary dark:text-white lg:text-base">
                  Aditya Pandey
                </span>
                <span className="mt-1 hidden font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant dark:text-primary-yellow xl:block">
                  Systems &amp; Health AI
                </span>
              </span>
            </Link>
          </div>

          <nav className="flex h-full min-w-0 items-center gap-0.5">
            {DESKTOP_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex h-full items-center whitespace-nowrap px-2.5 font-headline text-[11px] font-bold uppercase tracking-wide transition-colors lg:px-3.5 lg:text-xs xl:px-4 ${
                    active
                      ? 'border-b-2 border-outline bg-primary-container text-on-primary-container dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[0_2px_0px_#facc15]'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface dark:text-on-surface-variant dark:hover:bg-surface-container-high dark:hover:text-white'
                  }`}
                >
                  <span className="lg:hidden">{link.shortLabel}</span>
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#dispatch"
              className="hidden items-center justify-center whitespace-nowrap border-2 border-outline bg-primary px-3 py-1.5 font-headline text-xs font-bold uppercase tracking-widest text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary-container hover:text-on-primary-container dark:border-outline dark:bg-surface-container dark:text-on-surface dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:border-primary-yellow dark:hover:text-primary-yellow lg:inline-flex xl:px-3.5 xl:py-2"
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
              className="ml-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-outline bg-primary text-primary-container dark:border-outline dark:bg-primary-yellow dark:text-black xl:flex"
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
          className={`desktop-status-strip relative z-10 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
            statusHidden
              ? 'pointer-events-none max-h-0 -translate-y-full opacity-0'
              : 'max-h-7 translate-y-0 opacity-100 lg:max-h-8'
          }`}
        >
          <div className="flex h-7 select-none items-center justify-between gap-4 overflow-hidden border-t-2 border-outline bg-primary px-4 font-headline text-[10.5px] font-bold tracking-widest text-primary-container dark:border-outline-variant/60 dark:bg-surface-lowest dark:text-primary-yellow lg:h-8 lg:px-6 lg:text-[11px] xl:px-12">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent-red" />
              <span className="truncate">
                STATUS: FIELD ACTIVE // BIHAR PUBLIC HEALTH &amp; COMMERCIAL COMMERCE ENGINE // LIVE
                DEPLOYMENTS
              </span>
            </div>
            <div className="hidden shrink-0 items-center gap-4 text-[10px] uppercase tracking-widest dark:text-on-surface-variant xl:flex">
              <span>MUZAFFARPUR · BIHAR</span>
              <span>26.1209°N, 85.3647°E</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
