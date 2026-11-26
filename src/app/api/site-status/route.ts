import { NextResponse } from 'next/server';
import { PORTFOLIO_SYSTEMS } from '@/lib/data/systems';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export interface SiteHealthEntry {
  ok: boolean;
  status: number;
  latencyMs: number;
}

interface CachePayload {
  checkedAt: number;
  statuses: Record<string, SiteHealthEntry>;
}

const TTL_MS = 5 * 60 * 1000;
let cache: CachePayload | null = null;

async function probeUrl(url: string): Promise<SiteHealthEntry> {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        cache: 'no-store',
      });
    }
    return {
      ok: res.status >= 200 && res.status < 400,
      status: res.status,
      latencyMs: Math.max(1, Date.now() - start),
    };
  } catch {
    return {
      ok: false,
      status: 0,
      latencyMs: Math.max(1, Date.now() - start),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.checkedAt < TTL_MS) {
    return NextResponse.json(cache, {
      headers: { 'cache-control': 'public, max-age=120' },
    });
  }

  const liveSystems = PORTFOLIO_SYSTEMS.filter((s) => s.liveUrl);
  const entries = await Promise.all(
    liveSystems.map(async (sys) => {
      const result = await probeUrl(sys.liveUrl!);
      return [sys.slug, result] as const;
    }),
  );

  cache = {
    checkedAt: now,
    statuses: Object.fromEntries(entries),
  };

  return NextResponse.json(cache, {
    headers: { 'cache-control': 'public, max-age=120' },
  });
}
