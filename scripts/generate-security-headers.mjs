import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getRoutes } from '../lib/routes.mjs';

export const MAX_HEADER_RULES = 100;
export const MAX_HEADER_LINE_LENGTH = 2000;

const SHARED_CSP = "object-src 'none'; base-uri 'self'; frame-ancestors 'none';";
const NEXT_BEFORE_INTERACTIVE_PREFIX = '(self.__next_s=self.__next_s||[]).push([0,';

function hashScriptBody(body) {
  const digest = createHash('sha256').update(body, 'utf8').digest('base64');
  return `'sha256-${digest}'`;
}

function extractNextBeforeInteractiveHash(body) {
  if (!body.startsWith(NEXT_BEFORE_INTERACTIVE_PREFIX)) return undefined;
  if (!body.endsWith('])')) throw new Error('could not safely parse Next.js beforeInteractive script payload');

  let payload;
  try {
    payload = JSON.parse(body.slice(NEXT_BEFORE_INTERACTIVE_PREFIX.length, -2));
  } catch {
    throw new Error('could not safely parse Next.js beforeInteractive script JSON');
  }
  if (typeof payload?.children !== 'string') {
    throw new Error('Next.js beforeInteractive script must contain a string children payload');
  }
  return hashScriptBody(payload.children);
}

function getAttribute(attributes, name) {
  const pattern = new RegExp(`(?:^|\\s)${name}(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+)))?(?=\\s|$)`, 'i');
  const match = attributes.match(pattern);
  if (!match) return undefined;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

export function extractInlineScriptHashes(html) {
  const openTags = [...html.matchAll(/<script\b/gi)];
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  if (openTags.length !== scripts.length) {
    throw new Error(`could not safely parse all script elements (${scripts.length}/${openTags.length})`);
  }

  const hashes = new Set();
  for (const [, attributes, body] of scripts) {
    if (getAttribute(attributes, 'src') !== undefined) continue;
    const type = getAttribute(attributes, 'type')?.trim().toLowerCase().split(';', 1)[0];
    if (type === 'application/json' || type === 'application/ld+json') continue;
    hashes.add(hashScriptBody(body));
    const nextScriptHash = extractNextBeforeInteractiveHash(body);
    if (nextScriptHash) hashes.add(nextScriptHash);
  }
  return [...hashes].sort();
}

function cspFromHashes(hashes, { includeFrameAncestors = true } = {}) {
  const scriptSources = ["'self'", ...hashes].join(' ');
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ];
  if (includeFrameAncestors) directives.push("frame-ancestors 'none'");
  return directives.join('; ') + ';';
}

export function documentCsp(hashes) {
  return cspFromHashes(hashes, { includeFrameAncestors: false });
}

export function injectCspMeta(html) {
  const csp = documentCsp(extractInlineScriptHashes(html));
  const escapedCsp = csp.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${escapedCsp}">`;
  const existingMetas = [...html.matchAll(/<meta\b(?=[^>]*\bhttp-equiv\s*=\s*["']Content-Security-Policy["'])[^>]*>/gi)];
  if (existingMetas.length > 1) throw new Error('static document must contain at most one Content-Security-Policy meta element');

  const headOpens = [...html.matchAll(/<head\b[^>]*>/gi)];
  const headCloseCount = [...html.matchAll(/<\/head\s*>/gi)].length;
  if (headOpens.length !== 1 || headCloseCount !== 1) {
    throw new Error(`static document must contain one complete head element (found ${headOpens.length} open, ${headCloseCount} close)`);
  }
  let policyPosition = headOpens[0].index + headOpens[0][0].length;
  const charset = html.slice(policyPosition).match(/^\s*<meta\b(?=[^>]*\bcharset\s*=)[^>]*>/i);
  if (charset) policyPosition += charset[0].length;
  if (existingMetas.length === 1) {
    if (existingMetas[0][0] === meta && existingMetas[0].index === policyPosition) return html;
    throw new Error('static document has a different or misplaced Content-Security-Policy meta element');
  }
  // Preserve the early charset declaration while applying CSP before scripts in the static document.
  return `${html.slice(0, policyPosition)}${meta}${html.slice(policyPosition)}`;
}

function validateRoutePath(path) {
  if (typeof path !== 'string' || !/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(path)) {
    throw new Error(`unsafe or unsupported route path: ${String(path)}`);
  }
}

export function generateHeadersFile(routes, { maxRules = MAX_HEADER_RULES, maxLineLength = MAX_HEADER_LINE_LENGTH } = {}) {
  if (!Array.isArray(routes)) {
    throw new TypeError('routes are required');
  }
  if (maxRules < 1) {
    throw new Error(`Cloudflare Pages header rules would exceed ${maxRules} (1)`);
  }

  const paths = new Set();
  for (const route of routes) {
    validateRoutePath(route?.path);
    if (paths.has(route.path)) throw new Error(`duplicate route path: ${route.path}`);
    paths.add(route.path);
  }

  const sharedRule = [
    '/*',
    '  X-Frame-Options: DENY',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
    `  Content-Security-Policy: ${SHARED_CSP}`,
  ].join('\n');
  if (sharedRule.split('\n').some(line => line.length > maxLineLength)) {
    const longest = Math.max(...sharedRule.split('\n').map(line => line.length));
    throw new Error(`shared rule header line exceeds ${maxLineLength} characters (${longest})`);
  }

  return `${sharedRule}\n`;
}

function generateForBuild() {
  const outputDirectory = resolve('out');
  if (!existsSync(outputDirectory)) throw new Error('Next.js output directory out/ does not exist');
  const routes = getRoutes();
  const routeOutputs = routes.map(route => {
    validateRoutePath(route.path);
    const htmlPath = join(outputDirectory, route.path, 'index.html');
    if (!existsSync(htmlPath)) throw new Error(`${route.path}: missing exported HTML at ${htmlPath}`);
    return [htmlPath, injectCspMeta(readFileSync(htmlPath, 'utf8'))];
  });
  const fallbackPath = join(outputDirectory, '404.html');
  if (!existsSync(fallbackPath)) throw new Error(`missing static 404 at ${fallbackPath}`);
  const fallbackHtml = injectCspMeta(readFileSync(fallbackPath, 'utf8'));
  const contents = generateHeadersFile(routes);
  for (const [htmlPath, html] of routeOutputs) writeFileSync(htmlPath, html);
  writeFileSync(fallbackPath, fallbackHtml);
  writeFileSync(join(outputDirectory, '_headers'), contents);
  console.log(`Generated document CSP metas for ${routes.length} routes plus 404 and one shared Pages header rule.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    generateForBuild();
  } catch (error) {
    console.error(`Security header generation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
