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

export interface PillarOutcome {
  label: string;
  value: string;
  foot?: string;
}

export interface PillarActivity {
  label: string;
  note?: string;
}

export interface PillarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  color?: string;
  outcomes?: PillarOutcome[];
  activities?: PillarActivity[];
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
        color: 'var(--rose)',
      },
      {
        id: 'domain-nutrition',
        label: 'Nutrition',
        icon: Apple,
        desc: 'Addressing malnutrition through VHSND data quality, community-based nutrition monitoring, and frontline worker training on growth tracking and supplementary feeding.',
        color: 'var(--accent)',
      },
      {
        id: 'domain-repro',
        label: 'Reproductive & Adolescent Health',
        icon: UsersRound,
        desc: 'Ensuring access to reproductive health services, adolescent wellness programs, and family planning support across community and facility levels.',
        color: 'var(--indigo)',
      },
      {
        id: 'domain-communicable',
        label: 'Communicable Diseases',
        icon: Bug,
        desc: 'Strengthening surveillance, reporting, and response systems for communicable disease control — from detection at the community level to district-level coordination.',
        color: 'var(--cyan)',
      },
      {
        id: 'domain-emergency',
        label: 'Emergency & Specialty Services',
        icon: Siren,
        desc: 'Improving emergency referral systems, specialty care access, and critical care readiness at CHC and district hospital levels.',
        color: 'var(--primary)',
      },
    ],
  },
  {
    id: 'system-outcomes',
    eyebrow: '/* 6 BUILDING BLOCKS */',
    title: 'WHO building blocks we strengthen',
    style: 'grid-6',
    items: [
      {
        id: 'so-delivery',
        label: 'Service Delivery',
        icon: Stethoscope,
        desc: 'Supporting facilities to deliver quality, accessible care at every tier — from community-level sessions to first-referral unit readiness.',
        activities: [
          { label: 'NQAS Support' },
          { label: 'FRU Strengthening' },
        ],
      },
      {
        id: 'so-hrh',
        label: 'Health Workforce',
        icon: UsersRound,
        desc: 'Sharpening the people side of the system — staffing gaps against sanctioned cadre and structured capacity building for the frontline.',
        activities: [
          { label: 'HR availability & gap analysis', note: 'vs sanctioned cadre · urgent need' },
          { label: 'Capacity building', note: 'NQAS/LASHYA · FRU · RMNCHA+ · Jeevandeep clinical refreshers · PLC leadership · FP Pakhwara' },
        ],
      },
      {
        id: 'so-his',
        label: 'Health Information System',
        icon: Database,
        desc: 'Making the data chain reliable — from HMIS validation to portal adoption, so decisions run on evidence, not assumption.',
        activities: [
          { label: 'DHSMRM & HMIS', note: 'data validation review meetings' },
          { label: 'Portal adoption', note: 'Bhavya · DVDMS · M-ASHA · FPLMIS' },
        ],
      },
      {
        id: 'so-procurement',
        label: 'Access to Medicines & Supplies',
        icon: Package,
        desc: 'Keeping the shelves stocked — tracking availability, catching stock-outs, and forecasting scientifically instead of by feel.',
        activities: [
          { label: 'Essential drug availability' },
          { label: 'Stock-out tracking' },
          { label: 'Scientific forecasting & quarterly indent' },
        ],
      },
      {
        id: 'so-financing',
        label: 'Health Financing',
        icon: Coins,
        desc: 'Making funds flow and get used — reviewing finances at facility and block level so budget reaches impact.',
        activities: [
          { label: 'VHSNC / JAS / RKS funds', note: 'availability & utilization' },
          { label: 'Block facility financial reviews' },
          { label: 'NHM total budget utilization' },
        ],
      },
      {
        id: 'so-governance',
        label: 'Leadership & Governance',
        icon: Landmark,
        desc: 'Strengthening the meetings, structures and community platforms that hold the system accountable.',
        activities: [
          { label: 'DHSMRM conducted', note: 'DM participation · MPCDSR review' },
          { label: 'JAS / VHSNC activation', note: 'GPPFT meetings' },
          { label: 'Community events', note: 'Gram Chaupal · Godbharai · Complementary feeding · VHSND' },
        ],
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
