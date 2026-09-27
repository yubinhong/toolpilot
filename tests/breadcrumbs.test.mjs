import assert from 'node:assert/strict';
import test from 'node:test';
import { breadcrumbList, getBreadcrumbItems, serializeJsonLd } from '../lib/breadcrumbs.mjs';
import { getComparisonDimensions } from '../lib/comparison.mjs';

test('breadcrumbs follow registered section routes and omit the homepage', () => {
  assert.deepEqual(getBreadcrumbItems('/'), []);
  assert.deepEqual(getBreadcrumbItems('/compare/'), [
    { label: 'Home', href: '/' },
    { label: 'Compare AI development tools', href: '/compare/', current: true },
  ]);
  assert.deepEqual(getBreadcrumbItems('/tools/cursor/'), [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/tools/' },
    { label: 'Cursor', href: '/tools/cursor/', current: true },
  ]);
  assert.deepEqual(getBreadcrumbItems('/not-a-route/'), []);
});

test('breadcrumb JSON-LD uses the visible path and canonical origin', () => {
  const items = getBreadcrumbItems('/tools/cursor/');
  const data = breadcrumbList(items, 'https://example.test');
  assert.equal(data['@type'], 'BreadcrumbList');
  assert.deepEqual(data.itemListElement.map(item => item.name), items.map(item => item.label));
  assert.equal(data.itemListElement[2].item, 'https://example.test/tools/cursor/');
});

test('JSON-LD serialization escapes script-breaking and line-separator characters', () => {
  const serialized = serializeJsonLd({ value: '</script>\u2028\u2029' });
  assert.equal(serialized, '{"value":"\\u003c/script>\\u2028\\u2029"}');
  assert.deepEqual(JSON.parse(serialized), { value: '</script>\u2028\u2029' });
});

test('comparison dimensions include cited facts from either dependency without inferring absent facts', () => {
  const dimensions = getComparisonDimensions([
    { facts: [{ key: 'workflow', label: 'Workflow' }, { key: 'privacy', label: 'Privacy' }] },
    { facts: [{ key: 'workflow', label: 'Use pattern' }, { key: 'provider', label: 'Provider configuration' }] },
  ]);
  assert.deepEqual(dimensions, [
    { key: 'workflow', label: 'Workflow' },
    { key: 'privacy', label: 'Privacy' },
    { key: 'provider', label: 'Provider configuration' },
  ]);
});
