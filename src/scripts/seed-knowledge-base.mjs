/**
 * Seed the portfolio RAG knowledge base and emit JSON (chunks + embeddings)
 * ready to insert into the Supabase `knowledge_base` table.
 *
 * Output shape:
 *   {
 *     generatedAt, chunkSize, overlap, dimensions, embeddingModel, count,
 *     chunks: [{ content, source, embedding }]
 *   }
 *
 * Works offline: without API keys it uses deterministic hash-based embeddings
 * (the same algorithm as src/lib/rag.ts), so seeded chunks are compatible with
 * `searchKnowledgeBase` at runtime with zero configuration.
 *
 * Usage:
 *   node --env-file=.env src/scripts/seed-knowledge-base.mjs
 *   npm run seed-knowledge-base
 */

const CHUNK_SIZE = 500;
const OVERLAP = 50;
const EMBEDDING_DIMS = 384;
const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';

/**
 * Portfolio knowledge base content. Each entry is one source of truth about
 * Aditya — background, GAVB Gandhi Fellowship, BiharKaSwaad, projects, skills,
 * education, certifications, public-health field work, and contact info.
 */
const KB = [
  {
    source: 'about',
    content:
      "Aditya Pandey is a data analyst, full-stack developer and AI practitioner currently working as a Gandhi Fellow with the Piramal Foundation in Muzaffarpur, Bihar, India. He builds data systems that turn field work into real decisions. His tagline is \"Field Data → Clean Insights → Real Decisions.\" He is based in Muzaffarpur, Bihar; his hometown is Pratapgarh, Uttar Pradesh. He speaks Hindi and English. Aditya is open to data analyst roles, full-stack opportunities, and public-health data collaborations, and is available immediately. Contact: adityapandey.adu@gmail.com, +91 8601862114, github.com/adityapandey2002, linkedin.com/in/aditya-pandey-a-fellow. His edge is simple: he has actually been in the field, so he knows what the data means before it ever hits a spreadsheet.",
  },
  {
    source: 'gandhi-fellowship',
    content:
      "GAVB — Gandhi Fellowship, Health System Strengthening, Piramal Foundation, Bihar (Jul 2025 – Present). Aditya works as part of the district health support system across SHC, PHC, and district hospital levels, supporting facilities toward NQAS (National Quality Assurance Standards) certification. Frontline worker capacity building: he trained 700+ ASHA workers hands-on on the M-ASHA government digital application across 100+ sustained sessions — not one-time trainings, but patient sessions until the tool genuinely worked for each worker's daily use. Supportive supervision of maternal and child health programs: immunization and PMSMA — observing service delivery on-ground and feeding structured feedback back to block and district levels. He co-designed and delivered a structured 185-hour Clinical Skills Refresher for 12 staff nurses and 4 doctors across a 5-week progressive curriculum, followed by monthly on-site audits to ensure practices were adopted, not just taught once. He built a Python/Pandas workflow to clean and validate VHSND, Godbharai, and PMSMA field data collected via ODK Collect and ODK Central, producing MIS reports used in block and district review meetings. He also led a diagnostic project across multiple CHCs surfacing inventory and coordination gaps between physical registers and digital portals, and participated in Cognitively-Based Compassion Training (CBCT) with the fellowship cohort.",
  },
  {
    source: 'biharkaswaad-experience',
    content:
      "Full-Stack Developer & Web In-Charge, BiharKaSwaad — Bihari food e-commerce platform (biharkaswaad.in), Jul 2025 – Present. Aditya built and deployed a production e-commerce platform covering catalog, cart, payments, shipping, and support, end-to-end on Hostinger. He designed a secure Razorpay payment pipeline — HMAC SHA-256 signature verification, server-side amount re-validation from the database, webhook reconciliation, and 30-minute auto-expiry of abandoned orders. He engineered the full order lifecycle — pending → processing → shipped → delivered — with variant-aware stock, Shipmojo courier tracking, and automated branded emails. He runs a role-based system (customer/admin/support) with JWT + httpOnly cookies, bcrypt, rate-limited login, and protected admin CRUD. He is the sole developer and ongoing web in-charge. Stack: React 18, Redux Toolkit, Node.js, Express, MySQL, Sequelize, Razorpay, JWT, Nodemailer, Multer, Cloudinary, Docker.",
  },
  {
    source: 'prodigy-internship',
    content:
      "Full-Stack Web Developer Intern, Prodigy InfoTech (Remote, Jun – Jul 2025). Aditya built and deployed production-ready MERN applications — secure authentication, scalable database models, and full CRUD APIs. He developed real-time, asynchronous communication apps with WebSockets, applied agile development, and managed source code with standard Git workflows via GitHub and the Cursor IDE. Stack: MERN, JWT, WebSockets, Agile, Git.",
  },
  {
    source: 'auroville-fablab',
    content:
      "Sustainable-tech Intern, Auroville FabLab, Tamil Nadu (Sep – Nov 2024). Open-source 3D printing and digital fabrication — prototyping eco-friendly structures from sand, rice husk, and slaked lime. He designed and tested large-format 3D printers (MinVayu project) built on open-source hardware for distributed, low-cost digital manufacturing. Stack: 3D Printing, Digital Fabrication, Sustainability.",
  },
  {
    source: 'projects-india-dashboard',
    content:
      "India Development Data Dashboard — a full-stack analytics dashboard for India's development indicators: 118,000+ data points, 35 sources, 114 indicators, with built-in RAG Q&A. Built with Next.js App Router, React 19, TypeScript, and Tailwind. He designed an automated ETL pipeline (Node/tsx + Drizzle ORM) ingesting from World Bank, UNDP, WHO, OWID, Yale EPI, WIPO and 29 other APIs — JSON, CSV, XLSX, and scraped HTML with Zod validation and idempotent upserts. He migrated the database from SQLite to Supabase Postgres with zero app-code changes, using a DB abstraction layer and batched bulkInsert that cut bulk-write time by about 100x. He cut API round-trips by 97% — roughly 220 per-indicator calls down to 6 batched queries. He shipped an AI-powered RAG chatbot with TF-IDF vector search and a Groq LLM with source citations, on a custom embedding index with no paid vector DB. He also built a D3 choropleth world map with a year slider, Recharts trend/scatter/radar charts, and a Pearson-correlation analysis tool, backed by 16+ automated tests. Stack: Next.js, React 19, TypeScript, Drizzle ORM, Supabase, Postgres, D3, Recharts, Zod, Groq, Vercel. Live: india-dashboard-delta.vercel.app.",
  },
  {
    source: 'projects-spacex',
    content:
      "SpaceX Launch Success Prediction — capstone for the IBM Data Science Professional Certificate. Aditya collected 100+ Falcon 9 launches via the SpaceX REST API and Wikipedia scraping, then wrangled the data with one-hot encoding and missing-value handling. EDA was done with SQL queries and visualisations. Modelling included Logistic Regression, SVM, Decision Tree, and KNN classification. Deployment was an interactive Dash + Plotly dashboard. Stack: Python, Pandas, Scikit-learn, SQLite, Dash, Plotly.",
  },
  {
    source: 'projects-vhsnd',
    content:
      "VHSND Field Data Quality & Insights — built during the Gandhi Fellowship for community health session data from ODK Collect. It provides automated validation against the VHSND schema, block- and ANM-level data-quality breakdowns, analysis-ready datasets for the MIS pipeline, and weekly summary emails to block officers. Stack: Python, Pandas, ODK Central API.",
  },
  {
    source: 'projects-biharkaswaad',
    content:
      "BiharKaSwaad — production e-commerce platform for authentic Bihari food, live at biharkaswaad.in. Customer storefront and admin panel, JWT authentication with role-based admin routes, full CRUD, cart, checkout, and order management. Deployed in production on Hostinger. Stack: React, Node.js, Express, MySQL, Razorpay, JWT.",
  },
  {
    source: 'skills',
    content:
      "Skills and tech stack. Data & analysis: Python, Pandas, NumPy, SQL / SQLite, Jupyter, R, Statistics, Dash, Plotly, Excel. Field & public health: ODK Collect, ODK Central, NQAS, DHIS2, MIS Reporting. Full-stack & DevOps: React, Next.js, TypeScript, Tailwind, Node, Express, MongoDB, REST / JWT, WebSockets, Git, Docker, SEO. AI & automation: AI tools, LLM / RAG, Groq, prompt engineering, automation scripts, Playwright E2E, data pipelines. Community & leadership: community engagement, ASHA and frontline worker training, facilitation, NQAS / MIS reporting, stakeholder coordination, leadership, program delivery. Self-assessed strengths: ODK Collect 90%, data cleaning with Python / Pandas 87%, SQL / SQLite 82%, Dash / Plotly / Excel 80%, full-stack MERN 78%, REST APIs / JWT 76%, AI tools 72%.",
  },
  {
    source: 'education',
    content:
      "Education. Master of Computer Applications (MCA), Pondicherry University (Aug 2023 – May 2025). Master of Arts in Political Science & Government, Prof. Rajendra Singh (Rajju Bhaiya) University, Prayagraj (Aug 2022 – Jun 2023). Bachelor of Science in Mathematics, Dr. Rammanohar Lohia Avadh University, Ayodhya (2019 – 2022). ESDP Programme, MSME Pondicherry — Python-based data tools.",
  },
  {
    source: 'certifications',
    content:
      "Certifications. IBM Data Science Professional Certificate — IBM, 11 courses. Data Analytics with Python — NPTEL. Data Mining Using R — NPTEL. ESDP — Python-based Data Tools — MSME · Pondicherry. Nation Builder (NB4), Gandhi Fellowship, Piramal Foundation.",
  },
  {
    source: 'health-field-work',
    content:
      "Public health field work. As a Gandhi Fellow in health system strengthening with the Piramal Foundation in Muzaffarpur, Bihar, Aditya uses ODK Collect and ODK Central for field-level health data collection across VHSND, Godbharai, and PMSMA workflows. He built a Python-based data cleaning and validation pipeline for VHSND field data, from raw extracts to analysis-ready datasets. He trained 700+ ASHA workers hands-on on the M-ASHA government digital application across 100+ sessions. He co-designed and delivered a 5-week, 185-hour Clinical Skills Refresher Program for 12 staff nurses and 4 doctors, followed by monthly on-site audits. He provides supportive supervision of immunization and PMSMA across SHC, PHC, and district hospital levels toward NQAS certification, and led a diagnostic project across multiple CHCs surfacing inventory and coordination gaps between physical registers and digital portals. He has stood next to an ASHA worker filling an ODK form on a tablet in 38°C heat — every pipeline he builds starts with that moment.",
  },
  {
    source: 'contact',
    content:
      "Contact Aditya Pandey. Personal email: adityapandey.adu@gmail.com. Work email: aditya.pandey@piramalswasthya.org. Phone: +91 8601862114. Location: Muzaffarpur, Bihar, India (26.1222° N · 85.3905° E). Languages: Hindi and English. GitHub: github.com/adityapandey2002. LinkedIn: linkedin.com/in/aditya-pandey-a-fellow. Live site: biharkaswaad.in. He is immediately available and open to data analyst roles, full-stack opportunities, and public-health data collaborations.",
  },
];

