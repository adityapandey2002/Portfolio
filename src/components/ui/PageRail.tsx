'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_SECTIONS = [
  { id: 'hero',       label: 'Hero',       num: '01' },
  { id: 'impact',     label: 'Impact',     num: '02' },
  { id: 'pipeline',   label: 'Pipeline',   num: '03' },
  { id: 'field',      label: 'Field',      num: '04' },
  { id: 'about',      label: 'About',      num: '05' },
  { id: 'experience', label: 'Experience', num: '06' },
  { id: 'skills',     label: 'Skills',     num: '07' },
  { id: 'education',  label: 'Education',  num: '08' },
  { id: 'beyond',     label: 'Beyond',     num: '09' },
  { id: 'work',       label: 'Work',       num: '10' },
  { id: 'ask',        label: 'AI',         num: '11' },
  { id: 'contact',    label: 'Contact',    num: '12' },
];

export function PageRail({ sections = DEFAULT_SECTIONS }: { sections?: typeof DEFAULT_SECTIONS }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));
    if (els.length === 0) return;

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= mid + 80) idx = i;
      });
      setActive(idx);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (i: number) => {
    const el = document.querySelectorAll<HTMLElement>('.snap-section')[i];
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Left side — vertical section rail */}
      <nav
        className="fixed left-5 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-start gap-1 lg:flex"
        aria-label="Section navigation"
      >
        {sections.map((s, i) => {
          const isActive = active === i;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(i)}
              className="group flex items-center gap-2.5 py-0.5"
              aria-label={`Go to ${s.label}`}
            >
              {/* Number */}
              <span
                className="font-mono transition-all duration-300"
                style={{
                  fontSize: isActive ? '11px' : '9px',
                  color: isActive ? 'var(--primary)' : 'var(--ink-4)',
                  opacity: isActive ? 1 : 0.5,
                  letterSpacing: '0.2em',
                }}
              >
                {s.num}
              </span>

              {/* Tick mark */}
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 18 : 6,
                  height: isActive ? 2 : 2,
                  borderRadius: 99,
                  background: isActive ? 'var(--primary)' : 'var(--ink-4)',
                  boxShadow: isActive ? '0 0 10px var(--primary-glow)' : undefined,
                  opacity: isActive ? 1 : 0.35,
                }}
              />

              {/* Label — only shows for active */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: 'var(--primary)' }}
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom-right — section counter */}
      <div className="pointer-events-none fixed bottom-6 right-5 z-[90] hidden flex-col items-end lg:flex">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[11px] tracking-[0.22em]"
            style={{ color: 'var(--ink-4)' }}
          >
            {sections[active]?.num} / {String(sections.length).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <div
          className="mt-1.5 h-px w-12 overflow-hidden rounded-full"
          style={{ background: 'var(--line)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--primary)' }}
            animate={{ width: `${((active + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </>
  );
}