import { Footer } from '@/components/sections/Footer';

import { AskTerminal } from './AskTerminal';

export const metadata = {
  title: 'Ask AI — Aditya Pandey',
  description:
    'Ask the portfolio RAG brain — grounded answers about Aditya Pandey\'s experience, projects and skills, streamed word by word from the knowledge base via Groq.',
};

export default function AskPage() {
  return (
    <>
      <AskTerminal />
      <Footer />
    </>
  );
}
