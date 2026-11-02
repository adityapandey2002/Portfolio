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
 * - Persists the preference in localStorage under the key `theme`.
 * - Applies the `dark` class to <html> so Tailwind's `darkMode: 'class'`
 *   strategy picks up dark-mode variants.
 * - Defaults to light mode (no `dark` class).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // Hydrate from localStorage, defaulting to light mode.
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    const initial: Theme = (stored === 'light' || stored === 'dark'
      ? stored
      : 'light');
    setThemeState(initial);
    if (initial === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  // Apply the chosen theme to <html> and persist it.
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage unavailable; ignore.
    }
  }, [theme]);

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
