'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { computeActiveSection, computeScrollProgress } from '@/lib/scrollSpy';

const SECTIONS = [
  { id: 'experience', href: '#experience', num: '01', label: 'Experience' },
  { id: 'systems', href: '#systems', num: '02', label: 'Systems' },
  { id: 'education', href: '#education', num: '03', label: 'Education' },
  { id: 'pipeline', href: '#pipeline', num: '04', label: 'Pipeline' },
  { id: 'vector-terminal', href: '#vector-terminal', num: '05', label: 'Ask AI' },
  { id: 'dispatch', href: '#dispatch', num: '06', label: 'Contact' },
] as const;

/**
 * HomeJumpNav — sticky section index with live scroll-spy tracking.
 *
 * Moves its active indicator smoothly as the user scrolls through each Home
 * section, keeps the active item scrolled into view on narrow screens, and
 * tracks reading progress along the bottom border.
 */
export function HomeJumpNav() {
  const [activeId, setActiveId] = useState<string>('experience');
  const [progress, setProgress] = useState<number>(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const hasMountedRef = useRef(false);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const positions = SECTIONS.map((section) => {
        const el = document.getElementById(section.id);
        return {
          id: section.id,
          top: el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY,
        };
      });

      const isDesktop = window.innerWidth >= 1024;
      const activationOffset = isDesktop ? 210 : 170;

      const nextActive = computeActiveSection(positions, {
        activationOffset,
        scrollY: window.scrollY || window.pageYOffset || 0,
        viewportHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        fallbackToFirst: true,
      });

      if (nextActive) {
        setActiveId((prev) => (prev === nextActive ? prev : nextActive));
      }

      setProgress(
        computeScrollProgress(
          window.scrollY || window.pageYOffset || 0,
          window.innerHeight,
          document.documentElement.scrollHeight,
        ),
      );
    };

    const onScrollOrResize = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const container = listRef.current;
    const activeEl = itemRefs.current[activeId];
    if (!container || !activeEl) return;
    if (container.scrollWidth <= container.clientWidth) return;

    const targetLeft =
      activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [activeId]);

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeId),
  );
  const activeSection = SECTIONS[activeIndex] ?? SECTIONS[0];

  return (
    <nav
      aria-label="Jump to a home section"
      data-testid="home-jump-nav"
      data-active-section={activeId}
      className="sticky-below-nav sticky top-16 z-40 border-y-2 border-outline bg-surface-container-high/95 backdrop-blur-md transition-[top] duration-300 ease-out lg:top-24"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:px-8">
        <div
          ref={listRef}
          className="relative flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          <span className="inline-flex shrink-0 items-center gap-1.5 border border-outline bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-yellow dark:border-primary-yellow dark:bg-primary-yellow dark:text-black">
            <Compass size={12} aria-hidden="true" />
            <span>Sections</span>
          </span>

          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                ref={(el) => {
                  itemRefs.current[section.id] = el;
                }}
                href={section.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveId(section.id)}
                className={`relative shrink-0 whitespace-nowrap border-2 px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border-primary text-on-primary shadow-[2px_2px_0px_#1a1a1a] dark:border-[#facc15] dark:text-[#121214] dark:shadow-[2px_2px_0px_#0e0e10]'
                    : 'border-outline bg-surface text-primary shadow-[2px_2px_0px_#1a1a1a] hover:bg-primary-container hover:text-on-primary-container dark:bg-[#1b1b1d] dark:text-on-surface-variant dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:border-[#facc15] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="jump-nav-active-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-primary dark:bg-[#facc15]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[9px] tabular-nums ${
                      isActive
                        ? 'text-primary-container dark:text-[#121214]/80'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {section.num}
                  </span>
                  <span>{section.label}</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Live section indicator on desktop */}
        <div className="hidden shrink-0 items-center gap-2 border-l-2 border-outline/40 pl-3 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant md:flex">
          <span className="tabular-nums text-primary dark:text-[#facc15]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-on-surface">{activeSection.label}</span>
        </div>
      </div>

      {/* Subtle bottom reading progress bar */}
      <div className="h-[3px] w-full bg-outline/15" aria-hidden="true">
        <div
          className="h-full bg-secondary transition-[width] duration-150 ease-out dark:bg-[#facc15]"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </nav>
  );
}
