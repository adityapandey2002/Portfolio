import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Work — Aditya Pandey',
  description:
    'Selected work — full-stack apps, data dashboards, and ML models built end-to-end and shipped to production.',
};

export default function WorkPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b-4 border-primary dark:border-white bg-surface dark:bg-surface-dark">
        <Section className="py-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline font-bold text-xs uppercase px-2.5 py-1 tracking-widest border border-primary dark:border-white shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                {'/* 01 // PRODUCTION CODEBASES & SYSTEMS ARCHITECTURE */'}
              </span>
              <span className="font-headline text-xs font-bold tracking-wider text-on-surface-variant dark:text-on-surface-variant uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-red dark:bg-accent-red animate-ping" />
                ORDERED TECHNICAL LEDGER // LIVE PRODUCTION RUNTIMES
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-primary dark:text-on-surface tracking-tight uppercase leading-[0.95] max-w-5xl">
                ENGINEERED FOR{' '}
                <span className="bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 border-2 border-primary dark:border-white inline-block">
                  HIGH-INTEGRITY COMMERCE
                </span>{' '}
                &amp; DETERMINISTIC FRONTLINE SCALE
              </h1>
              <p className="font-body text-base md:text-xl text-on-surface-variant dark:text-on-surface-variant max-w-4xl font-normal leading-relaxed">
                Production transactional e-commerce engines, civic district hospital queues, zero-connectivity clinical maternal triage PWAs, and sub-district macro data spatial platforms built for extreme reliability.
              </p>
            </div>
            {/* 4-Up Bento Stat Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  FLAGSHIP LEDGER // ORDERED
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    04+3
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-red dark:text-accent-red mt-1">
                    4 FLAGSHIPS + 3 SPECIALIZED
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  Ranked strictly by operational impact.
                </div>
              </div>
              <div className="bg-accent-yellow dark:bg-primary-yellow p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between text-on-primary-container dark:text-black">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-black pb-2 border-b border-primary dark:border-white">
                  SECURITY // HMAC SHA-256
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-black">
                    100%
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-primary dark:text-black mt-1">
                    TAMPER-PROOF PAYMENTS
                  </div>
                </div>
                <div className="font-body text-xs text-primary dark:text-black font-medium">
                  Server-side amount re-validation pipeline.
                </div>
              </div>
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  EDGE RESPONSIVENESS
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    &lt;50ms
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-blue dark:text-accent-blue mt-1">
                    QUERY LATENCY (DUCKDB)
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  118k+ indicators indexed across districts.
                </div>
              </div>
              <div className="bg-surface-bright dark:bg-surface-low p-5 border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant pb-2 border-b border-primary dark:border-white">
                  OFFLINE PROTOCOL
                </div>
                <div className="py-4">
                  <div className="font-headline font-bold text-4xl lg:text-5xl text-primary dark:text-on-surface">
                    0%
                  </div>
                  <div className="font-headline text-xs uppercase font-bold text-accent-red dark:text-accent-red mt-1">
                    DATA LOSS ON 2G/ZERO-CONN
                  </div>
                </div>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  Dexie.js IndexedDB append-only sync.
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Sticky filter bar */}
      <section className="w-full bg-surface-container dark:bg-surface-container border-b-2 border-primary dark:border-white px-4 sm:px-8 lg:px-12 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-on-surface text-[20px]">filter_alt</span>
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-on-surface">
              PROJECT INDEX FILTER:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['ALL SYSTEMS (07)', 'FLAGSHIPS #1-4', 'E-COMMERCE (01)', 'CIVIC & CLINICAL (02)', 'MACRO DATA & AI (01)'].map((label, i) => (
              <button
                key={label}
                className={`font-headline text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-primary dark:border-white shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff] transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                  i === 0
                    ? 'bg-primary dark:bg-on-surface text-on-primary dark:text-surface'
                    : 'bg-surface dark:bg-surface-container text-primary dark:text-on-surface hover:bg-primary-container dark:hover:bg-primary-yellow hover:text-on-primary-container dark:hover:text-on-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BiharKaSwaad E-Commerce Flagship */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary dark:bg-on-surface text-accent-yellow dark:text-primary-yellow font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                FLAGSHIP 01 // PRODUCTION COMMERCE
              </span>
              <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                LIVE PRODUCTION // biharkaswaad.in
              </span>
              <span className="bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                HOSTINGER CLOUD + NODE RUNTIME
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              DEPLOYMENT: PROD_COMMERCE_v2
            </div>
          </div>
          {/* Title and Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-on-surface tracking-tight uppercase leading-tight">
                BIHARKASWAAD E-COMMERCE PLATFORM
                <span className="block text-xl sm:text-2xl text-on-surface-variant dark:text-on-surface-variant font-normal tracking-normal mt-1">
                  Full-Stack Artisanal Food Logistics, Deterministic Payments &amp; Order Pipeline
                </span>
              </h2>
              <p className="font-body text-base text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                Direct-to-consumer high-integrity commerce system engineered for authentic regional food distribution across India. Built with a zero-tamper Razorpay payment verification engine, variant-aware relational inventory controls, automated courier tracking webhooks, and an optimized React frontend running in production.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 p-4 bg-surface-container dark:bg-surface-low border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
              <div className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface border-b border-primary dark:border-white pb-2 flex items-center justify-between">
                <span>COMMERCE QUALITY GATES</span>
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">verified</span>
              </div>
              <div className="space-y-2 text-xs font-headline">
                <div className="flex justify-between items-center"><span className="text-on-surface-variant dark:text-on-surface-variant">PAYMENT VERIFY:</span> <span className="font-bold text-primary dark:text-on-surface">HMAC SHA-256 Signature</span></div>
                <div className="flex justify-between items-center"><span className="text-on-surface-variant dark:text-on-surface-variant">TAMPER PROTECTION:</span> <span className="font-bold text-accent-red dark:text-accent-red">Server Price Re-Validation</span></div>
                <div className="flex justify-between items-center"><span className="text-on-surface-variant dark:text-on-surface-variant">INVENTORY LOCK:</span> <span className="font-bold text-primary dark:text-on-surface">ACID Relational MySQL</span></div>
                <div className="flex justify-between items-center"><span className="text-on-surface-variant dark:text-on-surface-variant">PRODUCTION STORE:</span> <span className="font-bold text-accent-blue dark:text-accent-blue">biharkaswaad.in</span></div>
              </div>
            </div>
          </div>
          {/* Split: Live Browser Window Preview vs Technical Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Left: Browser Window Mockup */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] overflow-hidden">
                {/* Browser Chrome Topbar */}
                <div className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-4 py-2.5 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent-red dark:bg-accent-red inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-blue dark:bg-accent-blue inline-block" />
                    <span className="font-bold ml-2 tracking-wide text-accent-yellow dark:text-primary-yellow">LIVE BROWSER PREVIEW</span>
                  </div>
                  <span className="text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant bg-accent-yellow/20 dark:bg-primary-yellow/20 px-2 py-0.5 border border-accent-yellow/30 dark:border-primary-yellow/30">
                    biharkaswaad.in
                  </span>
                </div>
                {/* Browser Content - Live iframe */}
                <div className="relative bg-surface dark:bg-surface-container-lowest border-b border-primary dark:border-white max-h-[520px] overflow-hidden">
                  <iframe
                    src="https://biharkaswaad.in"
                    title="BiharKaSwaad live website"
                    className="w-full h-[520px] border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
                {/* Browser Footer Strip */}
                <div className="p-3 bg-surface-container dark:bg-surface-low flex items-center justify-between text-xs font-headline">
                  <span className="font-bold uppercase text-primary dark:text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">lock</span>
                    SSL SHA-256 Validated
                  </span>
                  <span className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">Production Hostinger Cloud</span>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a className="flex-1 py-3 px-4 bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-accent-yellow dark:hover:bg-primary-yellow hover:text-black dark:hover:text-black transition-colors flex items-center justify-center gap-2" href="https://biharkaswaad.in" rel="noopener noreferrer" target="_blank">
                  <span>Open Live Site: biharkaswaad.in</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a className="py-3 px-4 bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-surface-container dark:hover:bg-surface-low transition-colors flex items-center justify-center gap-1.5" href="https://github.com/adityapandey2002" rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>View Git Repository</span>
                </a>
              </div>
            </div>
            {/* Right: Technical Architecture & Security Pipeline */}
            <div className="lg:col-span-7 space-y-6">
              {/* Security & Reconciliation Card */}
              <div className="border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3">
                  <span className="font-headline font-bold text-sm uppercase tracking-wider text-primary dark:text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-[20px]">security</span>
                    Razorpay HMAC SHA-256 Webhook Reconciliation &amp; Anti-Tamper Pipeline
                  </span>
                  <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-[10px] font-bold px-2 py-0.5 border border-primary dark:border-white">STRICT ZERO-TRUST</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Eliminates client-side price tampering vectors. When a checkout order initiates, the backend recalculates exact SKU prices, discounts, and courier weight tariffs directly from relational tables—never accepting client-supplied amounts.
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-start gap-3">
                    <span className="font-bold text-primary dark:text-on-surface bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-[10px]">STEP 01</span>
                    <div>
                      <div className="font-bold text-primary dark:text-on-surface uppercase">Server-Side Amount Re-Validation</div>
                      <div className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">Database lookup for variant pricing &amp; tax before generating <code>order_id</code> via Razorpay Orders API.</div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-start gap-3">
                    <span className="font-bold text-primary dark:text-on-surface bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-[10px]">STEP 02</span>
                    <div>
                      <div className="font-bold text-primary dark:text-on-surface uppercase">Cryptographic HMAC Verification</div>
                      <div className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">Calculates <code>crypto.createHmac(&apos;sha256&apos;, secret).update(order_id + &apos;|&apos; + payment_id).digest(&apos;hex&apos;)</code> to confirm authenticity.</div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-start gap-3">
                    <span className="font-bold text-primary dark:text-on-surface bg-accent-yellow dark:bg-primary-yellow px-2 py-0.5 text-[10px]">STEP 03</span>
                    <div>
                      <div className="font-bold text-primary dark:text-on-surface uppercase">Webhook Failover &amp; Idempotency</div>
                      <div className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">Webhook listens for <code>payment.captured</code> events with unique transaction idempotency keys to prevent double-crediting.</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Database & Order Lifecycle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] space-y-2">
                  <div className="font-headline font-bold text-xs uppercase text-primary dark:text-on-surface border-b border-primary dark:border-white pb-1.5 flex items-center justify-between">
                    <span>MYSQL RELATIONAL SCHEMA</span>
                    <span className="text-[10px] text-on-surface-variant dark:text-on-surface-variant font-mono">ACID</span>
                  </div>
                  <ul className="text-xs space-y-1 font-body text-on-surface-variant dark:text-on-surface-variant">
                    <li>• <strong>Variant-Aware Inventory:</strong> Tracks granular weights (250g, 500g, 1kg) with row-locking transactions.</li>
                    <li>• <strong>Normalized Orders &amp; Items:</strong> Decoupled tracking for multi-item baskets with immutable invoice snaps.</li>
                    <li>• <strong>Customer Ledger:</strong> Encrypted PII, verified phone tokens, and delivery address histories.</li>
                  </ul>
                </div>
                <div className="p-4 bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] space-y-2">
                  <div className="font-headline font-bold text-xs uppercase text-primary dark:text-on-surface border-b border-primary dark:border-white pb-1.5 flex items-center justify-between">
                    <span>ORDER LIFECYCLE &amp; LOGISTICS</span>
                    <span className="text-[10px] text-accent-blue dark:text-accent-blue font-mono">DISPATCH</span>
                  </div>
                  <ul className="text-xs space-y-1 font-body text-on-surface-variant dark:text-on-surface-variant">
                    <li>• <strong>Lifecycle States:</strong> PENDING → PAID → PACKED → DISPATCHED → OUT_FOR_DELIVERY → DELIVERED.</li>
                    <li>• <strong>Automated Courier Sync:</strong> Integration ready for Shiprocket/Delhivery tracking webhooks.</li>
                    <li>• <strong>Admin Dashboard:</strong> Real-time order dispatch board with printable shipping bills.</li>
                  </ul>
                </div>
              </div>
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['React 18', 'Node.js', 'Express REST', 'MySQL DB', 'Razorpay HMAC', 'Hostinger Cloud', 'Tailwind CSS'].map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-surface-container dark:bg-surface-low border border-primary dark:border-white font-headline text-[11px] font-bold uppercase text-primary dark:text-on-surface">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matru Suraksha Flagship */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                FLAGSHIP 03 // CLINICAL TRIAGE PWA
              </span>
              <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                ACTIVE FIELD PILOT // BIHAR HEALTH OPS
              </span>
              <span className="bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                OFFLINE-FIRST ARCHITECTURE
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              NODE: PWA-MS-01 // FIELD VERIFIED
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-on-surface tracking-tight uppercase leading-tight">
                MATRU SURAKSHA (मातृ सुरक्षा)
                <span className="block text-xl sm:text-2xl text-on-surface-variant dark:text-on-surface-variant font-normal tracking-normal mt-1">
                  Multi-Tier High-Risk Pregnancy Care &amp; Clinical Triage Engine
                </span>
              </h2>
              <p className="font-body text-base text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                Engineered to eliminate systemic communication delays in agrarian rural clinics. Enables Auxiliary Nurse Midwives (ANMs) to triage maternal danger signs without active cellular reception, calculating instant risk stratifications while synchronizing cryptographically validated records up through district governance desks.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 p-4 bg-surface-container dark:bg-surface-low border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
              <div className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface border-b border-primary dark:border-white pb-2 flex items-center justify-between">
                <span>CORE QUALITY GATES</span>
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">verified</span>
              </div>
              <div className="space-y-2 text-xs font-headline">
                {[
                  { label: 'TEST COVERAGE:', value: '>=80% Changed Lines', color: 'text-primary dark:text-on-surface' },
                  { label: 'A11Y AUDIT:', value: '0 Violations (WCAG AAA)', color: 'text-accent-red dark:text-accent-red' },
                  { label: '3G LCP BENCHMARK:', value: '<=2.18s Verified', color: 'text-accent-blue dark:text-accent-blue' },
                  { label: 'CLIENT FOOTPRINT:', value: '<=170kB gzipped', color: 'text-primary dark:text-on-surface' },
                ].map((g) => (
                  <div key={g.label} className="flex justify-between items-center">
                    <span className="text-on-surface-variant dark:text-on-surface-variant">{g.label}</span>
                    <span className={`font-bold ${g.color}`}>{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 6-Tier Escalation Hierarchy */}
          <div className="border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
            <div className="flex items-center justify-between border-b-2 border-primary dark:border-white pb-3 mb-4">
              <span className="font-headline font-bold text-sm uppercase tracking-wider text-primary dark:text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-[18px]">account_tree</span>
                6-Tier Administrative Escalation Hierarchy &amp; SLA Chain
              </span>
              <span className="font-headline text-[11px] font-bold text-on-surface-variant dark:text-on-surface-variant">
                15-DAY AUDIT CLOCK
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { tier: 'TIER 1', label: 'Field ANM // Health Sub-Centre', desc: 'Offline PWA registration, 8 danger signs check, auto-graded risk score.', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
                { tier: 'TIER 2', label: 'Sector MOIC // Block HQ', desc: 'Real-time sync on 2G, clinical review dashboard, referral authorization.', bg: 'bg-accent-red dark:bg-accent-red', text: 'text-white dark:text-white' },
                { tier: 'TIER 3', label: 'Block Health Manager (BHM)', desc: 'Overdue flag escalation, resource reallocation, field visit scheduling.', bg: 'bg-accent-yellow dark:bg-primary-yellow', text: 'text-black dark:text-black' },
                { tier: 'TIER 4', label: 'District Hospital // Labor Room', desc: 'HRP admission, clinical intervention, 24-hr monitoring protocol.', bg: 'bg-accent-blue dark:bg-accent-blue', text: 'text-white dark:text-white' },
                { tier: 'TIER 5', label: 'District Health Society (DHS)', desc: 'SLA breach reporting, mortality review, systemic gap analysis.', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
                { tier: 'TIER 6', label: 'State Health Mission', desc: 'Policy feedback loop, budget reallocation, program scale-up.', bg: 'bg-surface-container dark:bg-surface-low', text: 'text-primary dark:text-on-surface' },
              ].map((t) => (
                <div key={t.tier} className="p-2.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-start gap-3">
                  <span className={`font-headline font-bold text-xs ${t.bg} ${t.text} px-2 py-0.5 shrink-0`}>
                    {t.tier}
                  </span>
                  <div>
                    <div className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface">
                      {t.label}
                    </div>
                    <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sadar Hospital Araria Flagship */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent-blue dark:bg-accent-blue text-white font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                FLAGSHIP 02 // CIVIC INFRASTRUCTURE
              </span>
              <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                GOVT OF BIHAR COLLABORATION
              </span>
              <span className="bg-surface-container dark:bg-surface-low text-primary dark:text-on-surface font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                CAMPUS: SADAR HOSPITAL ARARIA
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              OFFICIAL: dh.araria@bihar.gov.in
            </div>
          </div>
          {/* Headline and Overview */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-on-surface tracking-tight uppercase leading-tight">
              DISTRICT HOSPITAL ARARIA CIVIC HEALTHCARE PORTAL
              <span className="block text-xl sm:text-2xl text-on-surface-variant dark:text-on-surface-variant font-normal tracking-normal mt-1">
                Real-Time OPD Dispatch, Emergency Blood Reserves &amp; Public Transparency Engine
              </span>
            </h2>
            <p className="font-body text-base text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
              Engineered to dismantle severe OPD congestion and eliminate emergency blood shortages across the 250+ bed Sadar Hospital campus near Araria Collectorate. Replaces manual paper registration with deterministic queue state machines and live blood bank inventory telemetry.
            </p>
          </div>
          {/* Split: Live Website Preview vs Subsystems */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Browser Window Mockup */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] overflow-hidden">
                <div className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-4 py-2.5 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent-red dark:bg-accent-red inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-blue dark:bg-accent-blue inline-block" />
                    <span className="font-bold ml-2 tracking-wide text-accent-yellow dark:text-primary-yellow">LIVE CIVIC PORTAL</span>
                  </div>
                  <span className="text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant bg-accent-yellow/20 dark:bg-primary-yellow/20 px-2 py-0.5 border border-accent-yellow/30 dark:border-primary-yellow/30">
                    hospital-araria-f5wl.vercel.app
                  </span>
                </div>
                <div className="relative bg-surface dark:bg-surface-container-lowest border-b border-primary dark:border-white max-h-[520px] overflow-y-auto">
                  <img
                    alt="District Hospital Araria Civic Healthcare Portal screenshot"
                    className="w-full h-auto block object-cover"
                    loading="lazy"
                    src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                  />
                </div>
                <div className="p-3 bg-surface-container dark:bg-surface-low flex items-center justify-between text-xs font-headline">
                  <span className="font-bold uppercase text-primary dark:text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">local_hospital</span>
                    250+ Bed Sadar Campus
                  </span>
                  <span className="text-accent-blue dark:text-accent-blue font-bold text-[11px]">Supabase Realtime + Redis</span>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  className="flex-1 py-3 px-4 bg-accent-blue dark:bg-accent-blue text-white font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-primary dark:hover:bg-on-surface hover:text-on-primary dark:hover:text-surface transition-colors flex items-center justify-center gap-2"
                  href="https://hospital-araria-f5wl.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open Live Portal</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a
                  className="py-3 px-4 bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-surface-container dark:hover:bg-surface-low transition-colors flex items-center justify-center gap-1.5"
                  href="mailto:dh.araria@bihar.gov.in"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Gov Specs Dossier</span>
                </a>
              </div>
            </div>
            {/* Right: Architectural Subsystems */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-headline font-bold text-sm uppercase tracking-wider text-primary dark:text-on-surface pb-2 border-b-2 border-primary dark:border-white flex items-center justify-between">
                <span>CIVIC DISPATCH ARCHITECTURE</span>
                <span className="text-xs font-bold text-accent-blue dark:text-accent-blue">REDIS + SUPABASE REALTIME</span>
              </div>
              <div className="p-4 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] flex gap-4">
                <div className="w-12 h-12 bg-primary dark:bg-on-surface text-accent-yellow dark:text-primary-yellow font-headline font-bold text-lg flex items-center justify-center shrink-0 border border-primary dark:border-white">
                  01
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">Tokenized OPD Queue Engine</h3>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    Redis-backed non-repeating cryptographically signed token queue. Dismantles physical registration bottlenecks with live display calling boards across 12 specialty consultation chambers.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] flex gap-4">
                <div className="w-12 h-12 bg-accent-red dark:bg-accent-red text-white dark:text-white font-headline font-bold text-lg flex items-center justify-center shrink-0 border border-primary dark:border-white">
                  02
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">Live Blood Bank Reserves &amp; Alert System</h3>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    Publicly broadcast inventory ledger displaying exact available units of whole blood and packed red cells (PRBC) across all ABO/Rh groups. Automated SMS alerts for emergency donor networks when units drop below safety thresholds.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] flex gap-4">
                <div className="w-12 h-12 bg-primary dark:bg-on-surface text-accent-yellow dark:text-primary-yellow font-headline font-bold text-lg flex items-center justify-center shrink-0 border border-primary dark:border-white">
                  03
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">Emergency 102/108 Ambulance Referral Matrix</h3>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    Direct driver carrier links and emergency room dispatch status. Instant alert routing for obstetric and trauma emergencies from remote border blocks (Sikti, Palasi, Forbesganj) with zero delay.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] flex gap-4">
                <div className="w-12 h-12 bg-surface-container dark:bg-surface-low text-primary dark:text-on-surface font-headline font-bold text-lg flex items-center justify-center shrink-0 border border-primary dark:border-white">
                  04
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">Bilingual Circulars &amp; Public Notices</h3>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    Instant Hindi/English push circulars for pulse polio drives, Japanese Encephalitis alerts, doctor leave announcements, and Janani Suraksha Yojana payment disbursement schedules.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {['React 18', 'TypeScript', 'Supabase Realtime', 'Redis Queue', 'Vercel Edge', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-surface-container dark:bg-surface-low border border-primary dark:border-white font-headline text-[11px] font-bold uppercase text-primary dark:text-on-surface"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* India Development Data Engine Flagship */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface dark:bg-surface-dark px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary dark:bg-on-surface text-accent-yellow dark:text-primary-yellow font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider shadow-[2px_2px_0px_#1a1a1a] dark:shadow-[2px_2px_0px_#ffffff]">
                FLAGSHIP 04 // SPATIAL ANALYTICS &amp; VECTOR AI
              </span>
              <span className="bg-surface-container dark:bg-surface-low text-primary dark:text-on-surface font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                118K+ INDICATORS INDEXED
              </span>
              <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline text-xs font-bold uppercase px-3 py-1 border-2 border-primary dark:border-white tracking-wider">
                DUCKDB + PGVECTOR + GROQ LLM
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              NFHS-5 // CENSUS // NITI AAYOG
            </div>
          </div>
          {/* Headline and Overview */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-on-surface tracking-tight uppercase leading-tight">
              INDIA DEVELOPMENT DATA ENGINE &amp; SOCIO-ECONOMIC CHOROPLETH
              <span className="block text-xl sm:text-2xl text-on-surface-variant dark:text-on-surface-variant font-normal tracking-normal mt-1">
                High-Throughput Spatial Analytics &amp; Vectorized Indicator Discovery
              </span>
            </h2>
            <p className="font-body text-base text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
              Exploratory macro-data portal built to digest and visualize massive socio-economic census sharding. Unifies complex cross-sector datasets from NFHS-5 (National Family Health Survey), Census of India, and NITI Aayog into an instant, vectorized analytical workspace with sub-50ms execution.
            </p>
          </div>
          {/* Split: Browser Preview vs Technical Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Browser Window Mockup */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] overflow-hidden">
                {/* Browser Chrome Topbar */}
                <div className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-4 py-2.5 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent-red dark:bg-accent-red inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow inline-block" />
                    <span className="w-3 h-3 rounded-full bg-accent-blue dark:bg-accent-blue inline-block" />
                    <span className="font-bold ml-2 tracking-wide text-accent-yellow dark:text-primary-yellow">LIVE DATA DASHBOARD</span>
                  </div>
                  <span className="text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant bg-accent-yellow/20 dark:bg-primary-yellow/20 px-2 py-0.5 border border-accent-yellow/30 dark:border-primary-yellow/30">
                    india-dashboard-delta.vercel.app
                  </span>
                </div>
                {/* Browser Content */}
                <div className="relative bg-surface dark:bg-surface-container-lowest border-b border-primary dark:border-white max-h-[520px] overflow-y-auto">
                  <img alt="India Development Data Engine live dashboard screenshot" className="w-full h-auto block object-cover" loading="lazy" src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
                </div>
                {/* Browser Footer Strip */}
                <div className="p-3 bg-surface-container dark:bg-surface-low flex items-center justify-between text-xs font-headline">
                  <span className="font-bold uppercase text-primary dark:text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-accent-blue dark:text-accent-blue text-sm">query_stats</span>
                    Sub-50ms OLAP Queries
                  </span>
                  <span className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">252,170 Data Points</span>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a className="flex-1 py-3 px-4 bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-accent-yellow dark:hover:bg-primary-yellow hover:text-black dark:hover:text-black transition-colors flex items-center justify-center gap-2" href="https://india-dashboard-delta.vercel.app/" rel="noopener noreferrer" target="_blank">
                  <span>Open Live Engine</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a className="py-3 px-4 bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff] hover:bg-surface-container dark:hover:bg-surface-low transition-colors flex items-center justify-center gap-1.5" href="https://github.com/adityapandey2002" rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>Data Pipeline Git</span>
                </a>
              </div>
            </div>
            {/* Right: Technical Data Architecture & Pipeline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff]">
                  <div className="font-headline font-bold text-xs uppercase text-accent-red dark:text-accent-red pb-1 mb-2 border-b border-primary dark:border-white">
                    DUCKDB IN-MEMORY OLAP
                  </div>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                    Executes in-memory analytical aggregation directly against Parquet shards in milliseconds. Calculates sub-district percentiles, Z-scores, and cross-sector correlations without database locks.
                  </p>
                </div>
                <div className="p-4 bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white shadow-[3px_3px_0px_#1a1a1a] dark:shadow-[3px_3px_0px_#ffffff]">
                  <div className="font-headline font-bold text-xs uppercase text-accent-blue dark:text-accent-blue pb-1 mb-2 border-b border-primary dark:border-white">
                    PGVECTOR &amp; GROQ LLM RETRIEVAL
                  </div>
                  <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                    Vectorized queries (e.g., <em>&quot;Maternal anemia in flood-prone northern plains&quot;</em>) mapped to statistical indicators via Groq LLM streaming embeddings in sub-50ms latency.
                  </p>
                </div>
              </div>
              {/* Pipeline Architecture Steps */}
              <div className="border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest p-5 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] space-y-3">
                <div className="font-headline font-bold text-xs uppercase tracking-wider text-primary dark:text-on-surface border-b border-primary dark:border-white pb-2 flex items-center justify-between">
                  <span>DATA HARVESTING &amp; CHOROPLETH ENGINE</span>
                  <span className="font-mono text-[10px] text-accent-blue dark:text-accent-blue">&lt;48ms MEDIAN</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-center gap-3">
                    <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5 font-bold shrink-0">STEP 01</span>
                    <span>Raw Govt PDF / CSV Dumps (NFHS-5, HMIS, UDISE+, Census of India)</span>
                  </div>
                  <div className="p-2 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-center gap-3">
                    <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5 font-bold shrink-0">STEP 02</span>
                    <span>Python/Pandas sanitization pipeline, normalization &amp; FIPS/LGD boundary mapping</span>
                  </div>
                  <div className="p-2 bg-surface-container dark:bg-surface-low border border-primary dark:border-white flex items-center gap-3">
                    <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-2 py-0.5 font-bold shrink-0">STEP 03</span>
                    <span>Zstandard compressed columnar Parquet shards + Postgres pgvector embeddings</span>
                  </div>
                  <div className="p-2 bg-primary dark:bg-on-surface text-accent-yellow dark:text-primary-yellow border border-primary dark:border-white flex items-center gap-3">
                    <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black px-2 py-0.5 font-bold shrink-0">STEP 04</span>
                    <span>Interactive Leaflet / D3.js TopoJSON sub-district choropleth renderer</span>
                  </div>
                </div>
              </div>
              {/* Simulated Vector Query Result */}
              <div className="p-4 bg-surface-container dark:bg-surface-low border-2 border-primary dark:border-white space-y-2 font-mono text-xs">
                <div className="text-[10px] text-on-surface-variant dark:text-on-surface-variant uppercase font-bold">GROQ NATURAL LANGUAGE VECTOR QUERY TEST:</div>
                <div className="p-2 bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface border border-primary dark:border-white text-[11px]">
                  &gt; &quot;Find 5 worst performing sub-districts for maternal anemia in Araria&quot;
                </div>
                <div className="text-[11px] text-accent-red dark:text-accent-red font-bold">
                  ✓ Correlated: NFHS-5 Indicator #74 (P&lt;0.001) in 32ms. TopoJSON boundaries injected to viewport.
                </div>
              </div>
            </div>
          </div>
          {/* PWA Simulator Box */}
          <div className="border-2 border-primary dark:border-white bg-primary dark:bg-on-surface text-on-primary dark:text-surface p-4 shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff]">
            <div className="flex items-center justify-between border-b border-on-primary/40 dark:border-surface/40 pb-3 mb-4 font-headline text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-accent-red dark:bg-accent-red rounded-full inline-block" />
                <span className="w-3 h-3 bg-accent-yellow dark:bg-primary-yellow rounded-full inline-block" />
                <span className="w-3 h-3 bg-accent-blue dark:bg-accent-blue rounded-full inline-block" />
                <span className="font-bold tracking-widest text-accent-yellow dark:text-primary-yellow ml-2">
                  SIMULATOR // PWA CLIENT
                </span>
              </div>
              <span className="font-mono text-[10px] text-on-primary/70 dark:text-surface/70">
                SW: ACTIVE_OFFLINE
              </span>
            </div>
            <div className="space-y-4">
              {/* Patient Record Banner */}
              <div className="bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface p-3 border-2 border-primary dark:border-white">
                <div className="flex items-center justify-between text-xs font-headline font-bold">
                  <span>PATIENT: SUNITA DEVI (24Y)</span>
                  <span className="bg-accent-red dark:bg-accent-red text-white px-2 py-0.5 text-[10px] uppercase">
                    HIGH RISK: GRADE-A
                  </span>
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant mt-1">
                  RCH ID: 109283748291 // GP: RAMPUR // SUB-CENTRE: WARD-03
                </div>
              </div>
              {/* Triage Diagnostics */}
              <div className="space-y-2 text-xs font-mono bg-surface-container-high/20 dark:bg-surface-low p-3 border border-on-primary/40 dark:border-surface/40">
                {[
                  { label: 'BP SYSTOLIC / DIASTOLIC:', value: '160 / 112 mmHg [CRITICAL]', color: 'text-accent-red dark:text-accent-red' },
                  { label: 'HAEMOGLOBIN (Hb):', value: '6.4 g/dL [SEVERE ANEMIA]', color: 'text-accent-red dark:text-accent-red' },
                  { label: 'PROTEINURIA:', value: '3+ DIPSTICK', color: 'text-accent-yellow dark:text-primary-yellow' },
                  { label: 'GESTATIONAL AGE:', value: '34 WEEKS 2 DAYS', color: 'text-on-primary dark:text-surface' },
                ].map((d) => (
                  <div key={d.label} className="flex justify-between items-center text-on-primary dark:text-surface">
                    <span>{d.label}</span>
                    <span className={`font-bold ${d.color}`}>{d.value}</span>
                  </div>
                ))}
              </div>
              {/* Dexie Queue Status */}
              <div className="p-3 bg-surface dark:bg-surface-container-lowest text-primary dark:text-on-surface border-2 border-primary dark:border-white space-y-2">
                <div className="flex items-center justify-between text-xs font-headline font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary dark:text-on-surface">sync_problem</span>
                    DEXIE SYNC QUEUE:
                  </span>
                  <span className="bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black px-2 py-0.5 text-[10px] uppercase">
                    3 PENDING
                  </span>
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                  Offline records queued for sync when connectivity restored.
                </div>
              </div>
            </div>
          </div>
          {/* Browser Preview Box */}
          <div className="border-2 border-primary dark:border-white bg-surface-bright dark:bg-surface-low shadow-[6px_6px_0px_#1a1a1a] dark:shadow-[6px_6px_0px_#ffffff] overflow-hidden">
            {/* Browser Chrome Topbar */}
            <div className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface px-4 py-2.5 border-b-2 border-primary dark:border-white flex items-center justify-between font-headline text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-red dark:bg-accent-red inline-block" />
                <span className="w-3 h-3 rounded-full bg-accent-yellow dark:bg-primary-yellow inline-block" />
                <span className="w-3 h-3 rounded-full bg-accent-blue dark:bg-accent-blue inline-block" />
                <span className="font-bold ml-2 tracking-wide text-accent-yellow dark:text-primary-yellow">
                  LIVE BROWSER PREVIEW
                </span>
              </div>
              <span className="text-[11px] font-mono text-on-surface-variant dark:text-on-surface-variant bg-accent-yellow/20 dark:bg-primary-yellow/20 px-2 py-0.5 border border-accent-yellow/30 dark:border-primary-yellow/30">
                matru-suraksha.app
              </span>
            </div>
            {/* Browser Content - Live iframe (URL to be provided) */}
            <div className="relative bg-surface dark:bg-surface-container-lowest border-b border-primary dark:border-white max-h-[520px] overflow-hidden">
              <iframe
                src="about:blank"
                title="Matru Suraksha live website"
                className="w-full h-[520px] border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
            {/* Browser Footer Strip */}
            <div className="p-3 bg-surface-container dark:bg-surface-low flex items-center justify-between text-xs font-headline">
              <span className="font-bold uppercase text-primary dark:text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-accent-red dark:text-accent-red text-sm">lock</span>
                SSL SHA-256 Validated
              </span>
              <span className="text-on-surface-variant dark:text-on-surface-variant text-[11px]">
                Production PWA // Offline-First
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Systems */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-container-low dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red dark:text-accent-red block">
                SECONDARY PRODUCTION ARCHIVES
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase">
                SPECIALIZED SYSTEMS &amp; PHYSICAL COMPUTING
              </h2>
            </div>
            <div className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant uppercase">
              DISTRIBUTED REALTIME &amp; HARDWARE EMBEDDED
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Prodigy InfoTech */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-surface-container dark:bg-surface-low text-primary dark:text-on-surface font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    REAL-TIME WEBSOCKETS
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    AUTH LIFECYCLE
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Prodigy InfoTech Concurrency Suites
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Full-stack collaboration and messaging suites. Stateless JWT token rotation with Redis blacklist, WebSocket pub/sub live room state synchronization, and scalable CRUD APIs.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['MERN Stack', 'Socket.io', 'JWT Auth', 'Docker'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/adityapandey2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary dark:text-on-surface hover:underline"
                >
                  Review Codebase Commit Logs
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
            {/* Card 2: Auroville FabLab */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-accent-red dark:bg-accent-red text-white font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    EMBEDDED HARDWARE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    MINVAYU PROJECT
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Auroville FabLab Hardware Telemetry
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Open-source small-scale wind turbine telemetry and rapid additive manufacturing prototyping. Engineered micro-controller interfaces for RPM/output power monitoring.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Microcontrollers', 'C++ / AVR', 'CAD Modeling', 'Sensor I/O'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-on-surface-variant">
                  Auroville Physical Systems Lab
                </span>
              </div>
            </div>
            {/* Card 3: SpaceX */}
            <div className="bg-surface dark:bg-surface-container-lowest border-2 border-primary dark:border-white p-6 shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary dark:border-white pb-2">
                  <span className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-[10px] font-bold uppercase px-2 py-0.5 border border-primary dark:border-white">
                    DATA SCIENCE CAPSTONE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    IBM CERTIFIED
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-primary dark:text-on-surface uppercase leading-tight">
                  Space-X Falcon 9 First-Stage Recovery Model
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  Predictive machine learning pipeline estimating booster landing success. Web scraping of SpaceX telemetry, EDA with SQL, interactive Folium spatial maps, classification benchmarking.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-primary dark:border-white">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Python', 'Scikit-Learn', 'Plotly Dash', 'Folium'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-surface-container dark:bg-surface-low border border-primary dark:border-white text-primary dark:text-on-surface">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/adityapandey2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary dark:text-on-surface hover:underline"
                >
                  View Capstone Notebooks
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface dark:bg-surface-dark px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-on-surface block">
              {'/* 02 // ARCHITECTURAL PILLARS */'}
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase tracking-tight">
              FOUR DETERMINISTIC GUARANTEES FOR LOW-RESOURCE COMPUTING
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'P1', title: 'Offline-First By Default', desc: 'No patient should be blocked by 2G/EDGE dropouts. Client mutations serialize to IndexedDB first.', bg: 'bg-accent-yellow dark:bg-primary-yellow', text: 'text-black dark:text-black' },
              { id: 'P2', title: 'Cryptographic Audit Logs', desc: 'Financial checkouts and clinical metrics are append-only. SHA-256 validation timestamps.', bg: 'bg-accent-red dark:bg-accent-red', text: 'text-white dark:text-white' },
              { id: 'P3', title: 'Deterministic Budgets', desc: 'Strict sub-2.5s LCP on throttled 3G. Micro-bundles (<170kB gzip).', bg: 'bg-primary dark:bg-on-surface', text: 'text-on-primary dark:text-surface' },
              { id: 'P4', title: 'Field-Hardened Ergonomics', desc: 'High-contrast design for extreme glare in direct Bihar sunlight (44°C).', bg: 'bg-surface-container dark:bg-surface-low', text: 'text-primary dark:text-on-surface' },
            ].map((p) => (
              <div key={p.id} className="p-5 bg-surface-bright dark:bg-surface-low border-2 border-primary dark:border-white shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff] space-y-3">
                <div className={`w-10 h-10 ${p.bg} ${p.text} font-headline font-bold text-base flex items-center justify-center border-2 border-primary dark:border-white`}>
                  {p.id}
                </div>
                <h3 className="font-headline font-bold text-sm uppercase text-primary dark:text-on-surface">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consolidated Systems Matrix */}
      <section className="w-full border-b-2 border-primary dark:border-white bg-surface-container-high/30 dark:bg-surface-low px-4 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b-2 border-primary dark:border-white pb-4">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
                TECHNICAL INVENTORY
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary dark:text-on-surface uppercase">
                CONSOLIDATED SYSTEMS MATRIX
              </h2>
            </div>
            <span className="font-headline text-xs font-bold uppercase text-primary dark:text-on-surface bg-accent-yellow dark:bg-primary-yellow px-2 py-1 border border-primary dark:border-white">
              ORDERED HIERARCHY // AUDIT: APRIL 2026
            </span>
          </div>
          <div className="overflow-x-auto border-2 border-primary dark:border-white bg-surface dark:bg-surface-container-lowest shadow-[4px_4px_0px_#1a1a1a] dark:shadow-[4px_4px_0px_#ffffff]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary dark:bg-on-surface text-on-primary dark:text-surface font-headline text-xs font-bold uppercase tracking-wider">
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">RANK // SYSTEM</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">CORE TECH STACK</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">SYNC &amp; PROTOCOL</th>
                  <th className="p-3 border-r border-on-primary/20 dark:border-surface/20">QUALITY BAR</th>
                  <th className="p-3">DEPLOYMENT STATE</th>
                </tr>
              </thead>
              <tbody className="font-body text-xs divide-y-2 divide-primary dark:divide-on-surface">
                {[
                  { rank: '#1', system: 'BiharKaSwaad E-Commerce', stack: 'React 18, Node.js, Express, MySQL, Hostinger', sync: 'Razorpay HMAC SHA-256 Webhooks + Re-validation', quality: 'Zero-Tamper Payment Validation', qualityColor: 'text-accent-red dark:text-accent-red', deploy: 'Live Production Storefront', deployColor: 'text-accent-blue dark:text-accent-blue' },
                  { rank: '#2', system: 'Sadar Hospital Araria Portal', stack: 'React, TypeScript, Redis, Supabase, Tailwind', sync: 'WebSocket pub/sub dispatch queues', quality: '<100ms Telemetry Tick Speed', qualityColor: 'text-accent-blue dark:text-accent-blue', deploy: 'Civic Gov Production Node', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#3', system: 'Matru Suraksha (मातृ सुरक्षा)', stack: 'React 18, Vite, Fastify, Dexie.js, PostgreSQL', sync: 'IndexedDB offline replica + Exponential backoff', quality: '80% Line Coverage // 0 A11y Violations', qualityColor: 'text-accent-red dark:text-accent-red', deploy: 'Active Field Pilot (Bihar)', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#4', system: 'India Development Data Engine', stack: 'DuckDB, Python, pgvector, Groq LLM, Leaflet', sync: 'Parquet in-memory OLAP + Vector Embedding', quality: '<48ms Sub-district Query Median', qualityColor: 'text-primary dark:text-on-surface', deploy: 'Live Macro Analytics', deployColor: 'text-primary dark:text-on-surface' },
                  { rank: '#5', system: 'Prodigy InfoTech Suites', stack: 'MongoDB, Express, React, Node.js, Socket.io', sync: 'WebSocket live rooms + JWT rotation', quality: 'High-Concurrency Stress Pass', qualityColor: 'text-on-surface-variant dark:text-on-surface-variant', deploy: 'Enterprise Codebase Archive', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                  { rank: '#6', system: 'Auroville MinVayu Hardware', stack: 'C++, AVR Microcontrollers, CAD, Rapid Prototyping', sync: 'Analog Sensor I/O & RPM Polling', quality: 'Physical Wind Turbine Telemetry', qualityColor: 'text-primary dark:text-on-surface', deploy: 'Research Lab Deployment', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                  { rank: '#7', system: 'Space-X Launch Prediction', stack: 'Python, Scikit-Learn, Plotly Dash, Folium, SQL', sync: 'REST ETL Telemetry Pipeline', quality: '83.3% Cross-Validated Accuracy', qualityColor: 'text-accent-blue dark:text-accent-blue', deploy: 'IBM Capstone Verified', deployColor: 'text-on-surface-variant dark:text-on-surface-variant' },
                ].map((row) => (
                  <tr key={row.rank} className="hover:bg-surface-container dark:hover:bg-surface-low transition-colors">
                    <td className="p-3 font-headline font-bold uppercase border-r-2 border-primary dark:border-white text-primary dark:text-on-surface">
                      {row.rank} {row.system}
                    </td>
                    <td className="p-3 border-r-2 border-primary dark:border-white font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                      {row.stack}
                    </td>
                    <td className="p-3 border-r-2 border-primary dark:border-white text-on-surface-variant dark:text-on-surface-variant">
                      {row.sync}
                    </td>
                    <td className={`p-3 border-r-2 border-primary dark:border-white font-headline font-bold ${row.qualityColor}`}>
                      {row.quality}
                    </td>
                    <td className={`p-3 font-headline font-bold ${row.deployColor}`}>
                      {row.deploy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="w-full bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface px-4 sm:px-8 lg:px-12 py-12 md:py-16 border-b-2 border-primary dark:border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
              Engage Fellowship
            </h2>
            <p className="mt-3 text-sm text-on-primary/80 dark:text-on-surface-variant max-w-xl">
              Building data systems that turn field work into real decisions. Open to collaborations on public health data, civic tech, and AI systems.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent-yellow dark:bg-primary-yellow text-black dark:text-black font-headline font-bold text-xs uppercase tracking-wider border-2 border-primary dark:border-white shadow-[3px_3px_0px_#ffffff] dark:shadow-[3px_3px_0px_#1a1a1a] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Get in touch →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}


