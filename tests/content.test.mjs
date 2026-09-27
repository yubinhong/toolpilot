import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { content, publicTool } from '../lib/content.mjs';
import { tools, researchTools } from '../lib/catalog.mjs';
import { validateContent, contentDigest, isIndexable, vendorLink, freshness, isHttpsUrl } from '../lib/content-policy.mjs';
import { getRoutes } from '../lib/routes.mjs';
function tool() {
  const r = structuredClone(content.find(r => r.slug === 'cursor' && r.kind === 'tools'));
  r.slug = 'synthetic-tool'; r.name='Synthetic fixture'; r.title='Synthetic fixture';
  r.productUrl='https://example.com/';
  return r;
}
function approve(r) {
  r.review={state:'published',owner:'Synthetic reviewer',reviewedAt:'2026-09-27',approvedRevision:r.revision,approvedDigest:contentDigest(r),evidence:'tests/fixtures/synthetic-approval-only'};
  r.verifiedAt='2026-09-27'; return r;
}
test('content is valid and includes the planned first-batch kinds',() => {
  assert.deepEqual(validateContent(content),[]);
  assert.ok(content.length >= 28);
  for (const [kind,count] of Object.entries({tools:12,compare:11,alternatives:6,pricing:4,best:3,guides:2})) assert.ok(content.filter(r=>r.kind===kind).length >= count);
});
test('MCP capability claims cite official docs and remain pending exact owner review',() => {
  const expected = new Map([
    ['claude-code','https://code.claude.com/docs/en/mcp'],
    ['cline','https://docs.cline.bot/mcp/mcp-overview'],
    ['continue','https://docs.continue.dev/customize/deep-dives/mcp'],
    ['cursor','https://docs.cursor.com/context/model-context-protocol'],
    ['github-copilot','https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp'],
  ]);
  const profiles = content.filter(record=>record.kind==='tools');
  const claims = profiles.filter(record=>record.facts.some(fact=>fact.key==='mcp'));
  assert.deepEqual(claims.map(record=>record.slug).sort(),[...expected.keys()].sort());
  for (const record of claims) {
    const fact=record.facts.find(item=>item.key==='mcp');
    const source=record.sources.find(item=>item.id==='mcp');
    assert.equal(record.revision,2,`${record.slug} revision was bumped`);
    assert.ok(fact.value,`${record.slug} MCP claim has evidence`);
    assert.equal(fact.critical,false);
    assert.deepEqual(fact.sourceIds,['mcp']);
    assert.equal(source.url,expected.get(record.slug));
    assert.equal(source.accessedAt,fact.checkedAt);
    assert.equal(record.review.state,'in-review');
    for (const field of ['owner','reviewedAt','approvedRevision','approvedDigest','evidence']) assert.equal(record.review[field],null);
    assert.equal(record.verifiedAt,null);
    assert.equal(record.testedAt,null);
  }
  assert.ok(profiles.filter(record=>!expected.has(record.slug)).every(record=>!record.facts.some(fact=>fact.key==='mcp')));
});
test('TASK-006 P1 additions exist as in-review noindex routes with valid dependencies',() => {
  const required = [
    ...['aider','continue','n8n','make'].map(slug=>`tools/${slug}`),
    ...['make-vs-n8n','claude-code-vs-github-copilot','cline-vs-continue','aider-vs-claude-code','bolt-vs-replit'].map(slug=>`compare/${slug}`),
    'best/open-source-ai-coding-tools',
  ];
  const routes = getRoutes();
  for (const path of required) {
    const [kind,slug] = path.split('/');
    const record = content.find(r=>r.kind===kind&&r.slug===slug);
    assert.ok(record,`${path} record exists`);
    assert.equal(record.review.state,'in-review');
    assert.equal(isIndexable(record,content),false);
    assert.equal(routes.find(r=>r.path===`/${path}/`)?.index,false);
  }
  assert.ok(routes.some(r=>r.path==='/alternatives/bolt-new/'));
});
test('TASK-006 review manifest matches each exact in-review revision and digest',() => {
  const manifest=JSON.parse(readFileSync(new URL('../docs/content-review/TASK-006-review-manifest.json',import.meta.url),'utf8'));
  assert.equal(manifest.length,10);
  for (const entry of manifest) {
    const [,kind,slug]=entry.path.split('/');
    const record=content.find(r=>r.kind===kind&&r.slug===slug);
    assert.ok(record,`${entry.path} record exists`);
    assert.equal(entry.revision,record.revision);
    assert.equal(entry.digest,contentDigest(record));
    assert.equal(entry.state,'in-review');
    assert.deepEqual(entry.gaps,record.gaps);
    assert.equal(isIndexable(record,content),false);
  }
});
test('all historical slugs remain and new identities are unique',() => {
  assert.ok(researchTools.every(t=>tools.some(x=>x.slug===t.slug)));
  assert.equal(new Set(tools.map(t=>t.slug)).size,tools.length);
  assert.ok(tools.some(t=>t.slug==='claude-code'));
  assert.ok(tools.some(t=>t.slug==='cline'));
});
test('public DTO excludes research, commission and approval evidence',() => {
  const value=publicTool({...tools[0],commission:'PRIVATE',review:{evidence:'PRIVATE'}});
  assert.deepEqual(Object.keys(value).sort(),['bestFor','category','name','productUrl','slug','status','summary']);
  assert.ok(!JSON.stringify(value).includes('PRIVATE'));
});
test('approved synthetic content can be indexed; draft cannot',() => {
  const r=tool();assert.equal(isIndexable(r,[r]),false);
  approve(r);assert.deepEqual(validateContent([r]),[]);assert.equal(isIndexable(r,[r]),true);
});
for (const field of ['owner','reviewedAt','approvedRevision','approvedDigest','evidence']) {
  test(`publication rejects missing ${field}`,()=> {const r=approve(tool());r.review[field]=null;assert.ok(validateContent([r]).some(e=>e.includes('owner approval')));});
}
test('editing a price or verdict without bumping the revision invalidates approval',() => {
  for(const edit of [r=>r.prices[0].amount=999,r=>r.verdict='Changed judgment']) {
    const r=approve(tool());edit(r);assert.equal(isIndexable(r,[r]),false);assert.ok(validateContent([r]).length);
  }
});
test('approved comparison needs current approved dependencies including digest',() => {
  const a=approve(tool()), b=approve(tool());b.slug='second-fixture';approve(b);
  const r=structuredClone(content.find(r=>r.kind==='compare'&&r.slug==='cursor-vs-claude-code'));r.slug='fixture-comparison';
  r.dependencies=[a,b].map(t=>({slug:t.slug,revision:t.revision,digest:contentDigest(t)}));approve(r);
  assert.deepEqual(validateContent([a,b,r]),[]);assert.equal(isIndexable(r,[a,b,r]),true);
  b.summary='Materially changed';approve(b);
  assert.equal(isIndexable(r,[a,b,r]),false);
  assert.ok(validateContent([a,b,r]).some(e=>e.includes('stale tool dependency')));
});
test('unknown critical fact or unresolved gaps prevent publication',()=> {
  const r=tool();r.facts[0].value=null;r.facts[0].sourceIds=[];r.facts[0].checkedAt=null;approve(r);
  assert.equal(isIndexable(r,[r]),false);
  const b=tool();b.gaps=['Unresolved entitlement'];approve(b);assert.equal(isIndexable(b,[b]),false);
});
test('unknown source IDs, missing source dates, duplicate routes and invalid states fail',()=> {
  const a=tool();a.facts[0].sourceIds=['missing'];assert.ok(validateContent([a]).some(e=>e.includes('source')));
  const b=tool();b.sources[0].accessedAt='2026-02-30';assert.ok(validateContent([b]).some(e=>e.includes('source')));
  assert.ok(validateContent([tool(),tool()]).some(e=>e.includes('duplicate')));
  const c=tool();c.review.state='verified-by-link';assert.ok(validateContent([c]).some(e=>e.includes('state')));
});
test('pending record cannot impersonate formal review or hands-on testing',()=> {
  const a=tool();a.verifiedAt='2026-09-27';assert.ok(validateContent([a]).some(e=>e.includes('pending')));
  const b=tool();b.testedAt='2026-09-27';assert.ok(validateContent([b]).some(e=>e.includes('test evidence')));
});
test('vendor link is ordinary until a valid commercial relationship is approved',()=> {
  const r=tool();assert.equal(vendorLink(r,r).href,r.productUrl);assert.equal(vendorLink(r,r).disclosure,null);
  r.commercial.affiliate={status:'active',url:'https://example.com/refer',disclosure:'Synthetic affiliate disclosure',evidence:'Synthetic contract'};
  assert.equal(vendorLink(r,r).href,r.productUrl);approve(r);
  assert.equal(vendorLink(r,r).rel,'sponsored noopener noreferrer');
  assert.equal(vendorLink(r,r).disclosure,'Synthetic affiliate disclosure');
  r.commercial.affiliate.evidence=null;assert.ok(validateContent([r]).some(e=>e.includes('affiliate')));
});
test('commercial statuses cannot silently carry an affiliate URL',()=> {
  const r=tool();r.commercial.affiliate.url='https://example.com/ref';assert.ok(validateContent([r]).some(e=>e.includes('inactive')));
});
test('URL validation rejects credentials, scripts and custom ports',()=> {
  for(const u of ['javascript:alert(1)','http://example.com/','https://user:pass@example.com/','https://example.com:8443/']) assert.equal(isHttpsUrl(u),false);
});
test('price billing interval and currency cannot be dropped',()=> {
  const r=tool();r.prices[0].billing='';assert.ok(validateContent([r]).some(e=>e.includes('price basis')));
  const annual=content.find(r=>r.slug==='lovable'&&r.kind==='tools').prices[1];assert.equal(annual.interval,'year');assert.equal(annual.amount,250);
});
test('route registry excludes drafts without removing their routes',()=> {
  const routes=getRoutes();assert.equal(new Set(routes.map(r=>r.path)).size,routes.length);
  assert.ok(tools.every(t=>routes.some(r=>r.path===`/tools/${t.slug}/`)));
  for (const r of content) assert.equal(routes.find(x=>x.path===`/${r.kind}/${r.slug}/`).index, isIndexable(r,content));
  assert.ok(routes.every(r=>r.path.startsWith('/')&&r.path.endsWith('/')));
  for (const r of content.filter(r=>r.review.state!=='published')) assert.equal(routes.find(x=>x.path===`/${r.kind}/${r.slug}/`).index,false);
});
test('freshness reports unknown and overdue fields without rewriting evidence',()=> {
  const r=tool();const before=JSON.stringify(r);
  const report=freshness([r],'2026-10-28');assert.ok(report.some(x=>x.type==='price'&&x.status==='review-due'));
  assert.ok(report.some(x=>x.status==='unverified'));assert.equal(JSON.stringify(r),before);
  assert.throws(()=>freshness([r],'invalid'));
});


test('malformed nested content is rejected with an actionable message', () => {
  const record = tool(); record.sources = [null];
  assert.ok(validateContent([record]).some(e => e.includes('collection entries')));
  assert.ok(validateContent([null]).some(e => e.includes('record must be')));
});
