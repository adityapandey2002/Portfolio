import { PORTFOLIO_SYSTEMS, type PortfolioSystem, type SystemCategory } from './data/systems';

export type WorkFilterId = 'all' | SystemCategory;

export const WORK_FILTERS: { id: WorkFilterId; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'health-ai', label: 'Health & Clinical AI' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'data-ml', label: 'Data & ML' },
  { id: 'specialized', label: 'Full-Stack & Lab' },
];

export function filterSystems(
  systems: PortfolioSystem[],
  category: WorkFilterId,
  searchQuery = '',
): PortfolioSystem[] {
  const q = searchQuery.trim().toLowerCase();
  return systems.filter((sys) => {
    const matchesCategory = category === 'all' || sys.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      sys.title,
      sys.subtitle,
      sys.summary,
      sys.categoryLabel,
      sys.repoName ?? '',
      ...sys.stack,
      ...sys.recruiterHighlights,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getSystemBySlug(slug: string): PortfolioSystem | undefined {
  return PORTFOLIO_SYSTEMS.find((s) => s.slug === slug);
}

export function getAdjacentSystems(slug: string): {
  prev: PortfolioSystem | null;
  next: PortfolioSystem | null;
} {
  const idx = PORTFOLIO_SYSTEMS.findIndex((s) => s.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? PORTFOLIO_SYSTEMS[idx - 1] : null,
    next: idx < PORTFOLIO_SYSTEMS.length - 1 ? PORTFOLIO_SYSTEMS[idx + 1] : null,
  };
}

export function getHomeFeaturedSystems(): PortfolioSystem[] {
  return PORTFOLIO_SYSTEMS.filter((s) => s.featuredOnHome).slice(0, 3);
}

export function countByFilter(
  systems: PortfolioSystem[],
  category: WorkFilterId,
): number {
  if (category === 'all') return systems.length;
  return systems.filter((s) => s.category === category).length;
}
