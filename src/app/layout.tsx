import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono, Lora } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const SITE = 'https://aditya-pandey.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
  description:
    'Portfolio of Aditya Pandey — Data Analyst, Full-Stack Developer & AI Practitioner. Gandhi Fellow at Piramal Foundation, working at the intersection of public health, applied AI, and the MERN stack.',
  keywords: [
    'Aditya Pandey', 'Data Analyst', 'Full-Stack Developer', 'Gandhi Fellow', 'Piramal Foundation',
    'Python', 'MERN', 'ODK', 'Public Health Data', 'Bihar', 'AI',
  ],
  authors: [{ name: 'Aditya Pandey' }],
  creator: 'Aditya Pandey',
  openGraph: {
    type: 'website',
    url: SITE,
    title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
    description: 'Data analyst, full-stack developer & AI practitioner building data systems in Bihar that turn field work into real decisions.',
    siteName: 'Aditya Pandey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
    description: 'Data analyst, full-stack developer & AI practitioner.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0e17',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cyberpunk" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrains.variable} ${lora.variable} bg-bg font-sans text-ink antialiased`}>
        <ScrollProgress />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
