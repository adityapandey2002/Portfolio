import { BiharKaSwaadCase } from '@/components/projects/BiharKaSwaadCase';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'BiharKaSwaad — E-Commerce Case Study | Aditya Pandey',
  description:
    'How biharkaswaad.in was built end-to-end — Core Web Vitals, server-side SEO and JSON-LD, Razorpay payment integrity, order lifecycle, MySQL indexing and a 29/29 Playwright E2E suite.',
};

export default function BiharKaSwaadCaseStudyPage() {
  return (
    <>
      <BiharKaSwaadCase />
      <Footer />
    </>
  );
}
