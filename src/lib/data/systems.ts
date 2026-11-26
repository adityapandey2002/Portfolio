export type SystemCategory = 'health-ai' | 'commerce' | 'data-ml' | 'specialized';

export interface SystemMetric {
  value: string;
  label: string;
  context?: string;
}

export interface ArchitectureStep {
  step: string;
  title: string;
  detail: string;
}

export interface QualityGate {
  label: string;
  value: string;
}

export interface RepoDocLink {
  title: string;
  path: string;
  url: string;
  summary: string;
}

export interface StackGroup {
  layer: string;
  items: string[];
}

export interface PortfolioSystem {
  slug: string;
  rank: string;
  tier: 'flagship' | 'specialized';
  category: SystemCategory;
  categoryLabel: string;
  audience: ('tech' | 'health')[];
  title: string;
  nativeTitle?: string;
  subtitle: string;
  tagline: string;
  summary: string;
  problemSolved: string;
  operationalImpact: string;
  deploymentLabel: string;
  domain: string;
  liveUrl: string | null;
  isLivePublic: boolean;
  githubUrl: string | null;
  repoName: string | null;
  previewImage: string;
  secondaryImages?: { src: string; caption: string }[];
  accentClass: string;
  metrics: SystemMetric[];
  recruiterHighlights: string[];
  architectureSteps: ArchitectureStep[];
  securityAndQuality: string[];
  qualityGates: QualityGate[];
  stack: string[];
  stackGroups: StackGroup[];
  docs: RepoDocLink[];
  featuredOnHome?: boolean;
  askPrompt: string;
}

