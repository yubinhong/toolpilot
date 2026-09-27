import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { buildUrlAuditCsv, URL_AUDIT_HEADER } from '../lib/url-audit.mjs';
import { getRoutes } from '../lib/routes.mjs';

test('URL audit is an up-to-date source route inventory with external evidence left unknown', () => {
  const csv = readFileSync('docs/url-audit.csv', 'utf8');
  assert.equal(csv, buildUrlAuditCsv(getRoutes()));
  assert.equal(csv.split('\n')[0], URL_AUDIT_HEADER.join(','));
  assert.ok(csv.includes('/tools/cursor/,source-registered,Cursor,tools-detail,unknown,unknown,preserve-current-route,,'));
  assert.ok(csv.includes('actual indexing, backlinks and historical URL coverage are unknown.'));
});
