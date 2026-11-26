'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, BrainCircuit, Code2, Users } from 'lucide-react';

interface CompetencyDomain {
  id: string;
  index: string;
  shortLabel: string;
  name: string;
  pct: number;
  proof: string;
  skills: string[];
  accentBg: string;
  accentText: string;
  radarColor: string;
  icon: typeof Activity;
}

const COMPETENCIES: CompetencyDomain[] = [
  {
    id: 'leadership',
    index: '01',
    shortLabel: 'Field Leadership',
    name: 'Frontline Community & District Leadership',
    pct: 89,
    proof: '700+ ASHA workers mentored & 185-hr clinical refresher across 16 blocks',
    skills: ['ASHA Cohort Mentoring', 'NQAS Audits', 'Medical Officer Alignment', 'District MIS'],
    accentBg: 'bg-primary dark:bg-[#facc15]',
    accentText: 'text-primary dark:text-[#facc15]',
    radarColor: '#facc15',
    icon: Users,
  },
  {
    id: 'health',
    index: '02',
    shortLabel: 'Health Data',
    name: 'Public Health Informatics & Clinical Data',
    pct: 87,
    proof: '118k+ indicators validated across VHSND, PMSMA & ODK Central pipelines',
    skills: ['M-ASHA', 'ODK Collect & Central', 'Python & Pandas', 'Maternal Surveillance'],
    accentBg: 'bg-secondary',
    accentText: 'text-secondary',
    radarColor: '#e63b2e',
    icon: Activity,
  },
  {
    id: 'fullstack',
    index: '03',
    shortLabel: 'Full-Stack Web',
    name: 'Full-Stack Web & Offline Systems',
    pct: 82,
    proof: '5 live deployments including BiharKaSwaad & Sadar Hospital Portal',
    skills: ['Next.js & React', 'TypeScript', 'Node.js & Express', 'PostgreSQL & MySQL', 'Offline PWAs'],
    accentBg: 'bg-tertiary',
    accentText: 'text-tertiary',
    radarColor: '#0055ff',
    icon: Code2,
  },
  {
    id: 'ai',
    index: '04',
    shortLabel: 'Applied AI',
    name: 'Applied AI & Vector Retrieval (RAG)',
    pct: 78,
    proof: '181-field clinical voice AI & grounded RAG engines with source citations',
    skills: ['RAG Pipelines', 'pgvector', 'LLM Orchestration', 'Prompt Evaluation'],
    accentBg: 'bg-primary-container dark:bg-[#eab308]',
    accentText: 'text-on-surface dark:text-[#facc15]',
    radarColor: '#eab308',
    icon: BrainCircuit,
  },
];

const RADAR_AXES = [
  { label: 'Field Leadership', value: 89, domainId: 'leadership', angleDeg: -90 },
  { label: 'Health Data', value: 87, domainId: 'health', angleDeg: -30 },
  { label: 'SQL & ETL', value: 85, domainId: 'health', angleDeg: 30 },
  { label: 'Full-Stack', value: 82, domainId: 'fullstack', angleDeg: 90 },
  { label: 'Offline PWAs', value: 84, domainId: 'fullstack', angleDeg: 150 },
  { label: 'Applied AI', value: 78, domainId: 'ai', angleDeg: 210 },
];

