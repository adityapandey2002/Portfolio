'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education, certs } from '@/lib/data/skills';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="border-b-4 border-primary dark:border-white">
      <Section className="py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div ref={ref}>
            <div className="mb-5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
                06 · EDUCATION
              </span>
              <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
                School of hard data
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((e, i) => (
                <motion.div
                  key={e.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                >
                  <Card padding="p-4">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-primary bg-primary-container text-primary dark:border-white dark:bg-primary-yellow dark:text-on-primary">
                        <GraduationCap size={18} />
                      </span>
                      <div>
                        <h3 className="font-headline text-sm font-bold text-on-surface dark:text-ink-dark">{e.degree}</h3>
                        <p className="mt-0.5 text-sm text-on-surface-variant dark:text-ink-dark/70">{e.school}</p>
                        <p className="mt-0.5 font-mono text-xs text-on-surface-variant dark:text-ink-dark/60">{e.year}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
                07 · CERTIFICATIONS
              </span>
              <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
                Proof of work
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certs.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                >
                  <Card padding="p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-primary bg-surface dark:border-white dark:bg-surface-l1">
                        <Award size={15} className="text-primary dark:text-white" />
                      </span>
                      <div>
                        <h3 className="font-headline text-xs font-bold leading-snug text-on-surface dark:text-ink-dark">{c.name}</h3>
                        <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-ink-dark/60">{c.issuer}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
