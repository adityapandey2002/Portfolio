import {
  HeartPulse,
  Apple,
  Users,
  Bug,
  Siren,
  Stethoscope,
  UsersRound,
  Package,
  Coins,
  Landmark,
  Database,
  Crown,
  MonitorSmartphone,
  UserCheck,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export interface PillarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  color?: string;
}

export interface PillarLayer {
  id: string;
  eyebrow: string;
  title: string;
  items: PillarItem[];
  style: 'hero' | 'dual' | 'grid-5' | 'grid-6' | 'grid-4';
}

export const PILLAR_LAYERS: PillarLayer[] = [
  {
    id: 'aim',
    eyebrow: '/* OVERALL AIM */',
    title: 'Strengthening Public Health Systems',
    style: 'hero',
    items: [
      {
        id: 'aim-main',
        label: 'Strengthening Public Health Systems',
        icon: HeartPulse,
        desc: 'Deploying a proven holistic approach to systems change to support the transformation of the public health system across states — based on WHO building blocks of Health Systems.',
      },
    ],
  },
  {
    id: 'outcomes',
    eyebrow: '/* TWO OUTCOMES */',
    title: 'What we drive toward',
    style: 'dual',
    items: [
      {
        id: 'outcome-community',
        label: 'Community Outcomes',
        icon: Users,
        desc: 'Improved health behaviors, service utilization, and citizen experience within communities — making health systems work for the people they serve.',
        color: 'var(--primary)',
      },
      {
        id: 'outcome-delivery',
        label: 'Service Delivery',
        icon: Stethoscope,
        desc: 'Enhanced health service delivery, supported by the right people and systems at the right time — ensuring facilities deliver quality care consistently.',
        color: 'var(--cyan)',
      },
    ],
  },
  {
    id: 'domains',
    eyebrow: '/* 5 WORK DOMAINS */',
    title: 'Where we work',
    style: 'grid-5',
    items: [
      {
        id: 'domain-mch',
        label: 'Maternal, Neonatal & Child Health',
        icon: HeartPulse,
        desc: 'Reducing maternal and neonatal mortality through facility strengthening, ASHA capacity building, PMSMA support, and immunization program supervision.',
      },
      {
        id: 'domain-nutrition',
        label: 'Nutrition',
        icon: Apple,
        desc: 'Addressing malnutrition through VHSND data quality, community-based nutrition monitoring, and frontline worker training on growth tracking and supplementary feeding.',
      },
      {
        id: 'domain-repro',
        label: 'Reproductive & Adolescent Health',
        icon: UsersRound,
        desc: 'Ensuring access to reproductive health services, adolescent wellness programs, and family planning support across community and facility levels.',
      },
      {
        id: 'domain-communicable',
        label: 'Communicable Diseases',
        icon: Bug,
        desc: 'Strengthening surveillance, reporting, and response systems for communicable disease control — from detection at the community level to district-level coordination.',
      },
      {
        id: 'domain-emergency',
        label: 'Emergency & Specialty Services',
        icon: Siren,
        desc: 'Improving emergency referral systems, specialty care access, and critical care readiness at CHC and district hospital levels.',
      },
    ],
  },
  {
    id: 'system-outcomes',
    eyebrow: '/* 6 SYSTEM OUTCOMES */',
    title: 'WHO building blocks we strengthen',
    style: 'grid-6',
    items: [
      {
        id: 'so-delivery',
        label: 'Service Delivery',
        icon: Stethoscope,
        desc: 'Ensuring quality, accessible health services are delivered consistently across SHC, PHC, and CHC levels — from immunization to emergency care.',
      },
      {
        id: 'so-hrh',
        label: 'HRH Structures & Capacities',
        icon: UsersRound,
        desc: 'Building the capacity of ASHA workers, nurses, doctors, and block-level staff through structured training, mentoring, and supportive supervision.',
      },
      {
        id: 'so-procurement',
        label: 'Procurement & Supply Chain',
        icon: Package,
        desc: 'Strengthening medicine and equipment availability — diagnosing inventory gaps, improving forecasting, and ensuring facilities have what they need.',
      },
      {
        id: 'so-financing',
        label: 'Strategic Financing & Budgeting',
        icon: Coins,
        desc: 'Supporting efficient allocation and utilization of health funds — ensuring resources reach where they are most needed for maximum impact.',
      },
      {
        id: 'so-governance',
        label: 'Governance',
        icon: Landmark,
        desc: 'Strengthening district and block health governance — NQAS certification support, review meeting systems, and accountability frameworks.',
      },
      {
        id: 'so-data',
        label: 'Information & Data Systems',
        icon: Database,
        desc: 'Building robust data pipelines — from ODK field collection through MIS reporting — so decisions are driven by evidence, not assumption.',
      },
    ],
  },
  {
    id: 'capabilities',
    eyebrow: '/* 4 KEY CAPABILITIES */',
    title: 'How we enable change',
    style: 'grid-4',
    items: [
      {
        id: 'cap-leadership',
        label: 'Leadership & Institutions',
        icon: Crown,
        desc: 'Ensuring compassionate, skilled health workers and systems are in place — building institutional capacity that outlasts any individual intervention.',
        color: 'var(--accent)',
      },
      {
        id: 'cap-digitization',
        label: 'Digitization',
        icon: MonitorSmartphone,
        desc: 'Transforming public health systems and processes through digital tools — M-ASHA, ODK Central, and data dashboards that turn field activity into actionable insight.',
        color: 'var(--cyan)',
      },
      {
        id: 'cap-inclusion',
        label: 'Inclusion',
        icon: UserCheck,
        desc: 'Amplifying tribal voices and ownership — ensuring marginalized communities are not just beneficiaries but active participants in shaping their health systems.',
        color: 'var(--indigo)',
      },
      {
        id: 'cap-decentralization',
        label: 'Decentralization',
        icon: MapPin,
        desc: 'Enabling co-creation of localized solutions — because health systems that work in one block may need adaptation for another. Local context drives local design.',
        color: 'var(--rose)',
      },
    ],
  },
];