const AVG_SCORE = Math.round(
  COMPETENCIES.reduce((sum, item) => sum + item.pct, 0) / COMPETENCIES.length,
);

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function CompetencyIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.22 });
  const [selectedId, setSelectedId] = useState<string>(COMPETENCIES[0].id);
  const [fillProgress, setFillProgress] = useState<number>(0);

  const selected = COMPETENCIES.find((c) => c.id === selectedId) ?? COMPETENCIES[0];

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setFillProgress(1);
      return;
    }

    let rafId = 0;
    const durationMs = 1150;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // Smooth cubic ease-out so meters surge and settle cleanly at target value
      const eased = 1 - Math.pow(1 - t, 3);
      setFillProgress(eased);
      if (t < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isInView]);

  const cx = 170;
  const cy = 155;
  const maxR = 104;
  const rings = [0.25, 0.5, 0.75, 1];

  const polygonPoints = RADAR_AXES.map((axis) => {
    const r = (axis.value / 100) * maxR * fillProgress;
    const pt = polarToCartesian(cx, cy, r, axis.angleDeg);
    return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
  }).join(' ');

  const displayAvg = Math.round(AVG_SCORE * fillProgress);
  const displaySelectedPct = Math.round(selected.pct * fillProgress);

  return (
    <div
      ref={containerRef}
      data-testid="competency-index"
      data-fill-progress={fillProgress.toFixed(2)}
      className="border-[3px] border-primary bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:border-[#3f3f46] dark:bg-[#1a1a1e] dark:shadow-[6px_6px_0px_#000000]"
    >
      {/* Header Strip */}
      <div className="flex flex-col justify-between gap-3 border-b-2 border-primary bg-surface-container px-6 py-5 dark:border-[#3f3f46] dark:bg-[#222227] sm:flex-row sm:items-end">
        <div>
          <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">
            Multidisciplinary Depth
          </span>
          <h3 className="mt-1 font-headline text-2xl font-bold uppercase tracking-tight text-on-surface sm:text-3xl">
            Engineering &amp; Domain Competency Index
          </h3>
        </div>
        <div className="font-mono text-xs text-on-surface-variant">
          Click or hover a discipline to inspect its field proof
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Animated Architectural Radar Visual */}
        <div className="flex flex-col justify-between border-b-2 border-primary bg-surface p-6 dark:border-[#3f3f46] dark:bg-[#141417] lg:col-span-5 lg:border-b-0 lg:border-r-2">
          <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
            <span className="font-bold uppercase tracking-wider text-on-surface">
              Capability Profile
            </span>
            <span className="tabular-nums">Avg. Score: {displayAvg}%</span>
          </div>

          {/* Crisp SVG Radar expanding outward on arrival */}
          <div className="my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 340 310"
              className="h-auto w-full max-w-[330px]"
              role="img"
              aria-label="Radar chart showing proficiency across field leadership, public health data, SQL and ETL, full-stack web, offline PWAs, and applied AI"
            >
              {/* Concentric hexagonal grid rings */}
              {rings.map((ratio) => {
                const pts = RADAR_AXES.map((a) => {
                  const pt = polarToCartesian(cx, cy, maxR * ratio, a.angleDeg);
                  return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                }).join(' ');
                return (
                  <polygon
                    key={ratio}
                    points={pts}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={ratio === 1 ? 0.35 : 0.16}
                    strokeWidth={ratio === 1 ? 1.5 : 1}
                    className="text-on-surface"
                  />
                );
              })}

              {/* Radial axis spokes */}
              {RADAR_AXES.map((axis) => {
                const outer = polarToCartesian(cx, cy, maxR, axis.angleDeg);
                const isSelected = axis.domainId === selectedId;
                return (
                  <line
                    key={axis.label}
                    x1={cx}
                    y1={cy}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="currentColor"
                    strokeOpacity={isSelected ? 0.55 : 0.18}
                    strokeWidth={isSelected ? 1.5 : 1}
                    className={isSelected ? 'text-secondary dark:text-[#facc15]' : 'text-on-surface'}
                  />
                );
              })}

              {/* Animated Filled Competency Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgb(var(--v2-accent-yellow-rgb) / 0.28)"
                stroke="rgb(var(--v2-accent-red-rgb))"
                strokeWidth="2.5"
                className="dark:stroke-[#facc15]"
              />

              {/* Vertices + Labels */}
              {RADAR_AXES.map((axis) => {
                const pt = polarToCartesian(
                  cx,
                  cy,
                  (axis.value / 100) * maxR * fillProgress,
                  axis.angleDeg,
                );
                const labelPt = polarToCartesian(cx, cy, maxR + 24, axis.angleDeg);
                const isSelected = axis.domainId === selectedId;

                return (
                  <g
                    key={axis.label}
                    onClick={() => setSelectedId(axis.domainId)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6.5 : 4.5}
                      className={
                        isSelected
                          ? 'fill-secondary stroke-primary stroke-2 dark:fill-[#facc15] dark:stroke-black'
                          : 'fill-primary stroke-surface stroke-[1.5] dark:fill-white dark:stroke-[#141417]'
                      }
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-mono text-[9.5px] font-bold uppercase ${
                        isSelected
                          ? 'fill-secondary dark:fill-[#facc15]'
                          : 'fill-on-surface-variant'
                      }`}
                    >
                      {axis.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Focused Proof Callout for Selected Domain */}
          <div className="border-t-2 border-primary/20 pt-4 dark:border-[#3f3f46]">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-[#facc15]">
                Selected Focus · {selected.index}
              </span>
              <span className="font-mono text-sm font-bold tabular-nums text-on-surface">
                {displaySelectedPct}%
              </span>
            </div>
            <p className="mt-1 font-headline text-sm font-bold text-on-surface">
              {selected.name}
            </p>
            <p className="mt-1 font-body text-xs leading-relaxed text-on-surface-variant">
              {selected.proof}
            </p>
          </div>
        </div>

        {/* Right: 4 Sculpted Interactive Competency Rows with Arrival Fill Animation */}
        <div className="divide-y-2 divide-primary/20 dark:divide-[#3f3f46] lg:col-span-7">
          {COMPETENCIES.map((comp, rowIdx) => {
            const Icon = comp.icon;
            const isSelected = selectedId === comp.id;
            const displayPct = Math.round(comp.pct * fillProgress);

            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => setSelectedId(comp.id)}
                onMouseEnter={() => setSelectedId(comp.id)}
                aria-pressed={isSelected}
                className={`group flex w-full flex-col gap-3 p-5 text-left transition-colors sm:p-6 ${
                  isSelected
                    ? 'bg-surface-container dark:bg-[#232329]'
                    : 'bg-surface-container-lowest hover:bg-surface dark:bg-[#1a1a1e] dark:hover:bg-[#1f1f25]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-primary transition-colors dark:border-[#3f3f46] ${
                        isSelected
                          ? 'bg-primary text-primary-container dark:bg-[#facc15] dark:text-[#121214]'
                          : 'bg-surface text-on-surface dark:bg-[#141417]'
                      }`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
                        <span className="font-bold tabular-nums">{comp.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{comp.shortLabel}</span>
                      </div>
                      <h4 className="mt-0.5 font-headline text-base font-bold text-on-surface sm:text-lg">
                        {comp.name}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="font-headline text-2xl font-bold tabular-nums text-on-surface sm:text-3xl">
                      {displayPct}
                      <span className="text-sm font-normal text-on-surface-variant">%</span>
                    </span>
                  </div>
                </div>

                {/* Smooth Scroll-Triggered Architectural Fill Bar with 10% Ruler Ticks */}
                <div
                  role="progressbar"
                  aria-label={comp.name}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={displayPct}
                  className="relative h-3.5 w-full overflow-hidden border-2 border-primary bg-surface dark:border-[#3f3f46] dark:bg-[#121214]"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isInView ? comp.pct / 100 : 0 }}
                    transition={{
                      duration: 1.05,
                      delay: rowIdx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: 'left center' }}
                    className={`h-full w-full ${comp.accentBg}`}
                  />

                  {/* Subtle architectural ruler divisions at every 10% */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid grid-cols-10"
                  >
                    {Array.from({ length: 10 }).map((_, tickIdx) => (
                      <span
                        key={tickIdx}
                        className={
                          tickIdx > 0
                            ? 'border-l border-primary/25 dark:border-black/40'
                            : ''
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Proof + Unboxed Skill List */}
                <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center">
                  <p className="font-body text-xs text-on-surface-variant">{comp.proof}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-medium text-on-surface/80 dark:text-on-surface-variant">
                  {comp.skills.map((skill, idx) => (
                    <span key={skill} className="inline-flex items-center gap-2">
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
