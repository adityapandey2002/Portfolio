import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type WorkProjectStatus = 'LIVE' | 'Case study';

interface WorkProjectCardProps {
  number: string;
  title: string;
  desc: string;
  status: WorkProjectStatus;
  tech: string[];
  caseStudy: string;
  live?: string;
}

/*
 * V2 Work page project card — Neo-Brutalist shell.
 *
 * Brutalist contract (mirrors the V2 design system / Capabilities section):
 *   • 0px border-radius, thick 2px border, hard 4px offset shadow
 *   • Hover: slam up 4px, shadow collapses
 *   • Active: slam down 4px/4px, shadow gone
 *   • JetBrains Mono uppercase tracking-wider labels / chips
 *   • Space Grotesk titles, Inter body
 *   • Dark mode via Tailwind `dark:` variants (html.dark class)
 */

// Coloured chip borders, cycled across the tech stack so each chip reads
// as its own colour chip (light mode first, dark mode override).
const TECH_CHIP: string[] = [
  'border-[#ffcc00] text-[#ffcc00] dark:border-[#facc15] dark:text-[#facc15]', // accent yellow
  'border-[#e63b2e] text-[#e63b2e] dark:border-[#f97316] dark:text-[#f97316]',   // accent red
  'border-[#0055ff] text-[#0055ff] dark:border-[#3b82f6] dark:text-[#3b82f6]',   // accent blue
  'border-[#1a1a1a] text-[#1a1a1a] dark:border-[#ffffff] dark:text-[#ffffff]',   // primary
] as const;

const STATUS_CHIP: Record<WorkProjectStatus, string> = {
  LIVE: 'border-[#ffcc00] text-[#ffcc00] dark:border-[#facc15] dark:text-[#facc15]', // yellow
  'Case study': 'border-[#0055ff] text-[#0055ff] dark:border-[#3b82f6] dark:text-[#3b82f6]', // blue
};

export function WorkProjectCard({
  number,
  title,
  desc,
  status,
  tech,
  caseStudy,
  live,
}: WorkProjectCardProps) {
  return (
    <Card
      className={cn(
        'group',
        // Hard 4px offset shadow; white in dark so it reads on dark surfaces.
        'shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#ffffff]',
        // Hover: slam up + shadow collapses. Active: slam down + shadow gone.
        'hover:-translate-y-1 hover:shadow-none dark:hover:shadow-none',
        'active:translate-[4px_4px] active:shadow-none',
        'transition-all duration-150',
      )}
      padding="p-6"
    >
      <div className="flex flex-col gap-5">
        {/* Header row: project number badge + status badge */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary dark:text-ink-dark">
            {number}
          </span>
          <Chip variant="default" className={STATUS_CHIP[status]}>
            {status}
          </Chip>
        </div>

        {/* Title — Space Grotesk */}
        <h3 className="font-display font-bold text-[28px] lg:text-[38px] leading-[1.04] text-primary dark:text-ink-dark">
          {title}
        </h3>

        {/* Description — Inter */}
        <p className="mt-2 text-[15px] leading-relaxed text-primary dark:text-ink-dark font-sans">
          {desc}
        </p>

        {/* Tech stack chips — Chip component, small, coloured borders */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <Chip key={t} variant="default" className={TECH_CHIP[i % TECH_CHIP.length]}>
              {t}
            </Chip>
          ))}
        </div>

        {/* Action links — Button ghost variant */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            href={caseStudy}
            className="text-primary dark:text-ink-dark border-primary dark:border-white"
          >
            Case study
          </Button>
          {live && (
            <Button
              variant="ghost"
              size="sm"
              href={live}
              className="text-primary dark:text-ink-dark border-primary dark:border-white"
            >
              Open live site
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
