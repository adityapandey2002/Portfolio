import { AskClient } from './AskClient';

export const metadata = {
  title: 'Ask — Aditya Pandey',
  description: 'RAG chat over Aditya Pandey\'s resume, projects and field work, streamed by Groq.',
};

export default function AskPage() {
  return <AskClient />;
}
