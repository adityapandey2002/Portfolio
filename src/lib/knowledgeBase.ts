import { PORTFOLIO_SYSTEMS, type PortfolioSystem } from './data/systems';

export interface KnowledgeSource {
  title: string;
  href: string;
  tag: string;
  external?: boolean;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  tag: string;
  href: string;
  external?: boolean;
  projectSlug?: string;
  keywords: string[];
  sections: { heading: string; body: string }[];
  followUps: string[];
  searchText: string;
}

export interface GroundedAnswerResult {
  answerText: string;
  sources: KnowledgeSource[];
  followUps: string[];
  matchedIds: string[];
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'did', 'do', 'does',
  'for', 'from', 'has', 'have', 'he', 'his', 'how', 'i', 'in', 'is', 'it',
  'me', 'of', 'on', 'or', 'tell', 'that', 'the', 'their', 'this', 'to', 'was',
  'what', 'where', 'which', 'who', 'why', 'with', 'you', 'your', 'about',
  'explain', 'describe', 'give', 'more', 'details', 'detail', 'aditya', 'pandey',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^[-.]+|[-.]+$/g, ''))
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

function systemToKnowledgeDoc(sys: PortfolioSystem): KnowledgeDoc {
  const metricSummary = sys.metrics
    .map((m) => `${m.value} ${m.label}${m.context ? ` (${m.context})` : ''}`)
    .join('; ');

  const archSummary = sys.architectureSteps
    .map((s) => `${s.title}: ${s.detail}`)
    .join(' ');

  const secSummary = [
    ...sys.securityAndQuality,
    ...sys.qualityGates.map((g) => `${g.label}: ${g.value}`),
  ].join(' ');

  const linksNote = [
    sys.liveUrl ? `Live URL: ${sys.liveUrl}` : null,
    sys.githubUrl ? `GitHub Repository: ${sys.githubUrl}` : null,
    `Stack: ${sys.stack.join(', ')}`,
  ]
    .filter(Boolean)
    .join(' · ');

  const sections = [
    {
      heading: `${sys.title} — Overview & Impact`,
      body: `${sys.summary} Key verified outcomes: ${metricSummary}. ${sys.operationalImpact}`,
    },
    {
      heading: 'Architecture & Technical Highlights',
      body: `${sys.recruiterHighlights.join(' ')} Pipeline flow — ${archSummary}`,
    },
    {
      heading: 'Security, Testing & Repository Links',
      body: `${secSummary} ${linksNote}.`,
    },
  ];

  const keywords = [
    sys.slug,
    ...sys.slug.split('-'),
    sys.title,
    sys.subtitle,
    sys.categoryLabel,
    sys.domain,
    sys.repoName ?? '',
    ...sys.stack,
    ...sys.metrics.map((m) => `${m.value} ${m.label}`),
  ];

  const searchText = [
    sys.title,
    sys.nativeTitle ?? '',
    sys.subtitle,
    sys.tagline,
    sys.summary,
    sys.problemSolved,
    sys.operationalImpact,
    sys.categoryLabel,
    sys.repoName ?? '',
    ...sys.stack,
    ...sys.recruiterHighlights,
    ...sys.architectureSteps.map((a) => `${a.title} ${a.detail}`),
    ...sys.securityAndQuality,
    ...sys.docs.map((d) => `${d.title} ${d.path} ${d.summary}`),
  ].join(' ');

  const followUps = [
    `What security and testing gates verify ${sys.title}?`,
    `What is the exact tech stack behind ${sys.title}?`,
    sys.category === 'health-ai'
      ? 'How does Aditya combine field work in Bihar with software architecture?'
      : 'Show me Aditya’s public health & clinical AI systems.',
  ];

  return {
    id: `project:${sys.slug}`,
    title: sys.title,
    tag: sys.repoName ?? sys.categoryLabel,
    href: `/work/${sys.slug}`,
    projectSlug: sys.slug,
    keywords,
    sections,
    followUps,
    searchText,
  };
}

