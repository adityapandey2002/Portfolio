'use client';

import { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChapterBlock } from './ChapterBlock';
import { SectionHeading } from '../SectionHeading';
import { useStageStepper } from './useStageStepper';
import type { PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SystemScrub({ layer }: { layer: PillarLayer }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const items = layer.items;
  const [active, goTo] = useStageStepper(items.length, stageRef);

  const activeItem = items[active];
  const ActiveIcon = activeItem.icon;

  return (
    <ChapterBlock>
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