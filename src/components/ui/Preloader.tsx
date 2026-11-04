'use client';

import { createContext, useContext, type ReactNode } from 'react';

/**
 * Kept as a compatibility shim for components that still call
 * `usePreloader()`. The V1 six-second splash overlay was removed because
 * it is not part of the V2 Bauhaus design and it delayed every hard
 * navigation (including the theme being applied after reload).
 */
const PreloaderContext = createContext<{ done: boolean }>({ done: true });

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  return (
    <PreloaderContext.Provider value={{ done: true }}>
      {children}
    </PreloaderContext.Provider>
  );
}
