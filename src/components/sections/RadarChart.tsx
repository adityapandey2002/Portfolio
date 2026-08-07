'use client';

import { useId, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RadarChartProps {
  labels: string[];
  data: number[];
  size?: number;
}

export function RadarChart({ labels, data, size = 340 }: RadarChartProps) {
  const uid = useId().replace(/[:]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const n = labels.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 44;
  const angleStep = (Math.PI * 2) / n;
  const gridLevels = [0.25, 0.5, 0.75, 1];

  const point = (i: number, r: number) => {
    const a = -Math.PI / 2 + i * angleStep;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  const poly = (vals: number[]) =>
    vals
      .map((v, i) => {
        const [x, y] = point(i, (v / 100) * R);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">
        <defs>
          <linearGradient id={`radar-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.85" />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {gridLevels.map((lv) => (
          <polygon
            key={lv}
            points={poly(Array(n).fill(lv * 100))}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: n }).map((_, i) => {
          const [x, y] = point(i, R);
          const [lx, ly] = point(i, R + 18);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink-2"
                fontSize="9.5"
                fontFamily="var(--font-jetbrains), monospace"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}

        <motion.polygon
          points={poly(data)}
          fill={`url(#radar-${uid})`}
          fillOpacity="0.16"
          stroke={`url(#radar-${uid})`}
          strokeWidth="2"
          filter={`url(#glow-${uid})`}
          initial={{ opacity: 0, scale: 0.6, transformOrigin: `${cx}px ${cy}px` }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {data.map((v, i) => {
          const [x, y] = point(i, (v / 100) * R);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="var(--primary)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.06 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
