'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToasterProvider } from '@/hooks/useToaster';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { PreloaderProvider } from '@/components/ui/Preloader';
import { CommandPaletteProvider, usePalette } from '@/components/ui/CommandPalette';
import { FieldTourProvider } from '@/components/ui/FieldTour';
import { Cursor } from '@/components/ui/Cursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Nav } from '@/components/ui/Nav';
import { LiveToasts } from '@/components/realtime/LiveToasts';
import { PageShell } from '@/components/motion/PageShell';

function NavInner() {
  const { open } = usePalette();
  return <Nav onOpenPalette={open} />;
}

function EasterEggsActivator() {
  useEasterEggs({ infinite: true });
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToasterProvider>
        <PreloaderProvider>
          <CommandPaletteProvider>
            <FieldTourProvider>
              <div className="mesh-bg" aria-hidden />
              <div className="noise-overlay" aria-hidden />
              <Cursor />
              <ScrollProgress />
              <EasterEggsActivator />
              <NavInner />
              <LiveToasts />
              <main className="relative z-10">
                <PageShell>{children}</PageShell>
              </main>
            </FieldTourProvider>
          </CommandPaletteProvider>
        </PreloaderProvider>
      </ToasterProvider>
    </ThemeProvider>
  );
}
