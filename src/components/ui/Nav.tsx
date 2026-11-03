'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { useTheme } from '@/components/providers/ThemeProvider';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work & Systems' },
  { href: '/health', label: 'Health Impact' },
  { href: '/ask', label: 'Interactive AI' },
  { href: '/#contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b-2 border-primary dark:border-white">
      <div className="h-20 w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Left: AP logo + name */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 bg-primary text-on-primary font-headline font-bold text-xl tracking-tighter hover:bg-primary-container hover:text-on-primary-container transition-colors border-2 border-primary"
          >
            {profile.initials}
          </Link>
          <div className="hidden sm:flex flex-col">
            <span className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface dark:text-ink-dark">
              Aditya Pandey
            </span>
            <span className="font-headline text-xs tracking-wider text-on-surface-variant dark:text-ink-dark/70 uppercase">
              Systems & Health AI
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden xl:flex items-center gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 text-xs font-headline font-semibold uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? 'bg-primary-container text-on-primary-container font-bold border-2 border-primary'
                  : 'text-on-surface-variant dark:text-ink-dark/70 hover:text-on-surface dark:hover:text-ink-dark hover:bg-surface-container dark:hover:bg-surface-l1'
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
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary-container hover:text-on-primary-container transition-all shadow-[3px_3px_0px_#1a1a1a] cursor-pointer"
            title="Toggle Dark / Light Mode"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDark ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="font-mono text-[11px]">
              THEME: {isDark ? 'DARK' : 'LIGHT'}
            </span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-primary">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="inline-flex h-8 w-8 items-center justify-center border-2 border-primary text-on-surface-variant md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-6 mb-4 border-2 border-primary bg-surface shadow-[4px_4px_0px_#1a1a1a] md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block border-b border-primary px-4 py-2.5 text-[13px] font-headline font-semibold uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
