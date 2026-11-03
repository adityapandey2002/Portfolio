import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { SelectedSystems } from '@/components/sections/SelectedSystems';
import { Education } from '@/components/sections/Education';
import { Pipeline } from '@/components/sections/Pipeline';
import { AiTerminal } from '@/components/sections/AiTerminal';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <div className="snap-section"><Hero /></div>
      <div className="snap-section"><About /></div>
      <div className="snap-section snap-section--tall"><Experience /></div>
      <div className="snap-section"><SelectedSystems /></div>
      <div className="snap-section"><Education /></div>
      <div className="snap-section"><Pipeline /></div>
      <div className="snap-section"><AiTerminal /></div>
      <div className="snap-section"><Contact /></div>

      <Footer />
    </>
  );
}
