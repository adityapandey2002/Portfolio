'use client';

import { useEffect, useState } from 'react';

export interface LiveStatus {
  id: string;
  url: string;
  label: string;
  up: boolean;
  latencyMs: number | null;
  checkedAt: string;
}

export type StatusMap = Record<string, { up: boolean; latencyMs: number | null }>;

export function useLiveStatus(refreshMs = 60000) {
  const [status, setStatus] = useState<StatusMap>({});

  useEffect(() => {
    let alive = true;
    const check = async () => {
      try {
        const res = await fetch('/api/status', { cache: 'no-store' });
        if (!res.ok) return;
        const list: LiveStatus[] = await res.json();
        if (!alive) return;
        setStatus(
          Object.fromEntries(list.map((s) => [s.id, { up: s.up, latencyMs: s.latencyMs }])),
        );
      } catch {
        /* keep last known state */
      }
    };
    check();
    const t = setInterval(check, refreshMs);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [refreshMs]);

  return status;
}
