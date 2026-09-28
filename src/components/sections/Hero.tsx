'use client';

import { useMemo, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { profile } from '@/lib/data/profile';
import { usePreloader } from '@/components/ui/Preloader';
import { Magnetic } from '@/components/motion/Magnetic';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

const PIPELINE = ['FIELD', 'COLLECT', 'CLEAN', 'INSIGHT', 'DECISION'];

function SplitWord({
  text,
  accent,
  started,
  delay,
}: {
  text: string;
  accent?: boolean;
  started: boolean;
  delay: number;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className={`inline-block ${accent ? 'text-gradient' : ''}`}
          initial={{ y: '115%', opacity: 0, rotate: 4 }}
          animate={started ? { y: '0%', opacity: 1, rotate: 0 } : {}}
          transition={{ delay: delay + i * 0.018, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* Animated pipeline — cycles active stage every 1.4s */
function AnimatedPipeline({ started }: { started: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 1400);
    return () => clearInterval(id);
  }, [started]);

  return (
    <motion.div
      className="mt-6 hidden items-center gap-0 sm:flex"
      initial={{ opacity: 0 }}
      animate={started ? { opacity: 1 } : {}}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {PIPELINE.map((s, i) => (
        <span key={s} className="flex items-center">
          <motion.span
            className="rounded border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-all duration-300"
            animate={{
              borderColor: active === i ? 'var(--primary)' : 'var(--line)',
              background: active === i ? 'rgba(16,185,129,0.12)' : 'rgba(15,20,33,0.7)',
              color: active === i ? 'var(--primary)' : 'var(--ink-3)',
              boxShadow: active === i ? '0 0 12px var(--primary-glow)' : 'none',
            }}
            transition={{ duration: 0.35 }}
          >
            {s}
          </motion.span>
          {i < PIPELINE.length - 1 && (
            <motion.span
              className="px-1 font-mono text-[11px]"
              animate={{ color: active >= i ? 'var(--primary)' : 'var(--ink-4)', opacity: active >= i ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const { done } = usePreloader();
  const started = done;
  const heroRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const line1 = useMemo(() => ({ a: profile.headlineLines[0], b: profile.headlineLines[1] }), []);
  const line2 = useMemo(() => ({ a: profile.headlineLines[2], b: profile.headlineLines[3] }), []);
  const line3 = useMemo(() => ({ a: profile.headlineLines[4], b: profile.headlineLines[5] }), []);

  return (
    <section id="hero" ref={heroRef} className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-4 px-5 py-2 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative z-10">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[var(--line)] bg-bg-2 px-3 py-1.5"
          >
            <span className="flex h-2.5 w-2.5 items-center justify-center border border-primary bg-primary/10">
              <span className="h-1 w-1 bg-primary" />
            </span>
            <span className="font-mono text-[10.5px] tracking-wide text-ink-2">{profile.heroStatus}</span>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-serif leading-[0.98] tracking-tight"
            style={{ fontFamily: 'var(--font-lora), serif', fontSize: 'clamp(24px, 3vw, 48px)' }}
          >
            <span className="block">
              <SplitWord text={line1.a} started={started} delay={0.15} />
              <span className="mx-1.5 inline-block" />
              <SplitWord text={line1.b} accent started={started} delay={0.35} />
            </span>
            <span className="block">
              <SplitWord text={line2.a} started={started} delay={0.6} />
              <span className="mx-1.5 inline-block" />
              <SplitWord text={line2.b} accent started={started} delay={0.8} />
            </span>
            <span className="block">
              <SplitWord text={line3.a} started={started} delay={1.05} />
              <span className="mx-1.5 inline-block" />
              <SplitWord text={line3.b} accent started={started} delay={1.25} />
            </span>
          </h1>

          {/* Sub */}
          <motion.p
            className="mt-3 max-w-[500px] text-[13.5px] leading-relaxed text-ink-2"
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.heroSub.intro}
            <span className="font-medium text-ink">{profile.heroSub.name}</span>
            {profile.heroSub.body}
            {profile.heroSub.highlights.map((h, i) => (
              <span key={i}>
                {i > 0 ? ' · ' : ''}
                <span className="text-gradient font-medium">{h}</span>
              </span>
            ))}
            {profile.heroSub.tail}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <Link href="/work" className="btn-primary group inline-flex items-center gap-2">
                See my work
                <ArrowDownRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/ask" className="btn-ghost inline-flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                Ask me anything
              </Link>
            </Magnetic>
          </motion.div>

          {/* Animated pipeline */}
          <AnimatedPipeline started={started} />
        </div>

        {/* 3D scene */}
        <div className="relative hidden h-[clamp(240px,calc(34vh_*_var(--zoom-inv)),420px)] min-h-[210px] items-center justify-center lg:flex">
          <div className="sphere-halo absolute inset-0" />
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <HeroScene active={active} />
          <motion.span
            className="stamp absolute right-0 top-2"
            initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
            animate={started ? { opacity: 1, scale: 1, rotate: -5 } : {}}
            transition={{ delay: 1.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            FIELD APPROVED
          </motion.span>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2.3, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-4">Scroll</span>
          <span className="scroll-line" />
        </div>
      </motion.div>
    </section>
  );
}
