'use client';

import Link from 'next/link';
import { ArrowDownLeft, Activity, HeartPulse, Compass, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { CountUp } from './CountUp';
import { PillarsOfWork } from './PillarsOfWork';
import { FieldSection } from './FieldSection';
import { DistrictVisitMap } from './DistrictVisitMap';

const TRAINING = [
  {
    icon: Compass,
    title: 'CBCT & leadership workshop — Hajipur',
    body: 'Participated in <strong>Cognitively-Based Compassion Training (CBCT)</strong> with the fellowship cohort — and supported the same training being delivered to others, strengthening facilitation, empathy-led problem solving, and field leadership.',
    tags: ['Fellowship Training', 'Facilitation', 'Hajipur'],
  },
  {
    icon: Flower2,
    title: '10-day Vipassana — Dhamma Vaishali',
    body: 'Sat a <strong>10-day Vipassana meditation course</strong> at Dhamma Vaishali — discipline, stillness, and sustained focus that carries straight into field days and long debug sessions.',
    tags: ['Meditation', 'Discipline', 'Bihar'],
  },
];

const VITALS = [
  { label: 'ASHA workers trained (M-ASHA)', value: 700, suffix: '+', pct: 100, foot: 'Field trainings · hands-on' },
  { label: 'Clinical refresher hours', value: 185, suffix: 'h', pct: 100, foot: '12 Staff Nurses · 4 Doctors' },
  { label: 'VHSND sessions QC’d', value: 100, suffix: '+', pct: 100, foot: 'ODK field data validated' },
  { label: 'PMSMA · PHC/CHC blocks', value: 30, suffix: '+', pct: 100, foot: 'Bihar · Muzaffarpur' },
] as const;

const DIAGNOSTICS = [
  { name: 'M-ASHA rollout — ASHA capacity building', status: 'OPERATIONAL', tone: 'green' },
  { name: 'ODK Central sync — VHSND data pipeline', status: 'OPERATIONAL', tone: 'green' },
  { name: 'MIS reporting — weekly block summaries', status: 'OPERATIONAL', tone: 'green' },
  { name: 'Medicine & equipment forecasting', status: 'IN PROGRESS', tone: 'amber' },
] as const;

const KM_TOTAL = 13000;
const KM_MAX = 20000;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Gauge() {
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

function FieldKmMeter() {
  return (
    <section className="mx-auto flex h-full min-h-0 w-full max-w-[1500px] flex-col justify-center gap-4 px-5 lg:px-10">
      <SectionHeading
        eyebrow="/* FIELD KM */"
        title={
          <>
            Distance, <span className="text-gradient">logged like data</span>
          </>
        }
        sub="Every block visit is a data point. This is the odometer of the fellowship so far."
      />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-3 p-5 lg:p-6" style={{ background: 'var(--bg-2)' }}>
          <div className="flex shrink-0 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            <span>Field odometer · analog</span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="blip h-1.5 w-1.5 rounded-full bg-primary" /> LIVE
            </span>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Gauge />
          </div>
        </div>

        <div className="flex min-h-0 flex-col p-5 lg:p-6" style={{ background: 'var(--bg-2)' }}>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
            <DistrictVisitMap />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HealthDashboard() {
  return (
    <>
      {/* Header */}
      <div className="snap-section">
        <header className="relative mx-auto max-w-[1500px] px-5 lg:px-10">
          <span className="eyebrow">{'/* FIELD VITALS */'}</span>
          <h1 className="mt-3 font-serif text-[clamp(38px,5vw,64px)] leading-[1.05] tracking-tight">
            The fellowship, <span className="text-gradient">on vitals</span>
          </h1>
          <p className="section-sub mt-3 max-w-[560px]">
          Gandhi Fellowship · Piramal Foundation. Health-system strengthening across Bihar — based in
          Muzaffarpur — every number tracked like it&apos;s patient data. Because it is.
          </p>
        </header>
      </div>

      {/* The field — where the data starts */}
      <div className="snap-section">
        <FieldSection />
      </div>

      {/* Pillars of Work — strategic framework */}
      <PillarsOfWork />

      {/* Monitor panel */}
      <div className="snap-section">
        <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-5">
          {/* Patient monitor */}
          <div className="relative flex flex-col justify-between gap-8 p-8" style={{ background: 'var(--bg-2)' }}>
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
              <span>PATIENT · BIHAR FIELD PROGRAM</span>
              <span className="inline-flex items-center gap-1.5 text-primary">
                <span className="blip h-2 w-2 rounded-full bg-primary" /> LIVE
              </span>
            </div>

            <div className="relative">
              <svg viewBox="0 0 600 120" className="h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M0,60 L30,60 L36,53 L44,67 L50,60 L120,60 L140,26 L156,92 L172,60 L250,60 L258,50 L266,70 L274,60 L340,60 L356,30 L372,58 L382,62 L400,60 L470,60 L478,52 L486,68 L494,60 L600,60"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="ecg-path"
                />
              </svg>
              <div className="absolute -bottom-1 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">lead II · 25 mm/s</div>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">System Health</span>
                <span className="font-serif text-[44px] leading-none tracking-tight">
                  <CountUp target={94} suffix="%" className="text-gradient" />
                </span>
              </div>
              <div className="mt-4 h-3.5 overflow-hidden rounded-full border border-[var(--line-2)] bg-[var(--bg-3)]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      'repeating-linear-gradient(90deg, var(--primary) 0 12px, var(--bg-2) 12px 14px)',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '94%' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                />
              </div>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
                Field data + capacity building · <span className="text-primary">NORMAL</span>
              </p>
            </div>
          </div>

          {/* Side rails */}
          <div className="flex flex-col gap-px bg-[var(--line)] lg:col-span-2">
            {[
              { k: 'Field sessions logged', v: 1200, unit: 'sessions', pct: 86 },
              { k: 'Data quality score', v: 96, unit: '%', pct: 96 },
              { k: 'ASHA coverage', v: 94, unit: '%', pct: 94 },
            ].map((m, i) => (
              <div key={m.k} className="flex flex-1 flex-col justify-center gap-3 p-7" style={{ background: 'var(--bg-2)' }}>
                <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
                  <span>{m.k}</span>
                  <span className="text-primary">{m.unit}</span>
                </div>
                <div className="font-serif text-[clamp(30px,3vw,44px)] leading-none tracking-tight text-ink">
                  <CountUp target={m.v} />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-3)]">
                  <motion.div
                    className="h-full"
                    style={{ background: m.pct > 90 ? 'var(--primary)' : 'var(--accent)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.pct}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.2, delay: 0.1 + i * 0.15, ease: EASE }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </div>

      <div className="snap-section">
        <FieldKmMeter />
      </div>

      {/* Vitals grid */}
      <div className="snap-section">
        <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* VITALS */"
          title={
            <>
              What the field <span className="text-gradient">reads back</span>
            </>
          }
          sub="Capacity built, data cleaned, systems moving. These are the vitals I track week to week."
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 xl:grid-cols-4">
          {VITALS.map((v, i) => (
            <motion.div
              key={v.label}
              className="group relative flex flex-col justify-between gap-5 p-5 lg:p-6"
              style={{ background: 'var(--bg-2)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">{v.label}</span>
                <HeartPulse size={14} className="text-primary" />
              </div>
              <div>
                <div className="font-serif text-[clamp(32px,2.7vw,44px)] leading-none tracking-tight text-ink">
                  <CountUp target={v.value} suffix={v.suffix} />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-3)]">
                  <motion.div
                    className="relative h-full overflow-hidden rounded-full"
                    style={{
                      background:
                        'repeating-linear-gradient(90deg, var(--primary) 0 10px, var(--bg-2) 10px 12px)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v.pct}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.3, delay: 0.2 + i * 0.1, ease: EASE }}
                  />
                </div>
                <div className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{v.foot}</div>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
        </section>
      </div>

      <div className="snap-section">
        <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* FIELD MIND */"
          title={
            <>
              What keeps the field <span className="text-gradient">steady</span>
            </>
          }
          sub="The weeks are full days. These are the practices that make the field work hold."
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {TRAINING.map((t, i) => (
            <motion.div
              key={t.title}
              className="group rounded-2xl border border-[var(--line)] bg-bg-2/60 p-6 transition-colors duration-300 hover:border-primary/50 lg:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <t.icon size={20} />
                </span>
                <h3 className="text-[15px] font-semibold leading-snug text-ink">{t.title}</h3>
              </div>
              <p
                className="mt-4 text-[13px] leading-[1.75] text-ink-2"
                dangerouslySetInnerHTML={{ __html: t.body }}
              />
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line-2)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        </section>
      </div>

      {/* Diagnostics */}
      <div className="snap-section">
        <section className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="/* DIAGNOSTICS */"
          title={
            <>
              Systems <span className="text-gradient">under monitoring</span>
            </>
          }
          sub="Programmes I run or support keep a status in the district. Here's where each one stands."
        />
        <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
          {DIAGNOSTICS.map((d, i) => (
            <motion.div
              key={d.name}
              className="flex flex-col gap-3 border-b border-[var(--line-2)] p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: i % 2 ? 'var(--bg-2)' : 'var(--bg-3)' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-3">
                <Activity size={15} className="shrink-0 text-primary" />
                <span className="text-[14px] text-ink">{d.name}</span>
              </div>
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-widest ${
                  d.tone === 'green' ? 'text-primary' : 'text-accent'
                }`}
                style={{
                  border: '1px solid currentColor',
                  background: d.tone === 'green' ? 'var(--primary-glow)' : 'var(--accent-glow)',
                }}
              >
                <span className={d.tone === 'green' ? 'h-1.5 w-1.5 rounded-full bg-primary' : 'blip h-1.5 w-1.5 rounded-full bg-accent'} />
                {d.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-lg border border-[var(--line)] bg-bg-2 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_12px_30px_-12px_var(--primary-glow)]"
          >
            <ArrowDownLeft size={15} />
            Back to the field
          </Link>
        </div>
        </section>
      </div>
    </>
  );
}