'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';
import { PILLAR_LAYERS, type PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TICKER = [
  'VHSND session',
  'PMSMA supervision',
  'Stock-out flag',
  'HMIS validation',
  'Portal sync',
  'NQAS walkthrough',
  'Gram Chaupal',
  'Godbharai',
  'Quarterly indent',
  'Data review meeting',
  'JAS meeting',
  'FRU readiness',
];

/* ── Stage stepper: pinned deck, scroll distance maps to steps (both ways) ── */
function useStageStepper(count: number, ref: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const last = count - 1;
    const STEP = 56;
    const GESTURE_GAP = 160;
    let acc = 0;
    let lastWheel = 0;

    const pinnedTop = () =>
      (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0) + 24;

    const onWheel = (e: WheelEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pt = pinnedTop();

      // Not pinned yet: let the page scroll. If the stage slid below the
      // viewport (user scrolled back up out of the section), restart the deck.
      if (Math.abs(r.top - pt) > 4) {
        if (r.top > pt + 8 && activeRef.current !== 0) setActive(0);
        return;
      }

      const down = e.deltaY > 0;
      const up = e.deltaY < 0;
      const atStart = activeRef.current === 0;
      const atEnd = activeRef.current >= last;

      // Release the ends to the page: once you're on the first/last card a
      // further no-op/up-down scroll should move the page, not the deck.
      if (e.deltaY === 0 || (down && atEnd) || (up && atStart)) return;

      e.preventDefault();

      // New gesture (paused long enough) restarts the accumulator so each
      // discrete scroll maps to steps instead of carrying momentum across
      // separate flicks.
      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP) acc = 0;
      lastWheel = now;

      const d = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : e.deltaY;
      acc += d;

      let position = activeRef.current;
      let guard = 0;
      while (Math.abs(acc) >= STEP && guard < 4) {
        if (acc > 0) {
          acc -= STEP;
          if (position >= last) {
            acc = 0;
            break;
          }
          position += 1;
        } else {
          acc += STEP;
          if (position <= 0) {
            acc = 0;
            break;
          }
          position -= 1;
        }
        guard++;
      }
      if (position !== activeRef.current) setActive(position);
    };

    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (Math.abs(r.top - pinnedTop()) > 4) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && activeRef.current < last) {
        e.preventDefault();
        setActive((a) => Math.max(0, Math.min(last, a + 1)));
      }
      if (['ArrowUp', 'PageUp'].includes(e.key) && activeRef.current > 0) {
        e.preventDefault();
        setActive((a) => Math.max(0, Math.min(last, a - 1)));
      }
    };

    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('keydown', onKey);
    };
  }, [count, ref]);

  return [active, setActive] as const;
}

/* ── Ambient background: drifting field + grid ──────────────────── */
function AmbientBg() {
  return (
    <>
      <div className="pillar-grid-bg pointer-events-none absolute inset-0" />
      <div className="pillar-blob pillar-blob-a pointer-events-none absolute" />
      <div className="pillar-blob pillar-blob-b pointer-events-none absolute" />
    </>
  );
}

/* ── Energy conduit between chapters: traveling data packets ────── */
function EnergyConduit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative flex justify-center py-1">
      <div className="relative h-14 w-px overflow-visible">
        <motion.div
          className="absolute inset-0 origin-top"
          style={{
            background:
              'linear-gradient(to bottom, transparent, var(--primary) 30%, var(--cyan) 70%, transparent)',
            filter: 'drop-shadow(0 0 4px var(--primary-glow))',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        />
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: i % 2 ? 'var(--cyan)' : 'var(--primary)',
              boxShadow: i % 2 ? '0 0 8px var(--accent-glow)' : '0 0 8px var(--primary-glow)',
            }}
            initial={{ top: '0%', opacity: 0 }}
            animate={inView ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.8, delay: i * 0.55, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Chapter shell: quiet margins, no overflow ancestors ────────── */
function ChapterBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative px-5 py-[clamp(4rem,9vh,6.5rem)] lg:px-10', className)}>
      <div className="mx-auto w-full max-w-[1500px]">{children}</div>
    </div>
  );
}

