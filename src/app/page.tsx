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
      <Hero />
      <About />
      <Experience />
      <SelectedSystems />
      <Education />
      <Pipeline />
      <AiTerminal />
      <Contact />

      <Footer />
    </>
  );
}
