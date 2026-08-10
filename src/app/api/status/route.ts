import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SITES = [
  { id: 'india-dashboard', url: 'https://india-dashboard-delta.vercel.app/', label: 'india-dashboard' },
  { id: 'biharkaswaad', url: 'https://biharkaswaad.in/', label: 'biharkaswaad.in' },
] as const;

async function probe(url: string): Promise<{ up: boolean; latencyMs: number | null }> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let res: Response;
    try {
      res = await fetch(url, { method: 'HEAD', signal: controller.signal, redirect: 'follow' });
    } catch {
      res = await fetch(url, { method: 'GET', signal: controller.signal, redirect: 'follow' });
    }
    return { up: res.ok, latencyMs: Date.now() - started };
  } catch {
    return { up: false, latencyMs: null };
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  const results = await Promise.all(
    SITES.map(async (site) => {
      const { up, latencyMs } = await probe(site.url);
      return { id: site.id, url: site.url, label: site.label, up, latencyMs, checkedAt: new Date().toISOString() };
    }),
  );
  return NextResponse.json(results, { headers: { 'Cache-Control': 'no-store' } });
}
