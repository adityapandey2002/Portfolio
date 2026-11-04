'use client';

/**
 * V2 Pipeline — Frontline-to-Insight Pipeline section.
 *
 * Matches the design file exactly:
 * - Section header: "06 // DATA SYSTEMS METHODOLOGY" + "Frontline-to-Insight Pipeline" + "DETERMINISTIC ARCHITECTURE MODEL"
 * - Intro paragraph about fragile data supply chains
 * - 4 Geometric Pipeline Steps (Collect, Clean, Analyse, Decide)
 * - Engineering & Domain Competency Index with percentage bars
 *
 * Brutalist contract: 0px radius, thick borders, hard shadows, uppercase tracking
 */

const STAGES = [
  {
    num: '01',
    stage: 'STAGE: INGESTION',
    title: 'COLLECT',
    body: 'ODK Collect forms, M-ASHA field tablets, and Dexie/IndexedDB local caches deployed at Sub-Centres. Offline-first capture designed for 2G or zero network connectivity in remote Bihar panchayats.',
    tech: 'TECH: ODK, Dexie.js, IndexedDB',
    accent: 'bg-accent-yellow dark:bg-accent-yellow text-black dark:text-black',
  },
  {
    num: '02',
    stage: 'STAGE: SANITIZATION',
    title: 'CLEAN',
    body: 'Automated Python outlier rejection routines, entity matching, and reconciliation across physical maternal registers and state digital portals. Eliminates ghost beneficiaries and typo anomalies.',
    tech: 'TECH: Python, Pandas, Regex Rules',
    accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black',
  },
  {
    num: '03',
    stage: 'STAGE: COMPUTATION',
    title: 'ANALYSE',
    body: 'SQL windowing aggregations, block-level choropleths, and risk-stratified maternal survival tracking. Identifying localized delivery complications before maternal morbidity escalates.',
    tech: 'TECH: PostgreSQL, Windowing, D3.js',
    accent: 'bg-accent-blue dark:bg-accent-blue text-black dark:text-black',
  },
  {
    num: '04',
    stage: 'STAGE: GOVERNANCE',
    title: 'DECIDE',
    body: 'Synthesis into deterministic Monday Morning MIS briefs for Civil Surgeons, District Magistrates, and Piramal leadership. Converts abstract metrics into immediate targeted ambulance & nurse dispatches.',
    tech: 'TECH: Automated Briefs, DM Portals',
    accent: 'bg-accent-yellow dark:bg-accent-yellow border border-primary dark:border-white text-black dark:text-black',
  },
];

const COMPETENCIES = [
  { name: 'Public Health Informatics & Clinical Data Science', pct: 87, color: 'bg-accent-yellow', desc: 'M-ASHA, ODK, District MIS, Maternal Mortality Surveillance' },
  { name: 'Full-Stack Web Engineering (Next.js / Node / SQL)', pct: 82, color: 'bg-accent-blue', desc: 'Next.js 14, TypeScript, Express, PostgreSQL, Offline PWAs' },
  { name: 'Applied AI & Vector Retrieval (RAG / LLMs)', pct: 78, color: 'bg-accent-yellow', desc: 'LangChain, pgvector, Clinical Decision Agents, Prompt Eng' },
  { name: 'Frontline Community & District Systems Leadership', pct: 89, color: 'bg-accent-red', desc: 'ASHA Cohort Mentoring, Medical Officer Mediation, Bureaucracy Navigation' },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="border-b-4 border-primary dark:border-white bg-surface-container-high bg-dark-surface-container-high py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-white block">
              06 // DATA SYSTEMS METHODOLOGY
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface dark:text-on-surface mt-1">
              Frontline-to-Insight Pipeline
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
            DETERMINISTIC ARCHITECTURE MODEL
          </div>
        </div>

        {/* Intro Paragraph */}
        <p className="font-body text-base text-on-surface dark:text-on-surface max-w-3xl leading-relaxed mb-8">
          Public health in India does not fail because of lack of intent; it fails because of{' '}
          <strong className="underline decoration-accent-yellow dark:decoration-accent-yellow font-bold">
            fragile data supply chains
          </strong>
          . Here is the exact four-stage pipeline I employ to transform fragmented paper logs in Muzaffarpur and Araria into executive district policy actions.
        </p>

        {/* 4 Geometric Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage) => (
            <div
              key={stage.num}
              className="bg-surface-container-lowest bg-dark-surface-low border-3 border-primary dark:border-white p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#ffffff] flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 ${stage.accent} font-headline font-bold text-lg flex items-center justify-center border-2 border-primary dark:border-white mb-4`}>
                  {stage.num}
                </div>
                <span className="font-mono text-xs font-bold text-primary dark:text-white uppercase block mb-1">
                  {stage.stage}
                </span>
                <h3 className="font-headline text-2xl font-bold uppercase text-on-surface dark:text-on-surface mb-3">{stage.title}</h3>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  {stage.body}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-primary/30 dark:border-white/30 font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                {stage.tech}
              </div>
            </div>
          ))}
        </div>

        {/* Competency Percentage Meters */}
        <div className="border-3 border-primary dark:border-white bg-surface-container bg-dark-surface-container p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
            <h3 className="font-headline text-xl font-bold uppercase text-on-surface dark:text-on-surface">
              Engineering & Domain Competency Index
            </h3>
            <span className="font-mono text-xs font-bold bg-surface-container-lowest bg-dark-surface-low px-2 py-1 border border-primary dark:border-white text-on-surface dark:text-on-surface">
              BENCHMARK 2025
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPETENCIES.map((comp) => (
              <div key={comp.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-headline font-bold uppercase">
                  <span className="text-on-surface dark:text-on-surface">{comp.name}</span>
                  <span className="font-mono text-on-surface dark:text-on-surface">{comp.pct}%</span>
                </div>
                <div className="w-full bg-surface-container-lowest bg-dark-surface-low h-6 border-2 border-primary dark:border-white p-0.5">
                  <div className={`${comp.color} h-full`} style={{ width: `${comp.pct}%` }} />
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant">{comp.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

