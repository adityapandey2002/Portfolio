'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Command, Menu, Wifi, BatteryMedium, X } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { usePreloader } from './Preloader';
import { VisitorsPulse } from '@/components/realtime/VisitorsPulse';

const LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/work',    label: 'Work'    },
  { href: '/health',  label: 'Health'  },
  { href: '/ask',     label: 'Ask AI'  },
  { href: '/#contact',label: 'Contact' },
];

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { done } = usePreloader();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [now, setNow] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  const hasBg = scrolled || isMobile;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] px-4 pt-[calc(var(--safe-top)+4px)] transition-all duration-700 md:pt-3"
      style={{
        opacity: done ? 1 : 0,
        transform: done ? 'none' : 'translateY(-120%)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Phone status strip — mobile only, sits in the notch area */}
      <div className="pointer-events-none mx-auto mb-1 flex w-full max-w-[480px] items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink-4 md:hidden">
        <span>{now}</span>
        <span className="flex items-center gap-2">
          <Wifi size={9} aria-hidden />
          <BatteryMedium size={13} aria-hidden />
        </span>
      </div>

      <div
        className="mx-auto flex max-w-[960px] items-center justify-between rounded-full border px-3 py-1.5 transition-all duration-300"
        style={{
          borderColor: hasBg ? 'var(--line)' : 'transparent',
          background: hasBg
            ? 'color-mix(in srgb, var(--bg-2) 96%, transparent)'
            : 'transparent',
          backdropFilter: hasBg ? 'blur(12px)' : 'none',
        }}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2" data-grab>
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary font-mono text-[12px] font-bold text-bg">
            {profile.initials}
            <span
              className="absolute -inset-[3px] rounded-[7px] border border-dashed border-primary opacity-40"
              style={{ animation: 'spin 12s linear infinite' }}
            />
          </span>
          <span className="text-[14px] font-semibold text-ink">{profile.name}</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3 py-1 text-[13.5px] font-medium text-ink-3 transition-colors hover:text-ink"
              style={isActive(l.href) ? { color: 'var(--ink)', background: 'var(--line-2)' } : undefined}
            >
              {l.label}
              <span
                className="absolute inset-x-3 bottom-0 h-px bg-primary"
                style={{
                  transform: isActive(l.href) ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s cubic-bezier(0.7,0,0.3,1)',
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <VisitorsPulse />

          {/* Command palette — icon only, simple */}
          <button
            onClick={onOpenPalette}
            className="hidden h-7 w-7 items-center justify-center rounded-lg border border-[var(--line)] text-ink-4 transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            aria-label="Command palette (⌘K)"
            title="Command palette ⌘K"
          >
            <Command size={13} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--line)] text-ink-3 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={13} /> : <Menu size={13} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-1.5 max-w-[960px] rounded-2xl border border-[var(--line)] bg-bg-2 p-2 md:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-xl px-4 py-2.5 text-[14px] text-ink-2 hover:bg-[var(--line-2)] hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
