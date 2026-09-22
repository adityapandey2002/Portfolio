'use client';

import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';

function getVisitorKey(): string {
  try {
    let k = localStorage.getItem('visitor_key');
    if (!k) {
      k = `v_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
      localStorage.setItem('visitor_key', k);
    }
    return k;
  } catch {
    return `v_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function VisitorsPulse() {
  const [count, setCount] = useState<number | null>(null);
  const keyRef = useRef<string>('');

  useEffect(() => {
    keyRef.current = getVisitorKey();
    const key = keyRef.current;

    const heartbeat = async () => {
      try {
        const res = await fetch('/api/presence/heartbeat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ visitor_key: key, user_agent: navigator.userAgent }),
        });
        const data = await res.json();
        if (data.count !== undefined) setCount(data.count);
      } catch {
        // offline — ignore
      }
    };

    const refresh = async () => {
      try {
        const res = await fetch('/api/presence/count');
        const data = await res.json();
        setCount(data.live ? data.count : null);
      } catch {
        // ignore
      }
    };

    heartbeat();
    const hb = setInterval(heartbeat, 15_000);
    const ct = setInterval(refresh, 15_000);

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        heartbeat();
        refresh();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', refresh);

    return () => {
      clearInterval(hb);
      clearInterval(ct);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', refresh);
    };
  }, []);

  return (
    <div className="hidden items-center gap-2 rounded-lg border border-[var(--line)] px-2.5 py-1.5 font-mono text-[12px] text-ink-3 lg:inline-flex" title="Visitors online (Supabase Realtime)">
      <span className="online-dot" />
      <span>{count !== null ? `${count} online` : 'online'}</span>
      <Users size={11} className="opacity-70" />
    </div>
  );
}
