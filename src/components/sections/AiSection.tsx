'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';
import { Terminal } from '@/components/ui/Terminal';

export function AiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ask" className="relative flex h-full w-full items-center overflow-hidden px-5 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div ref={ref}>
          <SectionHeading
            eyebrow="/* 10 · THE AI */"
            className="mb-5"
            title={
              <>
                This portfolio has a <span className="text-gradient">RAG brain</span>
              </>
            }
          />
          <motion.p
            className="max-w-[520px] text-[14.5px] leading-relaxed text-ink-2"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Every experience, project and skill on this site is chunked into a vector database. Ask it anything —
            <span className="text-ink"> &quot;what did you build in Bihar?&quot;</span> — and an LLM answers with the actual
            knowledge base as context, streamed word by word.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {['pgvector', 'Groq · 70B', 'Streaming', 'RAG over my resume'].map((t) => (
              <span key={t} className="rounded-sm border border-[var(--line)] bg-bg-2 px-3 py-1.5 font-mono text-[10.5px] text-ink-2">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-7"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/ask" className="btn-primary inline-flex items-center gap-2">
              <Sparkles size={15} />
              Try the assistant
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 blur-2xl" />
          <div className="relative max-h-[55vh] overflow-hidden rounded-xl">
            <Terminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
