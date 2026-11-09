const SECTIONS = [
  { href: '#experience', label: 'Experience' },
  { href: '#systems', label: 'Systems' },
  { href: '#education', label: 'Education' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#vector-terminal', label: 'AI Terminal' },
  { href: '#dispatch', label: 'Contact' },
];

/**
 * HomeJumpNav — horizontally sliding section index placed after About.
 *
 * Mirrors the Work page project jump strip: a sticky, scrollable row of
 * brutalist tags that deep-link to the remaining Home sections.
 */
export function HomeJumpNav() {
  return (
    <nav
      aria-label="Jump to a home section"
      className="sticky top-16 z-40 border-y-2 border-outline bg-surface-container-high/95 px-4 py-2 backdrop-blur-md lg:top-24 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="shrink-0 bg-primary px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-yellow dark:bg-primary-yellow dark:text-black">
          JUMP //
        </span>
        {SECTIONS.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="shrink-0 border-2 border-outline bg-surface px-2.5 py-1 font-headline text-[10px] font-bold uppercase tracking-wider text-primary shadow-[2px_2px_0px_#1a1a1a] transition-colors hover:bg-primary hover:text-primary-container dark:shadow-[2px_2px_0px_#0e0e10] dark:hover:bg-primary-yellow dark:hover:text-black"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
