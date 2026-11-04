'use client';

import Link from 'next/link';

const SYSTEMS = [
  {
    num: '01',
    badge: 'FLAGSHIP 01',
    badgeColor: 'bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black',
    tech: 'OFFLINE PWA',
    techColor: 'text-on-primary-container dark:text-on-primary-container',
    title: 'Matru Suraksha',
    subtitle: 'Multi-Tier High-Risk Pregnancy Care Platform',
    desc: 'Clinical surveillance system specifically engineered for rural primary healthcare in Bihar. Designed for zero-connectivity sub-centres, ensuring pregnant mothers with severe anemia, gestational diabetes, or hypertension are algorithmically tracked until safe institutional delivery.',
    highlights: [
      'Offline-first IndexedDB (Dexie.js) bidirectional sync',
      '6-Tier Role-Based Access Control (ASHA to DM)',
      '15-day deterministic clinical escalation triggers',
      'Zero-data loss on intermittent 2G/3G towers',
    ],
    cta: 'Deep-dive architecture on Work page &rarr;',
  },
  {
    num: '02',
    badge: 'FLAGSHIP 02',
    badgeColor: 'bg-accent-blue dark:bg-accent-blue text-black dark:text-black',
    tech: 'CIVIC HEALTH OPS',
    techColor: 'text-on-tertiary-container dark:text-on-tertiary-container',
    title: 'District Hospital Araria Portal',
    subtitle: 'Civic Healthcare Operations & OPD Telemetry',
    desc: 'District-wide civic hospital management portal resolving OPD bottlenecks, bed occupancy tracking, blood bank component inventories, and automated citizen SMS dispatch across 9 departmental wings.',
    highlights: [
      'Real-time tokenized OPD queue telemetry',
      'Blood bank stock ledger with cold-chain threshold alerts',
      'Bi-lingual (Hindi/English) responsive interface',
      'Direct SMS dispatch gateway via NIC / SMS APIs',
    ],
    cta: 'Full architecture on Work page &rarr;',
  },
  {
    num: '03',
    badge: 'FLAGSHIP 03',
    badgeColor: 'bg-accent-yellow dark:bg-accent-yellow border border-primary dark:border-white text-black dark:text-black',
    tech: 'PUBLIC INTEL',
    techColor: 'text-primary dark:text-white',
    title: 'India Dev Data Engine',
    subtitle: 'Socio-Economic Choropleth & Vector Querying',
    desc: 'Public intelligence portal ingesting NFHS-5, Census, and state MIS datasets (118k+ records). Empowers district collectors and health planners to conduct semantic queries and visualize spatial inequalities in real-time.',
    highlights: [
      'pgvector embedded spatial embeddings index',
      '118,000+ validated indicators parsed & normalized',
      'D3.js interactive choropleth vector projections',
      'Sub-100ms multi-variable regression queries',
    ],
    cta: 'Explore on Work page &rarr;',
  },
];

export function SelectedSystems() {
  return (
    <section id="systems" className="border-b-4 border-primary dark:border-white bg-surface-container-low bg-dark-surface-container-low py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
              04 // FLAGSHIP ENGINEERING DEPLOYMENTS
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Production Systems
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-white hover:text-accent-yellow dark:hover:text-accent-yellow border-b-2 border-primary dark:border-white pb-1"
          >
            View All Systems &amp; Architecture on Work Page (/work)
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.num}
              className="bg-surface-container-lowest bg-dark-surface-low border-3 border-primary dark:border-white p-6 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
                  <span className={`px-2.5 py-0.5 font-headline font-bold text-xs uppercase border border-primary dark:border-white ${sys.badgeColor}`}>
                    {sys.badge}
                  </span>
                  <span className={`font-mono text-xs font-bold ${sys.techColor}`}>{sys.tech}</span>
                </div>
                <div className="space-y-1">
                  <div className="font-headline text-sm font-bold text-primary dark:text-white uppercase">
                    {sys.subtitle}
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-on-surface uppercase">
                    {sys.title}
                  </h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  {sys.desc}
                </p>
                <div className="bg-surface bg-dark-surface-low p-3 border border-primary dark:border-white space-y-2 text-xs font-mono">
                  <div className="text-[11px] font-bold uppercase text-primary dark:text-white border-b border-primary/20 dark:border-white/20 pb-1">
                    Architecture Highlights
                  </div>
                  {sys.highlights.map((h, i) => (
                    <div key={i} className="text-on-surface dark:text-on-surface">
                      &bull; {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t-2 border-primary dark:border-white mt-6">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-between w-full p-2.5 bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black font-headline text-xs font-bold uppercase tracking-wider hover:bg-surface dark:hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <span dangerouslySetInnerHTML={{ __html: sys.cta }} />
                  <span className="material-symbols-outlined text-sm">east</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-surface bg-dark-surface-container border-2 border-primary dark:border-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary dark:text-white">folder_special</span>
            <span className="text-on-surface dark:text-on-surface">SYSTEMS PORTFOLIO CATALOG: 5 PRODUCTION REPOSITORIES ACTIVE</span>
          </div>
          <Link
            href="/work"
            className="font-bold underline text-primary dark:text-white uppercase tracking-wider hover:text-accent-yellow dark:hover:text-accent-red"
          >
            Explore all 5 deployed systems, architecture diagrams, database schemas, and source repositories on the Work page &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

