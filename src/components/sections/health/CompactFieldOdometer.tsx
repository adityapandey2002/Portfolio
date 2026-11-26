'use client';

import { useEffect, useRef, useState } from 'react';
import { Gauge } from 'lucide-react';

const TARGET_KM = 13627;
const DIAL_MAX = 15000;
const ARC_LENGTH = 235.6; // pi * 75 (semi-circle radius 75)

export function CompactFieldOdometer() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [km, setKm] = useState(TARGET_KM);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setKm(TARGET_KM);
      return;
    }

    let raf = 0;
    const startTime = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setKm(Math.round(TARGET_KM * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  const ratio = Math.min(1, km / DIAL_MAX);
  const dashOffset = ARC_LENGTH * (1 - ratio);
  const needleAngle = -90 + ratio * 180;

  return (
    <div
      ref={cardRef}
      data-testid="compact-field-odometer"
      className="bg-surface-container-lowest border-3 border-outline p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#0e0e10] flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2 border-b-2 border-outline pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              METRIC 04 · FIELD ODOMETER
            </span>
          </div>
          <Gauge size={18} className="text-secondary shrink-0" aria-hidden="true" />
        </div>

        {/* Compact Semi-Circular Analog Speedometer */}
        <div className="flex flex-col items-center pt-1">
          <svg
            viewBox="0 0 200 118"
            className="w-full max-w-[220px] overflow-visible"
            role="img"
            aria-label="Field travel odometer showing 13,627 kilometers logged across 16 Bihar blocks"
          >
            {/* Background Track Arc */}
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-outline/20 dark:text-white/15"
            />
            {/* Active Progress Arc */}
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={ARC_LENGTH}
              strokeDashoffset={dashOffset}
              className="text-secondary dark:text-[#facc15] transition-[stroke-dashoffset] duration-150"
            />
            {/* Scale Ticks */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const deg = -180 + frac * 180;
              const rad = (deg * Math.PI) / 180;
              const x1 = 100 + Math.cos(rad) * 63;
              const y1 = 100 + Math.sin(rad) * 63;
              const x2 = 100 + Math.cos(rad) * 56;
              const y2 = 100 + Math.sin(rad) * 56;
              return (
                <line
                  key={frac}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-on-surface-variant"
                />
              );
            })}
            {/* Sweeping Needle */}
            <g transform={`translate(100 100) rotate(${needleAngle})`}>
              <line
                x1="0"
                y1="4"
                x2="0"
                y2="-60"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary dark:text-white"
              />
              <circle cx="0" cy="0" r="6" className="fill-primary dark:fill-[#facc15]" />
            </g>
            {/* Scale Labels */}
            <text
              x="16"
              y="115"
              className="fill-current text-[9px] font-mono font-bold text-on-surface-variant"
            >
              0
            </text>
            <text
              x="164"
              y="115"
              className="fill-current text-[9px] font-mono font-bold text-on-surface-variant"
            >
              15k
            </text>
          </svg>

          <div className="-mt-1 text-center">
            <div className="font-display text-4xl font-extrabold tracking-tight tabular-nums leading-none text-on-surface">
              {km.toLocaleString('en-IN')}{' '}
              <span className="font-mono text-sm font-bold uppercase text-secondary dark:text-[#facc15]">
                KM
              </span>
            </div>
            <h3 className="mt-1.5 font-display text-sm font-bold uppercase tracking-tight text-on-surface">
              Field Distance Logged
            </h3>
            <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
              Motorcycle &amp; public transit visits across 16 Muzaffarpur &amp; North Bihar blocks.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t-2 border-outline flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-2">
        <span>16 BLOCKS COVERED</span>
        <span className="bg-accent-yellow dark:bg-primary-yellow text-black px-2 py-0.5 border border-outline">
          JUL 2025–NOW
        </span>
      </div>
    </div>
  );
}
