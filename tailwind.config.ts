import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
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
        // On-surface (light)
        'on-surface': '#1a1a1a',
        'on-surface-variant': '#4a4a4a',
        'on-background': '#1a1a1a',
        // Accents (light)
        'accent-yellow': '#ffcc00',
        'accent-red': '#e63b2e',
        'accent-blue': '#0055ff',
        // On-accent (light)
        'on-accent-yellow': '#000000',
        'on-accent-red': '#ffffff',
        'on-accent-blue': '#ffffff',
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

export default config;
