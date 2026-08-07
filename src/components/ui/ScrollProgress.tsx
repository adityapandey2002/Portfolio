'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--primary), var(--cyan), var(--accent), var(--primary))',
        backgroundSize: '200% 100%',
        filter: 'drop-shadow(0 0 6px var(--primary-glow))',
      }}
    />
  );
}