'use client';

import Link from 'next/link';
import { ArrowDownLeft, Activity, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { CountUp } from './CountUp';
import { PillarsOfWork } from './PillarsOfWork';
import { FieldSection } from './FieldSection';

const VITALS = [
  { label: 'ASHA workers trained (M-ASHA)', value: 700, suffix: '+', pct: 100, foot: 'Field trainings · hands-on' },
  { label: 'Clinical refresher hours', value: 185, suffix: 'h', pct: 100, foot: '12 Staff Nurses · 4 Doctors' },
  { label: 'VHSND sessions QC’d', value: 1200, suffix: '+', pct: 78, foot: 'ODK field data validated' },
  { label: 'PHC/CHC blocks covered', value: 6, suffix: '/6', pct: 100, foot: 'Bihar · Muzaffarpur' },
] as const;

const DIAGNOSTICS = [
  { name: 'M-ASHA rollout — ASHA capacity building', status: 'OPERATIONAL', tone: 'green' },
  { name: 'ODK Central sync — VHSND data pipeline', status: 'OPERATIONAL', tone: 'green' },
  { name: 'MIS reporting — weekly block summaries', status: 'OPERATIONAL', tone: 'green' },
  { name: 'Medicine & equipment forecasting', status: 'IN PROGRESS', tone: 'amber' },
] as const;

const KM_TOTAL = 8743;
const KM_MAX = 10000;
const ROUTE_D =
  'M 32 210 C 90 200, 118 148, 170 136 C 220 124, 240 172, 290 150 C 335 130, 355 88, 372 52';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Gauge() {
  const frac = KM_TOTAL / KM_MAX;
  const cx = 170;
  const cy = 150;
  const r = 76;
  const arcPath = `M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`;
  const ticks = Array.from({ length: 21 }, (_, i) => i * (KM_MAX / 20));

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <svg viewBox="0 0 340 240" className="w-full">
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
        <div className="flex items-end gap-2">
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

function RouteMap() {
  return (
    <svg viewBox="0 0 400 250" className="w-full">
      <defs>
        <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>

      <g stroke="var(--line-2)" strokeWidth="1" opacity="0.35">
        {[0, 1, 2, 3].map((i) => (
          <line key={`v${i}`} x1={40 + i * 80} y1="16" x2={40 + i * 80} y2="234" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`h${i}`} x1="20" y1={60 + i * 70} x2="380" y2={60 + i * 70} />
        ))}
      </g>

      <path d={ROUTE_D} fill="none" stroke="var(--line-2)" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />
      <path
        d={ROUTE_D}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 6px var(--primary-glow))' }}
      />
      <circle className="route-dot" r="5.5" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }} />

      <circle cx="32" cy="210" r="6" fill="var(--bg-3)" stroke="var(--primary)" strokeWidth="2" />
      <circle cx="32" cy="210" r="2" fill="var(--primary)" />
      <text x="32" y="196" textAnchor="middle" fill="var(--ink-3)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1">
        MUZAFFARPUR
      </text>

      <circle cx="170" cy="136" r="4" fill="var(--bg-3)" stroke="var(--ink-3)" strokeWidth="1.5" />
      <text x="170" y="128" textAnchor="middle" fill="var(--ink-4)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">
        CHC AUDITS
      </text>

      <circle cx="372" cy="52" r="6" fill="var(--bg-3)" stroke="var(--accent)" strokeWidth="2" />
      <circle className="blip" cx="372" cy="52" r="2.5" fill="var(--accent)" />
      <text x="372" y="42" textAnchor="middle" fill="var(--ink-2)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1">
        MUZAFFARPUR · NOW
      </text>
    </svg>
  );
}

function Odometer() {
  const digits = KM_TOTAL.toLocaleString('en-IN').split('');
  return (
    <div>
      <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
        <span>Field odometer · digital</span>
        <span className="inline-flex items-center gap-1.5 text-primary">
          <span className="blip h-1.5 w-1.5 rounded-full bg-primary" /> logging
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-[var(--line-2)] bg-[var(--bg-3)]">
        <div
          className="h-3 w-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, var(--ink-3) 0 1px, transparent 1px 9px)',
            opacity: 0.35,
          }}
        />
        <div className="flex items-end gap-1.5 px-4 pb-3 pt-1 font-serif text-[clamp(42px,5vw,72px)] leading-none tracking-tight text-ink">
          {digits.map((c, i) =>
            c === ',' ? (
              <span key={i} className="w-[0.38em] text-center text-ink-2">
                {c}
              </span>
            ) : (
              <span key={i} className="relative inline-block h-[1em] w-[0.7em] overflow-hidden">
                <motion.span
                  className="absolute inset-x-0 top-0 flex flex-col"
                  initial={{ y: '-110%' }}
                  whileInView={{ y: `-${Number(c) * 10}%` }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.9, delay: 0.2 + i * 0.12, ease: EASE }}
                >
                  {Array.from({ length: 10 }, (_, n) => (
                    <span key={n} className="flex h-[1em] items-center justify-center">
                      {n}
                    </span>
                  ))}
                </motion.span>
              </span>
            ),
          )}
          <span className="ml-2 pb-[0.16em] font-mono text-[0.42em] font-semibold tracking-[0.28em] text-ink-3">KM</span>
        </div>
      </div>
    </div>
  );
}

function FieldKmMeter() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10">
      <SectionHeading
        eyebrow="/* FIELD KM */"
        title={
          <>
            Distance, <span className="text-gradient">logged like data</span>
          </>
        }
        sub="Every block visit is a data point. This is the odometer of the fellowship so far."
      />
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-8 lg:p-10" style={{ background: 'var(--bg-2)' }}>
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            <span>Field odometer · analog</span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="blip h-1.5 w-1.5 rounded-full bg-primary" /> LIVE
            </span>
          </div>
          <Gauge />
        </div>

        <div className="flex flex-col justify-between gap-6 p-8 lg:p-10" style={{ background: 'var(--bg-2)' }}>
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            <span>Route · Bihar field program</span>
            <span className="text-ink-4">Muzaffarpur district</span>
          </div>
          <RouteMap />
          <Odometer />
          <div className="flex flex-wrap gap-2">
            {['Bike & field visits', 'Block-level CHC audits', 'The odometer only goes up'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--line-2)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3"
              >
                {t}
              </span>
            ))}
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
              className="group relative flex flex-col justify-between gap-8 p-7"
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
                <div className="font-serif text-[clamp(40px,3.5vw,56px)] leading-none tracking-tight text-ink">
                  <CountUp target={v.value} suffix={v.suffix} />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-3)]">
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
                <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">{v.foot}</div>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
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