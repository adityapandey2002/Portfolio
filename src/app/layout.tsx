import type { Metadata, Viewport } from 'next';
import {
  Bricolage_Grotesque,
  Fraunces,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MobileHeader } from '@/components/ui/MobileHeader';
import { MobileTabBar } from '@/components/ui/MobileTabBar';
import { DesktopNav } from '@/components/ui/DesktopNav';
import { AmbientBackground } from '@/components/three/AmbientBackground';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE = 'https://aditya-pandey-beryl.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
  description:
    'Portfolio of Aditya Pandey — Full-Stack Developer, Public Health Data Engineer & Applied AI Practitioner. Gandhi Fellow at Piramal Foundation building production web platforms, clinical AI, and data systems.',
  keywords: [
    'Aditya Pandey', 'Data Analyst', 'Full-Stack Developer', 'Gandhi Fellow', 'Piramal Foundation',
    'Python', 'Next.js', 'NestJS', 'FastAPI', 'ODK', 'Public Health Data', 'Bihar', 'Clinical AI',
  ],
  authors: [{ name: 'Aditya Pandey' }],
  creator: 'Aditya Pandey',
  openGraph: {
    type: 'website',
    url: SITE,
    title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
    description: 'Full-stack developer & public health data engineer building production systems in Bihar that turn field work into real decisions.',
    siteName: 'Aditya Pandey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Pandey — Field Data → Clean Insights → Real Decisions',
    description: 'Full-stack developer, public health data engineer & applied AI practitioner.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f5f0e8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint to avoid a light flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${bricolage.variable} ${fraunces.variable} ${jetbrainsMono.variable} bg-surface dark:bg-surface-dark font-sans text-primary dark:text-on-surface antialiased pt-16 lg:pt-24`}
      >
        <ThemeProvider>
          <MobileHeader />
          <MobileTabBar />
          <DesktopNav />
          <AmbientBackground />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
