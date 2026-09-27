import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getRoutes } from '../lib/routes.mjs';
import { getSiteUrl } from '../lib/site-config.mjs';
import { getBreadcrumbItems } from '../lib/breadcrumbs.mjs';
import { content } from '../lib/content.mjs';
const failures = [];
const routes = getRoutes();
const site = getSiteUrl();
const xml = readFileSync('out/sitemap.xml','utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const expected = routes.filter(r => r.index).map(r => site+r.path).sort();
if (JSON.stringify(urls.sort()) !== JSON.stringify(expected)) failures.push('sitemap differs from indexable route registry');
for (const r of routes) {
  const file = join('out', r.path, 'index.html');
  if (!existsSync(file)) { failures.push(`${r.path}: missing HTML`); continue; }
  const html = readFileSync(file,'utf8');
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  if (!canonical?.includes(`href="${site}${r.path}"`)) failures.push(`${r.path}: incorrect canonical`);
  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0] || '';
  if (r.index ? !/content="index,/.test(robots) : !/content="noindex,/.test(robots)) failures.push(`${r.path}: robots mismatch`);
  if (!/<title>[^<]+<\/title>/.test(html) || !/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${r.path}: missing metadata`);
  if (!html.includes('<meta name="twitter:card" content="summary"')) failures.push(`${r.path}: missing Twitter summary metadata`);
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
const tools = new Map(content.filter(record => record.kind === 'tools').map(record => [record.slug,record]));
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' })[char]);
}
function citationFollows(html, claim, sourceUrl, closingTag) {
  const claimStart = html.indexOf(escapeHtml(claim));
  if (claimStart < 0) return false;
  const claimEnd = html.indexOf(closingTag, claimStart);
  return claimEnd > claimStart && html.slice(claimStart, claimEnd).includes(sourceUrl);
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
    if (!html.includes(item.text)) failures.push(`${record.kind}/${record.slug}: documented ${item.label} missing from rendered page`);
    for (const ref of item.refs) {
      const source = tools.get(ref.toolSlug)?.sources.find(candidate => candidate.id === ref.sourceId);
      const closingTag = item.label.startsWith('FAQ') ? '</dd>' : '</li>';
      if (!source || !citationFollows(html, item.text, source.url, closingTag)) failures.push(`${record.kind}/${record.slug}: documented ${item.label} source ${ref.toolSlug}/${ref.sourceId} is not linked beside its claim`);
    }
  }
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
if (!readFileSync('out/robots.txt','utf8').includes(`${site}/sitemap.xml`)) failures.push('robots sitemap mismatch');
if (failures.length) { console.error(failures.join('\n')); process.exitCode=1; }
else console.log(`Artifact checks passed: ${routes.length} pages; ${expected.length} indexable URLs; metadata, links and client boundaries.`);
