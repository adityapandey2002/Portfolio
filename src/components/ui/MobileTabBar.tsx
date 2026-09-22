'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Box, HeartPulse, Sparkles, Mail } from 'lucide-react';
import { usePreloader } from './Preloader';

const TABS = [
  { href: '/',        label: 'Home',    icon: Home,        active: ['/'] },
  { href: '/work',    label: 'Work',    icon: Box,         active: ['/work'] },
  { href: '/health',  label: 'Health',  icon: HeartPulse,  active: ['/health'] },
  { href: '/ask',     label: 'Ask AI',  icon: Sparkles,    active: ['/ask'] },
  { href: '/#contact', label: 'Contact', icon: Mail,       active: [] },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { done } = usePreloader();

  const isActive = (tab: (typeof TABS)[number]) => {
    if (tab.href === '/') return pathname === '/';
    const path = tab.href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  return (
    <motion.nav
      aria-label="Mobile navigation"
      initial={{ y: 24, opacity: 0 }}
      animate={done ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-[var(--line)] bg-bg-2/90 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="mx-auto flex w-full max-w-[480px] items-stretch justify-around px-2 pt-1.5">
        {TABS.map((t) => {
          const active = isActive(t);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="relative flex min-h-[52px] flex-1 flex-col items-center justify-center gap-1 rounded-lg"
              style={{ color: active ? 'var(--primary)' : 'var(--ink-3)' }}
            >
              {active && (
                <motion.span
                  layoutId="mobile-tab-active"
                  className="absolute inset-x-1 -top-[3px] mx-auto h-1 w-6 rounded-b-md"
                  style={{ background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}