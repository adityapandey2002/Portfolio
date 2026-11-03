'use client';

import { type ReactNode } from 'react';
import { ToasterProvider } from '@/hooks/useToaster';
import { PreloaderProvider } from '@/components/ui/Preloader';
import { CommandPaletteProvider } from '@/components/ui/CommandPalette';
import { Nav } from '@/components/ui/Nav';
import { PageShell } from '@/components/motion/PageShell';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToasterProvider>
      <PreloaderProvider>
        <CommandPaletteProvider>
          <Nav />
          <main className="relative z-10 pt-14">
            <PageShell>{children}</PageShell>
          </main>
        </CommandPaletteProvider>
      </PreloaderProvider>
    </ToasterProvider>
  );
}
