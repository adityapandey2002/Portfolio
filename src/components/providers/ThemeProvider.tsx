'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * V2 Bauhaus theme context.
 *
 * The saved theme is applied by the inline script in `layout.tsx` before
 * hydration, so there is no light flash and no race between "read stored
 * value" and "write default value" effects. This provider only mirrors the
 * class that is already on <html> and persists later user changes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [ready, setReady] = useState(false);

  // Adopt whatever the pre-hydration script already applied.
  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setThemeState(initial);
    setReady(true);
  }, []);

  // Persist and apply only after the initial theme has been adopted.
  useEffect(() => {
    if (!ready) return;
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage unavailable; ignore.
    }
  }, [theme, ready]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
