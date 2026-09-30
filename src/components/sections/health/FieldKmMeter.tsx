'use client';

import { SectionHeading } from '../SectionHeading';
import { DistrictVisitMap } from '../DistrictVisitMap';
import { Gauge } from './Gauge';

export function FieldKmMeter() {
  return (
    <section className="mx-auto flex h-full min-h-0 w-full max-w-[1500px] flex-col gap-4 px-5 lg:px-10 pt-4">
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