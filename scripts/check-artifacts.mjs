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
import { generateHeadersFile, injectCspMeta } from './generate-security-headers.mjs';
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
  try {
    if (injectCspMeta(html) !== html) failures.push(`${r.path}: missing generated CSP meta or script hashes do not match this document`);
  } catch (error) {
    failures.push(`${r.path}: CSP meta validation failed: ${error.message}`);
  }
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
const clinePortability = cline?.facts.find(fact => fact.key === 'portability');
if (!clinePortability?.value || !clineHtml.includes(escapeHtml(clinePortability.value))) failures.push('/tools/cline/: task-history portability fact is missing from generated HTML');
for (const sourceId of clinePortability?.sourceIds ?? []) {
  const source = cline.sources.find(item => item.id === sourceId);
  if (!source || !clineHtml.includes(source.url)) failures.push(`/tools/cline/: task-history source ${sourceId} is missing from generated HTML`);
}
const clineLocalModels = cline?.facts.find(fact => fact.key === 'localModels');
const clineLocalModelsFaq = cline?.faqs.find(faq => faq.question === 'Which local-model runtimes does Cline document?');
if (!clineLocalModels?.value || !clineHtml.includes(escapeHtml(clineLocalModels.value))) failures.push('/tools/cline/: local-model evidence is missing from generated HTML');
if (!clineLocalModelsFaq || !clineHtml.includes(escapeHtml(clineLocalModelsFaq.answer))) failures.push('/tools/cline/: local-model FAQ is missing from generated HTML');
for (const sourceId of clineLocalModels?.sourceIds ?? []) {
  const source = cline.sources.find(item => item.id === sourceId);
  if (!source || !clineHtml.includes(source.url)) failures.push(`/tools/cline/: local-model source ${sourceId} is missing from generated HTML`);
}
const clineHistoryComparison = content.find(record => record.kind === 'compare' && record.slug === 'cline-vs-continue');
const clineHistoryFaq = clineHistoryComparison?.faqs.find(faq => faq.question === 'Can I move Cline task history to another device?');
const clineLocalModelComparisonFaq = clineHistoryComparison?.faqs.find(faq => faq.question === 'Which local inference runtimes does Cline document?');
const clineHistoryComparisonHtml = readFileSync('out/compare/cline-vs-continue/index.html', 'utf8');
if (!clineHistoryFaq || !clineHistoryComparisonHtml.includes(escapeHtml(clineHistoryFaq.answer))) failures.push('/compare/cline-vs-continue/: task-history portability FAQ is missing from generated HTML');
if (!clineHistoryComparisonHtml.includes('https://docs.cline.bot/core-workflows/task-management')) failures.push('/compare/cline-vs-continue/: task-history source is missing from generated HTML');
if (!clineLocalModelComparisonFaq || !clineHistoryComparisonHtml.includes(escapeHtml(clineLocalModelComparisonFaq.answer))) failures.push('/compare/cline-vs-continue/: local-model FAQ is missing from generated HTML');
if (!clineHistoryComparisonHtml.includes('https://docs.cline.bot/running-models-locally/overview')) failures.push('/compare/cline-vs-continue/: local-model source is missing from generated HTML');
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
const windsurfSelfHosting = windsurf?.facts.find(fact => fact.key === 'selfHosting');
const windsurfSelfHostingFaq = windsurf?.faqs.find(faq => faq.question === 'What does the official listing establish about self-hosted Enterprise access?');
const enterpriseUpdater = windsurf?.sources.find(source => source.id === 'enterprise-updater');
const devinLocal = windsurf?.sources.find(source => source.id === 'devin-local');
const windsurfLocalInferenceFaq = windsurf?.faqs.find(faq => faq.question === 'Does Devin Local mean model inference runs on your device?');
const windsurfAgentMigrationFaq = windsurf?.faqs.find(faq => faq.question === 'What happens to Cascade Workflows and Memories when switching to Devin Local?');
if (!windsurfSelfHosting?.value || !windsurfHtml.includes(escapeHtml(windsurfSelfHosting.value))) failures.push('/tools/windsurf/: scoped self-hosted Enterprise fact is missing from generated HTML');
if (!windsurfSelfHostingFaq || !windsurfHtml.includes(escapeHtml(windsurfSelfHostingFaq.answer))) failures.push('/tools/windsurf/: self-hosted Enterprise FAQ is missing from generated HTML');
if (!enterpriseUpdater?.url || !windsurfHtml.includes(enterpriseUpdater.url)) failures.push('/tools/windsurf/: Codeium Enterprise updater source is missing from generated HTML');
if (!devinLocal?.url || !windsurfHtml.includes(devinLocal.url)) failures.push('/tools/windsurf/: Devin Local source is missing from generated HTML');
for (const faq of [windsurfLocalInferenceFaq, windsurfAgentMigrationFaq]) {
  if (!faq || !windsurfHtml.includes(escapeHtml(faq.answer))) failures.push('/tools/windsurf/: Devin Local inference or migration FAQ is missing from generated HTML');
}
for (const path of ['/alternatives/cursor/', '/alternatives/windsurf/', '/compare/windsurf-vs-cursor/']) {
  const [, kind, slug] = path.split('/');
  const record = content.find(item => item.kind === kind && item.slug === slug);
  const faq = record?.faqs.find(item => item.question === 'What does the public Codeium listing establish about Windsurf self-hosting?');
  const localInferenceFaq = record?.faqs.find(item => item.question === windsurfLocalInferenceFaq?.question);
  const agentMigrationFaq = record?.faqs.find(item => item.question === windsurfAgentMigrationFaq?.question);
  const htmlPath = `out${path}index.html`;
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  if (!faq || !html.includes(escapeHtml(faq.answer))) failures.push(`${path}: Codeium self-hosting evidence FAQ is missing from generated HTML`);
  if (!enterpriseUpdater?.url || !html.includes(enterpriseUpdater.url)) failures.push(`${path}: Codeium Enterprise updater source is missing from generated HTML`);
  for (const dependentFaq of [localInferenceFaq, agentMigrationFaq]) {
    if (!dependentFaq || !html.includes(escapeHtml(dependentFaq.answer))) failures.push(`${path}: Devin Local inference or migration FAQ is missing from generated HTML`);
  }
  if (!devinLocal?.url || !html.includes(devinLocal.url)) failures.push(`${path}: Devin Local source is missing from generated HTML`);
}
for (const price of windsurf?.prices ?? []) {
  for (const sourceId of price.sourceIds) {
    const source = windsurf.sources.find(item => item.id === sourceId);
    if (!source || !windsurfHtml.includes(source.url)) failures.push(`/tools/windsurf/: price source ${sourceId} is missing from generated HTML`);
  }
}
const githubCopilot = tools.get('github-copilot');
const copilotLocalModels = githubCopilot?.facts.find(fact => fact.key === 'localModels');
const githubCopilotHtml = readFileSync('out/tools/github-copilot/index.html', 'utf8');
if (!copilotLocalModels?.value || !githubCopilotHtml.includes(escapeHtml(copilotLocalModels.value))) failures.push('/tools/github-copilot/: Local BYOK scope fact is missing from generated HTML');
for (const sourceId of copilotLocalModels?.sourceIds ?? []) {
  const source = githubCopilot.sources.find(item => item.id === sourceId);
  if (!source || !githubCopilotHtml.includes(source.url)) failures.push(`/tools/github-copilot/: Local BYOK source ${sourceId} is missing from generated HTML`);
}
const copilotSelfHosting = githubCopilot?.facts.find(fact => fact.key === 'selfHosting');
if (!copilotSelfHosting?.value || !githubCopilotHtml.includes(escapeHtml(copilotSelfHosting.value))) failures.push('/tools/github-copilot/: cloud-agent runner placement fact is missing from generated HTML');
for (const sourceId of copilotSelfHosting?.sourceIds ?? []) {
  const source = githubCopilot.sources.find(item => item.id === sourceId);
  if (!source || !githubCopilotHtml.includes(source.url)) failures.push(`/tools/github-copilot/: cloud-agent runner source ${sourceId} is missing from generated HTML`);
}
const copilotPortability = githubCopilot?.facts.find(fact => fact.key === 'portability');
if (!copilotPortability?.value || !githubCopilotHtml.includes(escapeHtml(copilotPortability.value))) failures.push('/tools/github-copilot/: cloud-agent Git portability fact is missing from generated HTML');
for (const sourceId of copilotPortability?.sourceIds ?? []) {
  const source = githubCopilot.sources.find(item => item.id === sourceId);
  if (!source || !githubCopilotHtml.includes(source.url)) failures.push(`/tools/github-copilot/: cloud-agent portability source ${sourceId} is missing from generated HTML`);
}
const copilotRunnerComparison = content.find(record => record.kind === 'compare' && record.slug === 'claude-code-vs-github-copilot');
const copilotRunnerFaq = copilotRunnerComparison?.faqs.find(faq => faq.question === 'Can GitHub Copilot cloud agent run on a self-hosted runner?');
const copilotRunnerHtml = readFileSync('out/compare/claude-code-vs-github-copilot/index.html', 'utf8');
if (!copilotRunnerFaq || !copilotRunnerHtml.includes(escapeHtml(copilotRunnerFaq.answer))) failures.push('/compare/claude-code-vs-github-copilot/: cloud-agent runner FAQ is missing from generated HTML');
for (const sourceId of ['cloud-agent-environment', 'cloud-agent-runners']) {
  const source = githubCopilot?.sources.find(item => item.id === sourceId);
  if (!source || !copilotRunnerHtml.includes(source.url)) failures.push(`/compare/claude-code-vs-github-copilot/: cloud-agent runner source ${sourceId} is missing from generated HTML`);
}
const copilotPortabilityFaq = copilotRunnerComparison?.faqs.find(faq => faq.question === 'Does Copilot cloud agent provide a Git-based code handoff?');
if (!copilotPortabilityFaq || !copilotRunnerHtml.includes(escapeHtml(copilotPortabilityFaq.answer))) failures.push('/compare/claude-code-vs-github-copilot/: cloud-agent Git handoff FAQ is missing from generated HTML');
for (const sourceId of ['cloud-agent-code-changes', 'cloud-agent-overview']) {
  const source = githubCopilot?.sources.find(item => item.id === sourceId);
  if (!source || !copilotRunnerHtml.includes(source.url)) failures.push(`/compare/claude-code-vs-github-copilot/: cloud-agent portability source ${sourceId} is missing from generated HTML`);
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
const continueBilling = continueProfile?.facts.find(fact => fact.key === 'billingModel');
if (continueProfile && continueBilling) {
  const html = readFileSync(join('out','/tools/continue/','index.html'),'utf8');
  if (!html.includes(escapeHtml(continueBilling.value))) failures.push('/tools/continue/: billing route fact is missing from generated HTML');
  for (const sourceId of continueBilling.sourceIds) {
    const source = continueProfile.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/tools/continue/: billing source ${sourceId} is missing from generated HTML`);
  }
}
const continuePortability = continueProfile?.facts.find(fact => fact.key === 'portability');
if (continueProfile && continuePortability) {
  const html = readFileSync(join('out','/tools/continue/','index.html'),'utf8');
  if (!html.includes(escapeHtml(continuePortability.value))) failures.push('/tools/continue/: CLI session/config portability fact is missing from generated HTML');
  for (const sourceId of continuePortability.sourceIds) {
    const source = continueProfile.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/tools/continue/: portability source ${sourceId} is missing from generated HTML`);
  }
}
for (const record of content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'continue'))) {
  const billingFaq = record.faqs?.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'continue' && ref.sourceId === 'terms'));
  if (!billingFaq) {
    failures.push(`/${record.kind}/${record.slug}/: Continue billing evidence FAQ is missing`);
    continue;
  }
  const html = readFileSync(join('out',`/${record.kind}/${record.slug}/`,'index.html'),'utf8');
  if (!html.includes(escapeHtml(billingFaq.answer))) failures.push(`/${record.kind}/${record.slug}/: Continue billing FAQ is missing from generated HTML`);
  if (!html.includes('https://continue.dev/terms-conditions/')) failures.push(`/${record.kind}/${record.slug}/: Continue Terms source is missing from generated HTML`);
  const portabilityFaq = record.faqs?.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'continue' && ref.sourceId === 'cli-tui'));
  if (!portabilityFaq || !['cli-config','config-guide'].every(sourceId => portabilityFaq.sourceRefs.some(ref => ref.toolSlug === 'continue' && ref.sourceId === sourceId))) {
    failures.push(`/${record.kind}/${record.slug}/: Continue session/config portability FAQ is missing`);
    continue;
  }
  if (!html.includes(escapeHtml(portabilityFaq.answer))) failures.push(`/${record.kind}/${record.slug}/: Continue portability FAQ is missing from generated HTML`);
  for (const sourceId of ['cli-tui','cli-config','config-guide']) {
    const source = continueProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/${record.kind}/${record.slug}/: Continue portability source ${sourceId} is missing from generated HTML`);
  }
}
const n8nProfile = tools.get('n8n');
const n8nLocalModels = n8nProfile?.facts.find(fact => fact.key === 'localModels');
if (n8nProfile && n8nLocalModels) {
  const html = readFileSync(join('out','/tools/n8n/','index.html'),'utf8');
  if (!html.includes(escapeHtml(n8nLocalModels.value))) failures.push('/tools/n8n/: local-model fact is missing from generated HTML');
  for (const sourceId of n8nLocalModels.sourceIds) {
    const source = n8nProfile.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/tools/n8n/: local-model source ${sourceId} is missing from generated HTML`);
  }
}
const n8nPortability = n8nProfile?.facts.find(fact => fact.key === 'portability');
if (n8nProfile && n8nPortability) {
  const html = readFileSync(join('out','/tools/n8n/','index.html'),'utf8');
  if (!html.includes(escapeHtml(n8nPortability.value))) failures.push('/tools/n8n/: workflow-portability fact is missing from generated HTML');
  for (const sourceId of n8nPortability.sourceIds) {
    const source = n8nProfile.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/tools/n8n/: portability source ${sourceId} is missing from generated HTML`);
  }
}
for (const record of content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'n8n'))) {
  const portabilityFaq = record.faqs?.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'n8n' && ref.sourceId === 'workflow-export'));
  if (!portabilityFaq || !portabilityFaq.sourceRefs.some(ref => ref.sourceId === 'backup-restore')) {
    failures.push(`/${record.kind}/${record.slug}/: n8n portability evidence FAQ is missing`);
    continue;
  }
  const html = readFileSync(join('out',`/${record.kind}/${record.slug}/`,'index.html'),'utf8');
  if (!html.includes(escapeHtml(portabilityFaq.answer))) failures.push(`/${record.kind}/${record.slug}/: n8n portability FAQ is missing from generated HTML`);
  for (const sourceId of ['workflow-export','backup-restore']) {
    const source = n8nProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/${record.kind}/${record.slug}/: n8n portability source ${sourceId} is missing from generated HTML`);
  }
  const localModelsFaq = record.faqs?.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'n8n' && ref.sourceId === 'ollama-chat'));
  if (!localModelsFaq || !localModelsFaq.sourceRefs.some(ref => ref.sourceId === 'ollama-credentials') || !localModelsFaq.sourceRefs.some(ref => ref.sourceId === 'ai-starter-kit')) {
    failures.push(`/${record.kind}/${record.slug}/: n8n local-model evidence FAQ is missing`);
    continue;
  }
  if (!html.includes(escapeHtml(localModelsFaq.answer))) failures.push(`/${record.kind}/${record.slug}/: n8n local-model FAQ is missing from generated HTML`);
  for (const sourceId of ['ollama-chat','ollama-credentials','ai-starter-kit']) {
    const source = n8nProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/${record.kind}/${record.slug}/: n8n local-model source ${sourceId} is missing from generated HTML`);
  }
}
const makeProfile = tools.get('make');
const makePortability = makeProfile?.facts.find(fact => fact.key === 'portability');
const makeSelfHosting = makeProfile?.facts.find(fact => fact.key === 'selfHosting');
const makeSelfHostingFaq = makeProfile?.faqs.find(faq => faq.question === "Does Make's On-prem agent mean Make itself is self-hosted?");
const makeLocalModelsFaq = makeProfile?.faqs.find(faq => faq.question === "Does Make's AI Agent documentation establish local-model inference?");
const makeProfileHtml = readFileSync('out/tools/make/index.html', 'utf8');
if (!makePortability?.value || !makeProfileHtml.includes(escapeHtml(makePortability.value))) failures.push('/tools/make/: scenario portability fact is missing from generated HTML');
if (!makeSelfHosting?.value || !makeProfileHtml.includes(escapeHtml(makeSelfHosting.value))) failures.push('/tools/make/: on-prem agent/product hosting boundary fact is missing from generated HTML');
if (!makeSelfHostingFaq || !makeProfileHtml.includes(escapeHtml(makeSelfHostingFaq.answer))) failures.push('/tools/make/: on-prem agent/product hosting FAQ is missing from generated HTML');
if (!makeLocalModelsFaq || !makeProfileHtml.includes(escapeHtml(makeLocalModelsFaq.answer))) failures.push('/tools/make/: local-model inference boundary FAQ is missing from generated HTML');
if (!makeProfile?.sources.some(source => source.id === 'ai-agents-new' && makeProfileHtml.includes(source.url))) failures.push('/tools/make/: current AI Agent provider source is missing from generated HTML');
for (const sourceId of makeSelfHosting?.sourceIds ?? []) {
  const source = makeProfile?.sources.find(candidate => candidate.id === sourceId);
  if (!source || !makeProfileHtml.includes(source.url)) failures.push(`/tools/make/: self-hosting source ${sourceId} is missing from generated HTML`);
}
if (!makeProfileHtml.includes('content="noindex, follow"')) failures.push('/tools/make/: in-review noindex is missing from generated HTML');
if (xml.includes(`${site}/tools/make/`)) failures.push('/tools/make/: in-review profile appears in sitemap');
for (const sourceId of makePortability?.sourceIds ?? []) {
  const source = makeProfile?.sources.find(candidate => candidate.id === sourceId);
  if (!source || !makeProfileHtml.includes(source.url)) failures.push(`/tools/make/: portability source ${sourceId} is missing from generated HTML`);
}
for (const slug of ['make-vs-n8n', 'workflow-automation-selection']) {
  const kind = slug === 'make-vs-n8n' ? 'compare' : 'guides';
  const record = content.find(item => item.kind === kind && item.slug === slug);
  const html = readFileSync(join('out',`/${kind}/${slug}/`,'index.html'),'utf8');
  const blueprintFaq = record?.faqs.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'make' && ref.sourceId === 'blueprints'));
  const secretFaq = record?.faqs.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'make' && ref.sourceId === 'simple-aes'));
  const hostingFaq = record?.faqs.find(faq => faq.question === "Does Make's On-prem agent mean Make itself is self-hosted?");
  const localModelsFaq = record?.faqs.find(faq => faq.question === "Does Make's AI Agent documentation establish local-model inference?");
  if (!blueprintFaq || !html.includes(escapeHtml(blueprintFaq.answer))) failures.push(`/${kind}/${slug}/: Make blueprint portability FAQ is missing from generated HTML`);
  if (!secretFaq || !html.includes(escapeHtml(secretFaq.answer))) failures.push(`/${kind}/${slug}/: Make blueprint secret-handling FAQ is missing from generated HTML`);
  if (!hostingFaq || !html.includes(escapeHtml(hostingFaq.answer))) failures.push(`/${kind}/${slug}/: Make on-prem agent/product hosting FAQ is missing from generated HTML`);
  if (!localModelsFaq || !html.includes(escapeHtml(localModelsFaq.answer))) failures.push(`/${kind}/${slug}/: Make local-model inference boundary FAQ is missing from generated HTML`);
  if (!html.includes('content="noindex, follow"')) failures.push(`/${kind}/${slug}/: in-review noindex is missing from generated HTML`);
  if (xml.includes(`${site}/${kind}/${slug}/`)) failures.push(`/${kind}/${slug}/: in-review page appears in sitemap`);
  for (const sourceId of ['blueprints', 'scenario-history', 'simple-aes', 'on-prem-agent', 'ai-agents-new']) {
    const source = makeProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!source || !html.includes(source.url)) failures.push(`/${kind}/${slug}/: Make portability source ${sourceId} is missing from generated HTML`);
  }
}
const replitProfile = tools.get('replit');
const replitPortability = replitProfile?.facts.find(fact => fact.key === 'portability');
const replitAiIntegrations = replitProfile?.facts.find(fact => fact.key === 'aiIntegrations');
const replitAiIntegrationsFaq = replitProfile?.faqs.find(faq => faq.question === "Does Replit's AI Integrations page establish local-model support for Replit Agent?");
const replitProfileHtml = readFileSync('out/tools/replit/index.html', 'utf8');
if (!replitPortability?.value || !replitProfileHtml.includes(escapeHtml(replitPortability.value))) failures.push('/tools/replit/: code-portability fact is missing from generated HTML');
if (!replitAiIntegrations?.value || !replitProfileHtml.includes(escapeHtml(replitAiIntegrations.value))) failures.push('/tools/replit/: Agent/app AI integration boundary fact is missing from generated HTML');
if (!replitAiIntegrationsFaq || !replitProfileHtml.includes(escapeHtml(replitAiIntegrationsFaq.answer))) failures.push('/tools/replit/: Agent/app AI integration FAQ is missing from generated HTML');
for (const sourceId of replitPortability?.sourceIds ?? []) {
  const source = replitProfile?.sources.find(candidate => candidate.id === sourceId);
  if (!source || !replitProfileHtml.includes(source.url)) failures.push(`/tools/replit/: portability source ${sourceId} is missing from generated HTML`);
}
for (const sourceId of replitAiIntegrations?.sourceIds ?? []) {
  const source = replitProfile?.sources.find(candidate => candidate.id === sourceId);
  if (!source || !replitProfileHtml.includes(source.url)) failures.push(`/tools/replit/: AI integrations source ${sourceId} is missing from generated HTML`);
}
for (const [kind, slug] of [['alternatives', 'replit'], ['compare', 'bolt-vs-replit'], ['compare', 'replit-vs-lovable']]) {
  const record = content.find(item => item.kind === kind && item.slug === slug);
  const html = readFileSync(join('out',`/${kind}/${slug}/`,'index.html'),'utf8');
  const portabilityFaq = record?.faqs.find(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'replit' && ref.sourceId === 'version-control'));
  if (!portabilityFaq || !html.includes(escapeHtml(portabilityFaq.answer))) failures.push(`/${kind}/${slug}/: Replit code-portability FAQ is missing from generated HTML`);
  for (const sourceId of ['version-control', 'disaster-recovery', 'import-providers', 'checkpoints']) {
    const source = replitProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!portabilityFaq?.sourceRefs.some(ref => ref.toolSlug === 'replit' && ref.sourceId === sourceId) || !source || !html.includes(source.url)) {
      failures.push(`/${kind}/${slug}/: Replit portability source ${sourceId} is missing from generated HTML`);
    }
  }
  if (!html.includes('content="noindex, follow"')) failures.push(`/${kind}/${slug}/: in-review noindex is missing from generated HTML`);
  if (xml.includes(`${site}/${kind}/${slug}/`)) failures.push(`/${kind}/${slug}/: in-review page appears in sitemap`);
}
for (const [kind, slug] of [
  ['alternatives', 'bolt-new'],
  ['alternatives', 'lovable'],
  ['alternatives', 'replit'],
  ['best', 'ai-app-builders-for-prototypes'],
  ['compare', 'bolt-vs-replit'],
  ['compare', 'replit-vs-lovable'],
  ['pricing', 'replit'],
]) {
  const record = content.find(item => item.kind === kind && item.slug === slug);
  const html = readFileSync(join('out', `/${kind}/${slug}/`, 'index.html'), 'utf8');
  const isPricing = kind === 'pricing';
  const question = isPricing
    ? 'How does Replit AI Integrations usage affect the Core plan price?'
    : "Does Replit's AI Integrations page establish local-model support for Replit Agent?";
  const faq = record?.faqs.find(item => item.question === question);
  if (!faq || !html.includes(escapeHtml(faq.answer))) failures.push(`/${kind}/${slug}/: Replit Agent/app AI integration FAQ is missing from generated HTML`);
  const sourceIds = isPricing ? ['ai-integrations'] : ['ai-integrations', 'agent-model-selector'];
  for (const sourceId of sourceIds) {
    const source = replitProfile?.sources.find(candidate => candidate.id === sourceId);
    if (!faq?.sourceRefs.some(ref => ref.toolSlug === 'replit' && ref.sourceId === sourceId) || !source || !html.includes(source.url)) {
      failures.push(`/${kind}/${slug}/: Replit AI integration source ${sourceId} is missing from generated HTML`);
    }
  }
  if (!html.includes('content="noindex, follow"')) failures.push(`/${kind}/${slug}/: in-review noindex is missing from generated HTML`);
  if (xml.includes(`${site}/${kind}/${slug}/`)) failures.push(`/${kind}/${slug}/: in-review page appears in sitemap`);
}
const boltProfile = tools.get('bolt-new');
const boltProfileHtml = readFileSync('out/tools/bolt-new/index.html', 'utf8');
const boltHostingFact = boltProfile?.facts.find(item => item.key === 'selfHosting');
const boltForgeFaq = boltProfile?.faqs.find(item => item.question === 'Does Bolt Forge establish local model inference?');
if (!boltHostingFact?.value || !boltProfileHtml.includes(escapeHtml(boltHostingFact.value))) failures.push('/tools/bolt-new/: customer-cloud deployment fact is missing from generated HTML');
if (!boltForgeFaq || !boltProfileHtml.includes(escapeHtml(boltForgeFaq.answer))) failures.push('/tools/bolt-new/: Forge/local-inference FAQ is missing from generated HTML');
for (const sourceId of ['security', 'forge', 'forge-runtime', 'agents']) {
  const source = boltProfile?.sources.find(candidate => candidate.id === sourceId);
  if (!source || !boltProfileHtml.includes(source.url)) failures.push(`/tools/bolt-new/: official Bolt source ${sourceId} is missing from generated HTML`);
}
for (const [kind, slug] of [
  ['alternatives', 'bolt-new'],
  ['alternatives', 'lovable'],
  ['alternatives', 'replit'],
  ['best', 'ai-app-builders-for-prototypes'],
  ['compare', 'bolt-vs-replit'],
  ['compare', 'lovable-vs-bolt'],
]) {
  const record = content.find(item => item.kind === kind && item.slug === slug);
  const html = readFileSync(join('out', `/${kind}/${slug}/`, 'index.html'), 'utf8');
  for (const faq of record?.faqs.filter(item => item.sourceRefs.some(ref => ref.toolSlug === 'bolt-new')) ?? []) {
    if (!html.includes(escapeHtml(faq.answer))) failures.push(`/${kind}/${slug}/: Bolt FAQ is missing from generated HTML`);
    for (const ref of faq.sourceRefs.filter(item => item.toolSlug === 'bolt-new')) {
      const source = boltProfile?.sources.find(item => item.id === ref.sourceId);
      if (!source || !html.includes(source.url)) failures.push(`/${kind}/${slug}/: Bolt source ${ref.sourceId} is missing from generated HTML`);
    }
  }
  if (!html.includes('content="noindex, follow"')) failures.push(`/${kind}/${slug}/: in-review noindex is missing from generated HTML`);
  if (xml.includes(`${site}/${kind}/${slug}/`)) failures.push(`/${kind}/${slug}/: in-review page appears in sitemap`);
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
    if (injectCspMeta(html404) !== html404) failures.push('static 404 is missing its generated CSP meta or script hashes do not match the document');
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
    const expectedHeaders = generateHeadersFile(routes);
    const actualHeaders = readFileSync(headersPath,'utf8');
    if (actualHeaders !== expectedHeaders) failures.push('Cloudflare Pages shared security headers differ from the expected single wildcard rule');
    if (actualHeaders.trim().split(/\n\n/).length !== 1) failures.push('Cloudflare Pages headers must stay within one shared rule');
    if (!actualHeaders.includes("Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none';")) failures.push('missing shared fallback CSP protections');
    if (/Strict-Transport-Security|unsafe-inline/.test(actualHeaders)) failures.push('security headers must not enable unapproved HSTS or unsafe-inline');
  } catch (error) {
    failures.push(`security header validation failed: ${error.message}`);
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode=1; }
else console.log(`Artifact checks passed: ${routes.length} pages; ${expected.length} indexable URLs; metadata, links and client boundaries.`);
