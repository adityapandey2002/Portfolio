'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const KM_TOTAL = 13000;
const KM_MAX = 20000;

export function Gauge() {
  const frac = KM_TOTAL / KM_MAX;
  const cx = 170;
  const cy = 150;
  const r = 76;
  const arcPath = `M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`;
  const ticks = Array.from({ length: 21 }, (_, i) => i * (KM_MAX / 20));

  return (
    <div className="relative mx-auto w-full max-w-[340px] shrink">
      <svg viewBox="0 0 340 240" className="h-auto max-h-[min(36vh,240px)] w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="55%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>

        {ticks.map((v) => {
          const a = Math.PI - (v / KM_MAX) * Math.PI;
          const major = v % 1000 === 0;
          const rIn = r - (major ? 9 : 5);
          return (
            <line
              key={v}
              x1={cx + rIn * Math.cos(a)}
              y1={cy - rIn * Math.sin(a)}
              x2={cx + r * Math.cos(a)}
              y2={cy - r * Math.sin(a)}
              stroke={major ? 'var(--ink-2)' : 'var(--ink-4)'}
              strokeWidth={major ? 2 : 1}
            />
          );
        })}

        <path d={arcPath} fill="none" stroke="var(--line-2)" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <motion.path
          d={arcPath}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: frac }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.8, delay: 0.35, ease: EASE }}
        />

        {[0, 0.5, 1].map((f) => {
          const a = Math.PI - f * Math.PI;
          const rl = r - 22;
          return (
            <text
              key={f}
              x={cx + rl * Math.cos(a)}
              y={cy - rl * Math.sin(a) + 4}
              textAnchor="middle"
              fill="var(--ink-3)"
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {Math.round((f * KM_MAX) / 1000)}k
            </text>
          );
        })}

        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          initial={{ rotate: -90 }}
          whileInView={{ rotate: -90 + 180 * frac }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 2, delay: 0.5, ease: EASE }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - 50}
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px var(--accent-glow))' }}
          />
        </motion.g>
        <circle cx={cx} cy={cy} r="7.5" fill="var(--bg-3)" stroke="var(--accent)" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="2.5" fill="var(--accent)" />
      </svg>

      <div className="absolute inset-x-0 bottom-2 flex flex-col items-center gap-1">
        <div className="flex items-end gap-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <span className="font-serif text-[clamp(40px,4.5vw,58px)] leading-none tracking-tight text-ink">
            {KM_TOTAL.toLocaleString('en-IN')}
          </span>
          <span className="mb-1 font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-3">KM</span>
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-4">
          field distance · since jul 2025
        </span>
      </div>
    </div>
  );
}