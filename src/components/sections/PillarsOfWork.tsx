'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';
import { PILLAR_LAYERS, type PillarLayer, type PillarItem } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FlowLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex justify-center py-1">
      <svg width="2" height="32" viewBox="0 0 2 32" className="overflow-visible">
        <motion.line
          x1="1" y1="0" x2="1" y2="32"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.circle
          cx="1" cy="0" r="2.5"
          fill="var(--primary)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}

function HeroLayer({ layer }: { layer: PillarLayer }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const item = layer.items[0];
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[680px]"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="pillar-layer group relative overflow-hidden rounded-2xl border border-primary/30 bg-bg-2 p-8 text-center transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_-10px_var(--primary-glow)]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Icon size={26} className="text-primary" />
          </div>
          <h3 className="font-serif text-[clamp(22px,3vw,36px)] font-semibold leading-tight tracking-tight text-ink">
            {item.label}
          </h3>
          <p className="max-w-[520px] text-[13px] leading-relaxed text-ink-2">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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
            className="pillar-layer group relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-6 transition-all duration-500 hover:border-[var(--line)] hover:shadow-[0_0_30px_-10px_var(--primary-glow)]"
            style={{ ['--layer-color' as string]: item.color || 'var(--primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
          >
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[var(--layer-color)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line-2)] bg-bg-3">
                <Icon size={18} className="text-[var(--layer-color)]" />
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
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : layer.style === 'grid-6'
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
        : 'grid-cols-2 lg:grid-cols-4';

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Compact header — clickable */}
      <button
        onClick={onToggle}
        className={cn(
          'pillar-layer group flex w-full items-center justify-between gap-4 rounded-xl border bg-bg-2 p-5 text-left transition-all duration-500',
          isOpen
            ? 'border-primary/40 shadow-[0_0_30px_-10px_var(--primary-glow)]'
            : 'border-[var(--line)] hover:border-[var(--line)] hover:shadow-[0_0_20px_-10px_var(--primary-glow)]'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          {layer.items.slice(0, isOpen ? layer.items.length : 6).map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[12px] font-medium text-ink transition-all duration-300',
                  isOpen
                    ? 'border-primary/20 bg-primary/10 text-primary'
                    : 'border-[var(--line-2)] bg-bg-3 text-ink-2 group-hover:border-primary/20 group-hover:bg-primary/5'
                )}
              >
                <Icon size={13} className={isOpen ? 'text-primary' : 'text-ink-3 group-hover:text-primary'} />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
              </div>
            );
          })}
          {!isOpen && layer.items.length > 6 && (
            <span className="text-[11px] text-ink-4">+{layer.items.length - 6} more</span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={16} className="text-ink-3 group-hover:text-primary" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className={cn('grid gap-3 pt-4', colClass)}>
              {layer.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    className="group/item relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-2 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_24px_-8px_var(--primary-glow)]"
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--line-2)] bg-bg-3 transition-colors duration-300 group-hover/item:border-primary/20 group-hover/item:bg-primary/10">
                        <Icon size={15} className="text-ink-3 transition-colors duration-300 group-hover/item:text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-[13px] font-semibold leading-snug text-ink">{item.label}</h5>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink-3">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10">
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

      <div className="mt-10 flex flex-col items-stretch gap-0">
        {PILLAR_LAYERS.map((layer, i) => {
          const isExpandable = layer.style !== 'hero' && layer.style !== 'dual';

          return (
            <div key={layer.id}>
              {i > 0 && <FlowLine />}
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
    </section>
  );
}
