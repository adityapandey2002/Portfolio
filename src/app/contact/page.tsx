import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Contact — Aditya Pandey',
  description: 'Get in touch with Aditya Pandey — data analyst, full-stack developer and Gandhi Fellow.',
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1500px] px-5 pt-32 lg:px-10">
        <span className="eyebrow">{'/* CONTACT */'}</span>
        <h1 className="mt-3 font-serif text-[clamp(38px,5vw,64px)] leading-[1.05] tracking-tight">
          Say <span className="text-gradient">hello</span>
        </h1>
        <p className="section-sub mt-3 max-w-[560px]">
          Whether it&apos;s a data role, a full-stack build, or something at the intersection of both — I reply fast.
        </p>
      </div>
      <Contact />
      <Footer />
    </>
  );
}
