'use client';

import { motion } from 'framer-motion';
import { Compass, Flower2 } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { CountUp } from '../CountUp';
import { TRAINING, EASE } from './constants';

export function FieldMindSection() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
      <SectionHeading
        eyebrow="/* FIELD MIND */"
        title={
          <>
            What keeps the field <span className="text-gradient">steady</span>
          </>
        }
        sub="The weeks are full days. These are the practices that make the field work hold."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {TRAINING.map((t, i) => (
          <motion.div
            key={t.title}
            className="group rounded-2xl border border-[var(--line)] bg-bg-2/60 p-6 transition-colors duration-300 hover:border-primary/50 lg:p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <t.icon size={20} />
              </span>
              <h3 className="text-[15px] font-semibold leading-snug text-ink">{t.title}</h3>
            </div>
            <p
              className="mt-4 text-[13px] leading-[1.75] text-ink-2"
              dangerouslySetInnerHTML={{ __html: t.body }}
            />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line-2)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}