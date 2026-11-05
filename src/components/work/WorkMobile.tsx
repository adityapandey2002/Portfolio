'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: 'bihar',
    tag: 'LIVE COMMERCE',
    title: 'BiharKaSwaad E-Commerce',
    subtitle: 'BiharKaSwaad E-Commerce Platform',
    desc: 'Hyper-local artisanal food commerce engine with Razorpay HMAC verification and variant-aware inventory.',
    img: '/work/preview-biharkaswaad.png',
    href: 'https://biharkaswaad.in',
    metrics: ['4,500+ ORDERS', '0.00% PAY DROP', '2,200+ PINCODES'],
    chips: ['React', 'Node.js', 'Express', 'MySQL', 'Razorpay', 'Tailwind'],
  },
  {
    id: 'sadar',
    tag: 'CIVIC HEALTH PORTAL',
    title: 'Araria District Hospital OS',
    subtitle: 'District Hospital Araria Civic Healthcare Portal',
    desc: 'Government health informatics terminal: OPD token flow, blood bank ledger, emergency triage.',
    img: '/work/preview-sadar-hospital.png',
    href: 'https://hospital-araria-f5wl.vercel.app/',
    metrics: ['1,100+ DAILY PATIENTS', 'E-RAKTOSH SYNC', '250+ BEDS'],
    chips: ['Next.js', 'Supabase', 'Redis', 'Tailwind'],
  },
  {
    id: 'matru',
    tag: 'MATERNAL TRIAGE PWA',
    title: 'Matru Suraksha',
    subtitle: 'Matru Suraksha (मातृ सुरक्षा)',
    desc: 'Offline-first high-risk pregnancy triage PWA with deterministic 8-danger-sign matrix.',
    img: '/work/preview-matru-suraksha.png',
    href: 'https://hrp-pilot-api.onrender.com',
    metrics: ['8 DANGER SIGNS', 'OFFLINE-FIRST', 'DHS/CMO ESCALATION'],
    chips: ['React', 'PWA', 'IndexedDB'],
  },
  {
    id: 'india',
    tag: 'LIVE DATA DASHBOARD',
    title: 'India Development Data Engine',
    subtitle: 'India Development Data Engine',
    desc: 'DuckDB in-memory OLAP over NFHS-5 with TopoJSON boundaries and correlation engine.',
    img: '/work/preview-india-data-engine.png',
    href: 'https://india-dashboard-delta.vercel.app/',
    metrics: ['118K+ RECORDS', '32ms CORRELATION', 'NFHS-5'],
    chips: ['DuckDB', 'Next.js', 'TopoJSON'],
  },
  {
    id: 'consultancy',
    tag: 'LIVE COMMERCE PORTAL',
    title: 'Consultancy Wala',
    subtitle: 'Consultancy Wala — E-Commerce Growth Agency',
    desc: 'Founder-led e-commerce growth agency: Amazon/Flipkart/Meesho launch, PPC, cataloging, ops. 50+ brands, ₹40Cr+ GMV.',
    img: '/work/preview-consultancywala.png',
    href: 'https://consultancywala.com',
    metrics: ['50+ BRANDS', '₹40Cr+ GMV', '500+ LISTINGS'],
    chips: ['Next.js', 'React', 'Tailwind'],
  },
  {
    id: 'vhsnd',
    tag: 'OFFLINE-FIRST PIPELINE',
    title: 'VHSND Pipeline',
    subtitle: 'VHSND & PMSMA Data-Cleaning Pipeline',
    desc: 'Offline-first browser pipeline: ODK/Excel → normalise → adjudicate contradictions → charts → PPTX/DOCX/CSV/JSON. 253 cols, 37 rules, 21 indicators.',
    img: '/work/preview-vhsnd-pipeline.png',
    href: null,
    metrics: ['253 COLUMNS', '37 RULES', '212 TESTS'],
    chips: ['Next.js 16', 'React 19', 'TypeScript'],
  },
];

const SPECIALIZED = [
  { title: 'Prodigy / AI', desc: 'AI-assisted productivity tooling.', icon: 'psychology' },
  { title: 'SpaceX ML', desc: 'Machine learning experiments on launch telemetry.', icon: 'rocket_launch' },
  { title: 'Field Hardware', desc: 'Embedded hardware for frontline clinics.', icon: 'memory' },
];

