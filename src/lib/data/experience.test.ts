import test from 'node:test';
import assert from 'node:assert/strict';
import { experience, filterExperience } from './experience';

test('experience catalog has 4 unique entries with valid highlights and no raw HTML', () => {
  assert.equal(experience.length, 4);
  const ids = new Set(experience.map((e) => e.id));
  assert.equal(ids.size, 4);

  for (const item of experience) {
    assert.ok(item.highlights.length >= 3, `Expected >= 3 highlights for ${item.id}`);
    assert.ok(item.skills.length >= 3, `Expected >= 3 skills for ${item.id}`);
    for (const h of item.highlights) {
      assert.ok(!h.detail.includes('<strong>'), `Unexpected HTML tag in ${item.id}`);
      assert.ok(!h.lead.includes('<'), `Unexpected HTML tag in ${item.id}`);
    }
  }
});

test('filterExperience partitions public health and engineering tracks accurately', () => {
  assert.equal(filterExperience(experience, 'all').length, 4);

  const health = filterExperience(experience, 'health');
  assert.equal(health.length, 1);
  assert.equal(health[0].id, 'gandhi-fellowship');

  const engineering = filterExperience(experience, 'engineering');
  assert.equal(engineering.length, 3);
  assert.deepEqual(
    engineering.map((e) => e.id),
    ['biharkaswaad', 'prodigy-infotech', 'auroville-fablab'],
  );
});
