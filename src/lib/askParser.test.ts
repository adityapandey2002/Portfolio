import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAnswerBlocks } from './askParser';

test('parseAnswerBlocks returns empty array for blank input', () => {
  assert.deepEqual(parseAnswerBlocks('   \n  '), []);
});

test('parseAnswerBlocks parses numbered multi-block RAG answers cleanly', () => {
  const sample =
    '1. Offline-First Architecture\nUses Dexie.js over IndexedDB for zero-connectivity clinics.\n\n' +
    '2. Optimistic Sync\nSyncs automatically when 2G/3G returns.';

  const blocks = parseAnswerBlocks(sample);
  assert.equal(blocks.length, 2);
  assert.deepEqual(blocks[0], {
    num: 1,
    heading: 'Offline-First Architecture',
    body: 'Uses Dexie.js over IndexedDB for zero-connectivity clinics.',
  });
  assert.deepEqual(blocks[1], {
    num: 2,
    heading: 'Optimistic Sync',
    body: 'Syncs automatically when 2G/3G returns.',
  });
});

test('parseAnswerBlocks handles single-line streaming chunk gracefully', () => {
  const blocks = parseAnswerBlocks('1. Partial chunk arriving');
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].heading, '');
  assert.equal(blocks[0].body, 'Partial chunk arriving');
});
