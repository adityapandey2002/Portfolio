'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { CompetencyIndex } from './CompetencyIndex';

/**
 * Pipeline — Frontline-to-Insight Pipeline with the animated Canvas DAG
 * from the previous version, styled cleanly for the Bauhaus light/dark theme,
 * followed by the redesigned Engineering & Domain Competency Index.
 */

const STAGES = [
  {
    num: '01',
    canvasLabel: 'FIELD / ODK',
    stage: 'Ingestion',
    title: 'Collect',
    body: 'Offline ODK & IndexedDB capture on 2G or zero signal.',
    tech: 'ODK · Dexie.js · IndexedDB',
    accentBg: 'bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214]',
  },
  {
    num: '02',
    canvasLabel: 'PYTHON · PANDAS',
    stage: 'Sanitization',
    title: 'Clean',
    body: 'Automated Python checks removing duplicates and register mismatches.',
    tech: 'Python · Pandas · Validation Rules',
    accentBg: 'bg-secondary text-white dark:text-[#121214]',
  },
  {
    num: '03',
    canvasLabel: 'SQL · DASH',
    stage: 'Computation',
    title: 'Analyse',
    body: 'SQL aggregations and risk maps spotting block-level bottlenecks.',
    tech: 'PostgreSQL · SQL · D3.js · Plotly',
    accentBg: 'bg-tertiary text-white dark:text-[#121214]',
  },
  {
    num: '04',
    canvasLabel: 'DECISION / MIS',
    stage: 'Action',
    title: 'Decide',
    body: 'Monday MIS briefs ready for doctors and district officers.',
    tech: 'Automated MIS · Review Dashboards',
    accentBg: 'bg-primary-container text-on-primary-container dark:bg-[#facc15] dark:text-[#121214]',
  },
];

function withAlpha(color: string, alpha: number): string {
  const hex = color.trim();
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    return `${hex}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')}`;
  }
  return hex;
}

