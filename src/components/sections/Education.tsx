'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education, certs } from '@/lib/data/skills';
import { SectionHeading } from './SectionHeading';

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto grid min-h-0 w-full max-w-[1500px] flex-1 content-start gap-10 lg:grid-cols-2" ref={ref}>
        {/* Education */}
        <div>
          <SectionHeading
            eyebrow="/* 06 · EDUCATION */"
            className="mb-5"
            title={
              <>
                School of <span className="text-gradient">hard data</span>
              </>
            }
          />
          <div className="space-y-3">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-bg-2/60 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={17} />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-ink">{e.degree}</h3>
                  <p className="mt-0.5 text-[13.5px] text-ink-2">{e.school}</p>
                  <p className="mt-0.5 font-mono text-[12px] text-ink-3">{e.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <SectionHeading
            eyebrow="/* 07 · CERTIFICATIONS */"
            className="mb-5"
            title={<>Learning, <span className="text-gradient">certified</span></>}
          />
          <div className="section-inner-scroll grid gap-2 sm:grid-cols-2" style={{ maxHeight: 'clamp(240px, 40vh, 380px)' }}>
            {certs.map((c, i) => (
              <motion.div
                key={c.name}
                className="group rounded-xl border border-[var(--line)] bg-bg-2/60 p-4 transition-colors duration-300 hover:border-primary/50"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-3 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Award size={15} />
                </span>
                <h3 className="mt-2.5 text-[14px] font-semibold leading-snug text-ink">{c.name}</h3>
                <p className="mt-0.5 font-mono text-[11.5px] uppercase tracking-wider text-ink-3">{c.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
