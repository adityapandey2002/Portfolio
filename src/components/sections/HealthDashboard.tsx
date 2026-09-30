'use client';

import Link from 'next/link';
import { ArrowDownLeft, Activity, HeartPulse, Compass, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { CountUp } from './CountUp';
import { EnergyConduit } from './pillars';
import { FieldSection } from './FieldSection';
import { DistrictVisitMap } from './DistrictVisitMap';
import { HealthcarePanel } from './HealthcarePanel';
import { FieldKmMeter, VitalsGrid, DiagnosticsPanel, FieldMindSection } from './health';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HealthDashboard() {
  return (
    <>
      <div className="snap-section relative">
        <EnergyConduit className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+12px)] max-md:hidden" />
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

      <div className="snap-section">
        <FieldSection />
      </div>

      <div className="snap-section">
        <section
          className="mx-auto max-w-[1500px] gap-4 px-5 lg:px-10"
          style={{ paddingTop: 'calc(var(--nav-h) + 2.5vh - 10px)', paddingBottom: 30 }}
        >
          <SectionHeading
            eyebrow="/* FIELD MONITOR */"
            title={
              <>
                Back to the <span className="text-gradient">vitals</span>
              </>
            }
            sub="Everything above feeds the monitors below — the fellowship, on vitals."
          />
          <div className="grid flex-1 grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-5">
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

            <div className="flex min-w-0 lg:col-span-4">
              <HealthcarePanel />
            </div>
          </div>
        </section>
      </div>

      <div className="snap-section">
        <FieldKmMeter />
      </div>

      <div className="snap-section">
        <VitalsGrid />
      </div>

      <div className="snap-section">
        <FieldMindSection />
      </div>

      <div className="snap-section">
        <DiagnosticsPanel />
      </div>
    </>
  );
}