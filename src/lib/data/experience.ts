export type ExperienceTrack = 'all' | 'health' | 'engineering';

export interface ExperienceHighlight {
  lead: string;
  detail: string;
}

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Experience {
  id: string;
  index: string;
  role: string;
  org: string;
  location: string;
  period: string;
  current: boolean;
  featured?: boolean;
  track: Exclude<ExperienceTrack, 'all'>;
  trackLabel: string;
  accentClass: string;
  summary: string;
  highlights: ExperienceHighlight[];
  metrics?: ExperienceMetric[];
  skills: string[];
  links: ExperienceLink[];
}

export const EXPERIENCE_TRACKS: { id: ExperienceTrack; label: string }[] = [
  { id: 'all', label: 'All Roles' },
  { id: 'health', label: 'Public Health' },
  { id: 'engineering', label: 'Engineering' },
];

export const experience: Experience[] = [
  {
    id: 'gandhi-fellowship',
    index: '01',
    role: 'Gandhi Fellow — Health System Strengthening',
    org: 'Piramal Foundation',
    location: 'Muzaffarpur & Araria, Bihar',
    period: 'Jul 2025 – Present',
    current: true,
    featured: true,
    track: 'health',
    trackLabel: 'Public Health & Field Systems',
    accentClass: 'bg-secondary',
    summary:
      'Embedded across 16 high-burden blocks in North Bihar, strengthening maternal-child health delivery while building offline data pipelines and clinical tools used by frontline workers and district officers.',
    highlights: [
      {
        lead: 'Frontline Capacity Building',
        detail:
          'Trained 700+ ASHA workers hands-on on M-ASHA across 100+ micro-sessions and co-delivered a 185-hour Clinical Skills Refresher for 12 staff nurses and 4 doctors.',
      },
      {
        lead: 'Facility Audits & NQAS Quality',
        detail:
          'Reconciled physical registers against digital portals across 154 Sub-Centres and PHCs to surface inventory gaps and support NQAS certification readiness.',
      },
      {
        lead: 'ODK & Automated MIS Pipelines',
        detail:
          'Built Python/Pandas and offline VHSND/PMSMA validation workflows (253 columns, 118k+ records) preparing clean tables ahead of Monday district reviews.',
      },
      {
        lead: 'Clinical & Offline Software Shipped',
        detail:
          'Engineered Matru Suraksha (offline maternal triage PWA), District Hospital Araria portal, and an Ambient Clinical AI Scribe for Hindi/English maternity visits.',
      },
    ],
    metrics: [
      { value: '700+', label: 'ASHAs Trained' },
      { value: '154', label: 'Facilities Audited' },
      { value: '185-hr', label: 'Clinical Refresher' },
      { value: '13,627', label: 'Field KM Logged' },
    ],
    skills: ['ODK Collect & Central', 'NQAS Audits', 'Python & Pandas', 'District MIS', 'Clinical AI & Offline PWA'],
    links: [
      { label: 'Health Field Ledger', href: '/health' },
      { label: 'Health Tech Builds', href: '/work' },
    ],
  },
  {
    id: 'biharkaswaad',
    index: '02',
    role: 'Full-Stack Developer & Web In-Charge',
    org: 'BiharKaSwaad',
    location: 'Production D2C Commerce · India',
    period: 'Jul 2025 – Present',
    current: true,
    track: 'engineering',
    trackLabel: 'Production E-Commerce',
    accentClass: 'bg-primary-container dark:bg-[#facc15]',
    summary:
      'Sole engineer and ongoing web in-charge for a live regional food storefront shipping authentic Bihari specialties across India.',
    highlights: [
      {
        lead: 'Zero-Tamper Checkout',
        detail:
          'Built Razorpay payment pipeline with HMAC SHA-256 verification, server-side amount re-validation, and webhook reconciliation.',
      },
      {
        lead: 'Full Order & Shipping Lifecycle',
        detail:
          'Engineered variant-aware inventory, admin CMS, Shiprocket courier dispatch, and automated branded order emails.',
      },
      {
        lead: 'Performance & QA Hardening',
        detail:
          'Added 11 composite MySQL indexes and verified checkout & storefront flows with 29/29 passing Playwright E2E tests.',
      },
    ],
    skills: ['React', 'Node.js', 'Express', 'MySQL', 'Razorpay', 'Playwright'],
    links: [
      { label: 'Case Study', href: '/work/biharkaswaad' },
      { label: 'Live Site', href: 'https://biharkaswaad.in/', external: true },
    ],
  },
  {
    id: 'prodigy-infotech',
    index: '03',
    role: 'Full-Stack Web Developer Intern',
    org: 'Prodigy InfoTech',
    location: 'Remote · Engineering',
    period: 'Jun – Jul 2025',
    current: false,
    track: 'engineering',
    trackLabel: 'Full-Stack & APIs',
    accentClass: 'bg-tertiary',
    summary:
      'Delivered full-stack MERN applications and real-time messaging modules under rapid agile sprint deadlines.',
    highlights: [
      {
        lead: 'Auth & REST Architecture',
        detail:
          'Implemented JWT & OAuth authentication, role-protected CRUD endpoints, and normalized MongoDB data models.',
      },
      {
        lead: 'Real-Time WebSockets',
        detail:
          'Built asynchronous communication modules with live WebSocket state synchronization and reconnection handling.',
      },
      {
        lead: 'Production Git Workflows',
        detail:
          'Maintained clean pull-request workflows, API testing suites, and structured sprint deliveries via GitHub.',
      },
    ],
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT / OAuth', 'WebSockets'],
    links: [
      { label: 'GitHub Profile', href: 'https://github.com/adityapandey2002', external: true },
    ],
  },
  {
    id: 'auroville-fablab',
    index: '04',
    role: 'Sustainable-Tech & Hardware Intern',
    org: 'Auroville FabLab & MinVayu',
    location: 'Auroville, Tamil Nadu',
    period: 'Sep – Nov 2024',
    current: false,
    track: 'engineering',
    trackLabel: 'Open Hardware & Lab',
    accentClass: 'bg-on-surface dark:bg-on-surface-variant',
    summary:
      'Prototyped open-source manufacturing hardware and low-carbon construction composites in a hands-on fabrication lab.',
    highlights: [
      {
        lead: 'Large-Format 3D Printers',
        detail:
          'Assembled, calibrated, and tested open-source large-format printers built for affordable distributed manufacturing.',
      },
      {
        lead: 'Eco-Composite Material Tests',
        detail:
          'Prototyped structural print blends using locally sourced sand, rice husk, and slaked lime for sustainable housing.',
      },
      {
        lead: 'MinVayu Wind Automation',
        detail:
          'Contributed 3D CAD modeling and open-source automation supporting rural small wind-turbine prototyping.',
      },
    ],
    skills: ['3D Printing', 'CAD & Fabrication', 'Open Hardware', 'Automation'],
    links: [
      { label: 'Hardware Case Study', href: '/work/auroville-minvayu-hardware' },
    ],
  },
];

export function filterExperience(items: Experience[], track: ExperienceTrack): Experience[] {
  if (track === 'all') return items;
  return items.filter((item) => item.track === track);
}
