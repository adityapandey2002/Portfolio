export const profile = {
  name: 'Aditya Pandey',
  initials: 'AP',
  tagline: 'Field Data → Clean Insights → Real Decisions',
  role: 'Data Analyst · Full-Stack Developer · AI Practitioner',
  headlineLines: ['Building', 'data systems', 'that turn', 'field work', 'into', 'real decisions.'],
  heroStatus: 'Open to opportunities · Gandhi Fellow at Piramal Foundation',
  heroSub: {
    intro: "I'm ",
    name: 'Aditya Pandey',
    body: ' — a data analyst & full-stack developer working at the intersection of ',
    highlights: ['public health', 'applied AI', 'and the MERN stack'],
    tail: '.',
  },
  location: 'Muzaffarpur, Bihar, India',
  coordinates: '26.1222° N · 85.3905° E',
  emails: {
    personal: 'adityapandey.adu@gmail.com',
    work: 'aditya.pandey@piramalswasthya.org',
  },
  phone: '+91 8601862114',
  github: 'https://github.com/adityapandey2002/',
  linkedin: 'https://www.linkedin.com/in/adityapandey-a-fellow',
  liveSite: 'https://biharkaswaad.in/',
  degrees: {
    highest: 'MCA · 2025',
    school: 'Pondicherry University',
  },
  languages: 'Hindi · English',
  availability: 'Immediately',
  quickFacts: [
    { k: 'Education', v: 'MCA · 2025' },
    { k: 'Current role', v: 'GAVB — Gandhi Fellow' },
    { k: 'Organization', v: 'Piramal Foundation' },
    { k: 'Base', v: 'Muzaffarpur, Bihar' },
    { k: 'Hometown', v: 'Pratapgarh, Uttar Pradesh' },
    { k: 'Focus', v: 'Data · Dev · AI' },
    { k: 'Primary stack', v: 'Python · SQL · MERN' },
    { k: 'Field tool', v: 'ODK Collect' },
    { k: 'Languages', v: 'Hindi · English' },
    { k: 'Available', v: 'Immediately' },
  ],
  tags: ['📍 Muzaffarpur, Bihar', 'MCA — Pondicherry University', 'IBM Data Science', 'Open to Opportunities'],
  aboutParagraphs: [
    "I'm a <strong>public health data professional</strong> and <strong>full-stack developer</strong> currently working as a <span class='hi'>GAVB Gandhi Fellow with Piramal Foundation</span> in Bihar. My day starts in the field — coordinating with ASHA workers, ANMs, PHC/CHC staff, and district officials — and ends with <strong>Python scripts, SQL queries, and data pipelines</strong> that turn raw field data into decisions. I'm based in Muzaffarpur, Bihar; home is Pratapgarh, Uttar Pradesh.",
    'I work across the entire data lifecycle: from <strong>ODK Collect & ODK Central</strong> forms in the field, through cleaning and validation in Python, to MIS reports that land on the desks of district officials. Outside of health data, I\'ve built and deployed <strong>production MERN stack apps</strong> with JWT auth, REST APIs, Nginx, and PM2 — and I use AI tools daily to sharpen both workflows.',
    "My edge is simple: I've <strong>actually been in the field</strong>, so I know what the data means before it ever hits a spreadsheet.",
  ],
  fieldQuote: "I've stood next to an ASHA worker filling an ODK form on a tablet in 38°C heat. Every pipeline I build starts with that moment.",
  fieldAuthor: '— Aditya Pandey · Muzaffarpur, Bihar',
  impact: [
    { label: 'ASHA Workers Trained', value: 700, suffix: '+', foot: '↑ On the M-ASHA app', up: true },
    { label: 'VHSND Sessions', value: 100, suffix: '+', foot: '↑ Field sessions QC’d', up: true },
    { label: 'PMSMA Supportive Supervision', value: 30, suffix: '+', foot: '↑ Supervisions done', up: true },
    { label: 'Clinical Refresher Hours', value: 185, suffix: '+', foot: '↑ 5-week clinical program', up: true },
  ],
  mapStats: [
    { id: 'asha', label: 'ASHA Trained', value: 700, suffix: '+' },
    { id: 'blocks', label: 'Blocks', value: 16, suffix: '' },
  ],
} as const;

export const THEMES = ['light', 'cyberpunk'] as const;
export type Theme = (typeof THEMES)[number];
