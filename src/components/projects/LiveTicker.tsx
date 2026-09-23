'use client';

import type { StatusMap } from '@/hooks/useLiveStatus';

const ORDER = ['india-dashboard', 'biharkaswaad'] as const;
const LABELS: Record<string, string> = {
  'india-dashboard': 'india-dashboard · dev-data analytics',
  biharkaswaad: 'biharkaswaad.in · e-commerce',
};

export function LiveTicker({ status }: { status: StatusMap }) {
  const dots = ORDER.map((id) => {
    const s = status[id];
    return s === undefined
      ? `· CHECKING ${LABELS[id]}`
      : `· ${s.up ? 'UP' : 'DOWN'} ${LABELS[id]}${s.latencyMs !== null ? ` · ${s.latencyMs}ms` : ''}`;
  }).join(' ');

  return (
    <div
      aria-hidden
      className="pointer-events-none relative mt-6 overflow-hidden border-y border-[var(--line)] bg-bg-2/60 py-1.5"
    >
      <div className="flex w-full items-center gap-3 overflow-hidden whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
        <span className="inline-flex shrink-0 items-baseline gap-3">
          <span className="text-primary">LIVE GLIMPSE</span>
          <span>{dots}</span>
        </span>
      </div>
    </div>
  );
}
