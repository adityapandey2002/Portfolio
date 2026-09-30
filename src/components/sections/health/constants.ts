'use client';

import { motion } from 'framer-motion';
import { Compass, Flower2 } from 'lucide-react';

export const TRAINING = [
  {
    icon: Compass,
    title: 'CBCT & leadership workshop — Hajipur',
    body: 'Participated in <strong>Cognitively-Based Compassion Training (CBCT)</strong> with the fellowship cohort — and supported the same training being delivered to others, strengthening facilitation, empathy-led problem solving, and field leadership.',
    tags: ['Fellowship Training', 'Facilitation', 'Hajipur'],
  },
  {
    icon: Flower2,
    title: '10-day Vipassana — Dhamma Vaishali',
    body: 'Sat a <strong>10-day Vipassana meditation course</strong> at Dhamma Vaishali — discipline, stillness, and sustained focus that carries straight into field days and long debug sessions.',
    tags: ['Meditation', 'Discipline', 'Bihar'],
  },
];

export const VITALS = [
  { label: 'ASHA workers trained (M-ASHA)', value: 700, suffix: '+', pct: 100, foot: 'Field trainings · hands-on' },
  { label: 'Clinical refresher hours', value: 185, suffix: 'h', pct: 100, foot: '12 Staff Nurses · 4 Doctors' },
  { label: 'VHSND sessions QC\'d', value: 100, suffix: '+', pct: 100, foot: 'ODK field data validated' },
  { label: 'PMSMA · PHC/CHC blocks', value: 30, suffix: '+', pct: 100, foot: 'Bihar · Muzaffarpur' },
] as const;

export const DIAGNOSTICS = [
  { name: 'M-ASHA rollout — ASHA capacity building', status: 'OPERATIONAL', tone: 'green' },
  { name: 'ODK Central sync — VHSND data pipeline', status: 'OPERATIONAL', tone: 'green' },
  { name: 'MIS reporting — weekly block summaries', status: 'OPERATIONAL', tone: 'green' },
  { name: 'Medicine & equipment forecasting', status: 'IN PROGRESS', tone: 'amber' },
] as const;

export const KM_TOTAL = 13000;
export const KM_MAX = 20000;

// Animation Easing
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];