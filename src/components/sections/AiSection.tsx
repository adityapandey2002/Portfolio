'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

export function AiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ask" className="border-b-4 border-primary dark:border-white">
      <Section className="py-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div ref={ref}>
            <div className="mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant dark:text-ink-dark">
                10 · THE AI
              </span>
              <h2 className="mt-2 font-headline text-2xl sm:text-3xl font-bold tracking-tight text-on-surface dark:text-ink-dark sm:text-4xl uppercase">
                This portfolio has a RAG brain
              </h2>
            </div>
            <motion.p
              className="max-w-lg text-sm leading-relaxed text-on-surface-variant dark:text-ink-dark/80"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Every experience, project and skill on this site is chunked into a vector database. Ask it anything —
              <span className="font-bold text-on-surface dark:text-ink-dark"> &quot;what did you build in Bihar?&quot;</span> — and an LLM answers with the actual
              knowledge base as context, streamed word by word.
            </motion.p>
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {['pgvector', 'Groq', 'Streaming', 'RAG over my resume'].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </motion.div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href="/ask"
                className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-4 sm:px-6 py-2 sm:py-3 font-headline text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-primary shadow-[4px_4px_0_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000000] dark:border-white dark:bg-primary-yellow dark:text-on-primary dark:shadow-[4px_4px_0_#ffffff] dark:hover:shadow-[2px_2px_0_#ffffff]"
              >
                <Sparkles size={14} />
                Try the assistant
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card padding="p-4 sm:p-6">
              <div className="font-mono text-[10px] text-on-surface-variant dark:text-ink-dark/70">
                <p className="font-bold text-primary dark:text-white">aditya@portfolio:~$</p>
                <p className="mt-2">try: help · projects · hire · ask</p>
                <p className="mt-4 text-on-surface-variant/60 dark:text-ink-dark/40">
                  Every experience, project and skill on this site is chunked into a vector database.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
