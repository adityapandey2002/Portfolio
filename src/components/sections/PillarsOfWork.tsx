'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
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

/* ── Energy conduit between layers: traveling data packets ──────── */
function EnergyConduit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative flex justify-center py-2">
      {/* main conduit */}
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
        {/* traveling packets */}
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
      {/* flanking hairline branches */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2"
        style={{ background: 'repeating-linear-gradient(90deg, var(--primary) 0 4px, transparent 4px 10px)', opacity: 0.35 }}
      />
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

        {/* core glow */}
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4">
          {/* icon with ripple rings */}
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
            {/* animated left beam */}
            <motion.div
              className="absolute left-0 top-0 h-full w-[3px] opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(to bottom, var(--layer-color), transparent)',
                transition: 'opacity 0.3s',
              }}
            />
            {/* top hairline sweep */}
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

/* ── Expandable pillar: header + spring-cascade item cards ──────── */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function ExpandableLayer({
  layer,
  isOpen,
  onToggle,
}: {
  layer: PillarLayer;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const colClass =
    layer.style === 'grid-5'
      ? 'sm:grid-cols-3 lg:grid-cols-5'
      : layer.style === 'grid-6'
        ? 'sm:grid-cols-3 lg:grid-cols-6'
        : 'sm:grid-cols-2 lg:grid-cols-4';
  const HeadIcon = layer.items[0].icon;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Header — clickable */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'pillar-layer group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border bg-bg-2 p-5 text-left transition-all duration-500',
          isOpen
            ? 'border-primary/40 shadow-[0_12px_40px_-16px_var(--primary-glow)]'
            : 'border-[var(--line)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-18px_var(--primary-glow)]'
        )}
      >
        <div className="pillar-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* header icon */}
        <div
          className={cn(
            'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300',
            isOpen ? 'border-primary/30 bg-primary/10' : 'border-[var(--line-2)] bg-bg-3 group-hover:border-primary/30 group-hover:bg-primary/5'
          )}
        >
          <HeadIcon size={19} className={cn('transition-transform duration-500', isOpen ? 'rotate-[360deg] text-primary' : 'text-ink-3 group-hover:text-primary')} />
          {isOpen && <span className="pillar-ripple absolute inset-0 rounded-xl" />}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-4">{layer.eyebrow}</p>
          <h4 className="mt-0.5 truncate text-[15px] font-semibold text-ink">{layer.title}</h4>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className={cn(
              'hidden rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-widest sm:inline-block',
              isOpen ? 'border-primary/30 bg-primary/10 text-primary' : 'border-[var(--line-2)] text-ink-3'
            )}
          >
            {String(layer.items.length).padStart(2, '0')} ITEMS
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.15 : 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg border transition-colors',
              isOpen ? 'border-primary/30 bg-primary/10 text-primary' : 'border-[var(--line-2)] text-ink-3 group-hover:text-primary'
            )}
          >
            {isOpen ? <Plus size={15} className="rotate-45" /> : <ChevronDown size={15} />}
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              className={cn('relative grid grid-cols-1 gap-3 pt-4', colClass)}
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              animate="show"
            >
              {/* connecting rail above grid */}
              <span className="absolute left-4 top-1 h-px w-8 bg-gradient-to-r from-primary to-transparent" />

              {layer.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  transition={{ duration: 0.4, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="group/item relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-4 transition-colors duration-300 hover:border-primary/30 hover:shadow-[0_14px_34px_-14px_var(--primary-glow)]"
                >
                  {/* hover beam */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover/item:w-full" />
                  {/* index */}
                  <span className="absolute right-3 top-2 font-mono text-[9px] text-ink-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover/item:border-primary/25 group-hover/item:bg-primary/10">
                        <ItemGlyph Icon={item.icon} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[13px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover/item:text-primary">
                        {item.label}
                      </h5>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink-3">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ItemGlyph({ Icon }: { Icon: PillarItem['icon'] }) {
  return (
    <motion.div
      whileHover={{ rotate: -12, scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 340, damping: 13 }}
      className="flex h-full w-full items-center justify-center"
    >
      <Icon size={16} className="text-ink-3 transition-colors duration-300 group-hover/item:text-primary" />
    </motion.div>
  );
}

export function PillarsOfWork() {
  const [openLayers, setOpenLayers] = useState<Set<string>>(new Set());

  const toggleLayer = useCallback((id: string) => {
    setOpenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <section className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <AmbientBg />
      <div className="relative mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col">
        <SectionHeading
          eyebrow="/* APPROACH */"
          title={
            <>
              The systems approach,{' '}
              <span className="text-gradient">layer by layer</span>
            </>
          }
          sub="Based on WHO building blocks of Health Systems — a holistic framework that connects community outcomes to system-level change. Click any layer to explore."
        />

        <div className="section-inner-scroll relative min-h-0 flex-1 pr-2">
          <div className="flex flex-col items-stretch gap-0 pb-4">
            {PILLAR_LAYERS.map((layer, i) => {
              const isExpandable = layer.style !== 'hero' && layer.style !== 'dual';

              return (
                <div key={layer.id}>
                  {i > 0 && <EnergyConduit />}
                  {layer.style === 'hero' && <HeroLayer layer={layer} />}
                  {layer.style === 'dual' && <DualLayer layer={layer} />}
                  {isExpandable && (
                    <ExpandableLayer
                      layer={layer}
                      isOpen={openLayers.has(layer.id)}
                      onToggle={() => toggleLayer(layer.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fade-out gradient at bottom of scroll container */}
        <div
          className="pointer-events-none relative -mt-8 h-8 shrink-0"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        />
      </div>
    </section>
  );
}