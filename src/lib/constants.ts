/**
 * Centralized magic numbers and configuration constants
 * Extracted from components to improve maintainability
 */

// Scroll / Animation Constants
export const SCROLL = {
  // useStageStepper
  STEP: 160,
  GESTURE_GAP: 160,
  PINNED_TOP_OFFSET: 24,

  // ScrollChaining
  PANEL_NOISE: 12,
  WHEEL_NOISE: 8,
  MIN_NOTCH: 40,
  QUIET: 110,
  EPS: 8,
  QUEUE_SCREENS: 2,
  MAGNET_NEAR: 0.4,
  MAGNET_FAR: 0.75,
  STALE: 0.15,
} as const;

// Preloader Constants
export const PRELOADER = {
  DURATION: 2000, // was 5800ms, reduced for better UX
  ANIMATION_DURATION: 2000, // was 5650ms
  DOT_DELAY_BASE: 0.35,
  DOT_DELAY_STEP: 0.16,
  BAR_DELAY_BASE: 3.6,
  BAR_DELAY_STEP: 0.16,
  TITLE_DELAYS: [1.3, 2.7, 4.1],
} as const;

// Cursor Constants
export const CURSOR = {
  RING_TAU: 0.04, // time constant in seconds
  RING_MAX: 24, // max lag in layout px
  LERP_FACTOR: 0.18, // legacy per-frame easing (replaced by RING_TAU)
} as const;

// Contact / Interaction Constants
export const CONTACT = {
  TRANSFORM_DISTANCE_THRESHOLDS: [0, 140],
  MAX_TRANSFORM_Y: 12,
  MAX_TRANSFORM_X: 8,
  MAX_SCALE: 1.08,
} as const;

// Animation Easing
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Three.js Constants
export const THREE = {
  DPR_MAX: 1.5,
  SPHERE_SUBDIVISIONS: 16, // was 24
  SPARKLES_PRIMARY_COUNT: 24, // was 60
  SPARKLES_SECONDARY_COUNT: 12, // was 28
} as const;

// Glide Engine Constants (from glideEngine.ts)
export const GLIDE = {
  OMEGA: 24, // rad/s
  VEL_MAX: 30000, // px/s
  NOISE: 8,
  MIN_NOTCH: 40,
  QUIET: 110, // ms
  EPS: 8, // px
  QUEUE_SCREENS: 2,
  MAGNET_NEAR: 0.4,
  MAGNET_FAR: 0.75,
  STALE: 0.15, // s
} as const;

// Navigation / Layout Constants
export const LAYOUT = {
  NAV_HEIGHT: 48, // px
  ZOOM_INV: 1.25, // for 0.8 zoom
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
} as const;