export function WorkMobile() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 px-3 py-4 lg:hidden">
      {/* Hero */}
      <section className="space-y-3 border-b-2 border-outline pb-4">
        <span className="inline-block bg-primary px-2 py-1 font-headline text-[10px] font-bold uppercase tracking-widest text-primary-container">
          {'/* 05 // PRODUCTION WORK & SYSTEMS */'}
        </span>
        <h1 className="font-headline text-2xl font-bold uppercase leading-tight tracking-tight text-primary">
          Engineered for high-integrity commerce &amp; deterministic frontline scale
        </h1>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          7 live engines across commerce, civic health, maternal triage, data analytics, hardware, growth agency, and offline pipelines.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary-container px-2 py-0.5 font-headline text-[10px] font-bold uppercase tracking-wider text-on-primary-container border border-outline">
            7 LIVE ENGINES
          </span>
        </div>
      </section>

      {/* Jump strip */}
      <nav
        aria-label="Jump to project"
        className="sticky top-16 z-40 -mx-3 flex gap-2 overflow-x-auto bg-surface-container-high/95 px-3 py-2 backdrop-blur-md border-b-2 border-outline"
      >
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="shrink-0 border-2 border-outline bg-surface px-2.5 py-1 font-headline text-[10px] font-bold uppercase tracking-wider text-primary shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#0e0e10]"
          >
            {p.title.split(' ')[0]}
          </a>
        ))}
      </nav>

      {/* Project cards */}
      {PROJECTS.map((p, i) => (
        <article
          key={p.id}
          id={p.id}
          className="scroll-mt-24 border-2 border-outline bg-surface shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#0e0e10]"
        >
          <div className="border-b-2 border-outline bg-primary px-3 py-2 font-headline text-[10px] font-bold uppercase tracking-widest text-primary-container">
            {p.tag}
          </div>
          <Image
            alt={`${p.title} preview`}
            className="h-36 w-full object-cover"
            height={1100}
            src={p.img}
            width={1100}
          />
          <div className="space-y-3 p-3">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-headline text-lg font-bold uppercase tracking-tight text-primary">
                {p.title}
              </h2>
              <span className="font-headline text-[10px] font-bold text-on-surface-variant">
                #{String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-1">
              {p.metrics.map((m) => (
                <span
                  key={m}
                  className="border border-outline bg-surface-container px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-primary"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {p.chips.map((c) => (
                <span
                  key={c}
                  className="border border-outline-variant bg-surface-container-high px-1.5 py-0.5 font-mono text-[9px] text-on-surface-variant"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              {p.href ? (
                <a
                  href={p.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex-1 border-2 border-outline bg-primary px-3 py-2 text-center font-headline text-[10px] font-bold uppercase tracking-wider text-primary-container shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#0e0e10]"
                >
                  Live Site
                </a>
              ) : (
                <span className="flex-1 border-2 border-dashed border-outline px-3 py-2 text-center font-headline text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  LIVE URL PENDING
                </span>
              )}
              <button
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                className="border-2 border-outline bg-surface-container px-3 py-2 font-headline text-[10px] font-bold uppercase tracking-wider text-primary"
              >
                {expanded === p.id ? 'Less' : 'Specs'}
              </button>
            </div>
            {expanded === p.id && (
              <div className="border-t border-outline pt-2 font-mono text-[10px] text-on-surface-variant leading-relaxed">
                {p.subtitle}
              </div>
            )}
          </div>
        </article>
      ))}

      {/* Specialized */}
      <section className="space-y-3 border-t-2 border-outline pt-4">
        <h2 className="font-headline text-lg font-bold uppercase tracking-tight text-primary">
          Specialized Systems
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {SPECIALIZED.map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-3 border-2 border-outline bg-surface-container p-3 shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#0e0e10]"
            >
              <span className="material-symbols-outlined text-2xl text-primary">{s.icon}</span>
              <div>
                <div className="font-headline text-sm font-bold uppercase tracking-tight text-primary">
                  {s.title}
                </div>
                <div className="font-body text-xs text-on-surface-variant">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-2 border-outline bg-primary p-4 text-primary-container shadow-[4px_4px_0px_#ffcc00]">
        <h2 className="font-headline text-base font-bold uppercase tracking-tight">
          Want to dive into production codebases?
        </h2>
        <p className="mt-1 font-body text-xs text-primary-container/90">
          Open-source repos, reproducible benchmarks, and deep-dive reports.
        </p>
        <Link
          href="/#contact"
          className="mt-3 inline-block border-2 border-primary-container bg-primary-container px-3 py-2 font-headline text-[10px] font-bold uppercase tracking-wider text-primary"
        >
          Engage Fellow
        </Link>
      </section>
    </div>
  );
}
