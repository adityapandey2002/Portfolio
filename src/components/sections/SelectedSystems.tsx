'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const SYSTEMS = [
  {
    num: '01',
    badge: 'FLAGSHIP 01',
    badgeBg: 'bg-secondary text-on-secondary',
    label: 'OFFLINE PWA',
    title: 'Matru Suraksha',
    subtitle: 'Multi-Tier High-Risk Pregnancy Care Platform',
    desc: 'Clinical surveillance system specifically engineered for rural primary healthcare in Bihar. Designed for zero-connectivity sub-centres, ensuring pregnant mothers with severe anemia, gestational diabetes, or hypertension are algorithmically tracked until safe institutional delivery.',
    highlights: [
      'Offline-first IndexedDB (Dexie.js) bidirectional sync',
      '6-Tier Role-Based Access Control (ASHA to DM)',
      '15-day deterministic clinical escalation triggers',
      'Zero-data loss on intermittent 2G/3G towers',
    ],
    tech: ['Dexie.js', 'IndexedDB', 'RBAC', 'Escalation'],
    cta: 'Deep-dive architecture on Work page →',
    ctaHover: 'hover:bg-secondary',
  },
  {
    num: '02',
    badge: 'FLAGSHIP 02',
    badgeBg: 'bg-tertiary text-on-tertiary',
    label: 'CIVIC HEALTH OPS',
    title: 'District Hospital Araria Portal',
    subtitle: 'Civic Healthcare Operations & OPD Telemetry',
    desc: 'District-wide civic hospital management portal resolving OPD bottlenecks, bed occupancy tracking, blood bank component inventories, and automated citizen SMS dispatch across 9 departmental wings.',
    highlights: [
      'Real-time tokenized OPD queue telemetry',
      'Blood bank stock ledger with cold-chain threshold alerts',
      'Bi-lingual (Hindi/English) responsive interface',
      'Direct SMS dispatch gateway via NIC / SMS APIs',
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'SMS API'],
    cta: 'Full architecture on Work page →',
    ctaHover: 'hover:bg-tertiary',
  },
  {
    num: '03',
    badge: 'FLAGSHIP 03',
    badgeBg: 'bg-primary-container text-on-primary-container border border-primary',
    label: 'PUBLIC INTEL',
    title: 'India Dev Data Engine',
    subtitle: 'Socio-Economic Choropleth & Vector Querying',
    desc: 'Public intelligence portal ingesting NFHS-5, Census, and state MIS datasets (118k+ records). Empowers district collectors and health planners to conduct semantic queries and visualize spatial inequalities in real-time.',
    highlights: [
      'pgvector embedded spatial embeddings index',
      '118,000+ validated indicators parsed & normalized',
      'D3.js interactive choropleth vector projections',
      'Sub-100ms multi-variable regression queries',
    ],
    tech: ['Next.js', 'pgvector', 'D3.js', 'Supabase'],
    cta: 'Explore on Work page →',
    ctaHover: 'hover:bg-primary-container hover:text-on-primary-container',
  },
];

export function SelectedSystems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="systems" className="border-b-4 border-primary dark:border-white bg-surface-container-low dark:bg-surface-l1">
      <Section className="py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-secondary dark:text-vermilion block">
                04 // FLAGSHIP ENGINEERING DEPLOYMENTS
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-ink-dark mt-1">
                Production Systems
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-white hover:text-secondary dark:hover:text-vermilion border-b-2 border-primary dark:border-white pb-1"
            >
              View All Systems & Architecture on Work Page (/work)
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {SYSTEMS.map((sys, i) => (
            <motion.div
              key={sys.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card padding="p-6" className="flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
                    <span className={`${sys.badgeBg} px-2.5 py-0.5 font-headline font-bold text-xs uppercase`}>
                      {sys.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-on-surface-variant dark:text-ink-dark/70">
                      {sys.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-ink-dark uppercase">
                      {sys.title}
                    </h3>
                    <p className="font-headline text-xs font-bold text-on-surface-variant dark:text-ink-dark/70 uppercase">
                      {sys.subtitle}
                    </p>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-on-surface dark:text-ink-dark leading-relaxed">
                    {sys.desc}
                  </p>
                  <div className="bg-surface dark:bg-surface-l1 p-3 border border-primary dark:border-white space-y-2 text-xs font-mono">
                    <div className="text-[11px] font-bold uppercase text-primary dark:text-white border-b border-primary/20 dark:border-white/20 pb-1">
                      Architecture Highlights
                    </div>
                    {sys.highlights.map((h, hi) => (
                      <div key={hi} className="text-on-surface dark:text-ink-dark">
                        ✓ {h}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t-2 border-primary dark:border-white mt-6">
                  <Link
                    href="/work"
                    className={`inline-flex items-center justify-between w-full p-2.5 bg-primary dark:bg-primary-yellow text-on-primary dark:text-on-primary font-headline text-xs font-bold uppercase tracking-wider transition-colors ${sys.ctaHover}`}
                  >
                    <span>{sys.cta}</span>
                    <span className="material-symbols-outlined text-sm">east</span>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Banner Footer */}
        <div className="mt-8 p-4 bg-surface dark:bg-surface-l1 border-2 border-primary dark:border-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary dark:text-white">folder_special</span>
            <span className="text-on-surface dark:text-ink-dark">SYSTEMS PORTFOLIO CATALOG: 5 PRODUCTION REPOSITORIES ACTIVE</span>
          </div>
          <Link
            href="/work"
            className="font-bold underline text-primary dark:text-white uppercase tracking-wider hover:text-secondary dark:hover:text-vermilion"
          >
            Explore all 5 deployed systems, architecture diagrams, database schemas, and source repositories on the Work page →
          </Link>
        </div>
      </Section>
    </section>
  );
}