const CORE_PROFILE_DOCS: KnowledgeDoc[] = [
  {
    id: 'profile:fellowship',
    title: 'Gandhi Fellowship — Bihar Public Health Impact',
    tag: 'Piramal Foundation · 16 Blocks',
    href: '/health',
    keywords: [
      'fellowship', 'gandhi', 'piramal', 'bihar', 'muzaffarpur', 'asha', 'm-asha',
      'nqas', 'sub-centre', 'sub-centres', 'phc', 'chc', '185-hour', 'clinical',
      'refresher', 'nurses', 'doctors', 'odk', 'vhsnd', 'godbharai', 'pmsma',
      '13627', '13,627', 'km', 'odometer', 'field', 'cbct', 'vipassana', 'who',
    ],
    sections: [
      {
        heading: '700+ ASHA Workers Mentored & 16-Block Field Footprint',
        body: 'As a Gandhi Fellow (Health System Strengthening) with Piramal Foundation based in Muzaffarpur, Bihar (Jul 2025 – Present), Aditya trained 700+ ASHA workers hands-on on the M-ASHA government digital application across 100+ micro-sessions and logged 13,627+ KM traveling across 16 high-burden blocks.',
      },
      {
        heading: '185-Hour Clinical Skills Refresher & 154 Sub-Centre NQAS Audits',
        body: 'He co-designed and delivered a 5-week, 185-hour Clinical Skills Refresher program for 12 Staff Nurses and 4 Medical Doctors covering obstetric emergencies and High-Risk Pregnancy (HRP) protocols, while reconciling physical vs. digital registers across 154 Sub-Centres and PHCs under NQAS.',
      },
      {
        heading: 'ODK-to-MIS Automation & Personal Discipline',
        body: 'He built Python/Pandas pipelines cleaning 118k+ VHSND, Godbharai, and PMSMA survey records from ODK Collect/Central ahead of weekly district review meetings, and completed Cognitively-Based Compassion Training (CBCT®) and a 10-day silent Vipassana retreat at Dhamma Vaishali.',
      },
    ],
    followUps: [
      'How does Matru Suraksha digitize Bihar high-risk pregnancy tracking?',
      'Explain the offline VHSND & PMSMA survey cleaning pipeline.',
      'Tell me about the Ambient Clinical AI Scribe for Bihar PHCs.',
    ],
    searchText:
      'Gandhi Fellowship Piramal Foundation Muzaffarpur Bihar public health system strengthening 700+ ASHA workers M-ASHA 100+ micro-sessions 185-hour Clinical Skills Refresher 12 Staff Nurses 4 Doctors 154 Sub-Centres NQAS 16 blocks 13627 km field travel ODK Collect ODK Central VHSND Godbharai PMSMA 118k validated records CBCT compassion Vipassana Dhamma Vaishali WHO building blocks medicine forecasting.',
  },
  {
    id: 'profile:overview',
    title: 'Aditya Pandey — Executive Summary & Experience',
    tag: 'Full-Stack · Public Health AI',
    href: '/work',
    keywords: [
      'who', 'summary', 'background', 'bio', 'resume', 'experience', 'career',
      'overview', 'projects', 'all', 'portfolio', 'hire', 'recruiter', 'role',
    ],
    sections: [
      {
        heading: 'Builder at the Intersection of Full-Stack Engineering & Public Health',
        body: 'Aditya Pandey is a Full-Stack Developer, Public Health Data Engineer, and Applied AI practitioner currently serving as a Gandhi Fellow with Piramal Foundation in Bihar. He ships production web systems, offline-first clinical apps, clinical voice AI, and macro data platforms backed by 327+ automated tests.',
      },
      {
        heading: '7 Flagship + 3 Specialized Systems Shipped',
        body: 'Flagships include BiharKaSwaad (live D2C e-commerce at biharkaswaad.in), District Hospital Araria Portal (Next.js + NestJS, 86 tests), Matru Suraksha (6-tier offline maternal PWA), Ambient Clinical AI Scribe (181-field Hindi/English voice AI), India in the World Dashboard (252k+ data points, 97% fewer DB trips), VHSND/PMSMA Offline Pipeline (212 Vitest tests), and Consultancy Wala (Next.js 16 RSC).',
      },
      {
        heading: 'Prior Experience & Open Availability',
        body: 'Previously Full-Stack Web Developer Intern at Prodigy InfoTech (MERN, JWT/OAuth) and Open Source Hardware Developer at MinVayu / Auroville FabLab (C++/AVR wind-turbine telemetry & CAD). Open to Full-Stack Engineer, Data Engineer, Applied AI, and Digital Health roles.',
      },
    ],
    followUps: [
      'Compare Aditya’s top technical projects for a software engineering recruiter.',
      'What did Aditya achieve during the Gandhi Fellowship in Bihar?',
      'What is Aditya’s education and how can I contact him?',
    ],
    searchText:
      'Aditya Pandey resume summary background career experience Gandhi Fellow Piramal Foundation BiharKaSwaad Web In-Charge Prodigy InfoTech MinVayu Auroville FabLab 7 flagship 3 specialized systems full-stack data engineer clinical AI public health recruiter hire.',
  },
  {
    id: 'profile:skills',
    title: 'Engineering & Public Health Tech Stack',
    tag: 'Skills & QA Matrix',
    href: '/#skills',
    keywords: [
      'skill', 'skills', 'stack', 'tech', 'technologies', 'languages', 'framework',
      'frameworks', 'database', 'databases', 'testing', 'typescript', 'python',
      'react', 'nextjs', 'nestjs', 'fastify', 'fastapi', 'postgres', 'mysql',
      'sqlite', 'drizzle', 'docker', 'playwright', 'vitest', 'ai', 'rag', 'whisper',
    ],
    sections: [
      {
        heading: 'Full-Stack Web & Database Engineering',
        body: 'TypeScript 5, Next.js 16 (App Router, RSC, Server Actions, Static Export), React 18/19, NestJS, Fastify, Node.js/Express, Tailwind CSS, PostgreSQL 16 (Supabase, pg), MySQL (Sequelize), SQLite, Drizzle ORM, MikroORM, Dexie.js 4 (IndexedDB), and Capacitor 6 Android.',
      },
      {
        heading: 'Applied AI, Speech & Data Analytics',
        body: 'Python, FastAPI, WebSockets, Groq Whisper-large-v3, Silero VAD, Gemini 2.5 Flash, local TF-IDF RAG & pgvector search, Pandas, Scikit-Learn, D3-geo TopoJSON, Recharts, Plotly Dash, Folium, SheetJS, and automated PPTX/DOCX reporting.',
      },
      {
        heading: 'Public Health Informatics, Security & Automated QA',
        body: 'ODK Collect & ODK Central, M-ASHA, DHIS2, Apache Superset, NQAS auditing; AES-256-GCM IndexedDB encryption, HMAC SHA-256 Razorpay webhooks, JWT + ABAC/RBAC; 327+ automated tests across Vitest (212), NestJS/Jest (86), Playwright E2E (29), and Testcontainers Postgres.',
      },
    ],
    followUps: [
      'Which projects showcase Aditya’s automated testing and security rigor?',
      'How does Aditya build low-cost RAG and clinical voice AI systems?',
      'Show me Aditya’s database optimization work in India Dashboard.',
    ],
    searchText:
      'Skills stack technologies languages TypeScript JavaScript Python SQL Next.js React NestJS Fastify FastAPI Express Node PostgreSQL MySQL SQLite Drizzle MikroORM Sequelize Dexie IndexedDB Capacitor Whisper Silero VAD Gemini Groq RAG TF-IDF Pandas Scikit-Learn D3 Recharts Plotly Dash ODK Central DHIS2 Superset AES-256-GCM HMAC SHA-256 Vitest Playwright Jest Testcontainers Docker.',
  },
  {
    id: 'profile:education',
    title: 'Education & Verified Certifications',
    tag: 'MCA · IBM Data Science · NPTEL',
    href: '/#education',
    keywords: [
      'education', 'degree', 'degrees', 'college', 'university', 'mca', 'bsc', 'ma',
      'pondicherry', 'prayagraj', 'ayodhya', 'certification', 'certifications',
      'ibm', 'nptel', 'msme', 'study', 'academic', 'qualification',
    ],
    sections: [
      {
        heading: 'Graduate & Undergraduate Degrees',
        body: 'Master of Computer Applications (MCA) from Pondicherry University (Aug 2023 – May 2025); Master of Arts in Political Science from Prof. Rajendra Singh (Rajju Bhaiya) University, Prayagraj (Aug 2022 – Jun 2023); and Bachelor of Science in Mathematics from Dr. Rammanohar Lohia Avadh University, Ayodhya (2019 – 2022).',
      },
      {
        heading: 'Technical & Leadership Certifications',
        body: 'IBM Data Science Professional Certificate (11-course specialization culminating in the SpaceX Falcon 9 ML capstone), Data Analytics with Python (NPTEL), Data Mining Using R (NPTEL), ESDP Python Data Tools (MSME Pondicherry), and Nation Builder (NB4) under the Gandhi Fellowship.',
      },
    ],
    followUps: [
      'Summarize Aditya’s SpaceX Falcon 9 IBM Data Science capstone.',
      'What production systems did Aditya ship after his MCA?',
      'How can I contact Aditya Pandey for an interview?',
    ],
    searchText:
      'Education degrees academic Pondicherry University Master of Computer Applications MCA 2023 2025 MA Political Science Prayagraj Rajju Bhaiya BSc Mathematics Rammanohar Lohia Avadh University Ayodhya IBM Data Science Professional Certificate 11 courses NPTEL Data Analytics Python Data Mining R MSME Pondicherry ESDP Nation Builder NB4.',
  },
  {
    id: 'profile:contact',
    title: 'Direct Contact & Collaboration',
    tag: 'Muzaffarpur, Bihar · Available',
    href: '/contact',
    keywords: [
      'contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'hire',
      'available', 'availability', 'location', 'bihar', 'whatsapp', 'interview',
    ],
    sections: [
      {
        heading: 'Direct Channels',
        body: 'Personal email: adityapandey.adu@gmail.com · Work email: aditya.pandey@piramalswasthya.org · Phone: +91 8601862114.',
      },
      {
        heading: 'Code, Profiles & Location',
        body: 'GitHub: https://github.com/adityapandey2002 · LinkedIn: https://linkedin.com/in/adityapandey-a-fellow · Based in Muzaffarpur, Bihar, India (Hindi & English). Open to full-stack engineering, data engineering, applied AI, and digital public-health opportunities.',
      },
    ],
    followUps: [
      'Give me a recruiter summary of Aditya’s top projects.',
      'Which live sites can I inspect right now?',
    ],
    searchText:
      'Contact email phone adityapandey.adu@gmail.com aditya.pandey@piramalswasthya.org +91 8601862114 github.com/adityapandey2002 linkedin.com/in/adityapandey-a-fellow Muzaffarpur Bihar India Hindi English hire interview available.',
  },
];

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  ...PORTFOLIO_SYSTEMS.map(systemToKnowledgeDoc),
  ...CORE_PROFILE_DOCS,
];

