import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeActiveSection,
  computeScrollProgress,
  shouldHideStatusStrip,
} from './scrollSpy';

const SAMPLE_SECTIONS = [
  { id: 'experience', top: 600 },
  { id: 'systems', top: 1400 },
  { id: 'education', top: 2300 },
  { id: 'pipeline', top: 3100 },
  { id: 'vector-terminal', top: 4000 },
  { id: 'dispatch', top: 4900 },
];

test('computeActiveSection returns null above all sections when fallback is false', () => {
  const active = computeActiveSection(SAMPLE_SECTIONS, {
    activationOffset: 200,
    scrollY: 0,
    viewportHeight: 900,
    documentHeight: 6000,
  });
  assert.equal(active, null);
});

test('computeActiveSection highlights the section that most recently crossed the offset', () => {
  const shifted = SAMPLE_SECTIONS.map((s) => ({ ...s, top: s.top - 1300 }));
  const active = computeActiveSection(shifted, {
    activationOffset: 200,
    scrollY: 1300,
    viewportHeight: 900,
    documentHeight: 6000,
  });
  assert.equal(active, 'systems');
});

test('computeActiveSection clamps to final section near bottom of page', () => {
  const shifted = SAMPLE_SECTIONS.map((s) => ({ ...s, top: s.top - 4200 }));
  const active = computeActiveSection(shifted, {
    activationOffset: 200,
    scrollY: 5080,
    viewportHeight: 900,
    documentHeight: 6000,
  });
  assert.equal(active, 'dispatch');
});

test('shouldHideStatusStrip collapses on downward scroll and restores at top with hysteresis', () => {
  assert.equal(shouldHideStatusStrip(0, false), false);
  assert.equal(shouldHideStatusStrip(24, false), false);
  assert.equal(shouldHideStatusStrip(40, false), true);
  assert.equal(shouldHideStatusStrip(24, true), true);
  assert.equal(shouldHideStatusStrip(10, true), false);
});

test('computeScrollProgress clamps cleanly between 0 and 1', () => {
  assert.equal(computeScrollProgress(0, 900, 3900), 0);
  assert.equal(computeScrollProgress(1500, 900, 3900), 0.5);
  assert.equal(computeScrollProgress(5000, 900, 3900), 1);
  assert.equal(computeScrollProgress(0, 900, 900), 0);
});
