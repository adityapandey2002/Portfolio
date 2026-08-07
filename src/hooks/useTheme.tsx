'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { THEMES, type Theme } from '@/lib/data/profile';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'cyberpunk',
  setTheme: () => {},
  cycle: () => {},
});

export const HEALTH_ROUTES = ['/health'];

export function themeForPath(pathname: string | null): Theme {
  if (pathname && HEALTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))) return 'light';
  return 'cyberpunk';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setThemeState] = useState<Theme>('cyberpunk');

  useEffect(() => {
    const t = themeForPath(pathname);
    document.documentElement.setAttribute('data-theme', t);
    setThemeState(t);
    try {
      localStorage.setItem('theme', t);
    } catch {
      // ignore
    }
  }, [pathname]);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    setThemeState(t);
  }, []);

  const cycle = useCallback(() => {
    // Themes are area-locked: cyberpunk outside /health, health on /health.
    const t = themeForPath(window.location.pathname);
    document.documentElement.setAttribute('data-theme', t);
    setThemeState(t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}