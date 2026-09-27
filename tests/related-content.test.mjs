import assert from 'node:assert/strict';
import test from 'node:test';
import { content, findContent, contentPath } from '../lib/content.mjs';
import { getRelatedContent } from '../lib/related-content.mjs';

test('comparison links are limited to decision pages with both candidates or a matching price page', () => {
  const record = findContent('compare', 'cursor-vs-claude-code');
  const related = getRelatedContent(record, content);
  const paths = related.map(contentPath);
  assert.ok(paths.length <= 5);
  assert.ok(paths.includes('/alternatives/cursor/'));
  assert.ok(paths.includes('/best/ai-coding-tools-for-solo-founders/'));
  assert.ok(paths.includes('/pricing/cursor/'));
  assert.ok(paths.includes('/pricing/claude-code/'));
  assert.equal(paths.some(path => path.startsWith('/compare/')), false);
});

test('curated links are retained when dependency overlap has no automatic matches', () => {
  const record = findContent('compare', 'make-vs-n8n');
  assert.deepEqual(getRelatedContent(record, content).map(contentPath), [
    '/guides/how-to-choose-a-developer-tool/',
    '/guides/workflow-automation-selection/',
  ]);
});

test('tool and guide pages receive a bounded set of directly supported decisions', () => {
  const cursor = findContent('tools', 'cursor');
  const cursorRelated = getRelatedContent(cursor, content);
  assert.equal(cursorRelated.length, 5);
  assert.ok(cursorRelated.every(record => record.dependencies.some(dependency => dependency.slug === 'cursor')));

  const guide = findContent('guides', 'ai-editor-vs-terminal-agent');
  const guideRelated = getRelatedContent(guide, content);
  assert.ok(guideRelated.some(record => record.slug === 'cursor-vs-claude-code'));
  assert.ok(guideRelated.every(record => record.dependencies.filter(dependency => guide.dependencies.some(candidate => candidate.slug === dependency.slug)).length >= 2));
});

test('authored related pages lead, deduplicate automatic links and stay within the limit', () => {
  const make = structuredClone(findContent('tools', 'make'));
  make.relatedLinks = [
    { kind: 'guides', slug: 'how-to-choose-a-developer-tool' },
    { kind: 'guides', slug: 'workflow-automation-selection' },
  ];
  const related = getRelatedContent(make, content);
  const paths = related.map(contentPath);
  assert.deepEqual(paths, [
    '/guides/how-to-choose-a-developer-tool/',
    '/guides/workflow-automation-selection/',
    '/compare/make-vs-n8n/',
  ]);
  assert.equal(new Set(paths).size, paths.length);
  assert.deepEqual(getRelatedContent(make, content, 2).map(contentPath), paths.slice(0, 2));
});
