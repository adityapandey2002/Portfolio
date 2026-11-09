'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Box, HeartPulse, Sparkles, Mail } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/work', label: 'Work', icon: Box },
  { href: '/health', label: 'Health', icon: HeartPulse },
  { href: '/ask', label: 'Ask AI', icon: Sparkles },
  { href: '/#dispatch', label: 'Contact', icon: Mail },
];

/**
 * Fixed mobile bottom navigation, matching the V2 design: five equal
 * tabs, active tab filled with primary-container, 44px touch targets.
 * Desktop uses DesktopNav instead.
 */
export function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return pathname.startsWith(path) && path !== '/';
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[110] border-t-2 border-primary bg-surface/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="grid h-16 w-full grid-cols-5 items-stretch">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex min-h-[44px] flex-col items-center justify-center gap-1 px-1 transition-colors ${
                active
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              <span className="font-headline text-[9px] font-bold uppercase tracking-wider">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
