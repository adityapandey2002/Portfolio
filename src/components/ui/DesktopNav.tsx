'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/lib/data/profile';
import { useTheme } from '@/components/providers/ThemeProvider';

const DESKTOP_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work & Systems' },
  { href: '/health', label: 'Health & Field Impact' },
  { href: '/ask', label: 'Interactive AI' },
  { href: '/#dispatch', label: 'Contact' },
];

/**
 * DesktopNav — the 96px, two-row persistent header from the V2 design.
 *
 * Row 1 (64px): AP mark, primary navigation, Engage Fellow,
 * theme toggle, person glyph.
 * Row 2 (32px): live status strip + epoch/geo telemetry.
 *
 * Hidden below `lg`; MobileHeader + MobileTabBar handle small screens.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden w-full border-b-2 border-outline bg-surface dark:border-outline dark:bg-surface lg:block">
      <div className="flex h-24 w-full flex-col justify-between">
        {/* Row 1 — identity, primary nav, actions */}
        <div className="flex h-16 items-center justify-between border-b-2 border-outline px-6 dark:border-outline-variant lg:px-12">
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
                  [Systems &amp; Health AI]
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
              Engage Fellow
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap border-2 border-outline bg-surface px-2 py-1.5 font-headline text-[11px] font-bold uppercase tracking-wider text-primary shadow-[2px_2px_0px_#1a1a1a] transition-transform hover:bg-surface-variant active:translate-x-0.5 active:translate-y-0.5 dark:border-outline dark:bg-surface-low dark:text-primary-yellow dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isDark ? 'dark_mode' : 'light_mode'}
              </span>
              <span>MODE: {isDark ? 'DARK' : 'LIGHT'}</span>
            </button>
            <div className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-outline bg-primary text-primary-container dark:border-outline dark:bg-primary-yellow dark:text-black">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>

        {/* Row 2 — live field telemetry */}
        <div className="flex h-8 select-none items-center justify-between overflow-hidden border-t border-primary bg-primary px-6 font-headline text-[11px] font-bold tracking-widest text-primary-container dark:border-outline-variant/50 dark:bg-surface-lowest dark:text-primary-yellow lg:px-12">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-red" />
            <span>
              STATUS: FIELD ACTIVE // BIHAR PUBLIC HEALTH &amp; COMMERCIAL COMMERCE ENGINE // LIVE
              DEPLOYMENTS
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[10px] uppercase tracking-widest dark:text-on-surface-variant md:flex">
            <span>SYS_EPOCH: 2026.04</span>
            <span>GEO: 26.1209°N, 85.3647°E</span>
          </div>
        </div>
      </div>
    </header>
  );
}
