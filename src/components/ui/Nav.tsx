'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/health', label: 'Health' },
  { href: '/ask', label: 'Ask AI' },
  { href: '/#contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-surface dark:bg-surface-dark border-b-4 border-primary dark:border-white shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 border-2 border-primary dark:border-white bg-primary dark:bg-primary-yellow px-2.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-on-primary dark:text-on-primary shadow-[2px_2px_0_#000000] dark:shadow-[2px_2px_0_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          {profile.initials}
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                isActive(l.href)
                  ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0_#000000] dark:border-white dark:bg-white dark:text-primary dark:shadow-[2px_2px_0_#ffffff]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-primary dark:hover:border-white hover:text-primary dark:hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center border-2 border-primary dark:border-white text-black dark:text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-3 mb-2 border-2 border-primary dark:border-white bg-surface dark:bg-surface-dark shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff] md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block border-b border-primary dark:border-white px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? 'bg-primary text-on-primary dark:bg-white dark:text-primary'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-surface-container dark:hover:bg-surface-l1 hover:text-black dark:hover:text-white'
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
