'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Recycle, Compass, Flower2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const BEYOND = [
  {
    icon: Palette,
    title: 'Sangam — cultural group, founded & led',
    body: 'Founded and managed <strong>Sangam</strong>, the university cultural group — building teams, programming events, running them end-to-end, and supporting peer integration for incoming students.',
    tags: ['Leadership', 'Event Ops', 'Teamwork'],
  },
  {
    icon: Recycle,
    title: 'Sustainable-tech internship',
    body: 'Open-source <strong>3D printing & digital fabrication</strong> at Auroville FabLab — prototyping eco-friendly structures from sand, rice husk, and slaked lime.',
    tags: ['3D Printing', 'Open Source', 'Sustainability'],
  },
  {
    icon: Compass,
    title: 'CBCT & leadership workshop — Hajipur',
    body: 'Participated in <strong>Cognitively-Based Compassion Training (CBCT)</strong> with the fellowship cohort — and supported the same training being delivered to others, strengthening facilitation, empathy-led problem solving, and field leadership.',
    tags: ['Fellowship Training', 'Facilitation', 'Hajipur'],
  },
  {
    icon: Flower2,
    title: '10-day Vipassana — Dhamma Vaishali',
    body: 'Sat a <strong>10-day Vipassana meditation course</strong> at Dhamma Vaishali — discipline, stillness, and sustained focus that carries straight into field days and long debug sessions.',
    tags: ['Meditation', 'Discipline', 'Bihar'],
  },
];

export function BeyondField() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="beyond" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col" ref={ref}>
        <SectionHeading
          eyebrow="/* 09 · BEYOND THE FIELD */"
          className="mb-6"
          title={
            <>
              Off the field, <span className="text-gradient">still building</span>
            </>
          }
          sub="The fellowship is the centre of the week — not all of it."
        />
        <div className="section-inner-scroll grid min-h-0 flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BEYOND.map((b, i) => (
            <motion.div
              key={b.title}
              className="group rounded-2xl border border-[var(--line)] bg-bg-2/60 p-4 transition-colors duration-300 hover:border-primary/50"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <b.icon size={18} />
              </span>
              <h3 className="mt-3 text-[14px] font-semibold leading-snug text-ink">{b.title}</h3>
              <p
                className="mt-1.5 text-[12.5px] leading-[1.7] text-ink-2"
                dangerouslySetInnerHTML={{ __html: b.body }}
              />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {b.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--line-2)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
