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
    pills: ['React', 'Node', 'Express', 'MongoDB', 'WebSockets', 'Nginx', 'PM2', 'Git'],
  },
  {
    title: 'Fabrication & Innovation',
    pills: ['3D Printing', 'Rapid Prototyping', 'Sustainable Development'],
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
  courses?: string[];
}

export const certs: Cert[] = [
  {
    name: 'IBM Data Science Professional Certificate',
    issuer: 'IBM — 11 courses',
    icon: 'award',
    courses: [
      'What is Data Science?',
      'Tools for Data Science',
      'Data Science Methodology',
      'Python for Data Science, AI & Development',
      'Python Project for Data Science',
      'Databases and SQL for Data Science with Python',
      'Data Analysis with Python',
      'Data Visualization with Python',
      'Machine Learning with Python',
      'Applied Data Science Capstone',
      'Generative AI: Elevate Your Data Science Career',
    ],
  },
  { name: 'Data Analytics with Python', issuer: 'NPTEL', icon: 'bar' },
  { name: 'Data Mining Using R', issuer: 'NPTEL', icon: 'search' },
  { name: 'ESDP — Python-based Data Tools', issuer: 'MSME · Pondicherry', icon: 'code' },
];
