export interface Experience {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  current: boolean;
  bullets: string[];
  tags: string[];
  muted?: boolean;
}

export const experience: Experience[] = [
  {
    role: 'GAVB — Gandhi Fellow · Health System Strengthening',
    org: 'Gandhi Fellowship (Global Alliance of Viksit Bharat) · Piramal Foundation · Bihar',
    period: 'Jul 2025 – Present',
    current: true,
    bullets: [
      'Frontline worker capacity building: trained <strong>700+ ASHA workers</strong> hands-on on the <strong>M-ASHA</strong> government digital application across <strong>100+ sessions</strong> — not one-time trainings, but sustained, patient sessions until the tool genuinely worked for each worker\u2019s daily use.',
      'Multi-level system support: worked as part of the <strong>district health support system</strong> across SHC, PHC, and district hospital levels — supporting facilities toward <strong>NQAS (National Quality Assurance Standards)</strong> certification.',
      'Supportive supervision of MCH programs: conducted <strong>supportive supervision for maternal and child health programs</strong> — immunization and <strong>PMSMA</strong> — observing service delivery on-ground and feeding structured feedback back to block and district levels.',
      'Sustained mentoring & training design: co-designed and delivered a structured <strong>185-hour Clinical Skills Refresher</strong> for 12 staff nurses and 4 doctors across a 5-week progressive curriculum — followed by <strong>monthly on-site audits</strong> to ensure practices were actually adopted, not just taught once.',
      'Data-to-decision pipeline: built a <strong>Python/Pandas workflow</strong> to clean and validate VHSND, Godbharai, and PMSMA field data collected via <strong>ODK Collect & ODK Central</strong> — producing MIS reports used in block and district review meetings.',
      'Field diagnostics: led a <strong>diagnostic project across multiple CHCs</strong>, surfacing inventory and coordination gaps between physical registers and digital portals — findings taken up by facility and district leadership for correction.',
    ],
    tags: ['ODK', 'NQAS', 'Python', 'MIS Reporting', 'Capacity Building'],
  },
  {
    role: 'Full-Stack Developer & Web In-Charge',
    org: 'BiharKaSwaad — Bihari Food E-Commerce',
    orgUrl: 'https://biharkaswaad.in/',
    period: 'Jul 2025 – Present',
    current: true,
    bullets: [
      'Built and deployed a <strong>production e-commerce platform (biharkaswaad.in)</strong> — catalog, cart, payments, shipping & support, end-to-end on Hostinger with PM2.',
      'Designed a <strong>secure Razorpay payment pipeline</strong> — HMAC SHA-256 verification, server-side amount re-validation, and webhook reconciliation.',
      'Engineered the <strong>full order lifecycle</strong> with variant-aware stock, courier tracking, and automated branded emails.',
      'Sole developer and <strong>ongoing web in-charge</strong>.',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Razorpay', 'PM2'],
  },
  {
    role: 'Full-Stack Web Developer Intern',
    org: 'Prodigy InfoTech · Remote',
    period: 'Jun – Jul 2025',
    current: false,
    bullets: [
      'Built and deployed <strong>production-ready MERN applications</strong> — secure authentication, scalable database models, and full CRUD APIs.',
      'Developed <strong>real-time, asynchronous communication apps</strong> with <strong>WebSockets</strong>.',
      'Applied <strong>agile development</strong> and managed source code with standard Git workflows via GitHub and the Cursor IDE.',
    ],
    tags: ['MERN', 'JWT', 'WebSockets', 'Agile', 'Git'],
  },
  {
    role: 'Open Source Developer',
    org: 'MinVayu · Auroville FabLab, Tamil Nadu',
    period: 'Sep – Nov 2024',
    current: false,
    bullets: [
      'Designed and tested <strong>large-format 3D printers</strong> built on open-source hardware for digital manufacturing.',
      'Worked on <strong>distributed, low-cost fabrication</strong> of eco-friendly structures using local materials — sand, rice husk, and slaked lime.',
    ],
    tags: ['3D Printing', 'Open Source', 'Sustainable Dev'],
    muted: true,
  },
];
