import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import {
  extractInlineScriptHashes,
  fallbackDocumentCsp,
  generateHeadersFile,
  injectFallbackCspMeta,
  MAX_HEADER_LINE_LENGTH,
  MAX_HEADER_RULES,
  routeCsp,
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

test('generated rules pair shared protections with strict per-route CSP hashes', () => {
  const routes = [{ path: '/' }, { path: '/tools/sample/' }];
  const htmlByPath = new Map([
    ['/', '<script>window.home = true;</script>'],
    ['/tools/sample/', '<script>window.tool = true;</script><script type="application/ld+json">{}</script>'],
  ]);
  const output = generateHeadersFile(routes, { readHtml: route => htmlByPath.get(route.path) });

  assert.match(output, /^\/\*\n/);
  assert.match(output, /X-Frame-Options: DENY/);
  assert.match(output, /Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\)/);
  assert.match(output, /Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none';/);
  assert.ok(output.includes(`/tools/sample/\n  Content-Security-Policy: default-src 'self'; script-src 'self' ${sha256('window.tool = true;')};`));
  assert.doesNotMatch(output, /unsafe-inline|Strict-Transport-Security/);
  assert.equal(output.trim().split(/\n\n/).length, routes.length + 1);
  assert.match(routeCsp([]), /script-src 'self';/);
});

test('static 404 gets an idempotent CSP meta using only its executable inline-script hashes', () => {
  const body = 'window.notFound = true;';
  const html = `<!doctype html><html><head></head><body><script>${body}</script></body></html>`;
  const generated = injectFallbackCspMeta(html);
  const policy = generated.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];

  assert.ok(policy);
  assert.ok(policy.includes(`script-src 'self' ${sha256(body)}`));
  assert.match(policy, /default-src 'self'/);
  assert.doesNotMatch(policy, /frame-ancestors|unsafe-inline|static\.cloudflareinsights\.com/);
  assert.equal(injectFallbackCspMeta(generated), generated);
  assert.equal((generated.match(/http-equiv="Content-Security-Policy"/g) || []).length, 1);
  assert.match(fallbackDocumentCsp([]), /script-src 'self';/);
  const meta = generated.match(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/)?.[0];
  assert.throws(() => injectFallbackCspMeta(generated.replace('</head>', `${meta}</head>`)), /at most one/);
  assert.throws(() => injectFallbackCspMeta('<html><body></body></html>'), /one complete head element/);
  assert.throws(() => injectFallbackCspMeta('<html><head></head><head></head></html>'), /one complete head element/);
});

test('generated Pages rules reject missing artifacts, duplicate/unsafe routes, and limit overflow', () => {
  assert.throws(() => generateHeadersFile([{ path: '/missing/' }], { readHtml: () => { throw new Error('missing HTML'); } }), /missing HTML/);
  assert.throws(() => generateHeadersFile([{ path: '/bad*route/' }], { readHtml: () => '' }), /unsafe or unsupported route path/);
  assert.throws(() => generateHeadersFile([{ path: '/' }, { path: '/' }], { readHtml: () => '' }), /duplicate route path/);
  assert.throws(() => generateHeadersFile(Array.from({ length: MAX_HEADER_RULES }, (_, index) => ({ path: `/route-${index}/` })), { readHtml: () => '' }), /header rules would exceed/);
});

test('generated Pages rules reject a CSP header value longer than the platform limit', () => {
  const html = Array.from({ length: 40 }, (_, index) => `<script>window.script${index} = ${index};</script>`).join('');
  assert.throws(() => generateHeadersFile([{ path: '/large/' }], { readHtml: () => html }), new RegExp(`exceeds ${MAX_HEADER_LINE_LENGTH} characters`));
});