// Precompute IDF across our portfolio corpus for crisp relevance ranking.
const DOC_TOKEN_SETS = KNOWLEDGE_DOCS.map((doc) => {
  const titleTokens = new Set(tokenize(`${doc.title} ${doc.keywords.join(' ')}`));
  const bodyTokens = tokenize(doc.searchText);
  const tf = new Map<string, number>();
  for (const tok of bodyTokens) {
    tf.set(tok, (tf.get(tok) ?? 0) + 1);
  }
  return { doc, titleTokens, tf, len: Math.max(bodyTokens.length, 1) };
});

const IDF = new Map<string, number>();
{
  const df = new Map<string, number>();
  for (const entry of DOC_TOKEN_SETS) {
    const seen = new Set<string>([...entry.titleTokens, ...entry.tf.keys()]);
    for (const tok of seen) {
      df.set(tok, (df.get(tok) ?? 0) + 1);
    }
  }
  const n = KNOWLEDGE_DOCS.length;
  for (const [tok, count] of df.entries()) {
    IDF.set(tok, Math.log((n + 1) / (count + 1)) + 1);
  }
}

export function retrievePortfolioContext(
  question: string,
  projectSlug?: string,
  topK = 3,
): KnowledgeDoc[] {
  const qLower = question.toLowerCase();
  const qTokens = tokenize(question);

  const scored = DOC_TOKEN_SETS.map((entry) => {
    let score = 0;

    if (projectSlug && entry.doc.projectSlug === projectSlug) {
      score += 40;
    }

    // Exact phrase boosts for key project/domain names
    if (entry.doc.title.toLowerCase().includes(qLower) && qLower.length >= 4) {
      score += 18;
    }
    for (const kw of entry.doc.keywords) {
      const k = kw.toLowerCase();
      if (k.length >= 3 && qLower.includes(k)) {
        score += 6;
      }
    }

    for (const tok of qTokens) {
      const idf = IDF.get(tok) ?? 1.2;
      if (entry.titleTokens.has(tok)) {
        score += 4.5 * idf;
      }
      const freq = entry.tf.get(tok) ?? 0;
      if (freq > 0) {
        score += (1 + Math.log(freq)) * idf;
      }
    }

    return { doc: entry.doc, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const positive = scored.filter((item) => item.score > 0).slice(0, topK).map((i) => i.doc);
  if (positive.length > 0) return positive;

  // Fallback to executive summary + top fellowship + flagship project
  return [
    CORE_PROFILE_DOCS[1], // overview
    CORE_PROFILE_DOCS[0], // fellowship
    KNOWLEDGE_DOCS[0], // biharkaswaad
  ].slice(0, topK);
}

export function buildGroundedAnswer(
  question: string,
  projectSlug?: string,
): GroundedAnswerResult {
  const matched = retrievePortfolioContext(question, projectSlug, 3);
  const primary = matched[0];
  const secondary = matched[1];

  const qLower = question.toLowerCase();
  const isCompareAll =
    /(all projects|list projects|compare|every project|flagship|best projects|top projects|recruiter|portfolio)/i.test(
      qLower,
    ) && !projectSlug;

  let blocks: { heading: string; body: string }[];

  if (isCompareAll) {
    const healthList = PORTFOLIO_SYSTEMS.filter((s) => s.category === 'health-ai')
      .map((s) => `${s.title} (${s.metrics[0]?.value} ${s.metrics[0]?.label})`)
      .join('; ');
    const techList = PORTFOLIO_SYSTEMS.filter((s) => s.category !== 'health-ai')
      .map((s) => `${s.title} (${s.metrics[0]?.value} ${s.metrics[0]?.label})`)
      .join('; ');

    blocks = [
      {
        heading: 'Public Health & Clinical AI Systems (4 Flagships)',
        body: `${healthList}. Built directly from Bihar field workflows with offline-first IndexedDB storage, AES-256-GCM encryption, bilingual voice AI, and 6-tier clinical escalation.`,
      },
      {
        heading: 'Live Commerce, Macro Data & Specialized Systems (6 Builds)',
        body: `${techList}. Highlights include 252,170+ global indicators with 97% fewer DB trips, HMAC SHA-256 verified Razorpay payments, and 327+ automated tests across Vitest, NestJS, and Playwright.`,
      },
      {
        heading: 'How to Explore Every Repository & Deep-Dive',
        body: 'Every project has its own detailed architecture page under Work & Systems (/work/[slug]) linked directly to its GitHub repository and docs/ folder, plus live site views for all 5 deployed web apps.',
      },
    ];
  } else {
    blocks = [...primary.sections];
    if (
      secondary &&
      secondary.id !== primary.id &&
      !projectSlug &&
      qLower.split(/\s+/).length >= 6 &&
      secondary.sections[0]
    ) {
      // Keep crisp 3-block rhythm; append brief cross-reference when second doc is strongly related
      blocks = [
        primary.sections[0],
        primary.sections[1] ?? secondary.sections[0],
        primary.sections[2] ?? secondary.sections[0],
      ];
    }
  }

  const answerText = blocks
    .map((b, idx) => `${idx + 1}. ${b.heading}\n${b.body}`)
    .join('\n\n');

  const sources: KnowledgeSource[] = [];
  const seenHref = new Set<string>();
  for (const doc of matched) {
    if (!seenHref.has(doc.href)) {
      seenHref.add(doc.href);
      sources.push({
        title: doc.title,
        href: doc.href,
        tag: doc.tag,
        external: doc.external,
      });
    }
    if (doc.projectSlug) {
      const sys = PORTFOLIO_SYSTEMS.find((s) => s.slug === doc.projectSlug);
      if (sys?.githubUrl && !seenHref.has(sys.githubUrl)) {
        seenHref.add(sys.githubUrl);
        sources.push({
          title: `GitHub: ${sys.repoName ?? sys.title}`,
          href: sys.githubUrl,
          tag: 'Source Repo',
          external: true,
        });
      }
    }
  }

  const followUps = Array.from(
    new Set([
      ...primary.followUps,
      ...(secondary?.followUps.slice(0, 1) ?? []),
    ]),
  ).slice(0, 3);

  return {
    answerText,
    sources: sources.slice(0, 4),
    followUps,
    matchedIds: matched.map((d) => d.id),
  };
}

export function buildKnowledgeSystemPrompt(docs: KnowledgeDoc[], extraContext: string[] = []): string {
  const chunks = [
    ...docs.map(
      (d) =>
        `[${d.title} | ${d.tag}]\n` +
        d.sections.map((s) => `- ${s.heading}: ${s.body}`).join('\n'),
    ),
    ...extraContext,
  ].join('\n\n---\n\n');

  return [
    'You are Aditya Pandey’s portfolio assistant. Answer clearly, accurately, and concisely using ONLY the verified context below.',
    'Format your answer as 2 to 3 numbered sections where each section starts with `1. Short Heading` on its own line followed by a concise, concrete paragraph on the next line, separated by a blank line. Do not use markdown bolding (`**`) or bullet lists inside paragraphs so it renders cleanly in structured cards.',
    'Never invent numbers, URLs, or credentials outside the context.',
    '',
    'VERIFIED PORTFOLIO CONTEXT:',
    chunks,
  ].join('\n');
}
