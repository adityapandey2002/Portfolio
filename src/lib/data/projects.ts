export interface Project {
  id: string;
  title: string;
  category: 'ml' | 'health' | 'fullstack';
  categoryLabel: string;
  status?: 'LIVE';
  desc: string;
  tags: string[];
  source?: string;
  live?: string;
  path?: string;
  cover?: string;
  glyph?: string;
  caseStudy: {
    intro: string;
    bullets: string[];
    stack: string;
    note?: string;
  };
}

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Data / ML' },
  { id: 'health', label: 'Public Health' },
  { id: 'fullstack', label: 'Full-Stack' },
] as const;

export const projects: Project[] = [
  {
    id: 'india-dashboard',
    title: 'India Development Data Dashboard',
    category: 'ml',
    categoryLabel: 'Data · Analytics',
    status: 'LIVE',
    desc: 'Full-stack analytics dashboard for India\'s development indicators — 118k+ data points, 35 sources, 114 indicators, RAG Q&A.',
    tags: ['Next.js', 'Drizzle ORM', 'Supabase', 'D3', 'RAG / LLM'],
    cover: 'linear-gradient(135deg, #062033 0%, #0f5e7a 100%)',
    glyph: '◉',
    source: 'https://github.com/adityapandey2002/',
    live: 'https://india-dashboard-delta.vercel.app/',
    caseStudy: {
      intro: 'Single-user tool turned production dashboard — India&apos;s development indicators from 35 global sources, queryable and searchable.',
      bullets: [
        'Built a <strong>full-stack data analytics dashboard</strong> (Next.js App Router, React 19, TypeScript, Tailwind) visualizing <strong>114+ indicators and 118,000+ data points</strong> across 35 global sources.',
        'Designed an <strong>automated ETL pipeline</strong> (Node/tsx + Drizzle ORM) ingesting from World Bank, UNDP, WHO, OWID, Yale EPI, WIPO and 29 other APIs — JSON, CSV, XLSX and scraped HTML with <strong>Zod validation and idempotent upserts</strong>.',
        'Migrated the database <strong>SQLite → Supabase Postgres</strong> with zero app-code changes — DB abstraction layer and batched <strong>bulkInsert cut bulk-write time ~100x</strong>.',
        'Cut API round-trips by <strong>97%</strong> — ~220 per-indicator calls down to 6 batched queries, slashing page load time.',
        'Shipped an <strong>AI-powered RAG chatbot</strong> — TF-IDF vector search + Groq LLM with source citations, on a custom embedding index (no paid vector DB).',
        'Built a <strong>D3 choropleth world map</strong> with year slider, Recharts trend/scatter/radar charts, and a Pearson-correlation analysis tool; 16+ automated tests.',
      ],
      stack: 'Next.js · React 19 · TypeScript · Drizzle ORM · Supabase · Postgres · D3 · Recharts · Zod · Groq · Vercel.',
      note: 'india-dashboard-delta.vercel.app · live',
    },
  },
  {
    id: 'biharkaswaad',
    title: 'BiharKaSwaad — E-Commerce',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    status: 'LIVE',
    desc: 'Production e-commerce for authentic Bihari food — catalog to courier, live at biharkaswaad.in.',
    tags: ['React', 'Node', 'Express', 'MySQL', 'Razorpay'],
    cover: 'linear-gradient(135deg, #131a34 0%, #2a2152 100%)',
    glyph: '{ }',
    source: 'https://github.com/adityapandey2002/',
    live: 'https://biharkaswaad.in/',
    caseStudy: {
      intro: 'A live online store selling authentic Bihari food across India — the complete order-to-delivery lifecycle, owned end-to-end.',
      bullets: [
        'Deployed to <strong>production (biharkaswaad.in)</strong> on Hostinger with PM2 cluster mode — catalog, cart, payments, shipping & support for real customers across India',
        'Secure <strong>Razorpay payment pipeline</strong> — HMAC SHA-256 signature verification, server-side amount re-validation from DB, webhook reconciliation & 30-min auto-expiry of abandoned orders',
        'Full <strong>order lifecycle</strong> — pending → processing → shipped → delivered with variant-aware stock, Shipmojo courier tracking & automated branded emails',
        'Role-based system (customer/admin/support) — <strong>JWT + httpOnly cookies</strong>, bcrypt, rate-limited login & protected admin CRUD',
        'Performance & security — <strong>60s response caching</strong>, helmet CSP for gateways, XSS-sanitized emails & Excel bulk catalog uploads',
      ],
      stack: 'React 18 · Redux Toolkit · Node.js · Express · MySQL · Sequelize · Razorpay · JWT · Nodemailer · PM2 · Multer · Cloudinary · Docker.',
      note: 'biharkaswaad.in · live in production',
    },
  },
  {
    id: 'spacex',
    title: 'SpaceX Launch Success Prediction',
    category: 'ml',
    categoryLabel: 'ML · Data Science',
    desc: 'IBM Capstone. 100+ Falcon 9 launches via REST API + scraping, classification models, interactive Dash/Plotly dashboard.',
    tags: ['Python', 'SQLite', 'Dash', 'ML'],
    cover: 'linear-gradient(135deg, #0c1a2c 0%, #1a2a44 100%)',
    glyph: '▲',
    source: 'https://github.com/adityapandey2002/',
    caseStudy: {
      intro: 'Capstone for the IBM Data Science Professional Certificate. Predict whether the Falcon 9 first stage will land successfully.',
      bullets: [
        'Data: SpaceX REST API + Wikipedia scraping',
        'Wrangling: One-hot encoding, missing values',
        'EDA: SQL queries + visualisations',
        'Modelling: Logistic Regression, SVM, Decision Tree, KNN',
        'Deployment: Interactive Dash + Plotly dashboard',
      ],
      stack: 'Python · Pandas · Scikit-learn · SQLite · Dash · Plotly.',
    },
  },
  {
    id: 'vhsnd',
    title: 'VHSND Field Data Quality & Insights',
    category: 'health',
    categoryLabel: 'Public Health',
    desc: 'Python pipeline for community health session data — raw ODK extracts to analysis-ready datasets.',
    tags: ['Python', 'Pandas', 'ODK'],
    cover: 'linear-gradient(135deg, #07251d 0%, #0e4a3a 100%)',
    glyph: '+',
    source: 'https://github.com/adityapandey2002/',
    caseStudy: {
      intro: 'Built during my Gandhi Fellowship for community health session data from ODK Collect.',
      bullets: [
        'Automated validation against VHSND schema',
        'Block- and ANM-level data-quality breakdowns',
        'Analysis-ready datasets for the MIS pipeline',
        'Weekly summary emails to block officers',
      ],
      stack: 'Python · Pandas · ODK Central API.',
      note: 'Gandhi Fellowship · Piramal',
    },
  },
];
