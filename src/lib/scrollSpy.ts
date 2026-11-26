export interface SectionPosition {
  id: string;
  top: number;
}

/**
 * Determines which section is currently active based on each section's
 * viewport-relative `top` offset (`getBoundingClientRect().top`).
 *
 * Rules:
 * 1. If the user is within `bottomThreshold` pixels of the bottom of the
 *    document, activate the last section so short final sections (e.g. Contact)
 *    always highlight cleanly.
 * 2. Otherwise, pick the last section whose `top` is at or above `activationOffset`
 *    (typically header height + jump nav height + small breathing room).
 * 3. If the user is above all tracked sections (still in Hero/About), return
 *    the first section ID if `fallbackToFirst` is true, or null otherwise.
 */
export function computeActiveSection(
  sections: SectionPosition[],
  options: {
    activationOffset: number;
    scrollY: number;
    viewportHeight: number;
    documentHeight: number;
    bottomThreshold?: number;
    fallbackToFirst?: boolean;
  },
): string | null {
  if (sections.length === 0) return null;

  const {
    activationOffset,
    scrollY,
    viewportHeight,
    documentHeight,
    bottomThreshold = 48,
    fallbackToFirst = false,
  } = options;

  if (
    documentHeight > viewportHeight &&
    scrollY + viewportHeight >= documentHeight - bottomThreshold
  ) {
    return sections[sections.length - 1].id;
  }

  let active: string | null = null;
  for (const section of sections) {
    if (section.top <= activationOffset) {
      active = section.id;
    } else {
      break;
    }
  }

  if (active === null && fallbackToFirst) {
    return sections[0].id;
  }

  return active;
}

/**
 * Computes whether the top black status strip should collapse upward out of view.
 *
 * Uses a small hysteresis band (`showAt` vs `hideAfter`) so slight jitter near
 * the top never causes flickering:
 * - At or near the top (`scrollY <= showAt`): always visible (`false`).
 * - Once scrolled past `hideAfter`: hidden (`true`) so it glides away when the
 *   user scrolls downward.
 * - Between `showAt` and `hideAfter`: preserves current state.
 */
export function shouldHideStatusStrip(
  scrollY: number,
  currentlyHidden: boolean,
  options?: { showAt?: number; hideAfter?: number },
): boolean {
  const showAt = options?.showAt ?? 16;
  const hideAfter = options?.hideAfter ?? 36;

  if (scrollY <= showAt) return false;
  if (scrollY >= hideAfter) return true;
  return currentlyHidden;
}

/**
 * Computes normalized reading progress (0..1) through the page.
 */
export function computeScrollProgress(
  scrollY: number,
  viewportHeight: number,
  documentHeight: number,
): number {
  const maxScroll = documentHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  const ratio = scrollY / maxScroll;
  return Math.max(0, Math.min(1, ratio));
}
