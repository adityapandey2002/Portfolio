'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/lib/data/profile';
import { useTheme } from '@/components/providers/ThemeProvider';

const DESKTOP_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work & Systems' },
  { href: '/health', label: 'Health Impact' },
  { href: '/ask', label: 'Interactive AI' },
  { href: '/#contact', label: 'Contact' },
];

/**
 * DesktopNav — desktop-only header navigation.
 * Hidden on mobile (lg:hidden); MobileHeader handles mobile viewports.
 *
 * Mirrors the desktop design exactly:
 * - AP logo circle + "Aditya Pandey" + "Systems & Health AI"
 * - Nav links with active state (bg-primary-container)
 * - Engage Fellow / Resume buttons
 * - Theme toggle with "THEME: LIGHT/DARK" label
 * - Person icon
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
    <header
      className={`relative left-0 right-0 z-50 h-20 ${
        isDark
          ? 'bg-dark-surface border-b-2 border-white'
          : 'bg-surface border-b-2 border-primary'
      } lg:block hidden`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12">
        {/* Left: AP logo + name */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 bg-primary text-on-primary font-headline font-bold text-xl tracking-tighter hover:bg-primary-container hover:text-on-primary-container transition-colors border-2 border-primary"
          >
            {profile.initials}
          </Link>
          <div className="hidden sm:flex flex-col">
            <span className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface dark:text-on-surface">
              Aditya Pandey
            </span>
            <span className="font-headline text-xs tracking-wider text-on-surface-variant dark:text-on-surface-variant/70 uppercase">
              Systems & Health AI
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden xl:flex items-center gap-2">
          {DESKTOP_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 text-xs font-headline font-semibold uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? 'bg-primary-container text-on-primary-container font-bold border-2 border-primary'
                  : 'text-on-surface-variant dark:text-on-surface-variant/70 hover:text-on-surface dark:hover:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container-lowest'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 bg-primary-container text-on-primary-container font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary hover:text-on-primary transition-all shadow-[3px_3px_0px_#1a1a1a]"
          >
            Engage Fellow
          </a>
          <a
            href="/resume"
            className="hidden md:inline-flex items-center justify-center px-4 py-2.5 bg-surface text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-all shadow-[3px_3px_0px_#1a1a1a]"
          >
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className={`
              inline-flex items-center gap-1.5 px-3 py-2 font-headline font-bold text-xs uppercase tracking-wider
              border-2 border-primary
              ${isDark ? 'bg-dark-surface-dark dark:text-on-surface dark:border-white' : 'bg-surface text-on-surface border-primary'}
              shadow-[3px_3px_0px_#1a1a1a]
              ${isDark ? 'dark:shadow-[3px_3px_0px_#ffffff]' : ''}
              hover:bg-accent-yellow hover:text-primary
              ${isDark ? 'dark:hover:bg-primary-yellow dark:hover:text-on-primary' : ''}
              transition-all duration-100
              active:translate-x-0.5 active:translate-y-0.5
              active:shadow-[2px_2px_0px_#1a1a1a]
              ${isDark ? 'dark:active:shadow-[2px_2px_0px_#ffffff]' : ''}
              cursor-pointer
            `}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDark ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="font-mono text-[11px]">
              THEME: {isDark ? 'DARK' : 'LIGHT'}
            </span>
          </button>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 ${
            isDark
              ? 'border-white bg-transparent text-white'
              : 'border-primary bg-accent-yellow text-black dark:border-white dark:bg-primary-yellow dark:text-white'
          }">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}

