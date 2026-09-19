'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';
import { PILLAR_LAYERS, type PillarLayer, type PillarItem } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

/* ── Domains: layered sticky deck (cards pin over each other) ───── */
function DeckCard({ item, index }: { item: PillarItem; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0.35, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const Icon = item.icon;

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="relative"
        style={{
          position: 'sticky',
          top: `calc(var(--nav-h) + 24px + ${index * 3.5}rem)`,
        }}
      >
        <motion.div
          style={{
            scale,
            opacity,
            rotateX,
            transformPerspective: 1200,
            ['--layer-color' as string]: item.color || 'var(--primary)',
          }}
          className="pillar-border-anim group relative min-h-[clamp(320px,58vh,460px)] overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2 p-6 shadow-[0_32px_90px_-45px_var(--primary-glow)] sm:p-10"
        >
          <div className="pillar-sheen absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* scroll-linked progress hairline */}
          <motion.div
            className="absolute left-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[var(--layer-color)] to-accent"
            style={{ scaleX: scrollYProgress }}
          />

          {/* ghost index */}
          <span className="pointer-events-none absolute right-5 top-4 select-none font-mono text-[64px] font-bold leading-none text-ink-4/40 opacity-40 sm:right-8 sm:text-[90px]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pointer-events-none absolute right-5 top-[84px] font-mono text-[10px] uppercase tracking-[0.3em] text-ink-4 sm:right-8">
            domain
          </span>

          <div className="relative flex min-h-[clamp(320px,58vh,460px)] flex-col justify-center gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="relative shrink-0">
              <motion.span
                className="pillar-ripple absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--layer-color)]/30 bg-[var(--layer-color)]/10 sm:h-20 sm:w-20"
                whileHover={{ scale: 1.08, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 15 }}
              >
                <Icon size={30} className="text-[var(--layer-color)]" style={{ filter: 'drop-shadow(0 0 10px var(--primary-glow))' }} />
              </motion.div>
            </div>
            <div className="max-w-[70ch]">
              <h3 className="font-serif text-[clamp(22px,3vw,34px)] font-semibold leading-tight tracking-tight text-ink">
                {item.label}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DomainsDeck({ layer }: { layer: PillarLayer }) {
  return (
    <ChapterBlock className="flex flex-col gap-8">
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            Where we <span className="text-gradient">work</span>
          </>
        }
        sub="Five work domains — each one pins over the last as you scroll. Keep going to lift them open."
      />
      <div className="relative flex flex-col gap-[clamp(2.5rem,10vh,6rem)]">
        {layer.items.map((item, i) => (
          <DeckCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </ChapterBlock>
  );
}

/* ── WHO blocks: sticky rail + scrolling block cards ────────────── */
function BlockCard({
  item,
  index,
  isActive,
}: {
  item: PillarItem;
  index: number;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      data-idx={index}
      className={cn(
        'group/block scroll-mt-[calc(var(--nav-h)+24px)] relative overflow-hidden rounded-2xl border bg-bg-2 p-6 transition-all duration-500 sm:p-8',
        isActive
          ? 'border-[var(--line)] shadow-[0_24px_70px_-30px_var(--primary-glow)]'
          : 'border-[var(--line)]'
      )}
    >
      <div className="pillar-sheen absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/block:opacity-100" />
      <span className="pointer-events-none absolute right-5 top-4 select-none font-mono text-[48px] font-bold leading-none text-ink-4/40 opacity-40 sm:right-8 sm:text-[64px]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <div className="flex items-center gap-4">
          <motion.div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover/block:border-primary/30 group-hover/block:bg-primary/10"
            whileHover={{ scale: 1.08, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 15 }}
          >
            <Icon size={20} className="text-primary" />
          </motion.div>
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-4">
              building block {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-serif text-[clamp(20px,2.4vw,30px)] font-semibold leading-tight tracking-tight text-ink">
              {item.label}
            </h3>
          </div>
        </div>

        <p className="mt-4 max-w-[74ch] text-[13px] leading-relaxed text-ink-2">{item.desc}</p>

        {item.outcomes && item.outcomes.length > 0 && (
          <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {item.outcomes.map((o) => (
              <div key={o.label} className="flex flex-col gap-1.5 bg-bg-2 p-4">
                <span className="font-serif text-[clamp(24px,2.4vw,34px)] leading-none tracking-tight text-gradient">
                  {o.value}
                </span>
                <span className="text-[12px] font-medium text-ink">{o.label}</span>
                {o.foot && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-4">{o.foot}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SystemScrub({ layer }: { layer: PillarLayer }) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const idx = Number((best.target as HTMLElement).dataset.idx);
          setActive(idx);
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.2, 0.5] }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = layer.items;

  const jumpTo = (i: number) => cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <ChapterBlock>
      <SectionHeading
        eyebrow={layer.eyebrow}
        title={
          <>
            WHO building blocks, <span className="text-gradient">under focus</span>
          </>
        }
        sub="Scroll through each building block — every one unpacks the outcome it's driving in the field. The rail tracks where you are."
      />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        {/* rail */}
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
          <div className="flex flex-row gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-visible lg:pb-0">
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.id}
                  onClick={() => jumpTo(i)}
                  className={cn(
                    'relative min-w-[190px] shrink-0 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 lg:min-w-0',
                    isActive
                      ? 'border-primary/40 bg-primary/10'
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
                    <span
                      className={cn(
                        'ml-auto h-1.5 w-1.5 shrink-0 rounded-full transition-opacity',
                        isActive ? 'bg-primary opacity-100' : 'opacity-0'
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 hidden font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4 lg:block">
            block {String(active + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')}
          </p>
        </div>

        {/* block cards */}
        <div className="flex min-w-0 flex-col gap-6">
          {items.map((it, i) => (
            <div
              key={it.id}
              data-idx={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <BlockCard item={it} index={i} isActive={active === i} />
            </div>
          ))}
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

      {/* 03 — Domains: layered sticky deck */}
      <DomainsDeck layer={layers.domains} />

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