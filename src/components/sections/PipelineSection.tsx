'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

const STAGES = [
  {
    name: 'Collect',
    desc: 'ODK Collect forms, APIs, surveys — offline-first, structured.',
  },
  {
    name: 'Clean',
    desc: 'Python + Pandas validation. Missing, malformed, outlier — fixed.',
  },
  {
    name: 'Analyse',
    desc: 'SQL, Dash, Plotly. The insight survives a room of sceptics.',
  },
  {
    name: 'Decide',
    desc: 'MIS reports on decision-makers\u2019 desks — Monday morning.',
  },
];

const LABELS = ['FIELD / ODK', 'PYTHON · PANDAS', 'SQL · DASH', 'DECISION / MIS'];

interface PipelineSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;
}

function withAlpha(hex: string, alpha: number) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) return hex + Math.round(alpha * 255).toString(16).padStart(2, '0');
  return hex;
}

export function PipelineSection({
  eyebrow = '/* 02 · THE PIPELINE */',
  title = (
    <>
      Raw data flows through <span className="text-gradient">four stages</span> — never more
    </>
  ),
  sub = "Every project I touch follows the same pipeline. It keeps the work honest: collect only what matters, clean what's broken, prove the insight, then act on it.",
}: PipelineSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const inView = useInView(wrapRef, { once: false, margin: '-120px' });

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let W = 0;
    let H = 240;
    let flow = 0;
    let frame = 0;
    const activeRef = { value: 0 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        primary: cs.getPropertyValue('--primary').trim() || '#10b981',
        cyan: cs.getPropertyValue('--cyan').trim() || '#06b6d4',
        indigo: cs.getPropertyValue('--indigo').trim() || '#6366f1',
        bg: cs.getPropertyValue('--bg').trim() || '#0a0e17',
        ink3: cs.getPropertyValue('--ink-3').trim() || '#8b91a3',
        ink4: cs.getPropertyValue('--ink-4').trim() || '#5a6075',
        line: cs.getPropertyValue('--line').trim() || 'rgba(255,255,255,0.08)',
      };
    };
    let colors = readColors();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth || 800;
      H = canvas.offsetHeight || 240;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const stageXs = () => {
      const pad = Math.max(56, W * 0.07);
      const span = W - pad * 2;
      return STAGES.map((_, i) => pad + (span * i) / (STAGES.length - 1));
    };

    const loop = () => {
      frame++;
      if (frame % 24 === 0) colors = readColors();
      ctx.clearRect(0, 0, W, H);

      const midY = H / 2 + 10;
      const xs = stageXs();
      const left = xs[0];
      const right = xs[xs.length - 1];
      const span = right - left;
      const grad = ctx.createLinearGradient(left, 0, right, 0);
      grad.addColorStop(0, colors.primary);
      grad.addColorStop(0.5, colors.cyan);
      grad.addColorStop(1, colors.indigo);

      ctx.strokeStyle = withAlpha(colors.primary, 0.14);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = left; x <= right; x += 2) {
        const y = midY - 50 - Math.sin((x + flow * 2) / 44) * 10 - Math.sin((x + flow) / 18) * 5;
        if (x === left) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(right, midY);
      ctx.stroke();

      for (let i = 0; i < 9; i++) {
        const x = left + ((flow + i * (span / 9)) % span);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, midY, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(x - 1, midY - 1, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      const nextStage = Math.floor(flow / 60) % STAGES.length;
      if (nextStage !== activeRef.value) {
        activeRef.value = nextStage;
        setActive(nextStage);
      }

      xs.forEach((x, i) => {
        const isActive = i === activeRef.value;
        ctx.fillStyle = isActive ? colors.primary : withAlpha(colors.ink4, 0.5);
        ctx.shadowColor = isActive ? colors.primary : 'transparent';
        ctx.shadowBlur = isActive ? 18 : 0;
        ctx.beginPath();
        ctx.arc(x, midY, isActive ? 12 : 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = colors.bg;
        ctx.font = '700 11px "JetBrains Mono", ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i + 1), x, midY + 1);

        ctx.fillStyle = isActive ? colors.primary : withAlpha(colors.ink3, 0.85);
        ctx.font = '600 10.5px "JetBrains Mono", ui-monospace, monospace';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(LABELS[i], x, midY - 30);

        ctx.fillStyle = withAlpha(colors.ink4, 0.8);
        ctx.font = '9.5px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillText(STAGES[i].name.toLowerCase(), x, midY + 28);
      });

      flow += 1.6;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [inView]);

  return (
    <section id="pipeline" className="relative flex h-full w-full flex-col justify-center overflow-hidden px-5 lg:px-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 700px 500px at 50% 40%, var(--hero-glow-1), transparent 60%)',
        }}
      />
      <div ref={wrapRef} className="relative mx-auto w-full max-w-[1500px]">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} className="mb-6" />

        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-bg-2/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-5">
          <div className="absolute inset-x-5 top-0 h-px" style={{ background: 'var(--grad-2)' }} />
          <div className="mb-2 flex items-center justify-between font-mono text-[12px] tracking-[0.14em] text-ink-3">
            <span>PIPELINE.DAG · RUNNING</span>
            <span className="inline-flex items-center gap-2 text-primary">
              <span className="pulse !h-1.5 !w-1.5" /> LIVE
            </span>
          </div>

          <canvas ref={canvasRef} className="block h-[190px] w-full sm:h-[210px]" aria-label="Animated data pipeline DAG" />

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((s, i) => (
              <button
                key={s.name}
                onMouseEnter={() => setActive(i)}
                className={`rounded-lg border p-3 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-primary bg-primary/10'
                    : 'border-[var(--line)] bg-bg/60 hover:-translate-y-0.5 hover:border-primary/50'
                }`}
              >
                <div className="font-mono text-[11.5px] tracking-[0.18em] text-ink-4">
                  STAGE 0{i + 1} {active === i && <span className="text-primary">· ACTIVE</span>}
                </div>
                <div className={`mt-0.5 text-[15px] font-semibold ${active === i ? 'text-primary' : 'text-ink'}`}>{s.name}</div>
                <div className="mt-0.5 text-[12.5px] leading-relaxed text-ink-3">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
