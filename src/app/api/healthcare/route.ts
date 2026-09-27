import { NextResponse } from 'next/server';

// Fresh upstream read on every /health load — never served from the data cache.
export const dynamic = 'force-dynamic';

const BASE = 'https://india-dashboard-delta.vercel.app';

const INDICATORS = [
  'uhc_idx',
  'haq_idx',
  'life_expectancy',
  'infant_mortality',
  'maternal_mortality',
  'physicians_per_1k',
  'hospital_beds_per_1k',
  'vaccination_dpt',
] as const;

type Upstream = {
  indicator: { id: string; name: string; unit: string; description: string };
  higherIsBetter: boolean;
  india: {
    iso3: string;
    value: number | null;
    year: number | null;
    rank: number | null;
    total: number;
    percentile: number | null;
  } | null;
};

type HealthcareItem = {
  id: string;
  name: string;
  unit: string;
  description: string;
  value: number | null;
  year: number | null;
  rank: number | null;
  total: number;
  percentile: number | null;
  higherIsBetter: boolean;
};

async function load(id: string): Promise<HealthcareItem> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${BASE}/api/rankings?indicator=${id}`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = (await res.json()) as Upstream;
    if (!json.indicator || !json.india) throw new Error('missing payload');
    return {
      id: json.indicator.id,
      name: json.indicator.name,
      unit: json.indicator.unit,
      description: json.indicator.description,
      value: json.india.value,
      year: json.india.year,
      rank: json.india.rank,
      total: json.india.total,
      percentile: json.india.percentile,
      higherIsBetter: json.higherIsBetter,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  const results = await Promise.allSettled(INDICATORS.map((id) => load(id)));

  const items: HealthcareItem[] = [];
  const failed: string[] = [];
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') items.push(result.value);
    else failed.push(INDICATORS[i]);
  });

  return NextResponse.json(
    {
      fetchedAt: new Date().toISOString(),
      source: `${BASE}/explore?category=healthcare`,
      items,
      failed,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
