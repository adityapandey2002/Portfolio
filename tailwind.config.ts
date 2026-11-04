import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Neutral / Surface ──
      colors: {
        primary: '#1a1a1a',
        surface: '#f5f0e8',
        background: '#f5f0e8',
        'surface-container-lowest': {
          light: '#ffffff',
          dark: '#2a2a2a',
        },
        'surface-container-low': {
          light: '#f2ede5',
          dark: '#3a3a3a',
        },
        'surface-container': {
          light: '#eee9e0',
          dark: '#3a3a3a',
        },
        'surface-container-high': {
          light: '#e8e3da',
          dark: '#4a4a4a',
        },
        'surface-container-highest': {
          light: '#e2ddd4',
          dark: '#5a5a5a',
        },
        'surface-dim': '#d6d1c9',
        'surface-bright': '#faf7f2',
        'surface-variant': '#e8e3da',
        'surface-tint': '#1a1a1a',

        // ── On-Surface ──
        'on-surface': '#1a1a1a',
        'on-surface-variant': '#4a4a4a',
        'on-background': '#1a1a1a',

        // ── Accents ──
        'accent-yellow': '#ffcc00',
        'accent-red': '#e63b2e',
        'accent-blue': '#0055ff',

        // ── On-accent ──
        'on-accent-yellow': '#000000',
        'on-accent-red': '#ffffff',
        'on-accent-blue': '#ffffff',

        // ── Material Design 3 tokens ──
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
        'tertiary-fixed-dim': '#adc6ff',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#1a1a1a',
        'on-tertiary-fixed-variant': '#1a1a1a',

        error: '#cc0000',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',

        // ── Inverse ──
        'inverse-surface': '#1a1a1a',
        'inverse-on-surface': '#f5f0e8',
        'inverse-primary': '#f5f0e8',

        // ── Outline / Borders ──
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
      },
      borderRadius: {
        DEFAULT: '0px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        headline: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
    // Grid columns
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
    // Container max-width
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
    // Dark mode utility classes
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