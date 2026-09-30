'use client';

import { useMemo } from 'react';
import { PILLAR_LAYERS, type PillarLayer } from '@/lib/data/pillars';
import {
  AmbientBg,
  EnergyConduit,
  ChapterBlock,
  SectionHeading,
  HeroLayer,
  DualLayer,
  DomainStage,
  SystemScrub,
  CapabilityGrid,
} from './pillars';

export function PillarsOfWork() {
  const layers = useMemo(() => {
    const map = {} as Record<string, PillarLayer>;
    for (const layer of PILLAR_LAYERS) map[layer.id] = layer;
    return map;
  }, []);

  return (
    <section id="pillars" className="pillars-root relative">
      <AmbientBg />

      <ChapterBlock>
        <SectionHeading
          eyebrow="/* APPROACH */"
          title={
            <>
              The systems approach, <span className="text-gradient">layer by layer</span>
            </>
          }
          sub="Based on WHO building blocks of Health Systems — a holistic framework that connects community outcomes to system-level change. Scroll through, chapter by chapter."
        />
        <HeroLayer layer={layers.aim} />
      </ChapterBlock>

      <EnergyConduit />

      <ChapterBlock>
        <SectionHeading
          eyebrow={layers.outcomes.eyebrow}
          title={
            <>
              What we <span className="text-gradient">drive toward</span>
            </>
          }
          sub="Two outcome strands anchor every intervention in the field."
        />
        <DualLayer layer={layers.outcomes} />
      </ChapterBlock>

      <EnergyConduit />

      <DomainStage layer={layers.domains} />

      <EnergyConduit />

      <CapabilityGrid layer={layers.capabilities} />

      <EnergyConduit className="-mt-16" />

      <SystemScrub layer={layers['system-outcomes']} />

      <EnergyConduit />
    </section>
  );
}