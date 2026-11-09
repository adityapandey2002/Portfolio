'use client';

import { useState } from 'react';

const FILTERS = [
  { id: 'all', label: 'ALL SYSTEMS (07)' },
  { id: 'flagship', label: 'FLAGSHIPS #1-4' },
  { id: 'ecommerce', label: 'E-COMMERCE (01)' },
  { id: 'civic', label: 'CIVIC & CLINICAL (02)' },
  { id: 'data', label: 'MACRO DATA & AI (01)' },
  { id: 'specialized', label: 'HARDWARE & CAPSTONE (03)' },
] as const;

type FilterID = (typeof FILTERS)[number]['id'];

/**
 * Sticky project index filter from the Work design.
 *
 * Mirrors the design's `filterCategory()` behaviour: every project section
 * carries `data-category` tokens, and choosing a pill hides the cards whose
 * tokens do not include the active category. `all` restores everything.
 */
export function WorkFilterBar() {
  const [active, setActive] = useState<FilterID>('all');

  function filterCategory(category: FilterID) {
    setActive(category);
    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      const categories = (card.dataset.category ?? '').split(' ');
      card.style.display =
        category === 'all' || categories.includes(category) ? '' : 'none';
    });
  }

  return (
    <section className="sticky top-16 z-40 w-full border-b-2 border-primary bg-surface-container px-6 py-4 dark:border-outline dark:bg-surface-low lg:top-24 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary dark:text-primary-yellow">
            filter_alt
          </span>
          <span className="font-headline text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
            PROJECT INDEX FILTER:
          </span>
        </div>
        <div className="flex flex-wrap gap-2" id="filter-container">
          {FILTERS.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                className={`font-headline text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 shadow-[2px_2px_0px_#1a1a1a] transition-transform active:translate-x-0.5 active:translate-y-0.5 dark:shadow-[2px_2px_0px_#0e0e10] ${
                  isActive
                    ? 'border-primary bg-primary text-on-primary dark:border-primary-yellow dark:bg-primary-yellow dark:text-black'
                    : 'border-primary bg-surface text-primary hover:bg-primary-container hover:text-on-primary-container dark:border-outline dark:bg-surface-container dark:text-on-surface-variant dark:hover:border-primary-yellow dark:hover:text-primary-yellow'
                }`}
                onClick={() => filterCategory(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
