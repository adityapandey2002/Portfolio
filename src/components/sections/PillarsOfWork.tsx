'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { glide } from '@/lib/glideEngine';
import { SectionHeading } from './SectionHeading';
import { PILLAR_LAYERS, type PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Pinned deck: the active block is a function of scroll position ──
   The deck used to own wheel and keys in the capture phase and pace one block
   per gesture while the document stayed frozen — six screens of no visible
   motion and then a hard jump. Geometry is now the single source of truth: the
   glide engine publishes one stop per card across the sticky travel, so
   scrolling and clicking a rail row run the same code path and cannot
   disagree, and touch, scrollbar drags and find-in-page advance the deck too. */
function useScrollStage(count: number, ref: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);
  const geo = useRef<{ start: number; travel: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const sticky = ref.current;
      // stageRef sits on the sticky child; its rect freezes at the pinned
      // offset the moment the deck engages, so the pin wrapper is the only
      // element whose top and travel still describe the section.
      const pin = sticky?.closest<HTMLElement>('[data-chapter-pin]');
      if (!sticky || !pin) return;
      const nav =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
      const travel = Math.max(1, pin.offsetHeight - sticky.offsetHeight);
      geo.current = {
        start: pin.getBoundingClientRect().top + window.scrollY - (nav - 6),
        travel,
      };
    };
    measure();

    let raf = 0;
    const update = () => {
      raf = 0;
      const g = geo.current;
      if (!g) return;
      const p = (window.scrollY - g.start) / g.travel;
      const idx = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    // Geometry only moves when the sticky stage or the viewport does. Reading
    // it from the scroll handler would force a layout on every frame.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro && ref.current) ro.observe(ref.current);
    if (ro && ref.current?.firstElementChild) ro.observe(ref.current.firstElementChild);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [count, ref]);

  const goTo = (i: number) => {
    const g = geo.current;
    if (!g) return;
    glide.goTo(g.start + (i * g.travel) / Math.max(1, count - 1));
  };

  return [active, goTo] as const;
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
export function EnergyConduit({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={cn('relative flex justify-center py-1', className)}>
      {/* translate-y-2.5 = the requested 10px downward nudge, kept out of
          layout flow so every conduit on the page stays at the same distance. */}
      <div className="relative h-14 w-px translate-y-2.5 overflow-visible">
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
    // data-chapter: ScrollChaining lands on each chapter top. #pillars is not
    // a .snap-section, so a fixed one-screen hop through it used to drop the
    // viewport in the void between chapters (headings cut off, dead space).
    <div data-chapter className={cn('relative px-5 py-[clamp(4rem,9vh,6.5rem)] lg:px-10', className)}>
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

/* ── Domains: five panels sharing the row — the open one springs wide ──
   Headings stay horizontal and readable at rest (no -90° rotation, no
   hover-only text); only the description is gated behind the expansion.
   Collapsed panels still get 3.2 units of width so a three-word domain
   title wraps instead of truncating. */
function DomainStage({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [open, setOpen] = useState(0);

  return (
    <ChapterBlock className="flex min-h-[calc(100svh_*_var(--zoom-inv))] flex-col justify-center">
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            Where we <span className="text-gradient">work</span>
          </>
        }
        sub="Five work domains — maternal health through emergency care. Hover, tap or tab a panel to open it; every heading reads without opening."
      />
      <motion.div
        ref={ref}
        className="flex h-[clamp(600px,calc(84vh_*_var(--zoom-inv)),900px)] flex-col gap-2 md:h-[clamp(340px,calc(44vh_*_var(--zoom-inv)),470px)] md:flex-row"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {layer.items.map((item, i) => {
          const Icon = item.icon;
          const isOpen = open === i;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={isOpen}
              aria-label={item.label}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              animate={{ flexGrow: isOpen ? 6 : 3.2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="group relative min-w-0 basis-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:p-5"
              style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
            >
              {/* domain tint — deepens while the panel is open */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, color-mix(in srgb, var(--layer-color) 30%, transparent), transparent 70%)',
                }}
                animate={{ opacity: isOpen ? 1 : 0.32 }}
                transition={{ duration: 0.4 }}
              />
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.25),transparent_60%)]" />
              <span className="pillar-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left"
                style={{ background: 'linear-gradient(to right, var(--layer-color), transparent)' }}
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--layer-color)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3 transition-colors duration-300"
                    style={
                      isOpen
                        ? { borderColor: 'color-mix(in srgb, var(--layer-color) 50%, transparent)' }
                        : undefined
                    }
                  >
                    <Icon size={16} style={{ color: 'var(--layer-color)' }} />
                  </span>
                </div>

                {/* heading always visible; description is the only gated part */}
                <div className="mt-auto">
                  <h3 className="font-serif text-[clamp(15px,1.15vw,18px)] font-semibold leading-snug tracking-tight text-ink">
                    {item.label}
                  </h3>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1.5 text-[12.5px] leading-relaxed text-ink-2">{item.desc}</p>
                  </motion.div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </ChapterBlock>
  );
}

/* ── WHO blocks: pinned stage, steps forward one block per scroll ── */
function SystemScrub({ layer }: { layer: PillarLayer }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const items = layer.items;
  const [active, goTo] = useScrollStage(items.length, stageRef);

  const activeItem = items[active];
  const ActiveIcon = activeItem.icon;

  return (
    <ChapterBlock>
      {/* One screen of approach plus ~one screen pinned past the last
          block: the old 65vh-per-block (390vh) stranded the page on a
          frozen deck for three full scrolls after block 06.
          data-chapter-pin: ScrollChaining targets the scroll position where
          this sticky stage actually engages (its top − the sticky offset)
          instead of the chapter's own top, so arriving here hands straight
          over to the deck rather than showing the card half off-screen. */}
      <div
        className="relative"
        data-chapter-pin
        data-chapter-pin-count={items.length}
        style={{ height: 'calc(180vh * var(--zoom-inv))' }}
      >
        <div ref={stageRef} className="sticky" style={{ top: 'calc(var(--nav-h) - 6px)' }}>
          <SectionHeading
            eyebrow={layer.eyebrow}
            title={
              <>
                WHO building blocks, <span className="text-gradient">under focus</span>
              </>
            }
            sub="Day-to-day fellowship work — support activities woven into the WHO building blocks. Scroll to step through."
            titleSize="clamp(17px, 1.7vw, 24px)"
          />

          <div className="who-stage isolate flex overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(60% 90% at 88% 18%, var(--primary-glow), transparent 62%)',
            }}
          />

          <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[264px_1fr]">
            {/* rail */}
            <div className="flex shrink-0 flex-row gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:border-r lg:border-[var(--line-2)] lg:p-3">
              {items.map((it, i) => {
                const isActive = i === active;
                const fill = i <= active ? 1 : 0;
                return (
                  <button
                    key={it.id}
                    onClick={() => goTo(i)}
                    className={cn(
                      'relative min-w-[124px] flex-1 rounded-xl border px-2 py-1.5 text-left transition-colors duration-300 lg:min-w-0 lg:flex-none',
                      isActive
                        ? 'border-[var(--line-2)] bg-bg-3'
                        : 'border-transparent bg-transparent hover:bg-bg-3/60'
                    )}
                  >
                    <span className="flex items-start gap-2">
                      <span className={cn('mt-px font-mono text-[10px]', isActive ? 'text-primary' : 'text-ink-4')}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'text-[11.5px] font-medium leading-[1.3] break-words hyphens-auto',
                          isActive ? 'text-ink' : 'text-ink-3'
                        )}
                      >
                        {it.label}
                      </span>
                    </span>
                    <span className="absolute inset-x-2 bottom-1 h-[2px] overflow-hidden rounded-full bg-[var(--line-2)]">
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
            <div className="relative min-h-0 p-4 sm:p-5 lg:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="flex h-full flex-col justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3">
                      <ActiveIcon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-4">
                        block {String(active + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')}
                      </p>
                      <h3 className="font-serif text-[clamp(17px,2vw,22px)] font-semibold leading-tight tracking-tight text-ink">
                        {activeItem.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2.5 max-w-[74ch] text-[13px] leading-relaxed text-ink-2">{activeItem.desc}</p>

                  {activeItem.activities && activeItem.activities.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {activeItem.activities.map((a) => (
                        <div
                          key={a.label}
                          className="flex items-start gap-2.5 rounded-lg border border-[var(--line-2)] bg-bg-3/60 px-3.5 py-2.5"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <div className="min-w-0">
                            <span className="block text-[12.5px] font-medium break-words text-ink">{a.label}</span>
                            {a.note && (
                              <span className="mt-0.5 block font-mono text-[9.5px] uppercase leading-[1.35] tracking-[0.08em] break-words text-ink-4">
                                {a.note}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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
    <ChapterBlock className="flex min-h-[calc(100svh_*_var(--zoom-inv))] flex-col justify-center">
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

      {/* 03 — Domains: straight on the page */}
      <DomainStage layer={layers.domains} />

      <EnergyConduit />

      {/* 04 — Capabilities */}
      <CapabilityGrid layer={layers.capabilities} />

      {/* -mt-16: the centered capabilities block left a void above the WHO
          chapter — pull the line + WHO cluster up 64px (line↔heading rhythm
          untouched; everything below simply shifts with it). */}
      <EnergyConduit className="-mt-16" />

      {/* 05 — WHO blocks: scroll-linked scrub */}
      <SystemScrub layer={layers['system-outcomes']} />

      {/* Closing line: the monitor panel's snap-section (HealthDashboard)
          picks up right after this and carries the "Back to the vitals"
          heading — chapter 06 lives there as that page's heading. */}
      <EnergyConduit />
    </section>
  );
}