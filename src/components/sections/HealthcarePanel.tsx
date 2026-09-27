'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, RotateCw } from 'lucide-react';

const BASE = 'https://india-dashboard-delta.vercel.app';
const EXPLORE = `${BASE}/explore?category=healthcare`;
const SKELETON = 8;

const UNITS: Record<string, string> = {
  '0-100': 'score',
  '0-1': 'index',
  years: 'yrs',
  'per 1000': '/1k',
  'per 100k': '/100k',
};

type Item = {
  id: string;
  name: string;
  unit: string;
  description?: string;
  value: number | null;
  year: number | null;
  rank: number | null;
  total: number;
  percentile: number | null;
};

type Payload = { fetchedAt: string; source: string; items: Item[]; failed: string[] };
type State = 'loading' | 'ready' | 'error';

const fmt = (v: number | null) => {
  if (v == null || Number.isNaN(v)) return '—';
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};

const unitLabel = (u: string) => UNITS[u] ?? u;

const pctOf = (p: number | null) => Math.max(0, Math.min(100, p ?? 0));

function Tile({ it }: { it: Item }) {
  const pct = pctOf(it.percentile);
  return (
    <a
      href={`${BASE}/indicator/${it.id}`}
      target="_blank"
      rel="noopener noreferrer"
      title={it.description}
      aria-label={`${it.name} — open full detail on India in the World`}
      className="group flex min-w-0 flex-col justify-between gap-4 bg-[var(--bg-2)] p-5 transition-colors duration-300 hover:bg-[var(--bg-3)] lg:p-6"
    >
      <span className="font-mono text-[10px] uppercase leading-[1.45] tracking-[0.16em] text-ink-3">
        {it.name}
      </span>
      <span className="block">
        <span className="flex items-baseline gap-1.5">
          <span className="font-serif text-[clamp(26px,2.3vw,36px)] leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-primary">
            {fmt(it.value)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
            {unitLabel(it.unit)}
          </span>
        </span>
        <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[var(--bg-3)]">
          <span
            className="block h-full rounded-full transition-[width] duration-700"
            style={{ width: `${pct}%`, background: pct >= 50 ? 'var(--primary)' : 'var(--accent)' }}
          />
        </span>
        <span className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          <span>
            #{it.rank ?? '—'} / {it.total}
          </span>
          <span>{it.year ?? ''}</span>
        </span>
      </span>
    </a>
  );
}

function Skeleton() {
  return (
    <div
      className="grid min-h-0 flex-1 animate-pulse grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: SKELETON }).map((_, i) => (
        <div key={i} className="flex flex-col justify-between gap-4 bg-[var(--bg-2)] p-5 lg:p-6">
          <div className="h-2.5 w-3/4 rounded bg-[var(--bg-3)]" />
          <div>
            <div className="h-7 w-1/3 rounded bg-[var(--bg-3)]" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-[var(--bg-3)]" />
            <div className="mt-2.5 h-2.5 w-1/2 rounded bg-[var(--bg-3)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Live healthcare readout: pulls India's value + global rank for 8 indicators
 * from the India in the World dashboard on every /health load (server-side,
 * via /api/healthcare) and renders it in the monitor panel's middle/right
 * slots. Tiles link out to the source site for full detail.
 */
export function HealthcarePanel() {
  const [state, setState] = useState<State>('loading');
  const [items, setItems] = useState<Item[]>([]);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;
    setState('loading');
    (async () => {
      try {
        const res = await fetch(`/api/healthcare?r=${retry}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as Payload;
        if (!alive) return;
        setItems(json.items ?? []);
        setState(json.items?.length ? 'ready' : 'error');
      } catch (err) {
        if (alive && (err as Error)?.name !== 'AbortError') setState('error');
      }
    })();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [retry]);

  const label = state === 'ready' ? 'LIVE' : state === 'loading' ? 'SYNCING' : 'RETRY';

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[var(--bg-2)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[var(--line)] px-5 py-4 lg:px-7">
        <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
          <span
            className={`h-2 w-2 rounded-full bg-primary ${state !== 'error' ? 'blip' : ''}`}
          />
          {label}
          <span className="text-ink-4">·</span>
          <span className="text-ink-4">Healthcare · India in the world</span>
        </span>
        <a
          href={EXPLORE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary transition-opacity duration-300 hover:opacity-70"
        >
          Full dashboard <ArrowUpRight size={12} />
        </a>
      </div>

      {state === 'loading' && <Skeleton />}

      {state === 'ready' && (
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-4">
          {items.map((it) => (
            <Tile key={it.id} it={it} />
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="flex min-h-[220px] flex-1 items-center justify-center px-6 text-center">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
              Live data unavailable right now
            </p>
            <p className="mt-2 text-sm text-ink-4">
              Pulled fresh from India in the World on every load — the source is briefly out of reach.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setRetry((n) => n + 1)}
                className="inline-flex items-center gap-1.5 border border-[var(--line-2)] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3 transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <RotateCw size={12} /> Retry
              </button>
              <a
                href={EXPLORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary transition-opacity duration-300 hover:opacity-70"
              >
                Open full dashboard <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
