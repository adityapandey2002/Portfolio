import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Lora, Outfit, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileHeader } from '@/components/ui/MobileHeader';
import { AmbientBackground } from '@/components/three/AmbientBackground';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollChaining } from '@/components/ScrollChaining';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// JetBrains Mono (labels). Kept alongside the legacy --font-jetbrains
// variable so existing V1 styles that reference it keep working.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

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
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cyberpunk" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} ${jetbrains.variable} ${lora.variable} bg-surface dark:bg-surface-dark font-sans text-primary dark:text-ink-dark antialiased pt-[4rem] lg:pt-0`}>
        <ThemeProvider>
          <MobileHeader />
          {/* V2 theme toggle lives in the header area of the shell. */}
          <AmbientBackground />
          <ThemeToggle />
          <ScrollProgress />
          <ScrollChaining />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
