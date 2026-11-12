import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Contact — Aditya Pandey',
  description: 'Get in touch with Aditya Pandey — data analyst, full-stack developer and Gandhi Fellow.',
};

export default function ContactPage() {
  return (
    <>
      <Contact web3formsKey={process.env.WEB3FORMS_ACCESS_KEY} />
      <Footer />
    </>
  );
}
