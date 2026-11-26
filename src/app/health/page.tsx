import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';
import { CompactFieldOdometer } from '@/components/sections/health/CompactFieldOdometer';

export const metadata = {
  title: 'Health Field Impact — Aditya Pandey',
  description:
    'Public health data work in Bihar — ASHA capacity building, 185-hour clinical skills refreshers, NQAS audits, 13,627 KM field travel, and VHSND / Godbharai / PMSMA data pipelines from the Gandhi Fellowship (Piramal Foundation).',
};

export default function HealthPage() {
  return (
    <>
      <section className="border-b-4 border-outline bg-surface">
        <Section className="py-10">
          <div className="space-y-8">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-outline p-3 bg-surface-container dark:bg-surface-low shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-accent-red" />
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary">
                  01 · Fellowship Operational Record &amp; Field Impact
                </span>
              </div>
              <div className="flex items-center gap-4 font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span>PROGRAM: GANDHI FELLOWSHIP</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline">PIRAMAL FOUNDATION</span>
                <span className="hidden md:inline">|</span>
                <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5">
                  MUZAFFARPUR, BIHAR
                </span>
              </div>
            </div>

            {/* Hero Split: Headline + Quote on Left, Editorial Documentary Visual on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h1 className="font-headline text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-primary leading-[1.03]">
                    Health-System Strengthening Across Bihar: Every Number Tracked Like Patient Data
                  </h1>
                  <p className="font-body text-base text-on-surface-variant max-w-2xl leading-relaxed">
                    Gandhi Fellowship (Piramal Foundation) · Based in Muzaffarpur, Bihar. Grassroots digital &amp; clinical transformation across 16 high-burden blocks, 154 sub-centres, PHCs, and District Hospitals.
                  </p>
                </div>

                {/* Primary Field Quote */}
                <div className="relative bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface p-6 border-2 border-outline shadow-[5px_5px_0px_#ffcc00]">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-yellow dark:text-primary-yellow text-3xl font-serif leading-none shrink-0" aria-hidden="true">
                      &ldquo;
                    </span>
                    <div className="space-y-2">
                      <blockquote className="font-headline text-base sm:text-lg font-bold tracking-tight text-on-primary dark:text-on-surface leading-snug">
                        I&rsquo;ve stood next to an ASHA worker filling an ODK form on a tablet in 38&deg;C heat. Every pipeline I build starts with that moment.
                      </blockquote>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-yellow dark:text-primary-yellow font-bold">
                        — Aditya Pandey · District Resource Fellow, Muzaffarpur
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentary Field Visual */}
              <div className="lg:col-span-5 flex flex-col border-[3px] border-outline bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#0e0e10] overflow-hidden">
                <div className="relative flex-1 min-h-[240px] w-full overflow-hidden bg-surface-container">
                  <img
                    src="/work/bihar-field-editorial.jpg"
                    alt="Rural Bihar primary health field outreach and digital tablet data workflows"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="border-t-2 border-outline bg-surface-container px-4 py-2.5 flex items-center justify-between gap-2 font-mono text-[11px] text-on-surface-variant">
                  <span className="font-bold uppercase text-on-surface">North Bihar Field Context</span>
                  <span>16 Blocks · 154 Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Health Metrics — Balanced 3x2 Grid with Compact Field Odometer in Metric 04 */}
      <section className="border-b-4 border-outline bg-surface py-12 px-4 sm:px-8 lg:px-12">
        <Section className="py-6">
          <div className="flex flex-col md:flex-row sm:items-end justify-between gap-4 border-b-2 border-outline pb-6 mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
                Verified Field Record
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-on-surface leading-none">
                Primary Field Metrics Ledger
              </h2>
            </div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Active Blocks: 16 · Population Footprint: 4.8M+
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric 1: ASHA */}
            <div className="bg-surface-container-lowest border-3 border-outline p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#0e0e10] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-outline pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    METRIC 01 · WORKFORCE
                  </span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-5xl tracking-tight tabular-nums leading-none text-on-surface">
                    700+
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface">
                    ASHA Workers Mentored
                  </h3>
                  <p className="mt-2.5 text-sm text-on-surface-variant leading-relaxed">
                    M-ASHA digital application rollout across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — frontline worker capacity building, hands-on.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-outline flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                <span>MICRO-SESSIONS: 100+</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow text-black px-2 py-0.5 border border-outline">
                  COMPLIANCE: 94%
                </span>
              </div>
            </div>

            {/* Metric 2: Clinical */}
            <div className="bg-surface-container-lowest border-3 border-outline p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#0e0e10] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-outline pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    METRIC 02 · CLINICAL
                  </span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-5xl tracking-tight tabular-nums leading-none text-on-surface">
                    185-hr
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface">
                    Clinical Skills Refresher
                  </h3>
                  <p className="mt-2.5 text-sm text-on-surface-variant leading-relaxed">
                    185-hour structured curriculum for 12 Staff Nurses and 4 Doctors — High-Risk Pregnancy management and labor room protocols at the district hospital.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-outline flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                <span>COHORT: 16 CLINICIANS</span>
                <span className="bg-accent-red text-white dark:text-[#121214] px-2 py-0.5 border border-outline">
                  HRP PROTOCOLS
                </span>
              </div>
            </div>

            {/* Metric 3: Sub-centres */}
            <div className="bg-surface-container-lowest border-3 border-outline p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#0e0e10] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b-2 border-outline pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    METRIC 03 · QUALITY
                  </span>
                </div>
                <div>
                  <div className="font-display font-extrabold text-5xl tracking-tight tabular-nums leading-none text-on-surface">
                    154
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight text-on-surface">
                    Sub-Centres Audited
                  </h3>
                  <p className="mt-2.5 text-sm text-on-surface-variant leading-relaxed">
                    Physical vs digital register reconciliation across Sub-Centres and PHCs under the National Quality Assurance Standards (NQAS) framework.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t-2 border-outline flex items-center justify-between text-[11px] font-mono uppercase font-bold gap-3">
                <span>NQAS FRAMEWORK</span>
                <span className="bg-accent-blue text-white dark:text-[#121214] px-2 py-0.5 border border-outline">
                  REGISTER RECON
                </span>
              </div>
            </div>

            {/* Metric 4: Compact Field Odometer (Fits seamlessly beside the other 4 metrics!) */}
            <CompactFieldOdometer />

            {/* Metric 5: Pipeline Volume (Spans 2 columns to complete clean 3x2 ledger) */}
            <div className="bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-3 border-outline p-6 shadow-[5px_5px_0px_#ffcc00] flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-on-primary/30 dark:border-on-surface/30 pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-yellow dark:text-primary-yellow">
                    METRIC 05 · PIPELINE VOLUME
                  </span>
                  <span className="font-mono text-[11px] uppercase text-on-primary/80 dark:text-on-surface-variant">
                    ODK Collect &amp; Central
                  </span>
                </div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-on-primary dark:text-on-surface tracking-tight tabular-nums pt-1 flex flex-wrap items-baseline gap-3">
                  <span>118k+</span>
                  <span className="text-sm font-mono uppercase tracking-widest text-accent-yellow dark:text-primary-yellow">
                    Validated Records
                  </span>
                </div>
                <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-on-primary dark:text-on-surface">
                  ODK Collect &amp; Central Field Data Pipeline
                </h3>
                <p className="font-body text-sm text-on-primary/85 dark:text-on-surface-variant leading-relaxed max-w-2xl">
                  Grassroots VHSND, Godbharai, and PMSMA survey records scrubbed, sanitized, and programmatically validated via Python, Pandas, and offline browser pipelines to eliminate discrepancy windows ahead of Monday district review meetings.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-on-primary/30 dark:border-on-surface/30 flex flex-wrap items-center justify-between text-[11px] font-mono uppercase font-bold text-on-primary dark:text-on-surface gap-2">
                <span>AUTOMATION: PYTHON / PANDAS / NEXT.JS OFFLINE</span>
                <span className="bg-accent-red text-white dark:text-[#121214] px-2 py-0.5">
                  ZERO-DISCREPANCY MANDATE
                </span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Health System Strengthening */}
      <section className="border-b-4 border-outline bg-surface py-12 px-4 sm:px-8 lg:px-12">
        <Section className="py-12">
          <div className="flex flex-col md:flex-row sm:items-end justify-between gap-4 border-b-2 border-outline pb-6 mb-10">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
                System Outcomes
              </span>
              <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface leading-none">
                Health System Strengthening
              </h2>
            </div>
            <p className="text-base leading-relaxed text-on-surface-variant max-w-md">
              Day-to-day fellowship work — support activities woven across Bihar&apos;s public health system, frontline to block.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                rank: 1,
                title: 'Gandhi Fellow — Bihar',
                tag: 'GANDHI FELLOWSHIP · PIRAMAL FOUNDATION',
                body: 'District Resource Fellow, Gandhi Fellowship (Piramal Foundation), based in Muzaffarpur — living in the high-burden blocks and working the frontlines of Bihar’s public health system.',
                accent: 'bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black border border-accent-yellow dark:border-accent-yellow',
              },
              {
                rank: 2,
                title: 'Frontline Worker Capacity Building',
                tag: 'ASHA · ANM · CHO · PHC',
                body: 'Training frontline workers across the public health cadre — ASHA, ANM, CHO and PHC staff — on clinical protocols, records and digital tools that keep sub-centres running.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 3,
                title: 'M-ASHA Digital Application Training',
                tag: '100+ MICRO-SESSIONS',
                body: 'Hands-on rollout of the M-ASHA digital application across 100+ micro-sessions at sector meetings, sub-centres and block headquarters — paper to tablet, village by village.',
                accent: 'bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black border border-accent-yellow dark:border-accent-yellow',
              },
              {
                rank: 4,
                title: 'NQAS Certification Support',
                tag: 'NATIONAL QUALITY ASSURANCE',
                body: 'Physical vs digital register reconciliation across Sub-Centres and PHCs under the NQAS framework, prepping facilities for certification audits.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-[#121214] border border-accent-blue dark:border-accent-blue',
              },
              {
                rank: 5,
                title: 'Maternal & Child Health Programs',
                tag: 'VHSND · GODBHARAI · PMSMA',
                body: 'High-Risk Pregnancy tracking, labor room protocols and maternal-child health outreach at Village Health Sanitation and Nutrition Days, Godbharai and PMSMA clinics.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 6,
                title: '185-Hour Clinical Skills Refresher',
                tag: '12 NURSES · 4 DOCTORS',
                body: 'Structured 5-week clinical skills refresher for 12 Staff Nurses and 4 Doctors — obstetric emergencies and labor room protocols at the district hospital.',
                accent: 'bg-accent-red dark:bg-accent-red text-black dark:text-black border border-accent-red dark:border-accent-red',
              },
              {
                rank: 7,
                title: 'VHSND · Godbharai · PMSMA Data Pipeline',
                tag: 'PYTHON · PANDAS',
                body: 'Python + Pandas pipelines scrubbing, validating and automating grassroots survey records to eliminate discrepancy windows ahead of Monday district review meetings.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-[#121214] border border-accent-blue dark:border-accent-blue',
              },
              {
                rank: 8,
                title: 'MIS Reports for Block & District Review',
                tag: 'WEEKLY BLOCK SUMMARIES',
                body: 'Automated MIS outputs verified ahead of block and district review cycles — field data turned into review-ready tables for BMOs and district leadership.',
                accent: 'bg-accent-blue dark:bg-accent-blue text-white dark:text-[#121214] border border-accent-blue dark:border-accent-blue',
              },
            ].map((item) => (
              <div
                key={item.rank}
                className="bg-surface-container-lowest border-3 border-outline p-6 shadow-[5px_5px_0px_#1a1a1a] dark:shadow-[5px_5px_0px_#0e0e10] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b-2 border-outline pb-3">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${item.accent}`}>
                      0{item.rank} · {item.tag}
                    </span>
                  </div>
                  <h3 className={`font-display text-lg font-bold uppercase tracking-tight ${item.accent.includes('bg-accent-yellow') ? 'text-black dark:text-on-surface' : 'text-primary dark:text-on-surface'}`}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Outcomes */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface border-b-2 border-outline">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-outline pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red block mb-1">
                Outcomes
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary">
                What We Drive Toward
              </h2>
            </div>
            <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-md">
              Two outcome strands anchor every intervention in the field.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-outline p-6 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#0e0e10] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-outline pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5">
                    OUTCOME 01
                  </span>
                  <span className="material-symbols-outlined text-primary text-2xl">diversity_3</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight text-primary">
                  Community Outcomes
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Improved health behaviors, service utilization, and citizen experience within communities — making health systems work for the people they serve.
                </p>
              </div>
              <div className="pt-4 border-t border-outline flex items-center justify-between font-headline text-xs uppercase font-bold text-primary">
                <span className="text-accent-red">Frontline Impact</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border border-outline text-black">
                  PEOPLE-FIRST
                </span>
              </div>
            </div>
            <div className="bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-2 border-outline p-6 shadow-[6px_6px_0px_#ffcc00] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-on-primary/30 dark:border-white pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider bg-accent-yellow dark:bg-primary-yellow text-black px-2 py-0.5">
                    OUTCOME 02
                  </span>
                  <span className="material-symbols-outlined text-accent-yellow dark:text-primary-yellow text-2xl">hub</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight text-on-primary dark:text-on-surface">
                  System Outcomes
                </h3>
                <p className="font-body text-sm text-on-primary/80 dark:text-on-surface-variant leading-relaxed">
                  Stronger governance, better resource allocation, and resilient public health infrastructure — systems that sustain beyond any single intervention.
                </p>
              </div>
              <div className="pt-4 border-t border-on-primary/30 dark:border-white flex items-center justify-between font-headline text-xs uppercase font-bold text-on-primary dark:text-on-surface">
                <span className="text-accent-yellow dark:text-primary-yellow">Institutional Scale</span>
                <span className="bg-on-primary dark:bg-on-surface text-primary dark:text-surface px-2 py-0.5 border border-on-primary/30 dark:border-white">
                  RESILIENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO Building Blocks */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface-container dark:bg-surface-low border-b-2 border-outline">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-outline pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red block mb-1">
                WHO Framework
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary">
                WHO Building Blocks, Under Focus
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-md">
                Day-to-day fellowship work — support activities woven across the 6 WHO building blocks.
              </p>
              <div className="flex items-center gap-2 font-headline text-[10px] uppercase font-bold text-primary">
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border border-outline text-black dark:text-black">
                  6 PILLARS IN FOCUS
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: '01', title: 'Service Delivery', desc: 'Strengthening frontline service delivery at sub-centres and PHCs through protocol adherence and digital tools.', color: 'bg-accent-yellow dark:bg-primary-yellow' },
              { id: '02', title: 'Health Workforce (HRH)', desc: 'Capacity building for ASHA, ANM, CHO, and PHC staff through 100+ micro-sessions.', color: 'bg-accent-red dark:bg-accent-red' },
              { id: '03', title: 'Health Information Systems', desc: 'ODK Collect, M-ASHA digital app, and automated MIS reporting pipelines.', color: 'bg-accent-blue dark:bg-accent-blue' },
              { id: '04', title: 'Access to Medicines', desc: 'Supply chain monitoring and medicine forecasting to prevent stockouts.', color: 'bg-accent-yellow dark:bg-primary-yellow' },
              { id: '05', title: 'Financing', desc: 'Resource allocation and budget tracking for block-level health programs.', color: 'bg-accent-red dark:bg-accent-red' },
              { id: '06', title: 'Leadership & Governance', desc: 'Block and district review cycles, NQAS certification support, and quality assurance.', color: 'bg-accent-blue dark:bg-accent-blue' },
            ].map((pillar) => (
              <div
                key={pillar.id}
                className="bg-surface dark:bg-surface-container-lowest border-2 border-outline p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10] space-y-3 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-b-2 border-outline pb-2">
                  <span className={`font-headline text-xs font-bold uppercase tracking-wider ${pillar.color} ${pillar.color.includes('bg-accent-blue') ? 'text-white dark:text-[#121214]' : 'text-black dark:text-[#121214]'} px-2 py-0.5 border border-outline`}>
                    {pillar.id}{' // '}{pillar.title}
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Mind */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-surface-container-low dark:bg-surface-low border-b-2 border-outline">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-b-2 border-outline pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block mb-1">
                INTERNAL DISCIPLINE &amp; EQUANIMITY
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary">
                FIELD MIND &amp; SUSTAINED OPERATIONAL DISCIPLINE
              </h2>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-wider bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-3 py-1">
              INNER ARCHITECTURE // HIGH-BURDEN CONTEXT
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-outline p-6 bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-outline pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent-red dark:text-accent-red">
                    PRACTICE 01 // COGNITIVE TRAINING
                  </span>
                  <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-primary">
                  Cognitively-Based Compassion Training (CBCT®) &amp; Leadership Workshop
                </h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Formal compassion methodology and emotional resilience training. Developed systemic empathy to engage with frontline workers facing severe burnout, resource scarcity, and structural fatigue.
                </p>
              </div>
              <div className="pt-3 border-t border-outline flex items-center justify-between text-[11px] font-headline uppercase font-bold text-primary">
                <span>LOCATION: HAJIPUR RESIDENTIAL</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-black dark:text-black">COMPASSIONATE SYSTEMS</span>
              </div>
            </div>
            <div className="border-2 border-outline p-6 bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-outline pb-2">
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-accent-blue dark:text-accent-blue">
                    PRACTICE 02 // INTELLECTUAL EQUANIMITY
                  </span>
                  <span className="material-symbols-outlined text-primary text-xl">self_improvement</span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-primary">
                  10-Day Silent Vipassana Meditation Course at Dhamma Vaishali
                </h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Rigorous ten days of Noble Silence and sensory austerity. Cultivated unbroken focus, non-reactive clarity under extreme pressure, and radical endurance.
                </p>
              </div>
              <div className="pt-3 border-t border-outline flex items-center justify-between text-[11px] font-headline uppercase font-bold text-primary">
                <span>DHAMMA VAISHALI, BIHAR</span>
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-black dark:text-black">10-DAY SILENT RETREAT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Feed */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface border-b-2 border-outline">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-on-primary/30 dark:border-outline pb-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow animate-pulse" />
              <h2 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-yellow dark:text-primary-yellow">
                LIVE OPERATIONAL TELEMETRY FEED // FIELD AGENT ADITYA PANDEY
              </h2>
            </div>
            <div className="font-headline text-xs uppercase tracking-widest text-on-primary/70 dark:text-on-surface-variant">
              PULSE FREQUENCY: CONTINUOUS HEARTBEAT
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'FEED_01', title: 'M-ASHA Rollout', desc: 'Daily active health worker data synchronizations across 16 blocks.', status: 'OPERATIONAL' },
              { id: 'FEED_02', title: 'ODK Central Sync', desc: 'PostgreSQL backend collecting structured field assessments nightly.', status: 'OPERATIONAL' },
              { id: 'FEED_03', title: 'MIS Reporting', desc: 'Automated script outputs verified ahead of Monday review cycles.', status: 'OPERATIONAL' },
              { id: 'FEED_04', title: 'Medicine Forecasting', desc: 'Time-series consumption model to predict peripheral stockouts.', status: 'IN PROGRESS' },
            ].map((feed) => (
              <div
                key={feed.id}
                className={`border-2 p-4 space-y-2 ${
                  feed.status === 'IN PROGRESS'
                    ? 'border-accent-yellow dark:border-primary-yellow bg-surface-container-high/10 dark:bg-surface-low'
                    : 'border-on-primary/40 dark:border-outline bg-primary dark:bg-surface-low'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-headline font-bold">
                  <span className="text-on-primary/70 dark:text-on-surface-variant">{feed.id}</span>
                  <span
                    className={
                      feed.status === 'IN PROGRESS'
                        ? 'text-accent-yellow dark:text-primary-yellow font-bold'
                        : 'text-accent-yellow dark:text-primary-yellow font-bold'
                    }
                  >
                    {feed.status}
                  </span>
                </div>
                <div className="font-headline text-sm font-bold uppercase text-on-primary dark:text-on-surface">
                  {feed.title}
                </div>
                <p className="font-body text-[11px] text-on-primary/70 dark:text-on-surface-variant">
                  {feed.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing banner to work */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 lg:py-12 bg-accent-yellow dark:bg-primary-yellow border-b-2 border-outline">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-outline p-6 sm:p-10 bg-surface dark:bg-surface-container-lowest shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#0e0e10]">
          <div className="space-y-2 max-w-2xl">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block">
              FULL-STACK BRIDGE // CODE MEETS CLINICAL REALITY
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-primary leading-tight">
              INTERESTED IN THE UNDERLYING CODE &amp; ARCHITECTURE?
            </h2>
            <p className="font-body text-sm text-on-surface-variant">
              Inspect the deterministic Python pipelines, offline-first architectures, and production code bases engineered to empower public health systems.
            </p>
          </div>
          <Link
            href="/work"
            className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-sm font-bold uppercase tracking-widest border-2 border-outline shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <span>EXPLORE PRODUCTION WORK &amp; SYSTEMS</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}



