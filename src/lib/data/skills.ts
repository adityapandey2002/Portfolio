export const skillBars = [
  { name: 'ODK Collect & Central', pct: 90 },
  { name: 'Data Cleaning (Python / Pandas)', pct: 87 },
  { name: 'SQL / SQLite', pct: 82 },
  { name: 'Dash / Plotly / Excel', pct: 80 },
  { name: 'Full-Stack (MERN)', pct: 78 },
  { name: 'REST APIs / JWT', pct: 76 },
  { name: 'AI Tools', pct: 72 },
];

export const radar = {
  labels: ['Data Analysis', 'Field Ops / ODK', 'Python & SQL', 'Full-Stack Dev', 'AI / ML Tools', 'DevOps'],
  data: [88, 90, 85, 78, 72, 70],
};

export const techCats = [
  {
    title: 'Data & Analysis',
    pills: ['Python', 'Pandas', 'SQLite', 'Dash', 'Plotly', 'Excel', 'Jupyter', 'R'],
  },
  {
    title: 'Field & Public Health',
    pills: ['ODK Collect', 'ODK Central', 'NQAS', 'DHIS2', 'MIS Reporting'],
  },
  {
    title: 'Full-Stack & DevOps',
    pills: ['React', 'Node', 'Express', 'MongoDB', 'WebSockets', 'Git'],
  },
  {
    title: 'Fabrication & Innovation',
    pills: ['3D Printing', 'Rapid Prototyping', 'Sustainable Development'],
  },
];

export interface SkillTheme {
  index: string;
  name: string;
  line: string;
  pills: string[];
  barLabel: string;
  barPct: number;
}

export const skillThemes: SkillTheme[] = [
  {
    index: '01',
    name: 'DATA SCIENCE',
    line: 'Raw field data → clean, decision-ready insight.',
    pills: ['Python', 'Pandas', 'NumPy', 'SQL / SQLite', 'Jupyter', 'R', 'Statistics', 'Dash', 'Plotly', 'Excel'],
    barLabel: 'Data Analysis',
    barPct: 87,
  },
  {
    index: '02',
    name: 'WEB DEVELOPER',
    line: 'Production apps, catalog to checkout, end-to-end.',
    pills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node', 'Express', 'MySQL', 'MongoDB', 'REST / JWT', 'WebSockets', 'Git', 'Docker', 'SEO'],
    barLabel: 'Full-Stack (MERN)',
    barPct: 78,
  },
  {
    index: '03',
    name: 'AI & AUTOMATION',
    line: 'Applied AI that ships — RAG chatbots to E2E suites.',
    pills: ['AI Tools', 'LLM / RAG', 'Groq', 'Prompt Engineering', 'Automation Scripts', 'Playwright E2E', 'Data Pipelines'],
    barLabel: 'AI / Automation',
    barPct: 74,
  },
  {
    index: '04',
    name: 'COMMUNITY & LEADERSHIP',
    line: 'Training, facilitation and coordination that move people and systems.',
    pills: ['Community Engagement', 'ASHA & Frontline Training', 'Facilitation', 'NQAS / MIS Reporting', 'Stakeholder Coordination', 'Leadership', 'Program Delivery'],
    barLabel: 'Field Leadership',
    barPct: 88,
  },
];

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'Pondicherry University', year: 'Aug 2023 – May 2025' },
  { degree: 'Master of Arts, Political Science & Government', school: 'Prof. Rajendra Singh (Rajju Bhaiya) University · Prayagraj', year: 'Aug 2022 – Jun 2023' },
  { degree: 'Bachelor of Science, Mathematics', school: 'Dr. Rammanohar Lohia Avadh University, Ayodhya', year: '2019 – 2022' },
];

export interface Cert {
  name: string;
  issuer: string;
  icon: string;
}

export const certs: Cert[] = [
  {
    name: 'IBM Data Science Professional Certificate',
    issuer: 'IBM',
    icon: 'award',
  },
  { name: 'Data Analytics with Python', issuer: 'NPTEL', icon: 'bar' },
  { name: 'Data Mining Using R', issuer: 'NPTEL', icon: 'search' },
  { name: 'ESDP — Python-based Data Tools', issuer: 'MSME · Pondicherry', icon: 'code' },
];