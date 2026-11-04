import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ┌─────────────────────────────────────────────────────────────────┐
      // │  LIGHT MODE — Bauhaus Neo-Brutalist (from design files)        │
      // └─────────────────────────────────────────────────────────────────┘
      colors: {
        // ── Neutral / Surface (light) ──
        primary: '#1a1a1a',
        surface: '#f5f0e8',
        background: '#f5f0e8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2ede5',
        'surface-container': '#eee9e0',
        'surface-container-high': '#e8e3da',
        'surface-container-highest': '#e2ddd4',
        'surface-dim': '#d6d1c9',
        'surface-bright': '#faf7f2',
        'surface-variant': '#e8e3da',
        'surface-tint': '#1a1a1a',

        // ── On-Surface (light) ──
        'on-surface': '#1a1a1a',
        'on-surface-variant': '#4a4a4a',
        'on-background': '#1a1a1a',
        'on-primary': '#ffffff',

        // ── Accents (light) ──
        'accent-yellow': '#ffcc00',
        'accent-red': '#e63b2e',
        'accent-blue': '#0055ff',

        // ── On-accent (light) ──
        'on-accent-yellow': '#000000',
        'on-accent-red': '#ffffff',
        'on-accent-blue': '#ffffff',

        // ── Material Design 3 tokens (light) ──
        'primary-container': '#ffcc00',
        'on-primary-container': '#1a1a1a',
        'primary-fixed': '#ffcc00',
        'primary-fixed-dim': '#e6b800',
        'on-primary-fixed': '#1a1a1a',
        'on-primary-fixed-variant': '#1a1a1a',

        secondary: '#e63b2e',
        'secondary-container': '#ffdad6',
        'on-secondary-container': '#1a1a1a',
        'secondary-fixed': '#ffdad6',
        'secondary-fixed-dim': '#ffb3ab',
        'on-secondary': '#1a1a1a',
        'on-secondary-fixed': '#1a1a1a',
        'on-secondary-fixed-variant': '#1a1a1a',

        tertiary: '#0055ff',
        'tertiary-container': '#d6e3ff',
        'on-tertiary-container': '#1a1a1a',
        'tertiary-fixed': '#d6e3ff',
        'tertiary-fixed-dim': '#a8c6ff',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#1a1a1a',
        'on-tertiary-fixed-variant': '#1a1a1a',

        error: '#cc0000',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',

        // ── Inverse (light) ──
        'inverse-surface': '#1a1a1a',
        'inverse-on-surface': '#f5f0e8',
        'inverse-primary': '#f5f0e8',

        // ── Outline / Borders (light) ──
        outline: '#1a1a1a',
        'outline-variant': '#d0cbc3',

        // ── Legacy V1 tokens ──
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

        // ── Dark mode tokens (used with `dark:` prefix) ──
        // These are separate color names activated when `dark` class is on <html>.
        'dark-surface': '#131315',
        'dark-surface-dim': '#131315',
        'dark-surface-bright': '#39393b',
        'dark-surface-container-lowest': '#0e0e10',
        'dark-surface-container-low': '#1b1b1d',
        'dark-surface-container': '#201f21',
        'dark-surface-container-high': '#2a2a2c',
        'dark-surface-container-highest': '#353437',
        'dark-surface-variant': '#353437',

        'dark-on-surface': '#e5e1e4',
        'dark-on-surface-variant': '#d1c6ab',
        'dark-on-background': '#e5e1e4',

        'dark-primary': '#ffecb9',
        'dark-on-primary': '#e5e1e4',
        'dark-primary-container': '#facc15',
        'dark-on-primary-container': '#6c5700',
        'dark-inverse-primary': '#735c00',

        'dark-secondary': '#ffb690',
        'dark-on-secondary': '#552100',
        'dark-secondary-container': '#ec6a06',
        'dark-on-secondary-container': '#4a1c00',

        'dark-tertiary': '#e8edff',
        'dark-on-tertiary': '#002e6a',
        'dark-tertiary-container': '#bed1ff',
        'dark-on-tertiary-container': '#0055b9',

        'dark-error': '#ffb4ab',
        'dark-on-error': '#690005',
        'dark-error-container': '#93000a',
        'dark-on-error-container': '#ffdad6',

        'dark-primary-fixed': '#ffe083',
        'dark-primary-fixed-dim': '#eec200',
        'dark-on-primary-fixed': '#231b00',
        'dark-on-primary-fixed-variant': '#574500',

        'dark-secondary-fixed': '#ffdbca',
        'dark-secondary-fixed-dim': '#ffb690',
        'dark-on-secondary-fixed': '#341100',
        'dark-on-secondary-fixed-variant': '#783200',

        'dark-tertiary-fixed': '#d8e2ff',
        'dark-tertiary-fixed-dim': '#adc6ff',
        'dark-on-tertiary-fixed': '#001a42',
        'dark-on-tertiary-fixed-variant': '#004395',

        'dark-background': '#131315',
        'dark-inverse-surface': '#e5e1e4',
        'dark-inverse-on-surface': '#303032',

        'dark-outline': '#9a9078',
        'dark-outline-variant': '#4d4632',

        'dark-accent-yellow': '#facc15',
        'dark-accent-red': '#f97316',
        'dark-accent-blue': '#3b82f6',
        'dark-on-accent-yellow': '#000000',
        'dark-on-accent-red': '#ffffff',
        'dark-on-accent-blue': '#ffffff',

        'dark-ink-dark': '#e5e1e4',
      },
      borderRadius: {
        // Bauhaus / Neo-Brutalist: zero radius on every element by default.
        DEFAULT: '0px',
      },
      fontFamily: {
        // Inter = body, Space Grotesk = headlines/display, JetBrains Mono = labels/metrics.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        headline: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  // Safelisted because Grid.cols and Container.maxWidth build their classes
  // from template literals, which Tailwind's JIT extractor cannot scan.
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
    // Dark mode utility classes.
    'dark:border-white',
    'dark:bg-white',
    'dark:text-white',
    'dark:text-ink-dark',
    'dark:bg-surface-dark',
    'dark:bg-surface-l1',
    'dark:bg-surface-l2',
    'dark:bg-primary-yellow',
    'dark:text-primary-yellow',
    'dark:border-primary-yellow',
    'dark:bg-vermilion',
    'dark:text-vermilion',
    'dark:bg-electric-blue',
    'dark:text-electric-blue',
    'dark:shadow-[4px_4px_0_#ffffff]',
    'dark:shadow-[6px_6px_0_#ffffff]',
    'dark:shadow-[2px_2px_0_#ffffff]',
    // On-accent text colors
    'text-on-accent-yellow',
    'text-on-accent-red',
    'text-on-accent-blue',
    'dark:text-on-accent-yellow',
    'dark:text-on-accent-red',
    'dark:text-on-accent-blue',
    // On-primary text color
    'text-on-primary',
    'dark:text-on-primary',
  ],
  plugins: [],
};

export default config;
