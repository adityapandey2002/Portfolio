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
      'Ran the <strong>Live Action Project</strong> across Saraiya & Minapur CHCs — surfacing managerial gaps, coordination issues, and <strong>inventory data mismatches</strong> between physical logs and digital portals.',
      'Supported <strong>NQAS scorecards and facility readiness reviews</strong> — assisting with on-ground operational audits and action plans prepared for district leadership.',
      'Progressing through the <strong>SLDP → DTP → STP</strong> phases of the 2-year fellowship; cleaned and ranked <strong>regional datasets</strong> (Python · Jupyter · R) into analytical charts for internal monitoring.',
      'Used <strong>ODK Collect & ODK Central</strong> for field-level health data across VHSND, Godbharai, and PMSMA workflows — plus a <strong>Python-based cleaning & validation pipeline</strong>.',
      'Trained <strong>700+ ASHA workers</strong> hands-on on the M-ASHA government digital application.',
      'Co-organized a structured <strong>5-week, 185-hour Clinical Skills Refresher</strong> — 12 Staff Nurses + 4 Doctors.',
      'Supported <strong>scientific forecasting for medicine & equipment indenting</strong> and built capacity of facility staff for equitable, quality healthcare access.',
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
