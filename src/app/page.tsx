import { Hero } from '@/components/sections/Hero';
import { Impact } from '@/components/sections/Impact';
import { PipelineSection } from '@/components/sections/PipelineSection';
import { FieldSection } from '@/components/sections/FieldSection';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { BeyondField } from '@/components/sections/BeyondField';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { AiSection } from '@/components/sections/AiSection';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { PageRail } from '@/components/ui/PageRail';

export default function HomePage() {
  return (
    <>
      <PageRail />

      <div className="snap-section"><Hero /></div>
      <div className="snap-section"><Impact /></div>
      <div className="snap-section"><PipelineSection /></div>
      <div className="snap-section"><FieldSection /></div>
      <div className="snap-section"><About /></div>
      <div className="snap-section"><Experience /></div>
      <div className="snap-section"><Skills /></div>
      <div className="snap-section"><Education /></div>
      <div className="snap-section"><BeyondField /></div>
      <div className="snap-section"><ProjectGrid featured /></div>
      <div className="snap-section"><AiSection /></div>
      <div className="snap-section"><Contact /></div>

      <Footer />
    </>
  );
}