/* ── Hero pillar: animated conic border + pulse rings ───────────── */
function HeroLayer({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const item = layer.items[0];
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[720px]"
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="pillar-border-anim group relative overflow-hidden rounded-2xl bg-bg-2 p-8 text-center transition-shadow duration-500 hover:shadow-[0_0_60px_-15px_var(--primary-glow)]">
        <div className="pillar-sheen absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <motion.span
              className="pillar-ripple absolute inset-0 rounded-2xl"
              animate={inView ? { scale: [1, 1.7], opacity: [0.55, 0] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
              animate={inView ? { rotate: [0, -6, 6, 0] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={28} className="text-primary" style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow))' }} />
            </motion.div>
            <span className="pillar-orb pointer-events-none absolute -right-2 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="pillar-orb pointer-events-none absolute -bottom-1 -left-2 h-2 w-2 rounded-full bg-cyan" />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">{layer.eyebrow}</p>
          <h3
            className={cn('draw-title font-serif text-[clamp(24px,3.2vw,40px)] font-semibold leading-[1.05] tracking-tight', inView && 'in')}
          >
            {item.label}
          </h3>
          <p className="max-w-[540px] text-[13px] leading-relaxed text-ink-2">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dual outcome cards: staggered spring + sheen + icon pulse ──── */
function DualLayer({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {layer.items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            className="pillar-layer group relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--line)] hover:shadow-[0_18px_50px_-20px_var(--primary-glow)]"
            style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
            initial={{ opacity: 0, y: 24, rotateX: 12 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.14, ease: EASE }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-[3px] opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(to bottom, var(--layer-color), transparent)',
                transition: 'opacity 0.3s',
              }}
            />
            <div className="pillar-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative flex items-start gap-4">
              <div className="relative">
                <motion.span
                  className="pillar-ripple absolute inset-0 rounded-lg"
                  animate={inView ? { scale: [1, 1.8], opacity: [0.4, 0] } : {}}
                  transition={{ duration: 2.6, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover:border-[var(--layer-color)]/30 group-hover:bg-[var(--layer-color)]/10"
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                >
                  <Icon size={19} className="text-[var(--layer-color)]" />
                </motion.div>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-ink">{item.label}</h4>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Domains: pinned stage, one card at a time ───────────────────── */
function DomainStage({ layer }: { layer: PillarLayer }) {
  const items = layer.items;
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useStageStepper(items.length, stageRef);
  const item = items[active];
  const Icon = item.icon;

  return (
    <ChapterBlock>
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            Where we <span className="text-gradient">work</span>
          </>
        }
        sub="One domain at a time — scroll (or use the dots) to step through the cards, down and back up."
      />
      <div className="relative" style={{ height: `${items.length * 65}vh` }}>
        <div
          ref={stageRef}
          className="who-stage sticky isolate flex overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2"
          style={{ top: 'calc(var(--nav-h) + 24px)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(60% 90% at 12% 18%, var(--primary-glow), transparent 62%)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 48, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -48, rotateY: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="pillar-border-anim group/card relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden p-6 text-center sm:flex-row sm:gap-10 sm:px-14 sm:text-left"
              style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
            >
              {/* layer accent hairline */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(to right, var(--layer-color), var(--accent))` }}
              />

              {/* ghost index */}
              <span className="pointer-events-none absolute right-6 top-5 select-none font-mono text-[64px] font-bold leading-none text-ink-4/40 opacity-40 sm:right-10 sm:text-[96px]">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="pointer-events-none absolute right-6 top-[92px] font-mono text-[10px] uppercase tracking-[0.3em] text-ink-4 sm:right-10">
                domain
              </span>

              <span
                className="pointer-events-none absolute -bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
                style={{ background: 'var(--layer-color)' }}
              />

              <div className="relative shrink-0">
                <motion.span
                  className="pillar-ripple absolute inset-0 rounded-2xl"
                  style={{ background: 'var(--layer-color)' }}
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--layer-color)]/30 bg-[var(--layer-color)]/10 sm:h-20 sm:w-20"
                  whileHover={{ scale: 1.08, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 15 }}
                >
                  <Icon
                    size={30}
                    className="text-[var(--layer-color)]"
                    style={{ filter: 'drop-shadow(0 0 10px var(--primary-glow))' }}
                  />
                </motion.div>
              </div>

              <div className="max-w-[64ch]">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'var(--layer-color)', boxShadow: '0 0 8px var(--layer-color)' }}
                  />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-4">
                    live domain slot
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-[clamp(24px,3.2vw,40px)] font-semibold leading-tight tracking-tight text-ink">
                  {item.label}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{item.desc}</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-[var(--line-2)] pt-4 sm:justify-start">
                  <span className="rounded-full border border-[var(--line-2)] px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">
                    card {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4">
                    locked to slot · scroll to switch
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* deck counter + jump dots */}
          <div className="absolute inset-x-6 bottom-5 flex items-center gap-3 sm:inset-x-8">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4">
              domain {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`go to domain ${i + 1}`}
                  className={cn(
                    'h-1.5 w-5 rounded-full transition-all duration-300',
                    i === active
                      ? 'bg-gradient-to-r from-primary to-accent'
                      : i < active
                        ? 'bg-primary/40 hover:bg-primary/60'
                        : 'bg-[var(--line-2)] hover:bg-[var(--line)]'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterBlock>
  );
}

/* ── WHO blocks: pinned stage, steps forward one block per scroll ── */
function SystemScrub({ layer }: { layer: PillarLayer }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const items = layer.items;
  const [active, setActive] = useStageStepper(items.length, stageRef);

  const activeItem = items[active];
  const ActiveIcon = activeItem.icon;

  return (
    <ChapterBlock>
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            WHO building blocks, <span className="text-gradient">under focus</span>
          </>
        }
        sub="This is day-to-day fellowship work — support activities woven into the WHO building blocks of the health system. Scroll to step through, down then up."
      />

      {/* Daily engagement ticker */}
      <div className="mt-6 overflow-hidden rounded-lg border border-[var(--line-2)] bg-bg-3/60 py-2.5">
        <div className="marquee flex w-max items-center">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={dup === 1}>
              {TICKER.map((t) => (
                <li key={t} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 6px var(--primary-glow)' }} />
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height: `${items.length * 65}vh` }}>
        <div
          ref={stageRef}
          className="who-stage sticky isolate flex overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2"
          style={{ top: 'calc(var(--nav-h) + 24px)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(60% 90% at 88% 18%, var(--primary-glow), transparent 62%)',
            }}
          />

          <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[320px_1fr]">
            {/* rail */}
            <div className="flex shrink-0 flex-row gap-1.5 overflow-x-auto p-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:border-r lg:border-[var(--line-2)] lg:p-4">
              {items.map((it, i) => {
                const isActive = i === active;
                const fill = i <= active ? 1 : 0;
                return (
                  <button
                    key={it.id}
                    onClick={() => setActive(i)}
                    className={cn(
                      'relative min-w-[190px] shrink-0 rounded-xl border px-3.5 py-3 text-left transition-colors duration-300 lg:min-w-0',
                      isActive
                        ? 'border-[var(--line-2)] bg-bg-3'
                        : 'border-transparent bg-transparent hover:bg-bg-3/60'
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={cn('font-mono text-[10px]', isActive ? 'text-primary' : 'text-ink-4')}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn('truncate text-[12px] font-medium', isActive ? 'text-ink' : 'text-ink-3')}>
                        {it.label}
                      </span>
                    </span>
                    <span className="absolute inset-x-3.5 bottom-1 h-[2px] overflow-hidden rounded-full bg-[var(--line-2)]">
                      <span
                        className="block h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${fill * 100}%` }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* detail panel */}
            <div className="relative min-h-0 p-5 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="flex h-full flex-col justify-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3">
                      <ActiveIcon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-4">
                        block {String(active + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')}
                      </p>
                      <h3 className="font-serif text-[clamp(20px,2.6vw,32px)] font-semibold leading-tight tracking-tight text-ink">
                        {activeItem.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 max-w-[74ch] text-[13px] leading-relaxed text-ink-2">{activeItem.desc}</p>

                  {activeItem.activities && activeItem.activities.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeItem.activities.map((a, i) => (
                        <motion.span
                          key={a.label}
                          className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-2)] bg-bg-3/70 px-3.5 py-2"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.08 + i * 0.07, ease: EASE }}
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="text-[12px] font-medium text-ink">{a.label}</span>
                          {a.note && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-4">
                              · {a.note}
                            </span>
                          )}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* overall scan progress */}
              <div className="pointer-events-none absolute inset-x-6 bottom-4 flex items-center gap-3 sm:inset-x-8">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4">system scan</span>
                <div className="flex h-1 flex-1 gap-1 overflow-hidden">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-full flex-1 rounded-full transition-colors duration-300',
                        i <= active ? 'bg-gradient-to-r from-primary to-accent' : 'bg-[var(--line-2)]'
                      )}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
                  {String(active + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChapterBlock>
  );
}

/* ── Capabilities: static cascade grid closing the narrative ───── */
function CapabilityGrid({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <ChapterBlock>
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            How we <span className="text-gradient">enable change</span>
          </>
        }
        sub="The operating principles that carry every program — from leadership to local co-design."
      />
      <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {layer.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className="group/item relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-5 transition-colors duration-300 hover:border-[var(--line-2)] hover:shadow-[0_16px_40px_-18px_var(--primary-glow)]"
              style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[var(--layer-color)] to-accent transition-all duration-500 group-hover/item:w-full" />
              <span className="absolute right-3 top-2 font-mono text-[9px] text-ink-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover/item:border-[var(--layer-color)]/30 group-hover/item:bg-[var(--layer-color)]/10"
              >
                <Icon size={19} className="text-[var(--layer-color)]" />
              </div>
              <h4 className="text-[14px] font-semibold text-ink">{item.label}</h4>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </ChapterBlock>
  );
}

export function PillarsOfWork() {
  const layers = useMemo(() => {
    const map = {} as Record<string, PillarLayer>;
    for (const layer of PILLAR_LAYERS) map[layer.id] = layer;
    return map;
  }, []);

  return (
    <section id="pillars" className="pillars-root relative">
      <AmbientBg />

      {/* 01 — Aim */}
      <ChapterBlock>
        <SectionHeading
          eyebrow="/* APPROACH */"
          title={
            <>
              The systems approach, <span className="text-gradient">layer by layer</span>
            </>
          }
          sub="Based on WHO building blocks of Health Systems — a holistic framework that connects community outcomes to system-level change. Scroll through, chapter by chapter."
        />
        <HeroLayer layer={layers.aim} />
      </ChapterBlock>

      <EnergyConduit />

      {/* 02 — Outcomes */}
      <ChapterBlock>
        <SectionHeading
          eyebrow={layers.outcomes.eyebrow}
          title={
            <>
              What we <span className="text-gradient">drive toward</span>
            </>
          }
          sub="Two outcome strands anchor every intervention in the field."
        />
        <DualLayer layer={layers.outcomes} />
      </ChapterBlock>

      <EnergyConduit />

      {/* 03 — Domains: pinned stage, one card at a time */}
      <DomainStage layer={layers.domains} />

      <EnergyConduit />

      {/* 04 — WHO blocks: scroll-linked scrub */}
      <SystemScrub layer={layers['system-outcomes']} />

      <EnergyConduit />

      {/* 05 — Capabilities */}
      <CapabilityGrid layer={layers.capabilities} />

      <EnergyConduit />

      {/* 06 — Onward */}
      <ChapterBlock className="text-center">
        <SectionHeading
          eyebrow="/* FIELD MONITOR */"
          title={
            <>
              Back to the <span className="text-gradient">vitals</span>
            </>
          }
          sub="Everything above feeds the monitors below — the fellowship, on vitals."
          className="mx-auto max-w-[34ch]"
        />
      </ChapterBlock>
    </section>
  );
}