function chunkText(text, maxLen = CHUNK_SIZE, overlap = OVERLAP) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const block of blocks) {
    if ((buf + '\n\n' + block).length > maxLen && buf) {
      chunks.push(buf);
      buf = buf.slice(-overlap) + '\n\n' + block;
    } else {
      buf = buf ? buf + '\n\n' + block : block;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

function djb2(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return h;
}

/**
 * Deterministic hash-based embedding — identical to src/lib/rag.ts so that
 * chunks seeded here can be retrieved at runtime without any API keys.
 */
function hashEmbed(text, dims = EMBEDDING_DIMS) {
  const v = new Array(dims).fill(0);
  for (const token of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!token) continue;
    const h = djb2(token);
    v[Math.abs(h) % dims] += h < 0 ? -1 : 1;
  }
  let norm = 0;
  for (let i = 0; i < dims; i++) norm += v[i] * v[i];
  norm = Math.sqrt(norm) || 1;
  return v.map((x) => x / norm);
}

async function groqEmbed(chunks) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(`${GROQ_BASE_URL}/embeddings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_EMBEDDING_MODEL || 'text-embedding-3-small',
        input: chunks,
      }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    return data.map((d) =>
      Array.isArray(d.embedding)
        ? d.embedding.map(Number).filter((n) => Number.isFinite(n))
        : null,
    );
  } catch {
    return null;
  }
}

async function main() {
  console.error(`Loaded ${KB.length} knowledge-base entry(ies)`);

  const allChunks = [];
  for (const entry of KB) {
    for (const chunk of chunkText(entry.content)) {
      allChunks.push({ content: chunk, source: entry.source });
    }
  }
  console.error(`→ ${allChunks.length} chunks (chunkSize=${CHUNK_SIZE}, overlap=${OVERLAP})`);

  let embeddings = null;
  let modelLabel = `hash-${EMBEDDING_DIMS}`;

  if (process.env.GROQ_API_KEY) {
    const fromGroq = await groqEmbed(allChunks.map((c) => c.content));
    const usable =
      fromGroq &&
      fromGroq.length === allChunks.length &&
      fromGroq.every((e) => e && e.length === EMBEDDING_DIMS);
    if (usable) {
      embeddings = fromGroq;
      modelLabel = process.env.GROQ_EMBEDDING_MODEL || 'groq-embeddings';
      console.error(`Embedded via Groq (${modelLabel})`);
    } else {
      console.error('Groq embedding unavailable — using deterministic hash embeddings');
    }
  }

  if (!embeddings) {
    embeddings = allChunks.map((c) => hashEmbed(c.content));
    console.error(`Embedded via deterministic hash (${EMBEDDING_DIMS} dims)`);
  }

  const rows = allChunks.map((c, i) => ({
    content: c.content,
    source: c.source,
    embedding: embeddings[i],
  }));

  const output = {
    generatedAt: new Date().toISOString(),
    chunkSize: CHUNK_SIZE,
    overlap: OVERLAP,
    dimensions: EMBEDDING_DIMS,
    embeddingModel: modelLabel,
    count: rows.length,
    chunks: rows,
  };

  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
  console.error(`\n✅ Emitted ${rows.length} chunks with embeddings`);
}

main().catch((err) => {
  console.error('Seed failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
