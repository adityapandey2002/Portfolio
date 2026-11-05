import Link from 'next/link';

import { Footer } from '@/components/sections/Footer';
import { WorkFilterBar } from '@/components/work/WorkFilterBar';
import { WorkMobile } from '@/components/work/WorkMobile';

export const metadata = {
  title: 'Work & Systems — Aditya Pandey',
  description:
    'Production transactional e-commerce engines, civic district hospital queues, zero-connectivity clinical maternal triage PWAs, and sub-district macro data spatial platforms built for extreme reliability.',
};

export default function WorkPage() {
  return (
    <>
      <WorkMobile />
      <div className="hidden lg:block">
      {/* ============================================================
          HERO & TELEMETRY
      ============================================================ */}
      <section className="w-full border-b-2 border-primary bg-surface px-6 py-10 dark:border-outline dark:bg-surface md:py-16 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block border border-primary bg-primary px-2.5 py-1 font-headline text-xs font-bold uppercase tracking-widest text-primary-yellow shadow-[2px_2px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:text-primary-yellow dark:shadow-[2px_2px_0px_#0e0e10]">
              {'/* 01 // PRODUCTION CODEBASES & SYSTEMS ARCHITECTURE */'}
            </span>
            <span className="flex items-center gap-1.5 font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant">
              <span className="h-2 w-2 animate-ping rounded-full bg-accent-red" />
              ORDERED TECHNICAL LEDGER // LIVE PRODUCTION RUNTIMES
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-5xl font-headline text-3xl font-bold uppercase leading-[0.95] tracking-tight text-primary dark:text-white sm:text-5xl lg:text-6xl">
              ENGINEERED FOR{' '}
              <span className="inline-block border-2 border-primary bg-accent-yellow px-2 py-0.5 text-primary shadow-none dark:border-outline dark:bg-primary-yellow dark:text-black dark:shadow-[3px_3px_0px_#0e0e10]">
                HIGH-INTEGRITY COMMERCE
              </span>{' '}
              &amp; DETERMINISTIC FRONTLINE SCALE
            </h1>
            <p className="max-w-4xl font-body text-base font-normal leading-relaxed text-on-surface-variant dark:text-on-surface-variant md:text-xl">
              Production transactional e-commerce engines, civic district hospital queues,
              zero-connectivity clinical maternal triage PWAs, and sub-district macro data spatial
              platforms built for extreme reliability.
            </p>
          </div>

          {/* 4-Up Bento Stat Strip */}
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between border-2 border-primary bg-surface-bright p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[4px_4px_0px_#0e0e10]">
              <div className="border-b border-primary pb-2 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:border-outline dark:text-on-surface-variant">
                FLAGSHIP LEDGER // ORDERED
              </div>
              <div className="py-4">
                <div className="font-headline text-4xl font-bold text-primary dark:text-white lg:text-5xl">
                  04+3
                </div>
                <div className="mt-1 font-headline text-xs font-bold uppercase text-accent-red">
                  4 FLAGSHIPS + 3 SPECIALIZED
                </div>
              </div>
              <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                Ranked strictly by operational impact.
              </div>
            </div>

            <div className="flex flex-col justify-between border-2 border-primary bg-accent-yellow p-5 text-on-primary-container shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-primary-yellow dark:text-black dark:shadow-[4px_4px_0px_#0e0e10]">
              <div className="border-b border-primary pb-2 font-headline text-xs font-bold uppercase tracking-widest text-primary dark:border-outline dark:text-black">
                SECURITY // HMAC SHA-256
              </div>
              <div className="py-4">
                <div className="font-headline text-4xl font-bold text-primary dark:text-black lg:text-5xl">
                  100%
                </div>
                <div className="mt-1 font-headline text-xs font-bold uppercase text-primary dark:text-black">
                  TAMPER-PROOF PAYMENTS
                </div>
              </div>
              <div className="font-body text-xs font-medium text-primary dark:text-black">
                Server-side amount re-validation pipeline.
              </div>
            </div>

            <div className="flex flex-col justify-between border-2 border-primary bg-surface-bright p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[4px_4px_0px_#0e0e10]">
              <div className="border-b border-primary pb-2 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:border-outline dark:text-on-surface-variant">
                EDGE RESPONSIVENESS
              </div>
              <div className="py-4">
                <div className="font-headline text-4xl font-bold text-primary dark:text-white lg:text-5xl">
                  &lt;50ms
                </div>
                <div className="mt-1 font-headline text-xs font-bold uppercase text-accent-blue">
                  QUERY LATENCY (DUCKDB)
                </div>
              </div>
              <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                118k+ indicators indexed across districts.
              </div>
            </div>

            <div className="flex flex-col justify-between border-2 border-primary bg-surface-bright p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[4px_4px_0px_#0e0e10]">
              <div className="border-b border-primary pb-2 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:border-outline dark:text-on-surface-variant">
                OFFLINE PROTOCOL
              </div>
              <div className="py-4">
                <div className="font-headline text-4xl font-bold text-primary dark:text-white lg:text-5xl">
                  0%
                </div>
                <div className="mt-1 font-headline text-xs font-bold uppercase text-accent-red">
                  DATA LOSS ON 2G/ZERO-CONN
                </div>
              </div>
              <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                Dexie.js IndexedDB append-only sync.
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkFilterBar />

      {/* ============================================================
          FLAGSHIP #1 — BIHARKASWAAD
      ============================================================ */}
      <section
        className="project-card w-full border-b-2 border-primary bg-surface-bright px-6 py-12 dark:border-outline dark:bg-surface-low lg:px-12 lg:py-16"
        data-category="flagship ecommerce"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-4 dark:border-outline-variant">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-primary bg-primary px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary-yellow shadow-[2px_2px_0px_#1a1a1a] dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[2px_2px_0px_#0e0e10]">
                FLAGSHIP 01 // PRODUCTION COMMERCE
              </span>
              <span className="border-2 border-primary bg-accent-red px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_#1a1a1a] dark:border-accent-red dark:shadow-[2px_2px_0px_#0e0e10]">
                LIVE PRODUCTION // biharkaswaad.in
              </span>
              <span className="border-2 border-primary bg-surface px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:bg-surface-container dark:text-white">
                HOSTINGER CLOUD + NODE RUNTIME
              </span>
            </div>
            <div className="flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              DEPLOYMENT: PROD_COMMERCE_v2
            </div>
          </div>

          {/* Title & Overview */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <h2 className="font-headline text-3xl font-bold uppercase leading-tight tracking-tight text-primary dark:text-white sm:text-4xl lg:text-5xl">
                BIHARKASWAAD E-COMMERCE PLATFORM
                <span className="mt-1 block text-xl font-normal uppercase tracking-normal text-on-surface-variant dark:text-primary-yellow sm:text-2xl">
                  Full-Stack Artisanal Food Logistics, Deterministic Payments &amp; Order Pipeline
                </span>
              </h2>
              <p className="font-body text-base leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                Direct-to-consumer high-integrity commerce system engineered for authentic regional
                food distribution across India. Built with a zero-tamper Razorpay payment
                verification engine, variant-aware relational inventory controls, automated courier
                tracking webhooks, and an optimized React frontend running in production.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-2 border-primary bg-surface-container p-4 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10] lg:col-span-4">
              <div className="flex items-center justify-between border-b border-primary pb-2 font-headline text-xs font-bold uppercase text-primary dark:border-outline dark:text-primary-yellow">
                <span>COMMERCE QUALITY GATES</span>
                <span className="material-symbols-outlined text-sm text-accent-red">verified</span>
              </div>
              <div className="space-y-2 font-headline text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-on-surface-variant">
                    PAYMENT VERIFY:
                  </span>
                  <span className="font-bold text-primary dark:text-white">
                    HMAC SHA-256 Signature
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-on-surface-variant">
                    TAMPER PROTECTION:
                  </span>
                  <span className="font-bold text-accent-red">Server Price Re-Validation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-on-surface-variant">
                    INVENTORY LOCK:
                  </span>
                  <span className="font-bold text-primary dark:text-white">
                    ACID Relational MySQL
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-on-surface-variant">
                    PRODUCTION STORE:
                  </span>
                  <span className="font-bold text-accent-blue">biharkaswaad.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live preview vs architecture */}
          <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="overflow-hidden border-2 border-primary bg-surface-bright shadow-[6px_6px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[6px_6px_0px_#0e0e10]">
                {/* Browser chrome */}
                <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2.5 font-headline text-xs text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-red" />
                    <span className="inline-block h-3 w-3 rounded-full bg-primary-yellow" />
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-blue" />
                    <span className="ml-2 font-bold tracking-wide text-primary-yellow">
                      LIVE BROWSER PREVIEW
                    </span>
                  </div>
                  <span className="border border-primary-yellow/30 bg-primary-yellow/20 px-2 py-0.5 font-mono text-[11px] text-surface-variant dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                    biharkaswaad.in
                  </span>
                </div>
                {/* Live storefront capture */}
                <a
                  aria-label="Open the live BiharKaSwaad storefront"
                  className="group relative block max-h-[520px] overflow-y-auto border-b border-primary bg-surface dark:border-outline-variant dark:bg-surface"
                  href="https://biharkaswaad.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="BiharKaSwaad live website production storefront screenshot"
                    className="block h-auto w-full object-cover"
                    decoding="async"
                    height={1100}
                    loading="eager"
                    src="/work/preview-biharkaswaad.png"
                    width={1100}
                  />
                </a>
                {/* Browser footer */}
                <div className="flex items-center justify-between bg-surface-container p-3 font-headline text-xs dark:bg-surface">
                  <span className="flex items-center gap-1.5 font-bold uppercase text-primary dark:text-white">
                    <span className="material-symbols-outlined text-sm text-accent-red">lock</span>
                    SSL SHA-256 Validated
                  </span>
                  <span className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                    Production Hostinger Cloud
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  className="flex flex-1 items-center justify-center gap-2 border-2 border-primary bg-primary px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-accent-yellow hover:text-black dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[3px_3px_0px_#0e0e10] dark:hover:bg-primary-yellow/80"
                  href="https://biharkaswaad.in"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open Live Site: biharkaswaad.in</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a
                  className="flex items-center justify-center gap-1.5 border-2 border-primary bg-surface px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-outline dark:bg-surface-container dark:text-white dark:shadow-[3px_3px_0px_#0e0e10]"
                  href="https://github.com/adityapandey2002"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>View Git Repository</span>
                </a>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              {/* Security pipeline */}
              <div className="space-y-4 border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]">
                <div className="flex items-center justify-between border-b-2 border-primary pb-3 dark:border-outline-variant">
                  <span className="flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-wider text-primary dark:text-white">
                    <span className="material-symbols-outlined text-[20px] text-accent-red">
                      security
                    </span>
                    Razorpay HMAC SHA-256 Webhook Reconciliation &amp; Anti-Tamper Pipeline
                  </span>
                  <span className="border border-primary bg-accent-red px-2 py-0.5 font-headline text-[10px] font-bold text-white dark:border-accent-red">
                    STRICT ZERO-TRUST
                  </span>
                </div>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  Eliminates client-side price tampering vectors. When a checkout order initiates,
                  the backend recalculates exact SKU prices, discounts, and courier weight tariffs
                  directly from relational tables—never accepting client-supplied amounts.
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-start gap-3 border border-primary bg-surface-container p-2.5 dark:border-outline-variant dark:bg-surface">
                    <span className="bg-primary-yellow px-2 py-0.5 text-[10px] font-bold text-primary dark:text-black">
                      STEP 01
                    </span>
                    <div>
                      <div className="font-bold uppercase text-primary dark:text-white">
                        Server-Side Amount Re-Validation
                      </div>
                      <div className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                        Database lookup for variant pricing &amp; tax before generating{' '}
                        <code>order_id</code> via Razorpay Orders API.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border border-primary bg-surface-container p-2.5 dark:border-outline-variant dark:bg-surface">
                    <span className="bg-primary-yellow px-2 py-0.5 text-[10px] font-bold text-primary dark:text-black">
                      STEP 02
                    </span>
                    <div>
                      <div className="font-bold uppercase text-primary dark:text-white">
                        Cryptographic HMAC Verification
                      </div>
                      <div className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                        Calculates{' '}
                        <code>
                          crypto.createHmac(&apos;sha256&apos;, secret).update(order_id + &apos;|&apos;
                          + payment_id).digest(&apos;hex&apos;)
                        </code>{' '}
                        to confirm authenticity.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border border-primary bg-surface-container p-2.5 dark:border-outline-variant dark:bg-surface">
                    <span className="bg-primary-yellow px-2 py-0.5 text-[10px] font-bold text-primary dark:text-black">
                      STEP 03
                    </span>
                    <div>
                      <div className="font-bold uppercase text-primary dark:text-white">
                        Webhook Failover &amp; Idempotency
                      </div>
                      <div className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                        Webhook listens for <code>payment.captured</code> events with unique
                        transaction idempotency keys to prevent double-crediting.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schema & lifecycle */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[3px_3px_0px_#0e0e10]">
                  <div className="flex items-center justify-between border-b border-primary pb-1.5 font-headline text-xs font-bold uppercase text-primary dark:border-outline dark:text-white">
                    <span>MYSQL RELATIONAL SCHEMA</span>
                    <span className="font-mono text-[10px] text-on-surface-variant dark:text-on-surface-variant">
                      ACID
                    </span>
                  </div>
                  <ul className="space-y-1 font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    <li>
                      • <strong>Variant-Aware Inventory:</strong> Tracks granular weights (250g,
                      500g, 1kg) with row-locking transactions.
                    </li>
                    <li>
                      • <strong>Normalized Orders &amp; Items:</strong> Decoupled tracking for
                      multi-item baskets with immutable invoice snaps.
                    </li>
                    <li>
                      • <strong>Customer Ledger:</strong> Encrypted PII, verified phone tokens, and
                      delivery address histories.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[3px_3px_0px_#0e0e10]">
                  <div className="flex items-center justify-between border-b border-primary pb-1.5 font-headline text-xs font-bold uppercase text-primary dark:border-outline dark:text-white">
                    <span>ORDER LIFECYCLE &amp; LOGISTICS</span>
                    <span className="font-mono text-[10px] text-accent-blue">DISPATCH</span>
                  </div>
                  <ul className="space-y-1 font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    <li>
                      • <strong>Lifecycle States:</strong> PENDING → PAID → PACKED → DISPATCHED →
                      OUT_FOR_DELIVERY → DELIVERED.
                    </li>
                    <li>
                      • <strong>Automated Courier Sync:</strong> Integration ready for
                      Shiprocket/Delhivery tracking webhooks.
                    </li>
                    <li>
                      • <strong>Admin Dashboard:</strong> Real-time order dispatch board with
                      printable shipping bills.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['React 18', 'Node.js', 'Express REST', 'MySQL DB', 'Razorpay HMAC', 'Hostinger Cloud', 'Tailwind CSS'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className={`border border-primary px-2.5 py-1 font-headline text-[11px] font-bold uppercase dark:border-outline ${
                        tech === 'Razorpay HMAC'
                          ? 'bg-primary text-primary-yellow dark:bg-primary-yellow dark:text-black'
                          : 'bg-surface-container text-primary dark:bg-surface-container dark:text-white'
                      }`}
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FLAGSHIP #2 — DISTRICT HOSPITAL ARARIA
      ============================================================ */}
      <section
        className="project-card w-full border-b-2 border-primary bg-surface px-6 py-12 dark:border-outline dark:bg-surface lg:px-12 lg:py-16"
        data-category="flagship civic"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-4 dark:border-outline-variant">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-primary bg-accent-blue px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_#1a1a1a] dark:border-accent-blue dark:text-black dark:shadow-[2px_2px_0px_#0e0e10]">
                FLAGSHIP 02 // CIVIC INFRASTRUCTURE
              </span>
              <span className="border-2 border-primary bg-primary-yellow px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-black dark:border-primary-yellow">
                GOVT OF BIHAR COLLABORATION
              </span>
              <span className="border-2 border-primary bg-surface-container px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                CAMPUS: SADAR HOSPITAL ARARIA
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              OFFICIAL: dh.araria@bihar.gov.in
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h2 className="font-headline text-3xl font-bold uppercase leading-tight tracking-tight text-primary dark:text-white sm:text-4xl lg:text-5xl">
              DISTRICT HOSPITAL ARARIA CIVIC HEALTHCARE PORTAL
              <span className="mt-1 block text-xl font-normal uppercase tracking-normal text-on-surface-variant dark:text-primary-yellow sm:text-2xl">
                Real-Time OPD Dispatch, Emergency Blood Reserves &amp; Public Transparency Engine
              </span>
            </h2>
            <p className="font-body text-base leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
              Engineered to dismantle severe OPD congestion and eliminate emergency blood shortages
              across the 250+ bed Sadar Hospital campus near Araria Collectorate. Replaces manual
              paper registration with deterministic queue state machines and live blood bank
              inventory telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="overflow-hidden border-2 border-primary bg-surface-bright shadow-[6px_6px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[6px_6px_0px_#0e0e10]">
                <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2.5 font-headline text-xs text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-red" />
                    <span className="inline-block h-3 w-3 rounded-full bg-primary-yellow" />
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-blue" />
                    <span className="ml-2 font-bold tracking-wide text-primary-yellow dark:text-accent-blue">
                      LIVE CIVIC PORTAL
                    </span>
                  </div>
                  <span className="border border-primary-yellow/30 bg-primary-yellow/20 px-2 py-0.5 font-mono text-[11px] text-surface-variant dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                    hospital-araria-f5wl.vercel.app
                  </span>
                </div>
                <a
                  aria-label="Open the live District Hospital Araria civic portal"
                  className="group relative block max-h-[520px] overflow-y-auto border-b border-primary bg-surface dark:border-outline-variant dark:bg-surface"
                  href="https://hospital-araria-f5wl.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="District Hospital Araria Civic Healthcare Portal screenshot"
                    className="block h-auto w-full object-cover"
                    decoding="async"
                    height={1100}
                    loading="eager"
                    src="/work/preview-sadar-hospital.png"
                    width={1100}
                  />
                </a>
                <div className="flex items-center justify-between bg-surface-container p-3 font-headline text-xs dark:bg-surface">
                  <span className="flex items-center gap-1.5 font-bold uppercase text-primary dark:text-white">
                    <span className="material-symbols-outlined text-sm text-accent-red">
                      local_hospital
                    </span>
                    250+ Bed Sadar Campus
                  </span>
                  <span className="text-[11px] font-bold text-accent-blue">
                    Supabase Realtime + Redis
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  className="flex flex-1 items-center justify-center gap-2 border-2 border-primary bg-accent-blue px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-on-primary dark:border-accent-blue dark:text-black dark:shadow-[3px_3px_0px_#0e0e10] dark:hover:bg-accent-blue/80"
                  href="https://hospital-araria-f5wl.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open Live Portal</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a
                  className="flex items-center justify-center gap-1.5 border-2 border-primary bg-surface px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-outline dark:bg-surface-container dark:text-white dark:shadow-[3px_3px_0px_#0e0e10] dark:hover:border-primary-yellow dark:hover:text-primary-yellow"
                  href="mailto:dh.araria@bihar.gov.in"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Gov Specs Dossier</span>
                </a>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              <div className="flex items-center justify-between border-b-2 border-primary pb-2 font-headline text-sm font-bold uppercase tracking-wider text-primary dark:border-outline dark:text-white">
                <span>CIVIC DISPATCH ARCHITECTURE</span>
                <span className="text-xs font-bold text-accent-blue">REDIS + SUPABASE REALTIME</span>
              </div>

              {[
                {
                  id: '01',
                  title: 'Tokenized OPD Queue Engine',
                  body: 'Redis-backed non-repeating cryptographically signed token queue. Dismantles physical registration bottlenecks with live display calling boards across 12 specialty consultation chambers.',
                  accent: 'bg-primary-yellow text-black',
                },
                {
                  id: '02',
                  title: 'Live Blood Bank Reserves & Alert System',
                  body: 'Publicly broadcast inventory ledger displaying exact available units of whole blood and packed red cells (PRBC) across all ABO/Rh groups. Automated SMS alerts for emergency donor networks when units drop below safety thresholds.',
                  accent: 'bg-accent-red text-white',
                },
                {
                  id: '03',
                  title: 'Emergency 102/108 Ambulance Referral Matrix',
                  body: 'Direct driver carrier links and emergency room dispatch status. Instant alert routing for obstetric and trauma emergencies from remote border blocks (Sikti, Palasi, Forbesganj) with zero delay.',
                  accent: 'bg-primary-yellow text-black',
                },
                {
                  id: '04',
                  title: 'Bilingual Circulars & Public Notices',
                  body: 'Instant Hindi/English push circulars for pulse polio drives, Japanese Encephalitis alerts, doctor leave announcements, and Janani Suraksha Yojana payment disbursement schedules.',
                  accent: 'bg-surface-container text-primary dark:bg-surface-container dark:text-primary-yellow',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-2 border-primary bg-surface-bright p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[3px_3px_0px_#0e0e10]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center border border-primary font-headline text-lg font-bold dark:border-outline ${item.accent}`}
                  >
                    {item.id}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline text-sm font-bold uppercase text-primary dark:text-white">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-2">
                {['React 18', 'TypeScript', 'Supabase Realtime', 'Redis Queue', 'Vercel Edge', 'Tailwind CSS'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="border border-primary bg-surface-container px-2 py-1 font-headline text-[11px] font-bold uppercase text-primary dark:border-outline dark:bg-surface-container dark:text-white"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FLAGSHIP #3 — MATRU SURAKSHA
      ============================================================ */}
      <section
        className="project-card w-full border-b-2 border-primary bg-surface-bright px-6 py-12 dark:border-outline dark:bg-surface-low lg:px-12 lg:py-16"
        data-category="flagship civic"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-4 dark:border-outline-variant">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-primary bg-accent-red px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_#1a1a1a] dark:border-accent-red dark:shadow-[2px_2px_0px_#0e0e10]">
                FLAGSHIP 03 // CLINICAL TRIAGE PWA
              </span>
              <span className="border-2 border-primary bg-primary-yellow px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-black dark:border-primary-yellow">
                ACTIVE FIELD PILOT // BIHAR HEALTH OPS
              </span>
              <span className="border-2 border-primary bg-surface-container px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                OFFLINE-FIRST ARCHITECTURE
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              NODE: PWA-MS-01 // FIELD VERIFIED
            </div>
          </div>

          {/* Name & synopsis */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <h2 className="font-headline text-3xl font-bold uppercase leading-tight tracking-tight text-primary dark:text-white sm:text-4xl lg:text-5xl">
                MATRU SURAKSHA (मातृ सुरक्षा)
                <span className="mt-1 block text-xl font-normal uppercase tracking-normal text-on-surface-variant dark:text-primary-yellow sm:text-2xl">
                  Multi-Tier High-Risk Pregnancy Care &amp; Clinical Triage Engine
                </span>
              </h2>
              <p className="font-body text-base leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                Engineered to eliminate systemic communication delays in agrarian rural clinics.
                Enables Auxiliary Nurse Midwives (ANMs) to triage maternal danger signs without
                active cellular reception, calculating instant risk stratifications while
                synchronizing cryptographically validated records up through district governance
                desks.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-2 border-primary bg-surface-container p-4 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10] lg:col-span-4">
              <div className="flex items-center justify-between border-b border-primary pb-2 font-headline text-xs font-bold uppercase text-primary dark:border-outline dark:text-primary-yellow">
                <span>CORE QUALITY GATES</span>
                <span className="material-symbols-outlined text-sm text-accent-red">verified</span>
              </div>
              <div className="space-y-2 font-headline text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-primary-yellow">
                    TEST COVERAGE:
                  </span>
                  <span className="font-bold text-primary dark:text-white">
                    &gt;=80% Changed Lines
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-primary-yellow">
                    A11Y AUDIT:
                  </span>
                  <span className="font-bold text-accent-red">0 Violations (WCAG AAA)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-primary-yellow">
                    3G LCP BENCHMARK:
                  </span>
                  <span className="font-bold text-accent-blue">&lt;=2.18s Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant dark:text-primary-yellow">
                    CLIENT FOOTPRINT:
                  </span>
                  <span className="font-bold text-primary dark:text-primary-yellow">
                    &lt;=170kB gzipped
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual pane: hierarchy + simulator */}
          <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              {/* 6-tier escalation */}
              <div className="border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]">
                <div className="mb-4 flex items-center justify-between border-b-2 border-primary pb-3 dark:border-outline-variant">
                  <span className="flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-wider text-primary dark:text-white">
                    <span className="material-symbols-outlined text-[18px] text-accent-red">
                      account_tree
                    </span>
                    6-Tier Administrative Escalation Hierarchy &amp; SLA Chain
                  </span>
                  <span className="font-headline text-[11px] font-bold text-on-surface-variant dark:text-on-surface-variant">
                    15-DAY AUDIT CLOCK
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    {
                      tier: 'TIER 1',
                      title: 'Field ANM // Health Sub-Centre',
                      body: 'Offline PWA registration, 8 danger signs check, auto-graded risk score.',
                      className:
                        'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black',
                    },
                    {
                      tier: 'TIER 2',
                      title: 'CHO / Ayush Medical Officer // HWC',
                      body: 'Clinical validation, lab verification (Hb & Proteinuria), tele-consult review.',
                      className:
                        'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black',
                    },
                    {
                      tier: 'TIER 3',
                      title: 'Block Helpdesk // Primary Health Centre',
                      body: '15-day strict SLA countdown tracker, auto-tele follow-up call queue dispatch.',
                      className:
                        'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black',
                    },
                    {
                      tier: 'TIER 4',
                      title: 'BHM / Block Medical Officer of Health',
                      body: 'Inter-facility transport coordination and emergency blood arrangement.',
                      className:
                        'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black',
                    },
                    {
                      tier: 'TIER 5',
                      title: 'District Desk Coordinator // Sadar Hospital',
                      body: 'High-dependency triage bed booking, specialist obstetrician assignment.',
                      className:
                        'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black',
                    },
                    {
                      tier: 'TIER 6',
                      title: 'DHS / CMO (Civil Surgeon) Escalation',
                      body: 'Autonomous trigger when 15-day SLA window lapses or Grade-A triage breaches.',
                      className:
                        'bg-white text-accent-red dark:bg-white dark:text-accent-red',
                    },
                  ].map((tier) => (
                    <div
                      key={tier.tier}
                      className={`flex items-start gap-3 border border-primary p-2.5 dark:border-outline-variant ${
                        tier.tier === 'TIER 6'
                          ? 'bg-accent-red text-white dark:border-accent-red'
                          : 'bg-surface-bright dark:bg-surface'
                      }`}
                    >
                      <span
                        className={`shrink-0 px-2 py-0.5 font-headline text-xs font-bold ${tier.className}`}
                      >
                        {tier.tier}
                      </span>
                      <div>
                        <div
                          className={`font-headline text-xs font-bold uppercase ${
                            tier.tier === 'TIER 6'
                              ? 'text-white'
                              : 'text-primary dark:text-white'
                          }`}
                        >
                          {tier.title}
                        </div>
                        <div
                          className={`font-body text-xs ${
                            tier.tier === 'TIER 6'
                              ? 'text-white/90'
                              : 'text-on-surface-variant dark:text-on-surface-variant'
                          }`}
                        >
                          {tier.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8 danger signs */}
              <div className="border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]">
                <div className="mb-3 flex items-center justify-between border-b-2 border-primary pb-2 font-headline text-sm font-bold uppercase tracking-wider text-primary dark:border-outline-variant dark:text-white">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-accent-red">
                      warning
                    </span>
                    8 Severe Danger Signs Clinical Triage Spec
                  </span>
                  <span className="text-xs font-bold text-accent-red">ALGORITHMIC SCORING</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { sign: 'ECLAMPSIA', note: 'Immediate Tier-5', critical: true },
                    { sign: 'APH / PPH', note: 'Haemorrhage Alert', critical: true },
                    { sign: 'SEVERE ANEMIA', note: 'Hb < 7.0 g/dL', critical: false },
                    { sign: 'OBSTRUCTED LABOUR', note: 'Surgical Urgent', critical: true },
                    { sign: 'HYPERTENSION', note: 'BP >=110 Diastolic', critical: false },
                    { sign: 'SEPSIS / FEVER', note: '>102°F + Foul Odor', critical: false },
                    { sign: 'CONVULSIONS', note: 'MgSO4 Protocol', critical: true },
                    { sign: 'FOETAL DISTRESS', note: 'Abnormal FHR', critical: false },
                  ].map((item) => (
                    <div
                      key={item.sign}
                      className="border border-primary bg-surface-bright p-2 text-center dark:border-outline dark:bg-surface"
                    >
                      <div className="font-headline text-[11px] font-bold uppercase text-primary dark:text-white">
                        {item.sign}
                      </div>
                      <div
                        className={`font-body text-[10px] ${
                          item.critical
                            ? 'font-bold text-accent-red'
                            : 'text-on-surface-variant dark:text-on-surface-variant'
                        }`}
                      >
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engine specs */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border-2 border-primary bg-surface p-4 shadow-[2px_2px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[2px_2px_0px_#0e0e10]">
                  <div className="mb-2 border-b border-primary pb-1 font-headline text-xs font-bold uppercase text-accent-blue dark:border-outline-variant">
                    CLIENT-SIDE ENGINE
                  </div>
                  <ul className="space-y-1 font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    <li>• React 18 + Vite + TypeScript</li>
                    <li>• Workbox Service Worker precaching</li>
                    <li>• Dexie.js (IndexedDB local client replica)</li>
                    <li>• Exponential backoff sync queue</li>
                    <li>• SHA-256 state hashing for offline records</li>
                  </ul>
                </div>
                <div className="border-2 border-primary bg-surface p-4 shadow-[2px_2px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[2px_2px_0px_#0e0e10]">
                  <div className="mb-2 border-b border-primary pb-1 font-headline text-xs font-bold uppercase text-primary dark:border-outline-variant dark:text-primary-yellow">
                    BACKEND &amp; PERSISTENCE
                  </div>
                  <ul className="space-y-1 font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                    <li>• Fastify Node.js high-throughput gateway</li>
                    <li>• Kysely SQL query builder (type-safe)</li>
                    <li>• PostgreSQL immutable append audit log</li>
                    <li>• Dockerized stateless task runners</li>
                    <li>• Gov SMS gateway &amp; escalation triggers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Simulator */}
            <div className="space-y-4 lg:col-span-5">
              <div className="border-2 border-primary bg-primary p-4 text-on-primary shadow-[6px_6px_0px_#1a1a1a] dark:border-outline dark:bg-surface-lowest dark:text-on-surface dark:shadow-[6px_6px_0px_#0e0e10]">
                <div className="mb-4 flex items-center justify-between border-b border-on-primary/40 pb-3 font-headline text-xs dark:border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-red" />
                    <span className="inline-block h-3 w-3 rounded-full bg-primary-yellow" />
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-blue" />
                    <span className="ml-2 font-bold tracking-widest text-primary-yellow">
                      SIMULATOR // PWA CLIENT
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-on-primary/70 dark:text-on-surface-variant">
                    SW: ACTIVE_OFFLINE
                  </span>
                </div>
                <div className="space-y-4">
                  {/* Patient banner */}
                  <div className="border-2 border-primary bg-surface p-3 text-primary dark:border-outline dark:bg-surface-low dark:text-white">
                    <div className="flex items-center justify-between font-headline text-xs font-bold">
                      <span>PATIENT: SUNITA DEVI (24Y)</span>
                      <span className="bg-accent-red px-2 py-0.5 text-[10px] uppercase text-white">
                        HIGH RISK: GRADE-A
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                      RCH ID: 109283748291 // GP: RAMPUR // SUB-CENTRE: WARD-03
                    </div>
                  </div>

                  {/* Diagnostics */}
                  <div className="space-y-2 border border-primary bg-surface-container-high/20 p-3 font-mono text-xs text-on-primary dark:border-outline-variant dark:bg-surface dark:text-on-surface">
                    {[
                      {
                        label: 'BP SYSTOLIC / DIASTOLIC:',
                        value: '160 / 112 mmHg [CRITICAL]',
                        color: 'text-accent-red',
                      },
                      {
                        label: 'HAEMOGLOBIN (Hb):',
                        value: '6.4 g/dL [SEVERE ANEMIA]',
                        color: 'text-accent-red',
                      },
                      {
                        label: 'PROTEINURIA:',
                        value: '3+ DIPSTICK',
                        color: 'text-primary-yellow',
                      },
                      {
                        label: 'GESTATIONAL AGE:',
                        value: '34 WEEKS 2 DAYS',
                        color: 'text-on-primary dark:text-white',
                      },
                    ].map((diagnostic) => (
                      <div
                        key={diagnostic.label}
                        className="flex items-center justify-between"
                      >
                        <span>{diagnostic.label}</span>
                        <span className={`font-bold ${diagnostic.color}`}>{diagnostic.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dexie queue */}
                  <div className="space-y-2 border-2 border-primary bg-surface p-3 text-primary dark:border-outline dark:bg-surface-low dark:text-white">
                    <div className="flex items-center justify-between font-headline text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary dark:text-primary-yellow">
                          sync_problem
                        </span>
                        DEXIE SYNC QUEUE:
                      </span>
                      <span className="bg-primary-yellow px-2 py-0.5 text-[10px] text-black">
                        4 RECORDS PENDING
                      </span>
                    </div>
                    <div className="font-mono text-[10px] leading-tight text-on-surface-variant dark:text-on-surface-variant">
                      Carrier disconnected. Local append-only mutation #042 staged in IndexedDB.
                      Will flush automatically upon 2G handshake.
                    </div>
                    <div className="h-2 w-full overflow-hidden border border-primary bg-surface-container dark:border-outline dark:bg-surface">
                      <div className="h-full w-3/4 animate-pulse bg-accent-red" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      className="flex w-full items-center justify-center gap-2 border-2 border-primary bg-primary-yellow py-2.5 font-headline text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-[#ffe083] dark:border-primary-yellow dark:shadow-[2px_2px_0px_#0e0e10]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">wifi</span>
                      SIMULATE CARRIER RESTORATION &amp; FLUSH
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        className="border-2 border-primary bg-surface-container py-2 text-center font-headline text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:border-primary-yellow hover:text-primary-yellow dark:border-outline dark:bg-surface-container dark:text-white dark:hover:border-primary-yellow dark:hover:text-primary-yellow"
                        href="https://github.com/adityapandey2002"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        View Architecture
                      </a>
                      <span className="cursor-not-allowed border-2 border-primary bg-surface-container py-2 text-center font-headline text-[11px] font-bold uppercase tracking-wider text-primary opacity-60 dark:border-outline dark:bg-surface-container dark:text-white">
                        Open Demo Sandbox
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security callout */}
              <div className="flex items-center gap-3 border-2 border-primary bg-surface p-4 dark:border-outline dark:bg-surface-container">
                <span className="material-symbols-outlined text-2xl text-accent-red">
                  verified_user
                </span>
                <div className="font-body text-xs text-on-surface-variant dark:text-on-surface-variant">
                  <strong className="font-headline uppercase text-primary dark:text-white">
                    Zero-Knowledge Offline Security:
                  </strong>{' '}
                  Records encrypted locally via Web Crypto API prior to persistent storage in
                  IndexedDB storage engine.
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Matru web link / preview box (live URL to be supplied) */}
          <div className="overflow-hidden border-2 border-primary bg-surface-bright shadow-[6px_6px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[6px_6px_0px_#0e0e10]">
            <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2.5 font-headline text-xs text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-accent-red" />
                <span className="inline-block h-3 w-3 rounded-full bg-primary-yellow" />
                <span className="inline-block h-3 w-3 rounded-full bg-accent-blue" />
                <span className="ml-2 font-bold tracking-wide text-primary-yellow">
                  LIVE PWA PREVIEW
                </span>
              </div>
              <span className="border border-primary-yellow/30 bg-primary-yellow/20 px-2 py-0.5 font-mono text-[11px] text-surface-variant dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                matru-suraksha.app
              </span>
            </div>
            <div className="grid grid-cols-1 items-center gap-6 bg-surface-bright p-6 dark:bg-surface-low md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="overflow-hidden border-2 border-primary bg-surface shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface dark:shadow-[4px_4px_0px_#0e0e10]">
                  <img
                    alt="Matru Suraksha clinical triage PWA preview"
                    className="block h-auto w-full object-cover"
                    decoding="async"
                    height={279}
                    loading="eager"
                    src="/work/matru-suraksha.png"
                    width={512}
                  />
                </div>
              </div>
              <div className="space-y-3 md:col-span-7">
                <div className="font-headline text-xs font-bold uppercase tracking-widest text-accent-red">
                  DEDICATED WEB LINK // FIELD PILOT
                </div>
                <h3 className="font-headline text-xl font-bold uppercase text-primary dark:text-white">
                  MATRU SURAKSHA PWA
                </h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  The live field deployment URL will be attached here once the public pilot link is
                  cleared for release. The preview above is the captured PWA client from the Bihar
                  health operations build.
                </p>
                <span className="inline-flex items-center gap-2 border-2 border-primary bg-surface-container px-3 py-2 font-headline text-[11px] font-bold uppercase tracking-wider text-primary dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  LIVE URL PENDING
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-surface-container p-3 font-headline text-xs dark:bg-surface">
              <span className="flex items-center gap-1.5 font-bold uppercase text-primary dark:text-white">
                <span className="material-symbols-outlined text-sm text-accent-red">lock</span>
                SSL SHA-256 Validated
              </span>
              <span className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                Production PWA // Offline-First
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FLAGSHIP #4 — INDIA DEVELOPMENT DATA ENGINE
      ============================================================ */}
      <section
        className="project-card w-full border-b-2 border-primary bg-surface px-6 py-12 dark:border-outline dark:bg-surface lg:px-12 lg:py-16"
        data-category="flagship data"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-4 dark:border-outline-variant">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-primary bg-primary px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary-yellow shadow-[2px_2px_0px_#1a1a1a] dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[2px_2px_0px_#0e0e10]">
                FLAGSHIP 04 // SPATIAL ANALYTICS &amp; VECTOR AI
              </span>
              <span className="border-2 border-primary bg-surface-container px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                118K+ INDICATORS INDEXED
              </span>
              <span className="border-2 border-primary bg-primary-yellow px-3 py-1 font-headline text-xs font-bold uppercase tracking-wider text-black dark:border-primary-yellow">
                DUCKDB + PGVECTOR + GROQ LLM
              </span>
            </div>
            <div className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
              NFHS-5 // CENSUS // NITI AAYOG
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h2 className="font-headline text-3xl font-bold uppercase leading-tight tracking-tight text-primary dark:text-white sm:text-4xl lg:text-5xl">
              INDIA DEVELOPMENT DATA ENGINE &amp; SOCIO-ECONOMIC CHOROPLETH
              <span className="mt-1 block text-xl font-normal uppercase tracking-normal text-on-surface-variant dark:text-primary-yellow sm:text-2xl">
                High-Throughput Spatial Analytics &amp; Vectorized Indicator Discovery
              </span>
            </h2>
            <p className="font-body text-base leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
              Exploratory macro-data portal built to digest and visualize massive socio-economic
              census sharding. Unifies complex cross-sector datasets from NFHS-5 (National Family
              Health Survey), Census of India, and NITI Aayog into an instant, vectorized analytical
              workspace with sub-50ms execution.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="overflow-hidden border-2 border-primary bg-surface-bright shadow-[6px_6px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[6px_6px_0px_#0e0e10]">
                <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2.5 font-headline text-xs text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-red" />
                    <span className="inline-block h-3 w-3 rounded-full bg-primary-yellow" />
                    <span className="inline-block h-3 w-3 rounded-full bg-accent-blue" />
                    <span className="ml-2 font-bold tracking-wide text-primary-yellow">
                      LIVE DATA DASHBOARD
                    </span>
                  </div>
                  <span className="border border-primary-yellow/30 bg-primary-yellow/20 px-2 py-0.5 font-mono text-[11px] text-surface-variant dark:border-outline dark:bg-surface-container dark:text-on-surface-variant">
                    india-dashboard-delta.vercel.app
                  </span>
                </div>
                <a
                  aria-label="Open the live India Development Data Engine dashboard"
                  className="group relative block max-h-[520px] overflow-y-auto border-b border-primary bg-surface dark:border-outline-variant dark:bg-surface"
                  href="https://india-dashboard-delta.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="India Development Data Engine live dashboard screenshot"
                    className="block h-auto w-full object-cover"
                    decoding="async"
                    height={1100}
                    loading="eager"
                    src="/work/preview-india-data-engine.png"
                    width={1100}
                  />
                </a>
                <div className="flex items-center justify-between bg-surface-container p-3 font-headline text-xs dark:bg-surface">
                  <span className="flex items-center gap-1.5 font-bold uppercase text-primary dark:text-white">
                    <span className="material-symbols-outlined text-sm text-accent-blue">
                      query_stats
                    </span>
                    Sub-50ms OLAP Queries
                  </span>
                  <span className="text-[11px] text-on-surface-variant dark:text-on-surface-variant">
                    252,170 Data Points
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  className="flex flex-1 items-center justify-center gap-2 border-2 border-primary bg-primary px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-on-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-accent-yellow hover:text-black dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[3px_3px_0px_#0e0e10] dark:hover:bg-primary-yellow/80"
                  href="https://india-dashboard-delta.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open Live Engine</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a
                  className="flex items-center justify-center gap-1.5 border-2 border-primary bg-surface px-4 py-3 font-headline text-xs font-bold uppercase tracking-wider text-primary shadow-[3px_3px_0px_#1a1a1a] transition-colors hover:bg-surface-container dark:border-outline dark:bg-surface-container dark:text-white dark:shadow-[3px_3px_0px_#0e0e10]"
                  href="https://github.com/adityapandey2002"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>Data Pipeline Git</span>
                </a>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-2 border-primary bg-surface p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[3px_3px_0px_#0e0e10]">
                  <div className="mb-2 border-b border-primary pb-1 font-headline text-xs font-bold uppercase text-accent-red dark:border-outline-variant">
                    DUCKDB IN-MEMORY OLAP
                  </div>
                  <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                    Executes in-memory analytical aggregation directly against Parquet shards in
                    milliseconds. Calculates sub-district percentiles, Z-scores, and cross-sector
                    correlations without database locks.
                  </p>
                </div>
                <div className="border-2 border-primary bg-surface p-4 shadow-[3px_3px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[3px_3px_0px_#0e0e10]">
                  <div className="mb-2 border-b border-primary pb-1 font-headline text-xs font-bold uppercase text-accent-blue dark:border-outline-variant">
                    PGVECTOR &amp; GROQ LLM RETRIEVAL
                  </div>
                  <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                    Vectorized queries (e.g.,{' '}
                    <em>&quot;Maternal anemia in flood-prone northern plains&quot;</em>) mapped to
                    statistical indicators via Groq LLM streaming embeddings in sub-50ms latency.
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-2 border-primary bg-surface p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]">
                <div className="flex items-center justify-between border-b border-primary pb-2 font-headline text-xs font-bold uppercase tracking-wider text-primary dark:border-outline-variant dark:text-white">
                  <span>DATA HARVESTING &amp; CHOROPLETH ENGINE</span>
                  <span className="font-mono text-[10px] text-accent-blue">&lt;48ms MEDIAN</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    'Raw Govt PDF / CSV Dumps (NFHS-5, HMIS, UDISE+, Census of India)',
                    'Python/Pandas sanitization pipeline, normalization & FIPS/LGD boundary mapping',
                    'Zstandard compressed columnar Parquet shards + Postgres pgvector embeddings',
                    'Interactive Leaflet / D3.js TopoJSON sub-district choropleth renderer',
                  ].map((step, index) => {
                    const isFinal = index === 3;
                    return (
                      <div
                        key={step}
                        className={`flex items-center gap-3 border p-2 ${
                          isFinal
                            ? 'border-primary bg-primary text-primary-yellow dark:border-primary-yellow dark:bg-primary-yellow dark:text-black'
                            : 'border-primary bg-surface-container text-on-surface-variant dark:border-outline-variant dark:bg-surface dark:text-on-surface-variant'
                        }`}
                      >
                        <span
                          className={`shrink-0 px-2 py-0.5 font-bold ${
                            isFinal
                              ? 'bg-primary-yellow text-black dark:bg-black dark:text-primary-yellow'
                              : 'bg-primary text-on-primary dark:bg-primary-yellow dark:text-black'
                          }`}
                        >
                          STEP 0{index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 border-2 border-primary bg-surface-container p-4 font-mono text-xs dark:border-outline dark:bg-surface-container">
                <div className="text-[10px] font-bold uppercase text-on-surface-variant dark:text-on-surface-variant">
                  GROQ NATURAL LANGUAGE VECTOR QUERY TEST:
                </div>
                <div className="border border-primary bg-surface p-2 text-[11px] text-primary dark:border-outline-variant dark:bg-surface dark:text-white">
                  &gt; &quot;Find 5 worst performing sub-districts for maternal anemia in
                  Araria&quot;
                </div>
                <div className="text-[11px] font-bold text-accent-red">
                  ✓ Correlated: NFHS-5 Indicator #74 (P&lt;0.001) in 32ms. TopoJSON boundaries
                  injected to viewport.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SPECIALIZED SYSTEMS
      ============================================================ */}
      <section className="w-full border-b-2 border-primary bg-surface-container-low px-6 py-12 dark:border-outline dark:bg-surface-low lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary pb-4 dark:border-outline-variant">
            <div>
              <span className="block font-headline text-xs font-bold uppercase tracking-widest text-accent-red">
                SECONDARY PRODUCTION ARCHIVES
              </span>
              <h2 className="font-headline text-2xl font-bold uppercase text-primary dark:text-white sm:text-3xl">
                SPECIALIZED SYSTEMS &amp; PHYSICAL COMPUTING
              </h2>
            </div>
            <div className="font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-on-surface-variant">
              DISTRIBUTED REALTIME &amp; HARDWARE EMBEDDED
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Prodigy */}
            <div
              className="project-card flex flex-col justify-between space-y-6 border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]"
              data-category="specialized"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary pb-2 dark:border-outline">
                  <span className="border border-primary bg-surface-container px-2 py-0.5 font-headline text-[10px] font-bold uppercase text-primary dark:border-outline dark:bg-surface dark:text-white">
                    REAL-TIME WEBSOCKETS
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    AUTH LIFECYCLE
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase leading-tight text-primary dark:text-white">
                  Prodigy InfoTech Concurrency Suites
                </h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  Full-stack collaboration and messaging suites engineered during Prodigy InfoTech
                  engagements. Stateless JWT token rotation with Redis blacklist, WebSocket pub/sub
                  live room state synchronization, and scalable CRUD APIs.
                </p>
              </div>
              <div className="space-y-3 border-t border-primary pt-4 dark:border-outline">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['MERN Stack', 'Socket.io', 'JWT Auth', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="border border-primary bg-surface-container px-2 py-0.5 text-primary dark:border-outline dark:bg-surface dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary hover:underline dark:text-white"
                  href="https://github.com/adityapandey2002"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Review Codebase Commit Logs</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>

            {/* Auroville */}
            <div
              className="project-card flex flex-col justify-between space-y-6 border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]"
              data-category="specialized"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary pb-2 dark:border-outline">
                  <span className="border border-primary bg-accent-red px-2 py-0.5 font-headline text-[10px] font-bold uppercase text-white dark:border-accent-red">
                    EMBEDDED HARDWARE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    MINVAYU PROJECT
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase leading-tight text-primary dark:text-white">
                  Auroville FabLab Hardware Telemetry
                </h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  Open-source small-scale wind turbine telemetry and rapid additive manufacturing
                  prototyping. Engineered micro-controller interfaces for RPM/output power monitoring
                  and large-format 3D printing workflows for sustainable off-grid housing.
                </p>
              </div>
              <div className="space-y-3 border-t border-primary pt-4 dark:border-outline">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Microcontrollers', 'C++ / AVR', 'CAD Modeling', 'Sensor I/O'].map((tech) => (
                    <span
                      key={tech}
                      className="border border-primary bg-surface-container px-2 py-0.5 text-primary dark:border-outline dark:bg-surface dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-on-surface-variant dark:text-on-surface-variant">
                  <span>Auroville Physical Systems Lab</span>
                </span>
              </div>
            </div>

            {/* SpaceX */}
            <div
              className="project-card flex flex-col justify-between space-y-6 border-2 border-primary bg-surface p-6 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-container dark:shadow-[4px_4px_0px_#0e0e10]"
              data-category="specialized"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary pb-2 dark:border-outline">
                  <span className="border border-primary bg-primary px-2 py-0.5 font-headline text-[10px] font-bold uppercase text-primary-yellow dark:border-primary-yellow dark:bg-primary-yellow dark:text-black">
                    DATA SCIENCE CAPSTONE
                  </span>
                  <span className="font-headline text-xs font-bold text-on-surface-variant dark:text-on-surface-variant">
                    IBM CERTIFIED
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold uppercase leading-tight text-primary dark:text-white">
                  Space-X Falcon 9 First-Stage Recovery Model
                </h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  Predictive machine learning pipeline estimating booster landing success. Built
                  with web scraping of SpaceX telemetry, EDA with SQL, interactive Folium spatial
                  maps, and classification benchmarking across Logistic Regression, SVM, Decision
                  Tree, and KNN models.
                </p>
              </div>
              <div className="space-y-3 border-t border-primary pt-4 dark:border-outline">
                <div className="flex flex-wrap gap-1.5 font-headline text-[10px] font-bold uppercase">
                  {['Python', 'Scikit-Learn', 'Plotly Dash', 'Folium'].map((tech) => (
                    <span
                      key={tech}
                      className="border border-primary bg-surface-container px-2 py-0.5 text-primary dark:border-outline dark:bg-surface dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  className="inline-flex items-center gap-1.5 font-headline text-xs font-bold uppercase text-primary hover:underline dark:text-white"
                  href="https://github.com/adityapandey2002"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>View Capstone Notebooks</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ARCHITECTURAL PILLARS
      ============================================================ */}
      <section className="w-full border-b-2 border-primary bg-surface px-6 py-12 dark:border-outline dark:bg-surface lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-10">
          <div>
            <span className="block font-headline text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-yellow">
              {'/* 02 // ARCHITECTURAL PILLARS */'}
            </span>
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-primary dark:text-white sm:text-4xl">
              FOUR DETERMINISTIC GUARANTEES FOR LOW-RESOURCE COMPUTING
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: 'P1',
                title: 'Offline-First By Default',
                body: 'No patient, doctor, or nurse midwife should ever be blocked by 2G/EDGE network dropouts. Client mutations serialize to IndexedDB first and flush asynchronously.',
                className:
                  'bg-primary-yellow text-black dark:bg-primary-yellow dark:text-black',
              },
              {
                id: 'P2',
                title: 'Cryptographic Audit Logs',
                body: 'Financial checkouts and healthcare clinical metrics are append-only. Each mutation receives SHA-256 validation timestamps before reaching central servers.',
                className: 'bg-accent-red text-white dark:bg-accent-red dark:text-white',
              },
              {
                id: 'P3',
                title: 'Deterministic Budgets',
                body: 'Strict sub-2.5s LCP on throttled 3G connections. Micro-bundles (<170kB gzip) ensure budget Android devices render without crashing browser tabs.',
                className:
                  'bg-primary text-on-primary dark:bg-surface-container dark:text-primary-yellow',
              },
              {
                id: 'P4',
                title: 'Field-Hardened Ergonomics',
                body: 'High-contrast visual design engineered for extreme glare in direct Bihar sunlight (44°C summers). Bilingual UI strings with zero reliance on ambiguous iconography.',
                className:
                  'bg-surface-container text-primary dark:bg-accent-blue dark:text-black',
              },
            ].map((pillar) => (
              <div
                key={pillar.id}
                className="space-y-3 border-2 border-primary bg-surface-bright p-5 shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface-low dark:shadow-[4px_4px_0px_#0e0e10]"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center border-2 border-primary font-headline text-base font-bold dark:border-outline ${pillar.className}`}
                >
                  {pillar.id}
                </div>
                <h3 className="font-headline text-sm font-bold uppercase text-primary dark:text-white">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-on-surface-variant dark:text-on-surface-variant">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CONSOLIDATED SYSTEMS MATRIX
      ============================================================ */}
      <section className="w-full border-b-2 border-primary bg-surface-container-high/30 px-6 py-12 dark:border-outline dark:bg-surface-low lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-primary pb-4 dark:border-outline-variant sm:flex-row sm:items-end">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant">
                TECHNICAL INVENTORY
              </span>
              <h2 className="font-headline text-2xl font-bold uppercase text-primary dark:text-white sm:text-3xl">
                CONSOLIDATED SYSTEMS MATRIX
              </h2>
            </div>
            <span className="border border-primary bg-primary-yellow px-2 py-1 font-headline text-xs font-bold uppercase text-primary dark:border-primary-yellow dark:text-black">
              ORDERED HIERARCHY // AUDIT: APRIL 2026
            </span>
          </div>

          <div className="overflow-x-auto border-2 border-primary bg-surface shadow-[4px_4px_0px_#1a1a1a] dark:border-outline dark:bg-surface dark:shadow-[4px_4px_0px_#0e0e10]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-primary bg-primary font-headline text-xs font-bold uppercase tracking-wider text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-primary-yellow">
                  <th className="border-r border-on-primary/20 p-3 dark:border-outline-variant">
                    RANK // SYSTEM
                  </th>
                  <th className="border-r border-on-primary/20 p-3 dark:border-outline-variant">
                    CORE TECH STACK
                  </th>
                  <th className="border-r border-on-primary/20 p-3 dark:border-outline-variant">
                    SYNC &amp; PROTOCOL
                  </th>
                  <th className="border-r border-on-primary/20 p-3 dark:border-outline-variant">
                    QUALITY BAR
                  </th>
                  <th className="p-3">DEPLOYMENT STATE</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-primary font-body text-xs dark:divide-outline-variant">
                {[
                  {
                    rank: '#1',
                    system: 'BiharKaSwaad E-Commerce',
                    stack: 'React 18, Node.js, Express, MySQL, Hostinger',
                    sync: 'Razorpay HMAC SHA-256 Webhooks + Re-validation',
                    quality: 'Zero-Tamper Payment Validation',
                    qualityColor: 'text-accent-red',
                    deploy: 'Live Production Storefront',
                    deployColor: 'text-accent-blue',
                  },
                  {
                    rank: '#2',
                    system: 'Sadar Hospital Araria Portal',
                    stack: 'React, TypeScript, Redis, Supabase, Tailwind',
                    sync: 'WebSocket pub/sub dispatch queues',
                    quality: '<100ms Telemetry Tick Speed',
                    qualityColor: 'text-accent-blue',
                    deploy: 'Civic Gov Production Node',
                    deployColor: 'text-primary dark:text-white',
                  },
                  {
                    rank: '#3',
                    system: 'Matru Suraksha (मातृ सुरक्षा)',
                    stack: 'React 18, Vite, Fastify, Dexie.js, PostgreSQL',
                    sync: 'IndexedDB offline replica + Exponential backoff',
                    quality: '80% Line Coverage // 0 A11y Violations',
                    qualityColor: 'text-accent-red',
                    deploy: 'Active Field Pilot (Bihar)',
                    deployColor: 'text-primary dark:text-white',
                  },
                  {
                    rank: '#4',
                    system: 'India Development Data Engine',
                    stack: 'DuckDB, Python, pgvector, Groq LLM, Leaflet',
                    sync: 'Parquet in-memory OLAP + Vector Embedding',
                    quality: '<48ms Sub-district Query Median',
                    qualityColor: 'text-primary dark:text-white',
                    deploy: 'Live Macro Analytics',
                    deployColor: 'text-primary dark:text-white',
                  },
                  {
                    rank: '#5',
                    system: 'Prodigy InfoTech Suites',
                    stack: 'MongoDB, Express, React, Node.js, Socket.io',
                    sync: 'WebSocket live rooms + JWT rotation',
                    quality: 'High-Concurrency Stress Pass',
                    qualityColor: 'text-on-surface-variant',
                    deploy: 'Enterprise Codebase Archive',
                    deployColor: 'text-on-surface-variant',
                  },
                  {
                    rank: '#6',
                    system: 'Auroville MinVayu Hardware',
                    stack: 'C++, AVR Microcontrollers, CAD, Rapid Prototyping',
                    sync: 'Analog Sensor I/O & RPM Polling',
                    quality: 'Physical Wind Turbine Telemetry',
                    qualityColor: 'text-primary dark:text-white',
                    deploy: 'Research Lab Deployment',
                    deployColor: 'text-on-surface-variant',
                  },
                  {
                    rank: '#7',
                    system: 'Space-X Launch Prediction',
                    stack: 'Python, Scikit-Learn, Plotly Dash, Folium, SQL',
                    sync: 'REST ETL Telemetry Pipeline',
                    quality: '83.3% Cross-Validated Accuracy',
                    qualityColor: 'text-accent-blue',
                    deploy: 'IBM Capstone Verified',
                    deployColor: 'text-on-surface-variant',
                  },
                ].map((row) => (
                  <tr
                    key={row.rank}
                    className="transition-colors hover:bg-surface-container dark:hover:bg-surface-container"
                  >
                    <td className="border-r border-primary p-3 font-headline font-bold uppercase text-primary dark:border-outline-variant dark:text-white">
                      {row.rank} {row.system}
                    </td>
                    <td className="border-r border-primary p-3 font-mono text-[11px] text-on-surface-variant dark:border-outline-variant dark:text-on-surface-variant">
                      {row.stack}
                    </td>
                    <td className="border-r border-primary p-3 text-on-surface-variant dark:border-outline-variant dark:text-on-surface-variant">
                      {row.sync}
                    </td>
                    <td
                      className={`border-r border-primary p-3 font-headline font-bold dark:border-outline-variant ${row.qualityColor}`}
                    >
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

      {/* ============================================================
          SOURCE CODE / AUDIT CTA
      ============================================================ */}
      <section className="w-full border-b-2 border-primary bg-primary px-6 py-12 text-on-primary dark:border-outline dark:bg-surface-lowest dark:text-on-surface md:py-16 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block bg-primary-yellow px-2.5 py-1 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container dark:text-black">
              SOURCE CODE &amp; AUDIT PRIVILEGES
            </span>
            <h2 className="font-headline text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              WANT TO DIVE INTO PRODUCTION CODEBASES OR ARCHITECTURAL REPOSITORIES?
            </h2>
            <p className="font-body text-sm leading-relaxed text-surface-variant dark:text-on-surface-variant">
              Open-source repositories, reproducible offline-first benchmarks, and deep-dive
              technical reports are maintained for public health institutions, civic bodies, and
              engineering collaborators.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
            <a
              className="inline-flex items-center justify-center border-2 border-on-primary bg-primary-yellow px-6 py-3.5 font-headline text-xs font-bold uppercase tracking-wider text-on-primary-container shadow-[4px_4px_0px_#ffcc00] transition-colors hover:bg-white dark:border-primary-yellow dark:bg-primary-yellow dark:text-black dark:shadow-[4px_4px_0px_#facc15] dark:hover:bg-[#ffe083]"
              href="https://github.com/adityapandey2002"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">terminal</span>
              GitHub Repositories (@adityapandey2002)
            </a>
            <Link
              className="inline-flex items-center justify-center border-2 border-on-primary bg-surface px-6 py-3.5 font-headline text-xs font-bold uppercase tracking-wider text-primary shadow-[4px_4px_0px_#f5f0e8] transition-colors hover:bg-primary-yellow hover:text-on-primary-container dark:border-outline dark:bg-surface-container dark:text-white dark:shadow-[4px_4px_0px_#0e0e10] dark:hover:border-primary-yellow dark:hover:text-primary-yellow"
              href="/health"
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">medical_services</span>
              Explore Field Groundwork (/health)
            </Link>
          </div>
        </div>
      </section>

    </div>

    <Footer />
    </>
  );
}
