import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getRoutes } from '../lib/routes.mjs';
import { getEvidenceHubGroups } from '../lib/evidence-hubs.mjs';
import { getSiteUrl } from '../lib/site-config.mjs';
import { getBreadcrumbItems } from '../lib/breadcrumbs.mjs';
import { content } from '../lib/content.mjs';
import { isIndexable } from '../lib/content-policy.mjs';
import { verificationStatusLabel } from '../lib/content-labels.mjs';
import { findDuplicateMetadata } from './metadata-audit.mjs';
import { categoryAnchor, HOME_CATEGORY_SHORTCUTS } from '../lib/homepage.mjs';
import { generateHeadersFile, injectFallbackCspMeta } from './generate-security-headers.mjs';
const failures = [];
const routes = getRoutes();
const site = getSiteUrl();
const xml = readFileSync('out/sitemap.xml','utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const expected = routes.filter(r => r.index).map(r => site+r.path).sort();
const expectedOgImage = `${site}/og-default.png`;
const ogImagePath = 'out/og-default.png';
const routeMetadata = [];
if (!existsSync(ogImagePath)) {
  failures.push('missing static Open Graph image');
} else {
  const png = readFileSync(ogImagePath);
  if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
    failures.push('Open Graph image must be a 1200x630 PNG');
  }
}
if (JSON.stringify(urls.sort()) !== JSON.stringify(expected)) failures.push('sitemap differs from indexable route registry');
for (const r of routes) {
  const file = join('out', r.path, 'index.html');
  if (!existsSync(file)) { failures.push(`${r.path}: missing HTML`); continue; }
  const html = readFileSync(file,'utf8');
  if (/<meta\b[^>]*\bhttp-equiv="Content-Security-Policy"/i.test(html)) failures.push(`${r.path}: fallback CSP meta must not be added to registered routes`);
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  if (!canonical?.includes(`href="${site}${r.path}"`)) failures.push(`${r.path}: incorrect canonical`);
  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0] || '';
  if (r.index ? !/content="index,/.test(robots) : !/content="noindex,/.test(robots)) failures.push(`${r.path}: robots mismatch`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!title || !description) failures.push(`${r.path}: missing metadata`);
  routeMetadata.push({ path: r.path, title, description });
  if (!html.includes('<meta name="twitter:card" content="summary_large_image"')) failures.push(`${r.path}: missing Twitter large-image metadata`);
  if (!html.includes(`<meta property="og:image" content="${expectedOgImage}"`)) failures.push(`${r.path}: missing first-party Open Graph image`);
  if (!html.includes('<meta property="og:image:width" content="1200"') || !html.includes('<meta property="og:image:height" content="630"')) failures.push(`${r.path}: incorrect Open Graph image dimensions`);
  if (!html.includes('<meta property="og:image:alt" content="ToolPilot developer tool decision guide"')) failures.push(`${r.path}: missing Open Graph image alt text`);
  if (!html.includes(`<meta name="twitter:image" content="${expectedOgImage}"`)) failures.push(`${r.path}: missing Twitter image`);
  const breadcrumbItems = getBreadcrumbItems(r.path);
  const breadcrumbScript = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  if (breadcrumbItems.length) {
    if (!/<nav\b[^>]*aria-label="Breadcrumb"/.test(html)) failures.push(`${r.path}: missing visible breadcrumb`);
    try {
      const data = JSON.parse(breadcrumbScript || 'null');
      const expected = breadcrumbItems.map(item => `${site}${item.href}`);
      if (data?.['@type'] !== 'BreadcrumbList' || JSON.stringify(data.itemListElement?.map(item => item.item)) !== JSON.stringify(expected)) failures.push(`${r.path}: breadcrumb JSON-LD differs from visible route trail`);
    } catch { failures.push(`${r.path}: malformed breadcrumb JSON-LD`); }
  } else if (breadcrumbScript || /<nav\b[^>]*aria-label="Breadcrumb"/.test(html)) {
    failures.push(`${r.path}: unexpected homepage breadcrumb`);
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    const href = match[1].split(/[?#]/)[0];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    if (!existsSync(join('out',href,href.endsWith('/') ? 'index.html' : ''))) failures.push(`${r.path}: broken local link ${href}`);
  }
  if (/Approximately 20%|Cash affiliate|Commission note|commission terms|approvedDigest/.test(html)) failures.push(`${r.path}: historical commercial research exposed`);
}
for (const duplicate of findDuplicateMetadata(routeMetadata)) {
  failures.push(`${duplicate.path}: duplicate ${duplicate.field} also used by ${duplicate.firstPath}`);
}

for (const kind of ['mcp', 'self-hosted']) {
  const htmlPath = `out/${kind}/index.html`;
  if (!existsSync(htmlPath)) {
    failures.push(`/${kind}/: evidence hub artifact is missing`);
    continue;
  }
  const html = readFileSync(htmlPath, 'utf8');
  if (!html.includes(`href="/${kind}/"`)) failures.push(`/${kind}/: primary navigation link is missing`);
  for (const { tool, fact, sources } of getEvidenceHubGroups(kind).flatMap(group => group.entries)) {
    if (!html.includes(`/tools/${tool.slug}/`)) failures.push(`/${kind}/: ${tool.slug} profile link is missing`);
    if (!html.includes(fact.value)) failures.push(`/${kind}/: ${tool.slug}.${fact.key} fact is missing`);
    for (const source of sources) {
      if (!html.includes(source.url)) failures.push(`/${kind}/: source ${source.id} for ${tool.slug}.${fact.key} is missing`);
    }
  }
}
const tools = new Map(content.filter(record => record.kind === 'tools').map(record => [record.slug,record]));
const structuredPaths = new Set(content.map(record => `/${record.kind}/${record.slug}/`));
const homepage = readFileSync('out/index.html','utf8');
const toolIndex = readFileSync('out/tools/index.html','utf8');
for (const item of HOME_CATEGORY_SHORTCUTS) {
  const anchor = categoryAnchor(item.category);
  if (!homepage.includes(`href="/tools/#${anchor}"`)) failures.push(`homepage: missing category shortcut for ${item.category}`);
  if (!toolIndex.includes(`id="${anchor}"`)) failures.push(`tools index: missing category anchor ${item.category}`);
}
for (const slug of ['cursor-vs-claude-code', 'bolt-vs-replit', 'make-vs-n8n']) {
  const record = content.find(item => item.kind === 'compare' && item.slug === slug);
  if (!record || !homepage.includes(`href="/compare/${slug}/"`) || !homepage.includes(record.title)) failures.push(`homepage: missing existing comparison research ${slug}`);
  if (record && record.review.state !== 'published' && !homepage.includes('In review')) failures.push(`homepage: missing pending review state for ${slug}`);
}
for (const record of content.filter(item => item.kind === 'pricing')) {
  if (!homepage.includes(`href="/pricing/${record.slug}/"`) || !homepage.includes(record.updatedAt)) failures.push(`homepage: pricing update date or link missing for ${record.slug}`);
}
const verifiedToolRecords = content.filter(item => item.kind === 'tools' && item.review.state === 'published' && item.verifiedAt);
if (!verifiedToolRecords.length && !homepage.includes('No tool profile currently has both an approved review and a verification date.')) failures.push('homepage: missing truthful empty state for recently verified tools');
for (const record of verifiedToolRecords) {
  if (!homepage.includes(`href="/tools/${record.slug}/"`) || !homepage.includes(record.verifiedAt)) failures.push(`homepage: verified tool missing from recent verification section: ${record.slug}`);
}
const methodology = readFileSync('out/editorial-policy/index.html','utf8').replaceAll(/<!--[\s\S]*?-->/g,'');
for (const phrase of ['<title>Methodology | ToolPilot</title>', 'Pricing verification', 'Feature verification', 'Testing methodology', 'publishes no benchmark results or hands-on test claims', 'Selection and rankings', 'not a universal score or measured performance ranking', 'after 30 days', 'after 90 days', 'not a fixed publishing cadence']) {
  if (!methodology.includes(phrase)) failures.push(`methodology page: missing ${phrase}`);
}
const disclosure = readFileSync('out/disclosure/index.html','utf8').replaceAll(/<!--[\s\S]*?-->/g,'');
for (const phrase of ['<title>Affiliate Disclosure | ToolPilot</title>', 'Ordinary links', 'Affiliate recommendations', 'Featured and Sponsor placements', 'No affiliate destination, Featured placement or Sponsor placement is active in this version.']) {
  if (!disclosure.includes(phrase)) failures.push(`affiliate disclosure page: missing ${phrase}`);
}
for (const html of [methodology, disclosure]) {
  if (!html.includes('>Methodology</a>') || !html.includes('>Affiliate Disclosure</a>')) failures.push('trust pages: footer must link to both methodology and affiliate disclosure');
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' })[char]);
}
function citationFollows(html, claim, sourceUrl, closingTag) {
  const claimStart = html.indexOf(escapeHtml(claim));
  if (claimStart < 0) return false;
  const claimEnd = html.indexOf(closingTag, claimStart);
  return claimEnd > claimStart && html.slice(claimStart, claimEnd).includes(sourceUrl);
}
const cline = tools.get('cline');
const clinePrivacy = cline?.facts.find(fact => fact.key === 'privacy');
const clineHtml = readFileSync('out/tools/cline/index.html', 'utf8');
if (!clinePrivacy?.value || !clineHtml.includes(escapeHtml(clinePrivacy.value))) failures.push('/tools/cline/: privacy and telemetry fact is missing from generated HTML');
for (const sourceId of clinePrivacy?.sourceIds ?? []) {
  const source = cline.sources.find(item => item.id === sourceId);
  if (!source || !clineHtml.includes(source.url)) failures.push(`/tools/cline/: privacy source ${sourceId} is missing from generated HTML`);
}
const cursor = tools.get('cursor');
const cursorPrivacy = cursor?.facts.find(fact => fact.key === 'privacy');
const cursorHtml = readFileSync('out/tools/cursor/index.html', 'utf8');
if (!cursorPrivacy?.value || !cursorHtml.includes(escapeHtml(cursorPrivacy.value))) failures.push('/tools/cursor/: privacy-mode scope fact is missing from generated HTML');
for (const sourceId of cursorPrivacy?.sourceIds ?? []) {
  const source = cursor.sources.find(item => item.id === sourceId);
  if (!source || !cursorHtml.includes(source.url)) failures.push(`/tools/cursor/: privacy source ${sourceId} is missing from generated HTML`);
}
const windsurf = tools.get('windsurf');
const windsurfWorkflow = windsurf?.facts.find(fact => fact.key === 'workflow');
const windsurfPrivacy = windsurf?.facts.find(fact => fact.key === 'privacy');
const windsurfHtml = readFileSync('out/tools/windsurf/index.html', 'utf8');
if (!windsurfWorkflow?.value || !windsurfHtml.includes(escapeHtml(windsurfWorkflow.value))) failures.push('/tools/windsurf/: transition and current plan-price fact is missing from generated HTML');
if (!windsurfPrivacy?.value || !windsurfHtml.includes(escapeHtml(windsurfPrivacy.value))) failures.push('/tools/windsurf/: training-policy scope fact is missing from generated HTML');
for (const sourceId of windsurfPrivacy?.sourceIds ?? []) {
  const source = windsurf.sources.find(item => item.id === sourceId);
  if (!source || !windsurfHtml.includes(source.url)) failures.push(`/tools/windsurf/: training-policy source ${sourceId} is missing from generated HTML`);
}
for (const price of ['USD 0 / month', 'USD 20 / month', 'USD 200 / month', 'USD 80 / month', 'USD 40/month per full developer seat']) {
  if (!windsurfHtml.includes(price)) failures.push(`/tools/windsurf/: public plan price ${price} is missing from generated HTML`);
}
for (const sourceId of windsurfWorkflow?.sourceIds ?? []) {
  const source = windsurf.sources.find(item => item.id === sourceId);
  if (!source || !windsurfHtml.includes(source.url)) failures.push(`/tools/windsurf/: transition/price source ${sourceId} is missing from generated HTML`);
}
for (const price of windsurf?.prices ?? []) {
  for (const sourceId of price.sourceIds) {
    const source = windsurf.sources.find(item => item.id === sourceId);
    if (!source || !windsurfHtml.includes(source.url)) failures.push(`/tools/windsurf/: price source ${sourceId} is missing from generated HTML`);
  }
}
for (const record of content) {
  const evidence = [
    ...(record.pros ?? []).map(item => ({ text: item.text, refs: item.sourceRefs, label: 'strength' })),
    ...(record.cons ?? []).map(item => ({ text: item.text, refs: item.sourceRefs, label: 'constraint' })),
    ...(record.faqs ?? []).flatMap(item => [
      { text: item.question, refs: item.sourceRefs, label: 'FAQ question' },
      { text: item.answer, refs: item.sourceRefs, label: 'FAQ answer' },
    ]),
  ];
  if (!evidence.length) continue;
  const html = readFileSync(join('out',`/${record.kind}/${record.slug}/`,'index.html'),'utf8');
  for (const item of evidence) {
    if (!html.includes(escapeHtml(item.text))) failures.push(`${record.kind}/${record.slug}: documented ${item.label} missing from rendered page`);
    for (const ref of item.refs) {
      const source = tools.get(ref.toolSlug)?.sources.find(candidate => candidate.id === ref.sourceId);
      const closingTag = item.label.startsWith('FAQ') ? '</dd>' : '</li>';
      if (!source || !citationFollows(html, item.text, source.url, closingTag)) failures.push(`${record.kind}/${record.slug}: documented ${item.label} source ${ref.toolSlug}/${ref.sourceId} is not linked beside its claim`);
    }
  }
}
for (const record of content) {
  const path = `/${record.kind}/${record.slug}/`;
  const html = readFileSync(join('out',path,'index.html'),'utf8');
  const verificationStatus = verificationStatusLabel(record, isIndexable(record, content));
  if (!html.includes(verificationStatus)) failures.push(`${path}: missing explicit last-verified status`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  const body = main.replace(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>/g,'');
  const targets = new Set([...body.matchAll(/<a\b[^>]*href="([^"#]+)"/g)].flatMap(match => {
    const href = match[1].split(/[?#]/)[0];
    return structuredPaths.has(href) ? [href] : [];
  }));
  if (targets.size < 3) failures.push(`${path}: expected at least three distinct in-content links to structured pages, found ${targets.size}`);
}
for (const record of content.filter(item => item.kind === 'tools' && item.facts.some(fact => fact.key === 'mcp'))) {
  const html = readFileSync(join('out',`/${record.kind}/${record.slug}/`,'index.html'),'utf8');
  const fact = record.facts.find(item => item.key === 'mcp');
  if (!html.includes(fact.value)) failures.push(`${record.kind}/${record.slug}: MCP fact missing from rendered page`);
  for (const id of fact.sourceIds) {
    const source = record.sources.find(item => item.id === id);
    if (source && !html.includes(source.url)) failures.push(`${record.kind}/${record.slug}: MCP source ${id} missing from rendered page`);
  }
}
const continueProfile = tools.get('continue');
const continueLifecycle = continueProfile?.facts.find(fact => fact.key === 'maintenance');
if (continueProfile && continueLifecycle) {
  const html = readFileSync(join('out','/tools/continue/','index.html'),'utf8');
  if (!html.includes(escapeHtml(continueLifecycle.value))) failures.push('/tools/continue/: lifecycle/package-version fact is missing from generated HTML');
  for (const sourceId of continueLifecycle.sourceIds) {
    const source = continueProfile.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/tools/continue/: lifecycle source ${sourceId} is missing from generated HTML`);
  }
}
for (const record of content.filter(item => item.kind === 'compare')) {
  const facts = record.dependencies.flatMap(dependency => {
    const fact = tools.get(dependency.slug)?.facts.find(item => item.key === 'mcp');
    return fact ? [{ fact, tool: tools.get(dependency.slug) }] : [];
  });
  if (!facts.length) continue;
  const html = readFileSync(join('out',`/${record.kind}/${record.slug}/`,'index.html'),'utf8');
  if (!html.includes('MCP support')) failures.push(`${record.kind}/${record.slug}: MCP comparison dimension missing from rendered page`);
  for (const { fact, tool } of facts) {
    if (!html.includes(fact.value)) failures.push(`${record.kind}/${record.slug}: ${tool.slug} MCP fact missing from comparison`);
    for (const id of fact.sourceIds) {
      const source = tool.sources.find(item => item.id === id);
      if (source && !html.includes(source.url)) failures.push(`${record.kind}/${record.slug}: ${tool.slug} MCP source ${id} missing from comparison`);
    }
  }
}
function files(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)]); }
for (const file of files('out/_next/static').filter(f => f.endsWith('.js'))) {
  const text = readFileSync(file,'utf8');
  if (/commission|restrictedProductSlugs|approvedDigest/.test(text)) failures.push(`${file}: internal content leaked into client JavaScript`);
}
if (!existsSync('out/404.html')) failures.push('missing static 404');
else {
  try {
    const html404 = readFileSync('out/404.html','utf8');
    if (injectFallbackCspMeta(html404) !== html404) failures.push('static 404 is missing its generated fallback CSP meta');
  } catch (error) {
    failures.push(`static 404 CSP validation failed: ${error.message}`);
  }
}
if (!readFileSync('out/robots.txt','utf8').includes(`${site}/sitemap.xml`)) failures.push('robots sitemap mismatch');
const headersPath = 'out/_headers';
if (!existsSync(headersPath)) {
  failures.push('missing generated Cloudflare Pages security headers');
} else {
  try {
    const expectedHeaders = generateHeadersFile(routes, {
      readHtml: route => readFileSync(join('out',route.path,'index.html'),'utf8'),
    });
    const actualHeaders = readFileSync(headersPath,'utf8');
    if (actualHeaders !== expectedHeaders) failures.push('Cloudflare Pages security headers do not match current routes and inline script hashes');
    if (!actualHeaders.includes("Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none';")) failures.push('missing shared fallback CSP protections');
    if (/Strict-Transport-Security|unsafe-inline/.test(actualHeaders)) failures.push('security headers must not enable unapproved HSTS or unsafe-inline');
  } catch (error) {
    failures.push(`security header validation failed: ${error.message}`);
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode=1; }
else console.log(`Artifact checks passed: ${routes.length} pages; ${expected.length} indexable URLs; metadata, links and client boundaries.`);
