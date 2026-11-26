import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  KNOWLEDGE_DOCS,
  buildGroundedAnswer,
  retrievePortfolioContext,
} from './knowledgeBase';
import { PORTFOLIO_SYSTEMS } from './data/systems';

describe('portfolio knowledgeBase RAG retriever', () => {
  it('indexes every project in PORTFOLIO_SYSTEMS plus core profile records', () => {
    const projectIds = new Set(
      KNOWLEDGE_DOCS.filter((d) => d.projectSlug).map((d) => d.projectSlug),
    );
    for (const sys of PORTFOLIO_SYSTEMS) {
      assert.ok(projectIds.has(sys.slug), `Missing knowledge doc for ${sys.slug}`);
    }
    assert.ok(KNOWLEDGE_DOCS.length >= PORTFOLIO_SYSTEMS.length + 5);
  });

  it('retrieves Ambient Clinical AI Scribe accurately for voice / 181-field queries', () => {
    const res = buildGroundedAnswer(
      'How does the Ambient Clinical AI Scribe transcribe Hindi and fill 181 fields?',
    );
    assert.equal(res.matchedIds[0], 'project:ambient-clinical-scribe');
    assert.match(res.answerText, /181/);
    assert.match(res.answerText, /Whisper-large-v3/i);
    assert.ok(res.sources.some((s) => s.href === '/work/ambient-clinical-scribe'));
    assert.ok(res.followUps.length >= 2);
  });

  it('retrieves District Hospital Araria for NestJS / dual-ORM / hospital queries', () => {
    const res = buildGroundedAnswer(
      'Tell me about District Hospital Araria dual ORM and 86 backend tests',
    );
    assert.equal(res.matchedIds[0], 'project:araria-hospital');
    assert.match(res.answerText, /Drizzle/i);
    assert.match(res.answerText, /MikroORM/i);
  });

  it('retrieves VHSND pipeline for offline survey / 253 columns / 212 Vitest queries', () => {
    const res = buildGroundedAnswer('How does the VHSND PMSMA offline pipeline work?');
    assert.equal(res.matchedIds[0], 'project:vhsnd-pipeline');
    assert.match(res.answerText, /253/);
    assert.match(res.answerText, /212/);
  });

  it('retrieves India Dashboard for 252k data points / TF-IDF / D3 queries', () => {
    const res = buildGroundedAnswer('Explain the India in the World dashboard database optimization');
    assert.equal(res.matchedIds[0], 'project:india-dashboard');
    assert.match(res.answerText, /97%/);
  });

  it('respects explicit projectSlug scoping when selected in the UI', () => {
    const docs = retrievePortfolioContext('What is the tech stack?', 'consultancywala', 3);
    assert.equal(docs[0].projectSlug, 'consultancywala');
  });

  it('answers education and contact questions with verified Pondicherry University & email details', () => {
    const edu = buildGroundedAnswer('Where did Aditya do his MCA and certifications?');
    assert.match(edu.answerText, /Pondicherry University/i);
    assert.match(edu.answerText, /IBM Data Science/i);

    const contact = buildGroundedAnswer('What is Aditya Pandey email and phone number?');
    assert.match(contact.answerText, /adityapandey\.adu@gmail\.com/);
    assert.match(contact.answerText, /8601862114/);
  });
});
