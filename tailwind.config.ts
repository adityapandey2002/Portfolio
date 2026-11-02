import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // V2 Bauhaus design tokens — light mode
        primary: '#1a1a1a', // near-black
        surface: '#f5f0e8', // warm off-white background
        'accent-yellow': '#ffcc00',
        'accent-red': '#e63b2e',
        'accent-blue': '#0055ff',
        // V2 Bauhaus design tokens — dark mode (Obsidian Bauhaus Brutalism)
        // Applied through Tailwind's `dark:` utilities (darkMode: 'class').
        'surface-dark': '#131315',
        'surface-l1': '#1a1a1e',
        'surface-l2': '#222226',
        'primary-yellow': '#facc15',
        vermilion: '#f97316',
        'electric-blue': '#3b82f6',
        'ink-dark': '#e5e1e4',
        // V1 tokens retained for compatibility with existing pages.
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        accent: 'var(--accent)',
        indigo: 'var(--indigo)',
        rose: 'var(--rose)',
        cyan: 'var(--cyan)',
      },
      borderRadius: {
        // Bauhaus / Neo-Brutalist: zero radius on every element by default.
        DEFAULT: '0px',
      },
      fontFamily: {
        // Inter = body, Space Grotesk = headlines/display, JetBrains Mono = labels.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
    },
  },
  // Safelisted because Grid.cols and Container.maxWidth build their classes
  // from template literals, which Tailwind's JIT extractor cannot scan.
  // Static strings are always emitted; patterns only match detected classes.
  safelist: [
    // Grid `cols` prop — desktop column count (1–12).
    'lg:grid-cols-1',
    'lg:grid-cols-2',
    'lg:grid-cols-3',
    'lg:grid-cols-4',
    'lg:grid-cols-5',
    'lg:grid-cols-6',
    'lg:grid-cols-7',
    'lg:grid-cols-8',
    'lg:grid-cols-9',
    'lg:grid-cols-10',
    'lg:grid-cols-11',
    'lg:grid-cols-12',
    // Container `maxWidth` prop.
    'max-w-xs',
    'max-w-sm',
    'max-w-md',
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-3xl',
    'max-w-4xl',
    'max-w-5xl',
    'max-w-6xl',
    'max-w-7xl',
  ],
  plugins: [],
};

export default config;
