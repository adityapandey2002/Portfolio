import type { Config } from 'tailwindcss';

/**
 * V2 Bauhaus tokens.
 *
 * Every theme-dependent colour is a CSS variable holding RGB channels, so:
 *   - the utility names stay flat (`text-primary`, `bg-surface`, `bg-bg-2`)
 *   - the value swaps automatically under `html.dark`
 *   - opacity modifiers such as `border-primary/30` still work
 *
 * The actual values live in `src/app/globals.css` under `:root` / `html.dark`.
 */
const cssVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Theme-adaptive neutrals ──
        primary: cssVar('--v2-primary-rgb'),
        surface: cssVar('--v2-surface-rgb'),
        background: cssVar('--v2-surface-rgb'),
        'surface-lowest': cssVar('--v2-surface-lowest-rgb'),
        'surface-low': cssVar('--v2-surface-low-rgb'),
        'surface-container-lowest': cssVar('--v2-surface-lowest-rgb'),
        'surface-container-low': cssVar('--v2-surface-low-rgb'),
        'surface-container': cssVar('--v2-surface-container-rgb'),
        'surface-container-high': cssVar('--v2-surface-container-high-rgb'),
        'surface-container-highest': cssVar('--v2-surface-container-highest-rgb'),
        'surface-variant': cssVar('--v2-surface-container-high-rgb'),
        'surface-dim': cssVar('--v2-surface-dim-rgb'),
        'surface-bright': cssVar('--v2-surface-bright-rgb'),
        'surface-tint': cssVar('--v2-primary-rgb'),
        'on-surface': cssVar('--v2-on-surface-rgb'),
        'on-surface-variant': cssVar('--v2-on-surface-variant-rgb'),
        'on-background': cssVar('--v2-on-surface-rgb'),
        'on-primary': cssVar('--v2-on-primary-rgb'),
        outline: cssVar('--v2-outline-rgb'),
        'outline-variant': cssVar('--v2-outline-variant-rgb'),

        // ── Fixed "on dark" colours (terminal / inverted panels) ──
        'surface-dark': '#0e0e10',
        'surface-l1': '#1a1a1c',
        'surface-l2': '#2a2a2e',
        'dark-surface-dark': '#0e0e10',
        'dark-surface-l1': '#1a1a1c',
        'dark-primary': '#e5e1e4',
        'ink-dark': '#e5e1e4',
        /* Used as light text on the red contact / experience cards. */
        'surface-high': '#e8e3da',

        // ── Legacy aliases used by the V2 components ──
        bg: cssVar('--v2-surface-rgb'),
        'bg-2': cssVar('--v2-surface-low-rgb'),
        'bg-3': cssVar('--v2-surface-container-rgb'),
        ink: cssVar('--v2-on-surface-rgb'),
        'ink-2': cssVar('--v2-on-surface-variant-rgb'),
        'ink-3': cssVar('--v2-ink-3-rgb'),
        'ink-4': cssVar('--v2-ink-4-rgb'),
        accent: '#0055ff',
        indigo: '#166534',
        rose: '#c41e2a',
        cyan: '#92400e',

        // ── Theme-adaptive accents ──
        'accent-yellow': cssVar('--v2-accent-yellow-rgb'),
        'accent-red': cssVar('--v2-accent-red-rgb'),
        'accent-blue': cssVar('--v2-accent-blue-rgb'),
        'dark-accent-yellow': '#ffcc00',
        'primary-yellow': cssVar('--v2-accent-yellow-rgb'),
        vermilion: '#e63b2e',
        'electric-blue': '#0055ff',
        'on-accent-yellow': '#000000',
        'on-accent-red': '#ffffff',
        'on-accent-blue': '#ffffff',

        // ── Material-style semantic roles ──
        'primary-container': cssVar('--v2-accent-yellow-rgb'),
        'on-primary-container': cssVar('--v2-on-primary-container-rgb'),
        'primary-fixed': '#ffcc00',
        'primary-fixed-dim': '#e6b800',
        'on-primary-fixed': '#1a1a1a',
        'on-primary-fixed-variant': '#1a1a1a',

        secondary: cssVar('--v2-accent-red-rgb'),
        'secondary-container': '#ffdad6',
        'on-secondary-container': '#1a1a1a',
        'secondary-fixed': '#ffdad6',
        'secondary-fixed-dim': '#ffb3ab',
        'on-secondary': '#ffffff',
        'on-secondary-fixed': '#1a1a1a',
        'on-secondary-fixed-variant': '#1a1a1a',

        tertiary: cssVar('--v2-accent-blue-rgb'),
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

        'inverse-surface': '#1a1a1a',
        'inverse-on-surface': '#f5f0e8',
        'inverse-primary': '#f5f0e8',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        DEFAULT: '0px',
        0: '0px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        headline: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
    // `src/components/ui/Grid.tsx` builds this class dynamically.
    ...Array.from({ length: 12 }, (_, i) => `lg:grid-cols-${i + 1}`),
  ],
  plugins: [],
};

export default config;