export function Pipeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const lockedStageRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const inView = useInView(wrapRef, { once: false, margin: '-80px' });

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let W = 800;
    let H = 200;
    let flow = 0;
    let frame = 0;
    const activeRef = { value: 0 };

    const readColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark
        ? {
            primary: '#facc15',
            secondary: '#ff6b4a',
            tertiary: '#60a5fa',
            surface: '#141417',
            nodeText: '#121214',
            ink: '#f4f4f5',
            inkMuted: '#9ca3af',
            line: 'rgba(255, 255, 255, 0.16)',
            grid: 'rgba(255, 255, 255, 0.05)',
          }
        : {
            primary: '#1a1a1a',
            secondary: '#e63b2e',
            tertiary: '#0055ff',
            surface: '#faf7f2',
            nodeText: '#faf7f2',
            ink: '#1a1a1a',
            inkMuted: '#52525b',
            line: 'rgba(26, 26, 26, 0.2)',
            grid: 'rgba(26, 26, 26, 0.05)',
          };
    };

    let colors = readColors();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth || 800;
      H = canvas.offsetHeight || 200;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const stageXs = () => {
      const pad = Math.max(54, Math.min(110, W * 0.1));
      const span = Math.max(100, W - pad * 2);
      return STAGES.map((_, i) => pad + (span * i) / (STAGES.length - 1));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, W, H);

      // Subtle architectural grid lines
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      for (let gx = 40; gx < W; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }

      const midY = H / 2 + 12;
      const xs = stageXs();
      const left = xs[0];
      const right = xs[xs.length - 1];
      const span = right - left;

      const grad = ctx.createLinearGradient(left, 0, right, 0);
      grad.addColorStop(0, colors.secondary);
      grad.addColorStop(0.5, colors.tertiary);
      grad.addColorStop(1, colors.primary);

      // Animated telemetry sine wave above track (from original PipelineSection)
      ctx.strokeStyle = withAlpha(colors.secondary, 0.25);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let x = left; x <= right; x += 2) {
        const y =
          midY -
          48 -
          Math.sin((x + flow * 2) / 42) * 9 -
          Math.sin((x + flow) / 17) * 4;
        if (x === left) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Main horizontal pipeline rail
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(right, midY);
      ctx.stroke();

      // Active progress segment highlight up to active stage
      const currentIdx = lockedStageRef.current ?? activeRef.value;
      const activeX = xs[currentIdx] ?? left;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(activeX, midY);
      ctx.stroke();

      // 9 Flowing data packets along the track
      for (let i = 0; i < 9; i++) {
        const x = left + ((flow + i * (span / 9)) % span);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, midY, 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.beginPath();
        ctx.arc(x - 1, midY - 1, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stage Nodes
      xs.forEach((x, i) => {
        const isActive = i === currentIdx;
        const isPassed = i < currentIdx;

        // Outer pulse ring on active node
        if (isActive) {
          const pulseR = 16 + Math.sin(flow * 0.1) * 3.5;
          ctx.strokeStyle = withAlpha(colors.secondary, 0.45);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, midY, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Core node circle
        ctx.fillStyle = isActive
          ? colors.secondary
          : isPassed
            ? colors.primary
            : colors.surface;
        ctx.strokeStyle = isActive ? colors.secondary : colors.primary;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x, midY, isActive ? 13 : 9.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Stage number inside node
        ctx.fillStyle = isActive
          ? '#ffffff'
          : isPassed
            ? colors.nodeText
            : colors.ink;
        ctx.font = '700 11px "JetBrains Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i + 1), x, midY + 0.5);

        // Top technical label (compact on small screens)
        if (W >= 520 || isActive) {
          ctx.fillStyle = isActive ? colors.secondary : colors.inkMuted;
          ctx.font = '700 10.5px "JetBrains Mono", ui-monospace, monospace';
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(STAGES[i].canvasLabel, x, midY - 26);
        }

        // Bottom stage name
        ctx.fillStyle = isActive ? colors.ink : colors.inkMuted;
        ctx.font = isActive
          ? '700 11px "Bricolage Grotesque", system-ui, sans-serif'
          : '600 10px "Bricolage Grotesque", system-ui, sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(STAGES[i].title.toUpperCase(), x, midY + 20);
      });
    };

    const loop = () => {
      frame++;
      if (frame % 24 === 0) colors = readColors();

      if (!pausedRef.current && !prefersReducedMotion) {
        flow += 1.5;
        if (lockedStageRef.current === null) {
          const nextStage = Math.floor(flow / 85) % STAGES.length;
          if (nextStage !== activeRef.value) {
            activeRef.value = nextStage;
            setActive(nextStage);
          }
        }
      }

      drawFrame();

      if (inView && !prefersReducedMotion) {
        raf = window.requestAnimationFrame(loop);
      }
    };

    drawFrame();
    if (inView && !prefersReducedMotion) {
      raf = window.requestAnimationFrame(loop);
    }

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [inView]);

  const handleStageSelect = (idx: number) => {
    lockedStageRef.current = idx;
    setActive(idx);
  };

  const handleStageLeave = () => {
    if (!paused) {
      lockedStageRef.current = null;
    }
  };

  const togglePlayPause = () => {
    setPaused((prev) => {
      const next = !prev;
      if (!next) {
        lockedStageRef.current = null;
      } else {
        lockedStageRef.current = active;
      }
      return next;
    });
  };

  return (
    <section
      id="pipeline"
      className="border-b-4 border-primary bg-surface-container-high px-4 py-12 dark:border-[#3f3f46] dark:bg-[#121214] sm:px-8 lg:px-12 lg:py-16"
    >
      <div ref={wrapRef} className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b-2 border-primary pb-4 dark:border-[#3f3f46] sm:flex-row sm:items-end">
          <div>
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-secondary">
              06 · Data Systems Methodology
            </span>
            <h2 className="mt-1 font-headline text-3xl font-bold uppercase tracking-tight text-on-surface sm:text-5xl">
              Frontline-to-Insight Pipeline
            </h2>
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Four-Stage Field Data Architecture
          </div>
        </div>

        {/* Concise Intro Line */}
        <p className="max-w-2xl font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
          From offline field registers in Bihar to district decisions in four automated stages.
        </p>

        {/* Animated Canvas DAG Panel + Interactive Stage Cards */}
        <div className="border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1a1a1e] dark:shadow-[6px_6px_0px_#000000]">
          {/* Canvas Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary bg-surface-container px-4 py-3 dark:border-[#3f3f46] dark:bg-[#222227] sm:px-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
              <span className="text-secondary dark:text-[#facc15]">
                STAGE {STAGES[active].num} / 04
              </span>
              <span aria-hidden="true">·</span>
              <span>{STAGES[active].title}</span>
              <span className="hidden text-on-surface-variant sm:inline">
                ({STAGES[active].canvasLabel})
              </span>
            </div>

            <button
              type="button"
              onClick={togglePlayPause}
              className="inline-flex items-center gap-1.5 border-2 border-primary bg-surface px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-on-surface transition-colors hover:bg-primary hover:text-on-primary dark:border-[#3f3f46] dark:bg-[#141417] dark:hover:border-[#facc15] dark:hover:text-[#facc15]"
            >
              {paused ? (
                <>
                  <Play size={12} aria-hidden="true" />
                  <span>Resume Flow</span>
                </>
              ) : (
                <>
                  <Pause size={12} aria-hidden="true" />
                  <span>Pause Flow</span>
                </>
              )}
            </button>
          </div>

          {/* Live Animated Canvas DAG */}
          <div className="border-b-2 border-primary bg-surface px-3 py-2 dark:border-[#3f3f46] dark:bg-[#141417] sm:px-6">
            <canvas
              ref={canvasRef}
              data-testid="pipeline-canvas"
              data-active-stage={active}
              className="block h-[175px] w-full sm:h-[205px]"
              aria-label="Animated four-stage data pipeline moving from Collect to Clean, Analyse, and Decide"
            />
          </div>

          {/* 4 Interactive Synchronized Stage Cards */}
          <div className="grid grid-cols-1 divide-y-2 divide-primary/20 dark:divide-[#3f3f46] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x-2">
            {STAGES.map((stage, idx) => {
              const isActive = active === idx;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  onMouseEnter={() => handleStageSelect(idx)}
                  onMouseLeave={handleStageLeave}
                  aria-pressed={isActive}
                  className={`flex flex-col justify-between p-5 text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-surface-container dark:bg-[#24242b]'
                      : 'bg-surface-container-lowest hover:bg-surface dark:bg-[#1a1a1e] dark:hover:bg-[#1f1f25]'
                  }`}
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className={`flex h-9 w-9 items-center justify-center border-2 border-primary font-headline text-sm font-bold dark:border-[#3f3f46] ${
                          isActive
                            ? stage.accentBg
                            : 'bg-surface text-on-surface dark:bg-[#141417]'
                        }`}
                      >
                        {stage.num}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                          isActive
                            ? 'text-secondary dark:text-[#facc15]'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {isActive ? 'Active Stage' : stage.stage}
                      </span>
                    </div>
                    <h3 className="font-headline text-xl font-bold uppercase text-on-surface">
                      {stage.title}
                    </h3>
                    <p className="mt-2 font-body text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                      {stage.body}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-primary/20 pt-3 font-mono text-[11px] font-medium text-on-surface-variant dark:border-[#3f3f46]">
                    {stage.tech}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Redesigned Engineering & Domain Competency Index */}
        <CompetencyIndex />
      </div>
    </section>
  );
}
