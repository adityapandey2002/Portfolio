'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChapterBlock } from './ChapterBlock';
import { SectionHeading } from '../SectionHeading';
import type { PillarLayer } from '@/lib/data/pillars';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DomainStage({ layer }: { layer: PillarLayer }) {
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