export const PORTFOLIO_SYSTEMS: PortfolioSystem[] = [
  {
    slug: 'biharkaswaad',
    rank: '01',
    tier: 'flagship',
    category: 'commerce',
    categoryLabel: 'Production E-Commerce',
    audience: ['tech'],
    title: 'BiharKaSwaad E-Commerce Platform',
    nativeTitle: 'बिहार का स्वाद',
    subtitle: 'Full-Stack Direct-to-Consumer Food Storefront & Zero-Tamper Payment Pipeline',
    tagline: 'Production D2C storefront shipping authentic Bihari food across India with HMAC-verified Razorpay checkout.',
    summary:
      'End-to-end production e-commerce engine serving real customers pan-India at biharkaswaad.in. Engineered with server-side price re-validation, HMAC SHA-256 Razorpay webhook verification, variant-level MySQL stock locks, automated courier tracking, and a 29/29 Playwright E2E suite.',
    problemSolved:
      'Regional food producers lacked a reliable direct-to-consumer channel that could handle variant-level inventory (250g/500g/1kg), prevent checkout price manipulation, reconcile async payment drops, and automate courier dispatch.',
    operationalImpact:
      'Running live in production on Hostinger Cloud with real pan-India orders, 30-minute auto-expiry of abandoned carts, Excel bulk catalog operations, and full server-side SEO/JSON-LD indexing.',
    deploymentLabel: 'Live Production · biharkaswaad.in',
    domain: 'biharkaswaad.in',
    liveUrl: 'https://biharkaswaad.in',
    isLivePublic: true,
    githubUrl: 'https://github.com/adityapandey2002/BKS',
    repoName: 'adityapandey2002/BKS',
    previewImage: '/work/preview-biharkaswaad.png',
    secondaryImages: [
      { src: '/work/biharkaswaad-desktop.png', caption: 'Storefront catalog & merchandising grid' },
      { src: '/work/biharkaswaad-mobile.png', caption: 'Mobile checkout & responsive navigation' },
    ],
    accentClass: 'bg-primary-container dark:bg-[#facc15]',
    metrics: [
      { value: '100%', label: 'HMAC Verified', context: 'Zero-tamper Razorpay checkout' },
      { value: '29/29', label: 'Playwright E2E', context: 'Automated QA before release' },
      { value: '11', label: 'MySQL Indexes', context: 'Query-plan tuned Sequelize' },
      { value: '≤2.5s', label: 'Mobile LCP', context: 'Brotli + 60s response cache' },
    ],
    recruiterHighlights: [
      'Server-side amount re-validation from MySQL before generating Razorpay Order IDs — never trusts client totals.',
      'Cryptographic HMAC SHA-256 verification plus idempotent webhook reconciliation and 30-min abandoned order expiry.',
      'Role-based access (Customer, Admin, Support) with JWT in httpOnly cookies, bcrypt, Helmet CSP, and rate-limited auth.',
      'Full lifecycle automation (Pending → Paid → Packed → Dispatched → Delivered) with Shipmojo tracking & Excel bulk uploads.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Storefront & Edge Caching',
        detail: 'React 18 + Redux Toolkit SPA served with Brotli compression, 30-day immutable asset headers, and per-route JSON-LD SEO.',
      },
      {
        step: '02',
        title: 'Server-Side Price Validation',
        detail: 'Express REST API recalculates SKU variant prices, tax, and shipping tariffs from MySQL before invoking Razorpay Orders API.',
      },
      {
        step: '03',
        title: 'HMAC SHA-256 & Webhook Idempotency',
        detail: 'Verifies payment signatures with crypto.createHmac("sha256") and reconciles async payment.captured webhooks idempotently.',
      },
      {
        step: '04',
        title: 'ACID Inventory & Courier Dispatch',
        detail: 'Sequelize row-locking deducts variant stock across 11 indexed MySQL tables, triggers Nodemailer updates, and syncs courier tracking.',
      },
    ],
    securityAndQuality: [
      'JWT stored in httpOnly cookies with bcrypt password hashing and brute-force rate limiting.',
      'Strict Helmet Content-Security-Policy tuned for Razorpay gateways plus XSS-sanitized transactional emails.',
      '29/29 Playwright E2E test suite verifying search, PDP, cart, checkout, auth, and account journeys.',
      'Deployed under PM2 cluster mode + Dockerized services on Hostinger VPS with Cloudinary media delivery.',
    ],
    qualityGates: [
      { label: 'Payment Verification', value: 'HMAC SHA-256 + DB Re-Check' },
      { label: 'Automated E2E Suite', value: '29 / 29 Playwright Passing' },
      { label: 'Database Optimization', value: '11 Composite MySQL Indexes' },
      { label: 'Caching Strategy', value: '60s API Cache + 30d Static' },
    ],
    stack: ['React 18', 'Redux Toolkit', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Razorpay', 'Playwright', 'Docker'],
    stackGroups: [
      { layer: 'Frontend', items: ['React 18', 'Redux Toolkit', 'Tailwind CSS', 'JSON-LD Structured Data'] },
      { layer: 'Backend & Payments', items: ['Node.js', 'Express REST', 'Razorpay Orders & Webhooks', 'Nodemailer'] },
      { layer: 'Data & Media', items: ['MySQL (ACID)', 'Sequelize ORM (11 Indexes)', 'Cloudinary', 'Multer Excel Bulk Import'] },
      { layer: 'Infra & QA', items: ['Playwright (29 E2E Tests)', 'PM2 Cluster Mode', 'Docker', 'Hostinger VPS'] },
    ],
    docs: [
      {
        title: 'Repository Root',
        path: 'ecommmerce_mern/',
        url: 'https://github.com/adityapandey2002/BKS/tree/main/ecommmerce_mern',
        summary: 'Full MERN + MySQL storefront client, Express API server, and Docker compose setup.',
      },
      {
        title: 'Backend Server & Payment Pipeline',
        path: 'ecommmerce_mern/server/',
        url: 'https://github.com/adityapandey2002/BKS/tree/main/ecommmerce_mern/server',
        summary: 'Controllers, Sequelize models, Razorpay HMAC verification, and courier webhooks.',
      },
      {
        title: 'Client Storefront',
        path: 'ecommmerce_mern/client/',
        url: 'https://github.com/adityapandey2002/BKS/tree/main/ecommmerce_mern/client',
        summary: 'React 18 + Redux storefront UI, checkout flow, and admin inventory dashboard.',
      },
    ],
    featuredOnHome: true,
    askPrompt: 'Explain the payment security, MySQL indexing, and order lifecycle architecture of BiharKaSwaad.',
  },
  {
    slug: 'araria-hospital',
    rank: '02',
    tier: 'flagship',
    category: 'health-ai',
    categoryLabel: 'Civic Healthcare Portal',
    audience: ['tech', 'health'],
    title: 'District Hospital Araria Digital Portal',
    nativeTitle: 'सदर अस्पताल अररिया',
    subtitle: 'Next.js + NestJS Civic Healthcare Monorepo for a 250+ Bed Government Hospital',
    tagline: 'OPD appointment booking, blood bank availability, grievances, and doctor rosters built to Government of India standards.',
    summary:
      'Production civic healthcare portal built for Sadar Hospital Araria (Department of Health, Government of Bihar). Architected as a 4-package monorepo with Next.js frontend, NestJS API on Vercel (bom1), Supabase PostgreSQL, dual-ORM table ownership (Drizzle + MikroORM), and 86 automated backend tests.',
    problemSolved:
      'Patients travelling from remote Araria border blocks faced long physical OPD queues, zero visibility into blood bank reserves, unrecorded service grievances, and scattered paper doctor rosters.',
    operationalImpact:
      'Consolidates six high-frequency citizen tasks online — OPD appointment slots, specialist directory, group-wise blood bank stock, grievance tracking, public notices, and department feedback with nodal-officer access grants.',
    deploymentLabel: 'Live Civic Portal · Vercel (bom1)',
    domain: 'hospital-araria-f5wl.vercel.app',
    liveUrl: 'https://hospital-araria-f5wl.vercel.app/',
    isLivePublic: true,
    githubUrl: 'https://github.com/adityapandey2002/HOSPITAL_ARARIA',
    repoName: 'adityapandey2002/HOSPITAL_ARARIA',
    previewImage: '/work/preview-sadar-hospital.png',
    accentClass: 'bg-tertiary',
    metrics: [
      { value: '86', label: 'Backend Tests', context: '6 NestJS suites passing' },
      { value: '16', label: 'Managed Tables', context: '11 Drizzle + 5 MikroORM' },
      { value: '4 Roles', label: 'RBAC Matrix', context: 'Patient · Doctor · Admin · Head' },
      { value: '250+', label: 'Bed Campus', context: 'Sadar Hospital Araria' },
    ],
    recruiterHighlights: [
      '4-workspace TypeScript monorepo (@dh-araria/frontend, backend, shared, ui) with 0 TypeScript errors and strict ESLint gates.',
      'Explicit dual-ORM ownership boundary (Drizzle owns 11 DDL tables, MikroORM owns 5) verified automatically via npm run schema:check.',
      'Tiered API rate limiting (100 req/min general, 5/min auth register & grievances, 10/min login) with HS256 JWT + RBAC.',
      'Designed for Government of India GIGW 3.0 & WCAG 2.2 AA accessibility with Phase 3 hooks for ABDM, e-Pramaan SSO, and Bhashini.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Citizen & Clinical Web Portal (Next.js)',
        detail: 'Accessible bilingual-ready UI for OPD slot booking, doctor schedules, blood availability, grievances, and notices.',
      },
      {
        step: '02',
        title: 'NestJS REST API on Vercel (bom1)',
        detail: 'Versioned /api/v1 endpoints with JWT HS256 authentication, granular RBAC guards, and endpoint-specific rate limits.',
      },
      {
        step: '03',
        title: 'Dual-ORM Data Layer on Supabase Postgres',
        detail: 'Transaction pooler for runtime traffic and direct connections for DDL; Drizzle (11 tables) and MikroORM (5 tables) with zero overlap.',
      },
      {
        step: '04',
        title: 'Gov Interoperability & Audit Readiness',
        detail: 'Structured audit trails, grievance escalation routing to department heads, and Phase 3 architecture for ABDM FHIR & e-Pramaan.',
      },
    ],
    securityAndQuality: [
      '6 Jest/NestJS test suites with 86 passing tests plus automated schema-boundary check (npm run schema:check).',
      'HS256 JWT tokens with issuer/audience validation (dh-araria) and role-scoped authorization across 4 personas.',
      'Strict per-route rate limiting protecting auth, password resets (3/hr), public complaints (5/min), and client error logging.',
      'Aligned with CERT-In 2022 audit logging, GIGW 3.0 government portal guidelines, and ABDM consent architecture.',
    ],
    qualityGates: [
      { label: 'Schema Boundary Gate', value: 'npm run schema:check PASS' },
      { label: 'Backend Test Suites', value: '6 Suites · 86 Tests Passing' },
      { label: 'TypeScript Strict Check', value: '0 Compiler Errors' },
      { label: 'Compliance Alignment', value: 'GIGW 3.0 · WCAG 2.2 · ABDM' },
    ],
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Supabase PostgreSQL', 'Drizzle ORM', 'MikroORM', 'Vercel', 'Tailwind CSS'],
    stackGroups: [
      { layer: 'Frontend', items: ['Next.js App Router', 'React', 'TypeScript', 'Tailwind CSS', '@dh-araria/ui'] },
      { layer: 'Backend', items: ['NestJS (/api/v1)', 'JWT HS256 Auth', 'Rate Limiting', '@dh-araria/shared'] },
      { layer: 'Database', items: ['Supabase PostgreSQL', 'Drizzle ORM (11 tables)', 'MikroORM (5 tables)'] },
      { layer: 'Quality & Gov Standards', items: ['86 Backend Tests', 'schema:check Gate', 'GIGW 3.0', 'ABDM Phase 3 Spec'] },
    ],
    docs: [
      {
        title: 'Architecture Specification',
        path: 'docs/ARCHITECTURE.md',
        url: 'https://github.com/adityapandey2002/HOSPITAL_ARARIA/blob/main/docs/ARCHITECTURE.md',
        summary: 'C4 system context, monorepo modules, and ABDM / e-Pramaan / Bhashini integration plan.',
      },
      {
        title: 'API Documentation',
        path: 'docs/API.md',
        url: 'https://github.com/adityapandey2002/HOSPITAL_ARARIA/blob/main/docs/API.md',
        summary: 'JWT payload spec, /api/v1 routes, and per-endpoint rate limiting policies.',
      },
      {
        title: 'Launch Readiness Audit',
        path: 'docs/LAUNCH-READINESS.md',
        url: 'https://github.com/adityapandey2002/HOSPITAL_ARARIA/blob/main/docs/LAUNCH-READINESS.md',
        summary: 'Verified test gates, schema ownership evidence, and deployment checklist.',
      },
      {
        title: 'Security Architecture',
        path: 'docs/SECURITY.md',
        url: 'https://github.com/adityapandey2002/HOSPITAL_ARARIA/blob/main/docs/SECURITY.md',
        summary: 'Defense-in-depth controls, CERT-In logging, and ABDM security posture.',
      },
    ],
    askPrompt: 'Walk me through the monorepo architecture, dual-ORM setup, and security controls in District Hospital Araria.',
  },
  {
    slug: 'matru-suraksha',
    rank: '03',
    tier: 'flagship',
    category: 'health-ai',
    categoryLabel: 'Offline-First Clinical PWA',
    audience: ['tech', 'health'],
    title: 'Matru Suraksha — Maternal Triage Platform',
    nativeTitle: 'मातृ सुरक्षा',
    subtitle: '6-Tier High-Risk Pregnancy Surveillance & Closed-Loop 15-Day Follow-Up Engine',
    tagline: 'Offline-first clinical PWA & Android app built for ANMs, CHOs, and district desks to prevent maternal mortality.',
    summary:
      'Enterprise-grade, offline-first digital health platform piloted for Araria District, Bihar under National Health Mission workflows. Digitizes high-risk pregnancy (HRP) registration, automated risk scoring, and a closed-loop 15-day escalation cycle across 6 public-health tiers with zero data loss on 2G/offline rural clinics.',
    problemSolved:
      'In resource-constrained rural Bihar districts, paper registers and broken mobile coverage cause deadly delays in identifying severe anemia, preeclampsia, and missed antenatal follow-ups between village sub-centres and district hospitals.',
    operationalImpact:
      'Enables Auxiliary Nurse Midwives (ANMs) to perform 7-field intake and danger-sign screening completely offline, automatically escalating overdue or critical cases across 6 administrative levels up to the District Health Society (DHS).',
    deploymentLabel: 'Live Field Pilot · Render + PWA',
    domain: 'hrp-pilot-api.onrender.com',
    liveUrl: 'https://hrp-pilot-api.onrender.com/',
    isLivePublic: true,
    githubUrl: 'https://github.com/adityapandey2002/MATERNAL_HEALTH_HRP',
    repoName: 'adityapandey2002/MATERNAL_HEALTH_HRP',
    previewImage: '/work/preview-matru-suraksha.png',
    secondaryImages: [
      { src: '/work/matru-suraksha.png', caption: 'High-risk maternal triage workflow preview' },
    ],
    accentClass: 'bg-secondary',
    metrics: [
      { value: '6 Tiers', label: 'Clinical RBAC', context: 'ANM → CHO → Block → BHM → Dist → DHS' },
      { value: '0%', label: 'Offline Data Loss', context: 'Dexie.js IndexedDB sync queue' },
      { value: '15-Day', label: 'SLA Escalation', context: 'Closed-loop HRP follow-up clock' },
      { value: '4 Layers', label: 'Test Pyramid', context: 'Unit · RTL · Testcontainers PG · E2E' },
    ],
    recruiterHighlights: [
      '6-tier clinical & administrative role hierarchy with Attribute-Based Access Control (ABAC) dot-separated facility subtree scoping.',
      'Offline-first PWA + Capacitor 6 Android runtime powered by Dexie.js 4 (IndexedDB) and TanStack Query optimistic sync.',
      'Field-device threat hardening: AES-256-GCM encryption at rest, 6-digit PIN lock, 5-min idle timeout, and 10-attempt auto-wipe.',
      '4-layer QA pyramid: zero-mock clinical rule unit tests, RTL + fake-indexeddb, Vitest + Testcontainers (real Postgres 16), and Playwright E2E.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Offline Frontline Intake (ANM / CHO)',
        detail: 'React 18 + Vite PWA + Capacitor Android captures 7-field maternal intake and danger signs into encrypted Dexie.js IndexedDB.',
      },
      {
        step: '02',
        title: 'Deterministic Clinical Risk Engine',
        detail: 'Pure TypeScript rules engine scores severe anemia, hypertension/preeclampsia, gestational diabetes, and obstetric history.',
      },
      {
        step: '03',
        title: 'Fastify API & PostgreSQL 16 Sync',
        detail: '15-min JWT + httpOnly 7-day refresh cookies synchronize queued mutations with idempotent conflict resolution and facility ABAC.',
      },
      {
        step: '04',
        title: 'Closed-Loop 15-Day Escalation Ladder',
        detail: 'Overdue follow-ups automatically escalate from Sub-Centre ANM → CHO → Block Helpdesk → BHM → District Desk → DHS.',
      },
    ],
    securityAndQuality: [
      'Threat-modeled for shared rural tablets: AES-256-GCM field encryption, 6-digit PIN lock, 5-minute idle lock, 10-attempt auto-wipe.',
      'ABAC facility-subtree scoping prevents lateral patient access across clinics; TLS 1.3 + HSTS + httpOnly refresh cookies.',
      'Zero-mock pure function tests for clinical scoring (rules.test.ts) & obstetric date math (date-utils.test.ts).',
      'Real PostgreSQL 16 integration tests via Testcontainers + Playwright offline Service Worker E2E suite.',
    ],
    qualityGates: [
      { label: 'Offline Storage', value: 'Dexie.js 4 + AES-256-GCM' },
      { label: 'Access Control', value: '6-Tier ABAC Facility Scoping' },
      { label: 'Integration Testing', value: 'Vitest + Testcontainers PG 16' },
      { label: 'Mobile Delivery', value: 'PWA + Capacitor 6 Android' },
    ],
    stack: ['TypeScript 5.6', 'React 18', 'Vite 5', 'Fastify', 'PostgreSQL 16', 'Dexie.js 4', 'Capacitor 6', 'TanStack Query', 'Playwright'],
    stackGroups: [
      { layer: 'Frontend & Offline', items: ['React 18', 'Vite 5', 'TanStack Query', 'Dexie.js 4 (IndexedDB)', 'Capacitor 6 Android'] },
      { layer: 'Backend & DB', items: ['Fastify API', 'PostgreSQL 16', 'npm Workspaces Monorepo', 'Zod Validation'] },
      { layer: 'Security', items: ['AES-256-GCM Encryption', 'ABAC Subtree Scoping', 'bcrypt + JWT Refresh', '10-Attempt Auto-Wipe'] },
      { layer: 'Testing', items: ['Vitest Unit & Rules Tests', 'RTL + fake-indexeddb', 'Testcontainers Postgres 16', 'Playwright E2E'] },
    ],
    docs: [
      {
        title: 'Project Overview & Operational Context',
        path: 'docs/01-project-overview.md',
        url: 'https://github.com/adityapandey2002/MATERNAL_HEALTH_HRP/blob/main/docs/01-project-overview.md',
        summary: 'Public health problem statement, NHM pyramid, and closed-loop 15-day HRP protocol.',
      },
      {
        title: 'System Architecture',
        path: 'docs/04-system-architecture.md',
        url: 'https://github.com/adityapandey2002/MATERNAL_HEALTH_HRP/blob/main/docs/04-system-architecture.md',
        summary: 'Client offline repository, sync queues, Fastify backend, and PostgreSQL schema.',
      },
      {
        title: 'Security & Threat Model',
        path: 'docs/15-security-documentation.md',
        url: 'https://github.com/adityapandey2002/MATERNAL_HEALTH_HRP/blob/main/docs/15-security-documentation.md',
        summary: 'Device theft mitigations, AES-256-GCM encryption, ABAC scoping, and auth flows.',
      },
      {
        title: '4-Layer Testing & Quality Strategy',
        path: 'docs/13-testing-and-quality.md',
        url: 'https://github.com/adityapandey2002/MATERNAL_HEALTH_HRP/blob/main/docs/13-testing-and-quality.md',
        summary: 'Zero-mock rules testing, fake-indexeddb, Testcontainers Postgres, and Playwright E2E.',
      },
    ],
    featuredOnHome: true,
    askPrompt: 'How does Matru Suraksha handle offline sync, 6-tier clinical escalation, and tablet security?',
  },
  {
    slug: 'ambient-clinical-scribe',
    rank: '04',
    tier: 'flagship',
    category: 'health-ai',
    categoryLabel: 'Clinical Voice AI · FastAPI',
    audience: ['tech', 'health'],
    title: 'Ambient Clinical AI Scribe for Maternal Health',
    nativeTitle: 'मातृत्व क्लिनिकल एआई स्क्राइब',
    subtitle: 'Bilingual (Hindi/English) Real-Time Voice-to-Case-Sheet Engine for Bihar L1 PHCs',
    tagline: 'Listens to nurse-patient conversations, auto-fills 181 official maternity case-sheet fields, and flags clinical risks in real time.',
    summary:
      'Bilingual Hindi/English ambient AI scribe engineered for the official State Health Society Bihar L1 PHC Maternity Services Case Sheet (181 unique fields across 30 sections). Streams audio via Silero VAD + WebSockets through Whisper-large-v3, a zero-cost live local bilingual filler, and a single Gemini finalize pass.',
    problemSolved:
      'GNMs and ANMs in busy rural labour rooms spend excessive time manually filling 30-section paper maternity case sheets during intake, delaying triage and causing incomplete obstetric records.',
    operationalImpact:
      'Automates structured documentation from natural Hindi/English patient Q&A while preserving clinician authority through confirm-field locks, zero per-chunk LLM burn, and instant clinical danger alerts.',
    deploymentLabel: 'On-Premise PHC Stack · FastAPI + React 19',
    domain: 'github.com/adityapandey2002/AUTOMATIC_DATA_GENERATION',
    liveUrl: null,
    isLivePublic: false,
    githubUrl: 'https://github.com/adityapandey2002/AUTOMATIC_DATA_GENERATION',
    repoName: 'adityapandey2002/AUTOMATIC_DATA_GENERATION',
    previewImage: '/work/ambient-scribe-preview.jpg',
    accentClass: 'bg-accent-red',
    metrics: [
      { value: '181', label: 'Clinical Fields', context: '30 official Bihar SHS sections' },
      { value: '1 Call', label: 'LLM Per Patient', context: 'Free live filler + Gemini finalize' },
      { value: 'HI + EN', label: 'Bilingual ASR', context: 'Whisper-large-v3 + Silero VAD' },
      { value: '3/3', label: 'Integration Tests', context: 'REST + WebSocket round-trips' },
    ],
    recruiterHighlights: [
      'Cost-disciplined hybrid AI architecture: free local bilingual field filler runs on every live audio chunk; exactly ONE Gemini 2.5 Flash call runs at finalize.',
      'Dual audio capture paths: standalone Python capture-agent (16k stereo → mono → denoise → Silero VAD) or browser-mic streaming over WebSockets (/ws/chunks).',
      'Single source of truth form schema (backend/form_schema.py) governing 181 unique clinical fields (205 declarations across 30 sections) served dynamically via /api/schema.',
      'Deterministic MergeEngine with clinician confirmation locks so nurse-verified fields are never overwritten by subsequent AI chunks.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Audio Capture & Silero VAD Framing',
        detail: 'Browser mic or Python capture-agent records 16kHz audio, denoises, detects speech via Silero VAD, and streams PCM chunks to /ws/chunks.',
      },
      {
        step: '02',
        title: 'ASR Provider Chain & Quality Gates',
        detail: 'FastAPI orchestrator runs Groq Whisper-large-v3 (with optional Sarvam/Bhashini fallback) filtered by RMS, no-speech, and logprob gates.',
      },
      {
        step: '03',
        title: 'Zero-Cost Live Fill & MergeEngine',
        detail: 'Local bilingual regex/NLP extractor fills case-sheet fields on every chunk; MergeEngine applies latest-wins while locking nurse-confirmed fields.',
      },
      {
        step: '04',
        title: 'Single Gemini Finalize & Persistence',
        detail: 'On encounter completion, one Gemini 2.5 Flash pass resolves nuanced clinical context, runs validation rules, and persists idempotently via SQLAlchemy.',
      },
    ],
    securityAndQuality: [
      'Clinician-in-the-loop safety: nurse confirmation locks protect verified vitals and risk flags from automated overwrite.',
      'Idempotent encounter persistence via SQLAlchemy with Docker Compose deployment (Postgres + FastAPI + Nginx web) and Windows PHC installer.',
      'Dedicated live QA harness (test_qa_live.py) exercising a 45-second two-voice Hindi Q&A encounter end-to-end plus 3/3 REST/WS integration tests.',
      'Documented security audit (SECURITY_FINDINGS_REPORT.md) and production runbooks for offline/low-quota clinic deployments.',
    ],
    qualityGates: [
      { label: 'Case Sheet Coverage', value: '181 Fields · 30 Official Sections' },
      { label: 'LLM Cost Optimization', value: '0 Live Calls · 1 Finalize Call' },
      { label: 'Transport Protocol', value: 'FastAPI Dual WebSockets' },
      { label: 'ASR Pipeline', value: 'Silero VAD + Whisper-large-v3' },
    ],
    stack: ['FastAPI', 'Python 3.14', 'WebSockets', 'Whisper-large-v3', 'Gemini 2.5 Flash', 'Silero VAD', 'React 19', 'Vite 6', 'SQLAlchemy'],
    stackGroups: [
      { layer: 'AI & Speech', items: ['Groq Whisper-large-v3', 'Gemini 2.5 Flash', 'Silero VAD', 'Local Bilingual Field Filler'] },
      { layer: 'Backend & Transport', items: ['FastAPI', 'WebSockets (/ws/chunks, /ws/dashboard)', 'SQLAlchemy', 'PostgreSQL / SQLite'] },
      { layer: 'Frontend', items: ['React 19', 'Vite 6', 'Tailwind CSS', 'Browser Mic Hook (useBrowserMic)'] },
      { layer: 'Deployment & QA', items: ['Docker Compose (PG + FastAPI + Nginx)', 'Windows Laptop Installer', 'REST/WS Integration Tests'] },
    ],
    docs: [
      {
        title: 'System Architecture & Sequence Diagrams',
        path: 'docs/ARCHITECTURE.md',
        url: 'https://github.com/adityapandey2002/AUTOMATIC_DATA_GENERATION/blob/main/docs/ARCHITECTURE.md',
        summary: 'Layered architecture, live vs finalize pipeline trade-offs, WS protocol, and 181-field schema.',
      },
      {
        title: 'Production Documentation Report',
        path: 'docs/PRODUCTION_DOCUMENTATION.md',
        url: 'https://github.com/adityapandey2002/AUTOMATIC_DATA_GENERATION/blob/main/docs/PRODUCTION_DOCUMENTATION.md',
        summary: 'Dual-agent architecture & QA audit, deployment topology, and operational checklists.',
      },
      {
        title: 'Project README & Quickstart',
        path: 'README.md',
        url: 'https://github.com/adityapandey2002/AUTOMATIC_DATA_GENERATION/blob/main/README.md',
        summary: 'Component layout, local run commands, environment config, and live two-voice Hindi QA demo.',
      },
    ],
    askPrompt: 'How does the Ambient Clinical AI Scribe transcribe Hindi consultations and fill 181 maternity case-sheet fields with minimal LLM cost?',
  },
  {
    slug: 'india-dashboard',
    rank: '05',
    tier: 'flagship',
    category: 'data-ml',
    categoryLabel: 'Macro Data & RAG Analytics',
    audience: ['tech', 'health'],
    title: 'India in the World — Global Progress Dashboard',
    nativeTitle: 'डेटा इंजन भारत',
    subtitle: '252,170+ Global Indicators Across 217 Countries with D3 Maps & Grounded AI Q&A',
    tagline: 'Full-stack global benchmarking platform uniting 35 international data sources with 97% fewer DB round-trips and local TF-IDF RAG.',
    summary:
      'Production macro-analytics dashboard tracking India’s global standing across 124 registered indicators (118 active, 252,170+ data points, 217 countries from 1950–2026) spanning health, economy, education, environment, governance, and digital infrastructure — complete with interactive D3 choropleths and a zero-cost TF-IDF + Groq RAG assistant.',
    problemSolved:
      'Journalists, policymakers, and citizens lacked a single open platform aggregating India’s international rankings across World Bank, WHO, UNDP, OWID, and 30+ sources with consistent history and natural-language exploration.',
    operationalImpact:
      'Live at india-dashboard-delta.vercel.app; automates multi-format ingestion (JSON, CSV, XLSX, WGI ZIP, HTML) into a single indicator registry, cutting country-page queries from ~220 calls down to 6 batched round-trips.',
    deploymentLabel: 'Live Analytics · Vercel',
    domain: 'india-dashboard-delta.vercel.app',
    liveUrl: 'https://india-dashboard-delta.vercel.app/',
    isLivePublic: true,
    githubUrl: 'https://github.com/adityapandey2002/India-dashboard',
    repoName: 'adityapandey2002/India-dashboard',
    previewImage: '/work/preview-india-data-engine.png',
    secondaryImages: [
      { src: '/work/india-data-engine.png', caption: 'Indicator explorer & comparative analytics view' },
    ],
    accentClass: 'bg-primary dark:bg-white',
    metrics: [
      { value: '252k+', label: 'Data Points', context: '217 countries · 1950–2026' },
      { value: '118/124', label: 'Live Indicators', context: '35 global sources (WHO, WB, UNDP)' },
      { value: '97%', label: 'Fewer DB Trips', context: '~220 queries batched into 6' },
      { value: '~100x', label: 'Faster Writes', context: '500-row chunked bulkInsert' },
    ],
    recruiterHighlights: [
      'Auto-detecting dual database abstraction (node:sqlite locally / pg + Drizzle ORM in Postgres production) running identical application code.',
      'Performance engineered: reduced country detail page from ~220 per-indicator calls to 6 batched queries (97% round-trip cut) and chunked bulkInsert (~100x faster writes).',
      'Built-in RAG Q&A powered by memoized local TF-IDF vector search (invalidated via COUNT/MAX fingerprint) + Groq LLM with zero paid vector DB.',
      'Interactive D3-geo + world-atlas TopoJSON choropleth map with historical milestone markers, Recharts trend/scatter/radar charts, and Pearson correlation engine.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Multi-Format Automated ETL',
        detail: 'Node/tsx ingestion scripts parse World Bank, WHO, UNDP, OWID, WGI ZIP, CSV, and XLSX feeds with Zod validation and idempotent upserts.',
      },
      {
        step: '02',
        title: 'Single Registry & Dual SQL Driver',
        detail: 'Central indicator registry drives both ETL and UI over an auto-detecting SQLite/PostgreSQL layer with 500-row batched bulkInsert.',
      },
      {
        step: '03',
        title: 'Server-First Batched Analytics',
        detail: 'Next.js 16 App Router Server Components fetch latest global rankings in 6 batched queries instead of ~220 sequential calls.',
      },
      {
        step: '04',
        title: 'D3 Spatial Maps & Local TF-IDF RAG',
        detail: 'Renders TopoJSON world choropleths alongside a memoized top-32 IDF vector retriever grounded into Groq LLM responses.',
      },
    ],
    securityAndQuality: [
      'Strict TypeScript 5 across app, lib, and ETL scripts with Zod schema validation on external data ingestion.',
      'In-memory rate limiting on AI Q&A endpoints and 500-character query clamping to prevent abuse.',
      'Automated unit (Vitest) and Playwright E2E test suites verifying routes, charts, and API contracts.',
      'OpenAPI specification (docs/openapi.yaml) and 20-document engineering handbook in docs/.',
    ],
    qualityGates: [
      { label: 'Query Optimization', value: '97% Round-Trip Reduction (220→6)' },
      { label: 'Data Coverage', value: '252,170 Points · 118 Indicators' },
      { label: 'AI Retrieval', value: 'Memoized TF-IDF + Groq LLM' },
      { label: 'Documentation', value: '20 Docs + OpenAPI Spec' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript 5', 'Drizzle ORM', 'PostgreSQL', 'SQLite', 'D3.js', 'Recharts', 'Groq LLM', 'Tailwind v4'],
    stackGroups: [
      { layer: 'Frontend & Viz', items: ['Next.js 16.2 App Router', 'React 19', 'D3-geo + world-atlas TopoJSON', 'Recharts 3.10', 'shadcn/ui'] },
      { layer: 'Data & Storage', items: ['PostgreSQL (pg)', 'node:sqlite', 'Drizzle ORM', 'PapaParse / XLSX / adm-zip'] },
      { layer: 'AI & Search', items: ['Local Memoized TF-IDF Search', 'Groq SDK LLM', 'HuggingFace Embeddings (Optional)'] },
      { layer: 'Testing & Spec', items: ['Vitest', 'Playwright E2E', 'Zod Validation', 'OpenAPI 3 Spec'] },
    ],
    docs: [
      {
        title: 'Project Overview',
        path: 'docs/01-project-overview.md',
        url: 'https://github.com/adityapandey2002/India-dashboard/blob/master/docs/01-project-overview.md',
        summary: 'Indicator registry scope, 35 global sources, and free-first architecture philosophy.',
      },
      {
        title: 'Performance & Scalability',
        path: 'docs/19-performance-and-scalability.md',
        url: 'https://github.com/adityapandey2002/India-dashboard/blob/master/docs/19-performance-and-scalability.md',
        summary: 'Batched round-trip optimization, 500-row bulkInsert, and TF-IDF memoization.',
      },
      {
        title: 'System Architecture',
        path: 'docs/04-system-architecture.md',
        url: 'https://github.com/adityapandey2002/India-dashboard/blob/master/docs/04-system-architecture.md',
        summary: 'Dual DB driver, server-component rendering, and RAG chat data flow.',
      },
      {
        title: 'OpenAPI Contract',
        path: 'docs/openapi.yaml',
        url: 'https://github.com/adityapandey2002/India-dashboard/blob/master/docs/openapi.yaml',
        summary: 'Complete REST API schema for indicators, rankings, comparisons, and AI endpoints.',
      },
    ],
    featuredOnHome: true,
    askPrompt: 'How did Aditya optimize the India Development Data Dashboard database queries and build its TF-IDF RAG assistant?',
  },
  {
    slug: 'vhsnd-pipeline',
    rank: '06',
    tier: 'flagship',
    category: 'health-ai',
    categoryLabel: 'Offline Survey Pipeline',
    audience: ['tech', 'health'],
    title: 'VHSND & PMSMA Survey Cleaning Pipeline',
    subtitle: 'Zero-Server Browser Pipeline for 253-Column District Health Survey Adjudication',
    tagline: 'Pure static Next.js 16 app: drop ODK/Excel → catch 37 cross-field contradictions → adjudicate → export signed PPTX/DOCX.',
    summary:
      'Browser-only, offline-first data-cleaning and executive reporting pipeline built for Village Health, Sanitation & Nutrition Day (VHSND) district surveys. Runs entirely on-device with AES-256-GCM IndexedDB encryption, Web Workers, 37 cross-field contradiction rules, 21 indicators, SHA-256 audit manifests, and 212 passing Vitest tests.',
    problemSolved:
      'District health analysts spent days manually cleaning messy 253-column ODK/Excel exports before Monday review meetings, risking patient privacy on external servers and losing audit trails of manual corrections.',
    operationalImpact:
      'Turns raw field exports into audited PPTX slide decks, DOCX summaries, cleaned CSVs, and cryptographically signed JSON manifests in minutes — completely offline with a CSP build gate proving zero outbound requests.',
    deploymentLabel: 'Static Offline Export · 0 Backend Services',
    domain: 'github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA',
    liveUrl: null,
    isLivePublic: false,
    githubUrl: 'https://github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA',
    repoName: 'adityapandey2002/PIPELINE-FOR-VHSND-PMSMA',
    previewImage: '/work/preview-vhsnd-pipeline.png',
    accentClass: 'bg-accent-yellow dark:bg-[#facc15]',
    metrics: [
      { value: '253', label: 'Survey Columns', context: '129 schema fields · 14 groups' },
      { value: '37', label: 'Validation Rules', context: '24 contradiction codes' },
      { value: '212', label: 'Vitest Tests', context: '19 test suites passing' },
      { value: '0', label: 'Outbound Calls', context: 'CSP + build-gate enforced' },
    ],
    recruiterHighlights: [
      'Pure static Next.js 16.3.6 (output: "export") + React 19.2.8 client architecture — zero server, zero data egress, vendored SheetJS for reproducible offline builds.',
      '3-pass validation engine running inside module Web Workers (120s timeout + pure-function inline fallback) across 253 columns and 37 cross-field rules.',
      'Mandatory human-in-the-loop adjudication gate: reviewers must keep, drop, or override every flagged error with written justification before reporting unlocks.',
      'AES-256-GCM encryption at rest in IndexedDB + SHA-256 manifest fingerprint binding cleaned rows to exported PPTX, DOCX, CSV, and JSON reports.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: '/ingest — Local Parse & Orientation Detection',
        detail: 'Parses .xlsx, .xls, .ods, and .csv in Web Workers, flips transposed layouts, and maps headers against the 253-column VHSND registry.',
      },
      {
        step: '02',
        title: '/review — 3-Pass Contradiction & Adjudication',
        detail: 'Flags field coercion, select-multiple coherence, and 37 cross-field rules; blocks downstream export until every error is adjudicated with justification.',
      },
      {
        step: '03',
        title: '/viz — 21 Indicators & 21 Comparisons',
        detail: 'Generates 14 chart kinds across block/facility indicators with partial-comparison gates and high-res PNG capture for decks.',
      },
      {
        step: '04',
        title: '/report — Cryptographic Multi-Format Export',
        detail: 'Exports ready-to-present PPTX, DOCX, cleaned CSV, and audit JSON bound to a SHA-256 canonical manifest.',
      },
    ],
    securityAndQuality: [
      'Content-Security-Policy + automated build gate (scripts/check-offline.mjs) enforce zero outbound network requests.',
      'All survey datasets, corrections, charts, and drafts are encrypted at rest with AES-256-GCM in browser IndexedDB.',
      '212 Vitest tests passing across 19 files covering parser, schema rules, crypto, indicators, and export generators.',
      'Strict layered architecture: routes → stores → pure domain functions → contracts & encrypted persistence.',
    ],
    qualityGates: [
      { label: 'Unit & Pipeline Tests', value: '212 Tests Passing (19 Files)' },
      { label: 'Data Privacy', value: 'AES-256-GCM + Zero Egress CSP' },
      { label: 'Report Integrity', value: 'SHA-256 Canonical Manifest' },
      { label: 'Schema Depth', value: '253 Columns · 37 Rules · 21 KPIs' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Web Workers', 'AES-256-GCM', 'IndexedDB', 'SheetJS', 'PPTX / DOCX Export', 'Vitest'],
    stackGroups: [
      { layer: 'Core Framework', items: ['Next.js 16.3.6 (Static Export)', 'React 19.2.8', 'React Compiler', 'TypeScript Strict'] },
      { layer: 'Processing & Security', items: ['Module Web Workers', 'Web Crypto AES-256-GCM', 'SHA-256 Manifests', 'IndexedDB'] },
      { layer: 'Data & Exports', items: ['Vendored SheetJS', 'PPTX Generator', 'DOCX Generator', '14 Chart Kinds'] },
      { layer: 'Quality Gates', items: ['212 Vitest Tests (19 Files)', 'check-offline.mjs Build Gate', 'Strict CSP Header'] },
    ],
    docs: [
      {
        title: 'Pipeline Codemap & Reference',
        path: 'docs/PIPELINE.md',
        url: 'https://github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA/blob/main/docs/PIPELINE.md',
        summary: 'Line-cited reference for /ingest, /review, /viz, and /report stages.',
      },
      {
        title: '253-Column Data Model',
        path: 'docs/DATA-MODEL.md',
        url: 'https://github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA/blob/main/docs/DATA-MODEL.md',
        summary: 'Registry fields, 37 contradiction rules, 21 indicators, and extension recipes.',
      },
      {
        title: 'Project Overview',
        path: 'docs/01-project-overview.md',
        url: 'https://github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA/blob/main/docs/01-project-overview.md',
        summary: 'Offline-first governance rationale and zero-egress browser security model.',
      },
      {
        title: 'Testing & Quality Gates',
        path: 'docs/13-testing-and-quality.md',
        url: 'https://github.com/adityapandey2002/PIPELINE-FOR-VHSND-PMSMA/blob/main/docs/13-testing-and-quality.md',
        summary: '212 Vitest test coverage across domain logic, encryption, and exports.',
      },
    ],
    askPrompt: 'Explain how the offline VHSND & PMSMA pipeline validates 253 survey columns and guarantees zero data upload.',
  },
  {
    slug: 'consultancywala',
    rank: '07',
    tier: 'flagship',
    category: 'commerce',
    categoryLabel: 'Growth Agency Platform',
    audience: ['tech'],
    title: 'Consultancy Wala — E-Commerce Growth Platform',
    subtitle: 'Next.js 16 Server-Component Agency Platform & Lead Pipeline (50+ Brands, ₹40Cr+ GMV)',
    tagline: 'Founder-led marketplace growth platform built on Next.js 16.3, React 19, Tailwind v4, Resend Server Actions, and dynamic OG SEO.',
    summary:
      'Production web platform for Consultancy Wala, a founder-led Patna e-commerce growth agency managing marketplace strategy, PPC, cataloging, and operations across Amazon, Flipkart, Meesho, JioMart, and Nykaa (50+ brands scaled, ₹40Cr+ GMV handled). Built with Server Components by default, a typed Resend lead-capture Server Action, Framer Motion 13, and Vitest.',
    problemSolved:
      'Growing Indian D2C sellers needed clear visibility into marketplace onboarding, A+ cataloging, PPC ROI, and FBA/FBM logistics with a fast, high-converting audit request funnel.',
    operationalImpact:
      'Live at consultancywala.com; drives inbound discovery calls through a validated Resend Server Action and WhatsApp deep links with a 24-hour response SLA and full Open Graph + JSON-LD search visibility.',
    deploymentLabel: 'Live Production · consultancywala.com',
    domain: 'www.consultancywala.com',
    liveUrl: 'https://www.consultancywala.com/',
    isLivePublic: true,
    githubUrl: 'https://github.com/adityapandey2002/CW',
    repoName: 'adityapandey2002/CW',
    previewImage: '/work/preview-consultancywala.png',
    accentClass: 'bg-accent-blue',
    metrics: [
      { value: '50+', label: 'Brands Scaled', context: 'Across 10+ marketplaces' },
      { value: '₹40Cr+', label: 'GMV Handled', context: 'Amazon · Flipkart · Meesho' },
      { value: '500+', label: 'Listings Tuned', context: 'A+ cataloging & PPC' },
      { value: 'Next 16', label: 'RSC Architecture', context: 'Zero separate backend server' },
    ],
    recruiterHighlights: [
      'Server-Components-first Next.js 16.3.5 + React 19.2.8 architecture minimizing client JavaScript while preserving fluid Framer Motion 13 transitions.',
      'Zero separate backend: validated lead-capture Server Action backed by Resend API + WhatsApp deep-link conversion funnel.',
      'Full technical SEO implementation: dynamic next/og social cards, structured JSON-LD schema, and strict TypeScript 5 contracts.',
      'Backed by a 20-file technical documentation suite in docs/ and Vitest automated test configuration.',
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Server-Rendered Service Architecture',
        detail: 'Next.js 16 App Router renders typed ServiceGroup modules with zero unnecessary client hydration.',
      },
      {
        step: '02',
        title: 'Validated Server Action Lead Pipeline',
        detail: 'Contact form validates ContactPayload server-side and dispatches instant notifications via Resend v4.',
      },
      {
        step: '03',
        title: 'Dynamic SEO & Open Graph Engine',
        detail: 'Generates social preview cards via next/og alongside structured JSON-LD metadata for marketplace search intent.',
      },
      {
        step: '04',
        title: 'Omnichannel Conversion Handoff',
        detail: 'Pairs structured audit requests with direct WhatsApp strategy call deep links for <24h founder response.',
      },
    ],
    securityAndQuality: [
      'Strict TypeScript 5 compilation enforced at build time (npm run build fails on any type mismatch).',
      'Server-side input validation inside Next.js Server Actions with clean error-state contracts (ContactFormState).',
      'Tailwind CSS v4 token architecture with ESLint 9 and Vitest 3.2 test runner configured.',
      'Complete 20-document engineering reference inside docs/ covering architecture, workflows, security, and deployment.',
    ],
    qualityGates: [
      { label: 'Framework Stack', value: 'Next.js 16.3 + React 19.2 + TW v4' },
      { label: 'Backend Footprint', value: 'Server Action + Resend v4' },
      { label: 'Type Safety', value: 'TypeScript 5 Strict Mode' },
      { label: 'Business Proof', value: '50+ Brands · ₹40Cr+ GMV' },
    ],
    stack: ['Next.js 16.3', 'React 19', 'TypeScript 5', 'Tailwind CSS v4', 'Framer Motion 13', 'Resend', 'next/og', 'Vitest'],
    stackGroups: [
      { layer: 'Frontend', items: ['Next.js 16.3.5 App Router', 'React 19.2.8', 'Tailwind CSS v4', 'Framer Motion 13', 'Lucide Icons'] },
      { layer: 'Server & Email', items: ['Next.js Server Actions', 'Resend v4 API', 'WhatsApp Deep Links'] },
      { layer: 'SEO & Quality', items: ['Dynamic next/og', 'JSON-LD Schema', 'TypeScript 5 Strict', 'Vitest 3.2', 'ESLint 9'] },
    ],
    docs: [
      {
        title: 'Project Overview',
        path: 'docs/01-project-overview.md',
        url: 'https://github.com/adityapandey2002/CW/blob/main/docs/01-project-overview.md',
        summary: 'Business positioning, audience, Server Component rendering model, and lead capture scope.',
      },
      {
        title: 'Technology Stack Audit',
        path: 'docs/02-technology-stack.md',
        url: 'https://github.com/adityapandey2002/CW/blob/main/docs/02-technology-stack.md',
        summary: 'Exact pinned dependency matrix and rationale across Next.js 16, React 19, and Tailwind v4.',
      },
      {
        title: 'System Architecture',
        path: 'docs/04-system-architecture.md',
        url: 'https://github.com/adityapandey2002/CW/blob/main/docs/04-system-architecture.md',
        summary: 'Route structure, Server Action email pipeline, and deployment topology.',
      },
    ],
    askPrompt: 'Tell me about the Consultancy Wala platform architecture and the e-commerce growth results behind it.',
  },
  {
    slug: 'spacex-recovery-ml',
    rank: '08',
    tier: 'specialized',
    category: 'data-ml',
    categoryLabel: 'Machine Learning Capstone',
    audience: ['tech'],
    title: 'SpaceX Falcon 9 First-Stage Recovery ML',
    subtitle: 'IBM Data Science Professional Certificate Capstone — End-to-End Predictive Pipeline',
    tagline: 'REST API + Wikipedia telemetry collection, SQLite EDA, Folium geospatial maps, Plotly Dash app, and 4 benchmarked classifiers.',
    summary:
      'End-to-end data science capstone predicting whether SpaceX Falcon 9 first-stage boosters will land successfully. Combines SpaceX REST API ingestion, BeautifulSoup Wikipedia scraping, SQLite exploratory SQL analysis, interactive Folium launch-site mapping, a Plotly Dash dashboard, and cross-validated Scikit-Learn classification.',
    problemSolved:
      'Estimating booster reusability determines launch cost competitiveness; required uniting unstructured mission tables with API telemetry into a clean supervised learning pipeline.',
    operationalImpact:
      'Achieved 83.3% cross-validated classification accuracy across Logistic Regression, SVM, Decision Tree, and KNN models, packaged with an interactive Plotly Dash visual explorer.',
    deploymentLabel: 'IBM Data Science Capstone · Jupyter + Dash',
    domain: 'github.com/adityapandey2002/APPLIED_DATA_SCIENCE_CAPSTONE',
    liveUrl: null,
    isLivePublic: false,
    githubUrl: 'https://github.com/adityapandey2002/APPLIED_DATA_SCIENCE_CAPSTONE',
    repoName: 'adityapandey2002/APPLIED_DATA_SCIENCE_CAPSTONE',
    previewImage: '/work/spacex-ml-preview.jpg',
    accentClass: 'bg-primary dark:bg-[#facc15]',
    metrics: [
      { value: '83.3%', label: 'Test Accuracy', context: 'Cross-validated classifiers' },
      { value: '4 Models', label: 'ML Benchmark', context: 'LogReg · SVM · Tree · KNN' },
      { value: '100+', label: 'Launches ETL', context: 'SpaceX API + Wiki scraping' },
    ],
    recruiterHighlights: [
      'Complete data science lifecycle: REST API ingestion, BeautifulSoup web scraping, missing-value imputation, and one-hot feature engineering.',
      'SQL exploratory analysis on SQLite paired with Folium geospatial launch-pad proximity maps and Plotly Dash interactive filtering.',
      'GridSearchCV hyperparameter tuning comparing Logistic Regression, Support Vector Machine, Decision Tree, and K-Nearest Neighbors.',
    ],
    architectureSteps: [
      { step: '01', title: 'API & Web Scraping ETL', detail: 'Collects Falcon 9 mission records from SpaceX REST API and Wikipedia tables into clean CSV datasets.' },
      { step: '02', title: 'Wrangling & SQLite EDA', detail: 'Standardizes landing outcomes into binary classes and executes exploratory SQL queries over mission payloads and orbits.' },
      { step: '03', title: 'Geospatial & Interactive Viz', detail: 'Maps launch sites with Folium proximity markers and deploys an interactive Plotly Dash payload/site dashboard.' },
      { step: '04', title: 'Supervised Model Benchmarking', detail: 'Tunes Logistic Regression, SVM, Decision Tree, and KNN via GridSearchCV and evaluates confusion matrices.' },
    ],
    securityAndQuality: [
      'Reproducible Jupyter notebooks separated by lifecycle stage (API collection, scraping, wrangling, SQL EDA, Folium, ML).',
      'Standardized feature scaling inside Scikit-Learn pipelines to prevent train/test data leakage.',
    ],
    qualityGates: [
      { label: 'Best Test Accuracy', value: '83.3% Cross-Validated' },
      { label: 'Interactive App', value: 'spacex_dash_app.py (Plotly Dash)' },
      { label: 'Certification', value: 'IBM Data Science Professional' },
    ],
    stack: ['Python', 'Pandas', 'Scikit-Learn', 'SQLite', 'Plotly Dash', 'Folium', 'BeautifulSoup'],
    stackGroups: [
      { layer: 'Data & ETL', items: ['Python', 'SpaceX REST API', 'BeautifulSoup', 'Pandas', 'SQLite'] },
      { layer: 'ML & Visualization', items: ['Scikit-Learn (GridSearchCV)', 'Plotly Dash', 'Folium Maps', 'Matplotlib / Seaborn'] },
    ],
    docs: [
      {
        title: 'Capstone Repository & Notebooks',
        path: 'APPLIED_DATA_SCIENCE_CAPSTONE',
        url: 'https://github.com/adityapandey2002/APPLIED_DATA_SCIENCE_CAPSTONE',
        summary: 'All 6 Jupyter notebooks, dataset CSV, and spacex_dash_app.py dashboard.',
      },
      {
        title: 'Interactive Dash Dashboard',
        path: 'spacex_dash_app.py',
        url: 'https://github.com/adityapandey2002/APPLIED_DATA_SCIENCE_CAPSTONE/blob/main/spacex_dash_app.py',
        summary: 'Interactive Plotly Dash app filtering launch success by site and payload mass.',
      },
    ],
    askPrompt: 'Summarize Aditya’s SpaceX Falcon 9 launch recovery machine learning capstone.',
  },
  {
    slug: 'prodigy-fullstack-suites',
    rank: '09',
    tier: 'specialized',
    category: 'specialized',
    categoryLabel: 'Real-Time Full-Stack',
    audience: ['tech'],
    title: 'Prodigy InfoTech Full-Stack & Real-Time Suites',
    subtitle: 'Social Networking, RBAC Employee Management & Storefront MERN Applications',
    tagline: 'Series of production-patterned MERN applications featuring real-time rooms, JWT authentication, and structured CRUD APIs.',
    summary:
      'Collection of full-stack web engineering builds completed during the Prodigy InfoTech internship (PRODIGY_FS_02, PRODIGY_FS_03, PRODIGY_FS_05), covering a real-time social platform, role-based employee management CRUD system, and commerce workflows built on Node.js, Express, React, and MongoDB.',
    problemSolved:
      'Demonstrates clean separation of REST APIs, real-time client state updates, secure JWT session flows, and modular React frontend architecture across three distinct business domains.',
    operationalImpact:
      'Shipped three self-contained repositories establishing foundational MERN patterns that later powered BiharKaSwaad and public-health platforms.',
    deploymentLabel: 'Open-Source Archive · 3 Repositories',
    domain: 'github.com/adityapandey2002/PRODIGY_FS_05',
    liveUrl: null,
    isLivePublic: false,
    githubUrl: 'https://github.com/adityapandey2002/PRODIGY_FS_05',
    repoName: 'adityapandey2002/PRODIGY_FS_05',
    previewImage: '/work/biharkaswaad-design.png',
    accentClass: 'bg-tertiary',
    metrics: [
      { value: '3 Repos', label: 'Full-Stack Builds', context: 'FS_02 · FS_03 · FS_05' },
      { value: 'MERN', label: 'Core Runtime', context: 'MongoDB · Express · React · Node' },
      { value: 'JWT', label: 'Auth Lifecycle', context: 'Protected routes & RBAC' },
    ],
    recruiterHighlights: [
      'PRODIGY_FS_05: Full-stack social media application with user profiles, interactive feed posts, likes/comments, and real-time updates.',
      'PRODIGY_FS_02 & FS_03: Protected employee management CRUD dashboard and e-commerce storefront patterns with JWT auth.',
      'Clean REST controller/model separation ready for containerized Docker deployment.',
    ],
    architectureSteps: [
      { step: '01', title: 'React SPA & State Management', detail: 'Modular React components handling optimistic feed updates, forms, and protected auth views.' },
      { step: '02', title: 'Express REST & JWT Middleware', detail: 'Stateless JWT authentication middleware guarding CRUD endpoints and user mutations.' },
      { step: '03', title: 'MongoDB Persistence Layer', detail: 'Indexed Mongoose schemas modeling users, social posts, comments, and organizational records.' },
    ],
    securityAndQuality: [
      'Password hashing with bcrypt and token-guarded write endpoints.',
      'Input validation and normalized error responses across REST routes.',
    ],
    qualityGates: [
      { label: 'Repositories', value: 'PRODIGY_FS_05 · FS_03 · FS_02' },
      { label: 'Auth Pattern', value: 'Stateless JWT + Protected Routes' },
      { label: 'Stack', value: 'MongoDB · Express · React · Node' },
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'JWT Auth', 'Docker'],
    stackGroups: [
      { layer: 'Frontend', items: ['React', 'Responsive CSS / Tailwind', 'Protected Routing'] },
      { layer: 'Backend & DB', items: ['Node.js', 'Express REST', 'MongoDB / Mongoose', 'JWT + bcrypt'] },
    ],
    docs: [
      {
        title: 'Social Media Platform (PRODIGY_FS_05)',
        path: 'PRODIGY_FS_05',
        url: 'https://github.com/adityapandey2002/PRODIGY_FS_05',
        summary: 'Full-stack social networking application source code.',
      },
      {
        title: 'Storefront Suite (PRODIGY_FS_03)',
        path: 'PRODIGY_FS_03',
        url: 'https://github.com/adityapandey2002/PRODIGY_FS_03',
        summary: 'E-commerce product catalog and cart application.',
      },
      {
        title: 'Employee CRUD System (PRODIGY_FS_02)',
        path: 'PRODIGY_FS_02',
        url: 'https://github.com/adityapandey2002/PRODIGY_FS_02',
        summary: 'Role-protected employee management system.',
      },
    ],
    askPrompt: 'What did Aditya build across his Prodigy InfoTech full-stack projects?',
  },
  {
    slug: 'auroville-minvayu-hardware',
    rank: '10',
    tier: 'specialized',
    category: 'specialized',
    categoryLabel: 'Embedded Hardware Lab',
    audience: ['tech', 'health'],
    title: 'Auroville FabLab & MinVayu Hardware Telemetry',
    subtitle: 'Open-Source Small-Scale Wind Turbine Sensing & Rapid Additive Prototyping',
    tagline: 'Hands-on microcontroller sensor telemetry, CAD prototyping, and off-grid wind turbine instrumentation at Auroville FabLab.',
    summary:
      'Physical computing and open-hardware engineering residency at Auroville’s FabLab and MinVayu wind-energy collective. Engineered microcontroller sensor interfaces for small-scale wind turbine RPM and output power monitoring alongside CAD and large-format 3D printing workflows for sustainable off-grid infrastructure.',
    problemSolved:
      'Community-built off-grid wind turbines required low-cost, open-source instrumentation to measure rotational speed and power curves in real field conditions.',
    operationalImpact:
      'Combined embedded C++/AVR sensor telemetry with physical CAD fabrication, grounding Aditya’s software work in real-world hardware constraints.',
    deploymentLabel: 'Physical Systems Lab · Auroville, Tamil Nadu',
    domain: 'Auroville FabLab · MinVayu',
    liveUrl: null,
    isLivePublic: false,
    githubUrl: 'https://github.com/adityapandey2002',
    repoName: 'Auroville FabLab Residency',
    previewImage: '/work/auroville-hardware-preview.jpg',
    accentClass: 'bg-secondary',
    metrics: [
      { value: 'AVR/C++', label: 'Embedded Firmware', context: 'RPM & power sensor I/O' },
      { value: 'MinVayu', label: 'Open Wind Energy', context: 'Small-scale turbine testing' },
      { value: 'FabLab', label: 'Rapid Prototyping', context: 'CAD + additive manufacturing' },
    ],
    recruiterHighlights: [
      'Microcontroller sensor interfacing (C++ / AVR) for real-time wind turbine RPM polling and electrical output telemetry.',
      'Hands-on CAD modeling and rapid additive manufacturing for open-source sustainable off-grid infrastructure.',
      'Cross-disciplinary systems thinking bridging physical sensors, field durability, and software analytics.',
    ],
    architectureSteps: [
      { step: '01', title: 'Turbine Sensor Interfacing', detail: 'Hall-effect / optical RPM polling and voltage/current sensing wired to AVR microcontrollers.' },
      { step: '02', title: 'C++ Firmware & Telemetry Logging', detail: 'Deterministic polling loops capturing rotor performance curves under variable coastal wind loads.' },
      { step: '03', title: 'CAD & Rapid Fabrication', detail: 'Iterative aerodynamic and housing components modeled in CAD and fabricated at Auroville FabLab.' },
    ],
    securityAndQuality: [
      'Hardware-tested sensor calibration against bench multimeters and oscilloscopes.',
      'Open-hardware documentation aligned with Auroville FabLab reproducibility principles.',
    ],
    qualityGates: [
      { label: 'Hardware Lab', value: 'Auroville FabLab / MinVayu' },
      { label: 'Firmware', value: 'C++ / AVR Sensor Polling' },
      { label: 'Fabrication', value: 'CAD + Additive Prototyping' },
    ],
    stack: ['C++ / AVR', 'Microcontrollers', 'Sensor I/O', 'CAD Modeling', '3D Printing', 'Open Hardware'],
    stackGroups: [
      { layer: 'Embedded & Sensing', items: ['C++ / AVR Microcontrollers', 'Analog & Digital Sensor I/O', 'RPM & Power Telemetry'] },
      { layer: 'Physical Fabrication', items: ['CAD Modeling', 'Rapid Additive Manufacturing', 'MinVayu Wind Turbine Testing'] },
    ],
    docs: [
      {
        title: 'GitHub Engineering Profile',
        path: 'adityapandey2002',
        url: 'https://github.com/adityapandey2002',
        summary: 'Explore Aditya Pandey’s full public repositories and software-hardware projects.',
      },
    ],
    askPrompt: 'What hardware and wind turbine telemetry work did Aditya do at Auroville FabLab?',
  },
];

export const RECRUITER_WORK_KPIS = [
  {
    kicker: '01 · Production Systems',
    value: '7+3',
    headline: '7 Flagships + 3 Specialized',
    detail: 'Across public health, clinical AI, macro data, and live D2C commerce.',
    accent: 'default' as const,
  },
  {
    kicker: '02 · Public Health Reach',
    value: '700+',
    headline: 'ASHAs · 154 Sub-Centres · 16 Blocks',
    detail: 'Field-tested in rural Bihar with 0% offline data loss via IndexedDB & AES-256.',
    accent: 'yellow' as const,
  },
  {
    kicker: '03 · Data & Clinical AI',
    value: '252k+',
    headline: 'Indicators + 181-Field AI Scribe',
    detail: '97% fewer DB round-trips & real-time Hindi/English clinical voice-to-form AI.',
    accent: 'blue' as const,
  },
  {
    kicker: '04 · Engineering Rigor',
    value: '327+',
    headline: 'Automated Tests Passing',
    detail: '212 Vitest + 86 NestJS + 29 Playwright E2E + HMAC SHA-256 zero-tamper checkout.',
    accent: 'red' as const,
  },
];
