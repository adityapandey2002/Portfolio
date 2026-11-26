import test from 'node:test';
import assert from 'node:assert/strict';

import { PORTFOLIO_SYSTEMS } from './data/systems';
import {
  countByFilter,
  filterSystems,
  getAdjacentSystems,
  getHomeFeaturedSystems,
  getSystemBySlug,
} from './workCatalog';

test('catalog contains 10 unique systems with valid GitHub URLs and previews', () => {
  assert.equal(PORTFOLIO_SYSTEMS.length, 10);
  const slugs = new Set(PORTFOLIO_SYSTEMS.map((s) => s.slug));
  assert.equal(slugs.size, 10);
  for (const sys of PORTFOLIO_SYSTEMS) {
    assert.ok(sys.githubUrl && sys.githubUrl.startsWith('https://github.com/adityapandey2002'));
    assert.ok(sys.previewImage.startsWith('/work/'));
    assert.ok(sys.metrics.length >= 3);
    assert.ok(sys.architectureSteps.length >= 3);
  }
});

test('home featured systems returns exactly 3 flagship projects', () => {
  const featured = getHomeFeaturedSystems();
  assert.equal(featured.length, 3);
  assert.deepEqual(
    featured.map((s) => s.slug),
    ['biharkaswaad', 'matru-suraksha', 'india-dashboard'],
  );
});

test('filterSystems filters accurately by category and search query', () => {
  const healthSystems = filterSystems(PORTFOLIO_SYSTEMS, 'health-ai');
  assert.equal(healthSystems.length, 4);
  assert.equal(countByFilter(PORTFOLIO_SYSTEMS, 'health-ai'), 4);

  const fastapiMatches = filterSystems(PORTFOLIO_SYSTEMS, 'all', 'FastAPI');
  assert.equal(fastapiMatches.length, 1);
  assert.equal(fastapiMatches[0].slug, 'ambient-clinical-scribe');

  const drizzleMatches = filterSystems(PORTFOLIO_SYSTEMS, 'all', 'Drizzle');
  assert.ok(drizzleMatches.some((s) => s.slug === 'araria-hospital'));
  assert.ok(drizzleMatches.some((s) => s.slug === 'india-dashboard'));
});

test('getSystemBySlug and getAdjacentSystems resolve cleanly', () => {
  const araria = getSystemBySlug('araria-hospital');
  assert.ok(araria);
  assert.equal(araria?.repoName, 'adityapandey2002/HOSPITAL_ARARIA');

  const adj = getAdjacentSystems('araria-hospital');
  assert.equal(adj.prev?.slug, 'biharkaswaad');
  assert.equal(adj.next?.slug, 'matru-suraksha');

  const first = getAdjacentSystems('biharkaswaad');
  assert.equal(first.prev, null);
  assert.ok(first.next);
});
