import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import {
  documentCsp,
  extractInlineScriptHashes,
  generateHeadersFile,
  injectCspMeta,
  MAX_HEADER_LINE_LENGTH,
  MAX_HEADER_RULES,
} from '../scripts/generate-security-headers.mjs';

function sha256(body) {
  return `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;
}

test('inline script hashes cover executable script bodies and exclude external/JSON data scripts', () => {
  const html = [
    '<script src="/bundle.js"></script>',
    '<script>window.theme = "dark";</script>',
    '<script type="application/ld+json">{"@type":"Thing"}</script>',
    "<script type='application/json'>{\"flight\":true}</script>",
    '<script type="module">window.moduleReady = true;</script>',
  ].join('');

  assert.deepEqual(extractInlineScriptHashes(html), [sha256('window.moduleReady = true;'), sha256('window.theme = "dark";')].sort());
});

test('Next.js beforeInteractive payloads also allow the runtime-executed children script', () => {
  const children = 'window.theme = "dark";';
  const payload = `(self.__next_s=self.__next_s||[]).push([0,${JSON.stringify({ children, id: 'theme-init' })}])`;

  assert.deepEqual(extractInlineScriptHashes(`<script>${payload}</script>`), [sha256(payload), sha256(children)].sort());
});

test('malformed script output fails closed instead of producing incomplete hashes', () => {
  assert.throws(() => extractInlineScriptHashes('<script>window.run()'), /could not safely parse all script elements/);
});

test('generated Pages headers keep only shared protections in one wildcard rule', () => {
  const routes = [{ path: '/' }, { path: '/tools/sample/' }];
  const output = generateHeadersFile(routes);

  assert.match(output, /^\/\*\n/);
  assert.match(output, /X-Frame-Options: DENY/);
  assert.match(output, /Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\)/);
  assert.match(output, /Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none';/);
  assert.doesNotMatch(output, /unsafe-inline|Strict-Transport-Security/);
  assert.doesNotMatch(output, /\/tools\/sample\//);
  assert.equal(output.trim().split(/\n\n/).length, 1);
});

test('each static document gets an early, exact, idempotent CSP meta', () => {
  const body = 'window.page = true;';
  const html = '<!doctype html><html><head data-test="head"><meta charSet="utf-8"/><title>Page</title><script src="/bundle.js"></script><script type="application/ld+json">{"@type":"Thing"}</script><script>' + body + '</script></head><body></body></html>';
  const generated = injectCspMeta(html);
  const policy = generated.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];

  assert.ok(policy);
  assert.ok(policy.includes(`script-src 'self' ${sha256(body)}`));
  assert.doesNotMatch(policy, /bundle\.js|@type|frame-ancestors/);
  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.doesNotMatch(policy, /unsafe-inline|static\.cloudflareinsights\.com/);
  assert.ok(generated.indexOf('charSet="utf-8"') < generated.indexOf('http-equiv="Content-Security-Policy"'));
  assert.ok(generated.indexOf('http-equiv="Content-Security-Policy"') < generated.indexOf('<title>'));
  assert.equal(injectCspMeta(generated), generated);
  assert.equal((generated.match(/http-equiv="Content-Security-Policy"/g) || []).length, 1);
  assert.match(documentCsp([]), /script-src 'self';/);
  assert.doesNotMatch(documentCsp([]), /frame-ancestors/);

  const meta = generated.match(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/)?.[0];
  assert.throws(() => injectCspMeta(generated.replace('</head>', `${meta}</head>`)), /at most one/);
  assert.throws(() => injectCspMeta(generated.replace(meta, `<title>Page</title>${meta}`)), /different or misplaced/);
  assert.throws(() => injectCspMeta(generated.replace(sha256(body), sha256('wrong body'))), /different or misplaced/);
  assert.throws(() => injectCspMeta('<html><body></body></html>'), /one complete head element/);
  assert.throws(() => injectCspMeta('<html><head></head><head></head></html>'), /one complete head element/);
  assert.throws(() => injectCspMeta('<html><head></head><head></html>'), /one complete head element/);
});

test('generated Pages rule validates paths and stays within the rule limit as routes grow', () => {
  assert.throws(() => generateHeadersFile([{ path: '/bad*route/' }]), /unsafe or unsupported route path/);
  assert.throws(() => generateHeadersFile([{ path: '/' }, { path: '/' }]), /duplicate route path/);
  const routes = Array.from({ length: MAX_HEADER_RULES + 1 }, (_, index) => ({ path: `/route-${index}/` }));
  const output = generateHeadersFile(routes);
  assert.equal(output.trim().split(/\n\n/).length, 1);
  assert.throws(() => generateHeadersFile(routes, { maxRules: 0 }), /header rules would exceed/);
});

test('generated Pages headers enforce the platform header line limit', () => {
  const limit = 80;
  assert.ok(limit < MAX_HEADER_LINE_LENGTH);
  assert.throws(() => generateHeadersFile([{ path: '/' }], { maxLineLength: limit }), new RegExp(`exceeds ${limit} characters`));
});
