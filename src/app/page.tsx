import { Hero } from '@/components/sections/Hero';
import { Pipeline } from '@/components/sections/Pipeline';
import { Capabilities } from '@/components/sections/Capabilities';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { BeyondField } from '@/components/sections/BeyondField';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { AiSection } from '@/components/sections/AiSection';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>

      <div className="snap-section"><Hero /></div>
      <div className="snap-section"><Pipeline /></div>
      <div className="snap-section"><Capabilities /></div>
      <div className="snap-section"><About /></div>
      <div className="snap-section snap-section--tall"><Experience /></div>
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
