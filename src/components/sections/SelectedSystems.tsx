'use client';

import Link from 'next/link';

/**
 * V2 SelectedSystems — "04 // Production Systems" section on Home.
 *
 * Matches the supplied light/dark samples exactly:
 * - Red section eyebrow, "Production Systems" heading + /work deep link
 * - 3 flagship cards: Matru Suraksha, District Hospital Araria, India Dev Data Engine
 * - Native-language kicker, yellow subtitle (dark), architecture highlights box
 * - Solid black CTA bars that swap accent on hover
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

const SYSTEMS = [
  {
    num: '01',
    badge: 'FLAGSHIP 01',
    badgeClass: 'bg-secondary text-on-secondary dark:text-[#121214]',
    tech: 'OFFLINE PWA',
    native: 'मातृ सुरक्षा',
    nativeClass: 'text-secondary',
    title: 'Matru Suraksha',
    subtitle: 'Multi-Tier High-Risk Pregnancy Care Platform',
    desc: 'Clinical surveillance system specifically engineered for rural primary healthcare in Bihar. Designed for zero-connectivity sub-centres, ensuring pregnant mothers with severe anemia, gestational diabetes, or hypertension are algorithmically tracked until safe institutional delivery.',
    highlights: [
      'Offline-first IndexedDB (Dexie.js) bidirectional sync',
      '6-Tier Role-Based Access Control (ASHA to DM)',
      '15-day deterministic clinical escalation triggers',
      'Zero-data loss on intermittent 2G/3G towers',
    ],
    cta: 'Deep-dive architecture on Work page',
    ctaHover: 'hover:bg-secondary hover:text-on-secondary dark:hover:bg-white dark:hover:text-black',
  },
  {
    num: '02',
    badge: 'FLAGSHIP 02',
    badgeClass: 'bg-tertiary text-white dark:text-[#121214]',
    tech: 'CIVIC HEALTH OPS',
    native: 'सदर अस्पताल अररिया',
    nativeClass: 'text-tertiary',
    title: 'District Hospital Araria Portal',
    subtitle: 'Civic Healthcare Operations & OPD Telemetry',
    desc: 'District-wide civic hospital management portal resolving OPD bottlenecks, bed occupancy tracking, blood bank component inventories, and automated citizen SMS dispatch across 9 departmental wings.',
    highlights: [
      'Real-time tokenized OPD queue telemetry',
      'Blood bank stock ledger with cold-chain threshold alerts',
      'Bi-lingual (Hindi/English) responsive interface',
      'Direct SMS dispatch gateway via NIC / SMS APIs',
    ],
    cta: 'Full architecture on Work page',
    ctaHover: 'hover:bg-tertiary hover:text-white dark:hover:bg-white dark:hover:text-black',
  },
  {
    num: '03',
    badge: 'FLAGSHIP 03',
    badgeClass: 'bg-primary-container text-on-primary-container dark:bg-[#facc15] dark:text-[#121214] border border-primary',
    tech: 'PUBLIC INTEL',
    native: 'डेटा इंजन भारत',
    nativeClass: 'text-primary dark:text-[#facc15]',
    title: 'India Dev Data Engine',
    subtitle: 'Socio-Economic Choropleth & Vector Querying',
    desc: 'Public intelligence portal ingesting NFHS-5, Census, and state MIS datasets (118k+ records). Empowers district collectors and health planners to conduct semantic queries and visualize spatial inequalities in real-time.',
    highlights: [
      'pgvector embedded spatial embeddings index',
      '118,000+ validated indicators parsed & normalized',
      'D3.js interactive choropleth vector projections',
      'Sub-100ms multi-variable regression queries',
    ],
    cta: 'Explore on Work page',
    ctaHover: 'hover:bg-primary-container hover:text-on-primary-container dark:hover:bg-white dark:hover:text-black',
  },
];

export function SelectedSystems() {
  return (
    <section
      id="systems"
      className="border-b-4 border-primary dark:border-[#3f3f46] bg-surface-container-low dark:bg-[#121214] py-10 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-[#3f3f46] pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-secondary block">
              04 // FLAGSHIP ENGINEERING DEPLOYMENTS
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface mt-1">
              Production Systems
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 font-headline text-xs font-bold uppercase tracking-wider text-primary hover:text-secondary dark:text-primary dark:hover:text-white border-b-2 border-primary pb-1"
          >
            <span>View All Systems &amp; Architecture on Work Page (/work)</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.num}
              className="bg-surface-container-lowest dark:bg-[#202024] border-3 border-primary dark:border-[#3f3f46] p-6 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#000000] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#1a1a1a] dark:hover:shadow-[3px_3px_0px_#000000] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-[#3f3f46] pb-3">
                  <span className={`px-2.5 py-0.5 font-headline font-bold text-xs uppercase ${sys.badgeClass}`}>
                    {sys.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface-variant">{sys.tech}</span>
                </div>
                <div className="space-y-1">
                  <div className={`font-headline text-sm font-bold uppercase ${sys.nativeClass}`}>
                    {sys.native}
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface uppercase">{sys.title}</h3>
                  <p className="font-headline text-xs font-bold text-on-surface-variant dark:text-[#facc15] uppercase">
                    {sys.subtitle}
                  </p>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface dark:text-on-surface-variant leading-relaxed">
                  {sys.desc}
                </p>
                <div className="bg-surface dark:bg-[#161619] p-3 border border-primary dark:border-[#3f3f46] space-y-2 text-xs font-mono text-on-surface dark:text-on-surface-variant">
                  <div className="text-[11px] font-bold uppercase text-primary border-b border-primary/20 dark:border-[#3f3f46] pb-1">
                    Architecture Highlights
                  </div>
                  {sys.highlights.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t-2 border-primary dark:border-[#3f3f46] mt-6">
                <Link
                  href="/work"
                  className={`inline-flex items-center justify-between w-full p-2.5 bg-primary text-on-primary dark:bg-[#facc15] dark:text-[#121214] font-headline text-xs font-bold uppercase tracking-wider transition-colors ${sys.ctaHover}`}
                >
                  <span>{sys.cta}</span>
                  <span className="material-symbols-outlined text-sm">east</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-surface dark:bg-[#202024] border-2 border-primary dark:border-[#3f3f46] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary">folder_special</span>
            <span>SYSTEMS PORTFOLIO CATALOG: 5 PRODUCTION REPOSITORIES ACTIVE</span>
          </div>
          <Link
            href="/work"
            className="font-bold underline text-primary uppercase tracking-wider hover:text-secondary dark:hover:text-white"
          >
            Explore all 5 deployed systems, architecture diagrams, database schemas, and source repositories on the Work page →
          </Link>
        </div>
      </div>
    </section>
  );
}
