import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { content, publicTool } from '../lib/content.mjs';
import { tools, researchTools } from '../lib/catalog.mjs';
import { validateContent, contentDigest, isIndexable, vendorLink, freshness, isHttpsUrl } from '../lib/content-policy.mjs';
import { getRoutes } from '../lib/routes.mjs';
import { getEvidenceHubGroups } from '../lib/evidence-hubs.mjs';
import { verificationStatusLabel } from '../lib/content-labels.mjs';
import { findDuplicateMetadata } from '../scripts/metadata-audit.mjs';
function tool(slug='synthetic-tool') {
  const r = structuredClone(content.find(r => r.slug === 'cursor' && r.kind === 'tools'));
  r.slug = slug; r.name='Synthetic fixture'; r.title='Synthetic fixture';
  r.productUrl='https://example.com/';
  for (const field of ['pros','cons','faqs']) r[field]=r[field].map(item=>({...item,sourceRefs:item.sourceRefs.map(ref=>({...ref,toolSlug:slug}))}));
  return r;
}
function approve(r) {
  r.review={state:'published',owner:'Synthetic reviewer',reviewedAt:'2026-09-27',approvedRevision:r.revision,approvedDigest:contentDigest(r),evidence:'tests/fixtures/synthetic-approval-only'};
  r.verifiedAt='2026-09-27'; return r;
}
test('content is valid and includes the planned first-batch kinds',() => {
  assert.deepEqual(validateContent(content),[]);
  assert.ok(content.length >= 28);
  for (const [kind,count] of Object.entries({tools:12,compare:11,alternatives:6,pricing:4,best:3,guides:3})) assert.ok(content.filter(r=>r.kind===kind).length >= count);
});
test('Make and Replit price cadences are source-backed and remain pending owner review',() => {
  const expectations = {
    make: [
      { name: 'Core (10,000 credits/month; monthly billing)', amount: 12, sources: ['pricing'] },
      { name: 'Core (10,000 credits/month; annual billing)', amount: 9, sources: ['pricing', 'pricing-annual'] },
    ],
    replit: [
      { name: 'Replit Core (monthly billing)', amount: 20, sources: ['core-pricing-update', 'pricing'] },
      { name: 'Replit Core (annual billing equivalent)', amount: 18, sources: ['pricing', 'core-pricing-update'] },
    ],
  };

  for (const [slug, prices] of Object.entries(expectations)) {
    const record = content.find(item => item.kind === 'tools' && item.slug === slug);
    assert.ok(record, `${slug} profile exists`);
    for (const expected of prices) {
      const price = record.prices.find(item => item.name === expected.name);
      assert.ok(price, `${slug} has ${expected.name}`);
      assert.equal(price.amount, expected.amount);
      assert.equal(price.interval, 'month');
      assert.equal(price.currency, 'USD');
      assert.equal(price.checkedAt, '2026-09-27');
      assert.deepEqual(price.sourceIds, expected.sources);
      assert.ok(price.sourceIds.every(id => record.sources.some(source => source.id === id)));
    }
    assert.equal(record.review.state, 'in-review');
    assert.equal(isIndexable(record, content), false);
  }
});
test('Make plan, privacy and retention facts cite official pages without claiming account-level settings',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'make');
  const expected = {
    hostingRegions: { value: 'The pricing table lists AWS (EU/North America) for each plan. This does not establish customer-selectable regions or account-level data residency.', sources: ['pricing'], date: '2026-09-27' },
    executionLogRetention: { value: 'The plan comparison lists 30 days of execution log storage for Core. Deletion semantics and retention of other data are not specified here.', sources: ['pricing'], date: '2026-09-27' },
    dataTransferAllowance: { value: 'The plan table lists 5 GB of data transfer per 10,000 monthly credits; this is an allowance, not a measured workload estimate.', sources: ['pricing'], date: '2026-09-27' },
    privacy: { sources: ['privacy'], date: '2026-09-28' },
    personalDataRetention: { sources: ['privacy', 'privacy-and-gdpr'], date: '2026-09-28' },
    logDataRetention: { sources: ['security'], date: '2026-09-28' },
  };

  assert.ok(record);
  assert.equal(record.revision, 6);
  for (const [key, expectation] of Object.entries(expected)) {
    const fact = record.facts.find(item => item.key === key);
    assert.ok(fact, `Make has ${key}`);
    if (expectation.value) assert.equal(fact.value, expectation.value);
    assert.deepEqual(fact.sourceIds, expectation.sources);
    assert.equal(fact.checkedAt, expectation.date);
    assert.equal(fact.critical, false);
  }
  assert.match(record.facts.find(item => item.key === 'privacy')?.value ?? '', /workflow-step counts, operation types and queries/);
  assert.match(record.facts.find(item => item.key === 'personalDataRetention')?.value ?? '', /Neither page gives a purge timeline/);
  assert.match(record.facts.find(item => item.key === 'logDataRetention')?.value ?? '', /separate from Core's plan-listed 30-day execution-log allowance/);
  for (const [id, url] of Object.entries({
    privacy: 'https://www.make.com/en/privacy-notice',
    'privacy-and-gdpr': 'https://www.make.com/en/privacy-and-gdpr',
    security: 'https://www.make.com/en/security',
  })) {
    const source = record.sources.find(item => item.id === id);
    assert.equal(source?.url, url);
    assert.equal(source?.accessedAt, '2026-09-28');
  }
  assert.ok(record.gaps.some(gap => gap.includes('customer-selectable region meets the intended account data-residency requirement')));
  assert.ok(record.gaps.some(gap => gap.includes('workspace-specific workflow and connected-provider data scope')));
  assert.ok(record.gaps.some(gap => gap.includes('applicable DPA/subprocessor list and legal suitability')));
  for (const slug of ['make-vs-n8n', 'workflow-automation-selection']) {
    const decision = content.find(item => item.slug === slug);
    const makeDependency = decision?.dependencies.find(item => item.slug === 'make');
    assert.equal(makeDependency?.revision, 6);
    assert.equal(makeDependency?.digest, contentDigest(record));
    assert.ok(decision?.faqs.some(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'make' && ref.sourceId === 'privacy')));
    assert.ok(decision?.faqs.some(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'make' && ref.sourceId === 'security')));
    assert.equal(decision?.review.state, 'in-review');
    assert.equal(isIndexable(decision, content), false);
  }
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Replit privacy and geography facts keep workspace and published-app residency distinct',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'replit');
  const expected = {
    privacy: {
      source: 'privacy-policy',
      value: "Replit's privacy policy says its Services are primarily hosted in the United States and may also be hosted elsewhere; using the Services can transfer data to the United States and other hosting jurisdictions. This does not identify every project resource or an account's geography settings.",
    },
    publishingGeography: {
      source: 'geography',
      value: 'Replit documents publishing-region selection for Core, Pro and Enterprise across North America, Europe (EU), Asia, South America and Australia; Free customers publish to North America by default. Published compute, database and Object Storage are colocated. The choice cannot be changed after publishing, and pre-publish resources may remain elsewhere.',
    },
    workspaceGeography: {
      source: 'geography',
      value: 'Workspace geography is separate from publishing geography, is selected when a workspace is created, is available only on Pro and cannot be changed later. The workspace and published app regions do not need to match.',
    },
  };

  assert.ok(record);
  assert.equal(record.revision, 5);
  for (const [key, expectedFact] of Object.entries(expected)) {
    const fact = record.facts.find(item => item.key === key);
    const source = record.sources.find(item => item.id === expectedFact.source);
    assert.ok(fact, `Replit has ${key}`);
    assert.equal(fact.value, expectedFact.value);
    assert.deepEqual(fact.sourceIds, [expectedFact.source]);
    assert.equal(fact.checkedAt, '2026-09-27');
    assert.equal(source?.accessedAt, fact.checkedAt);
  }
  assert.equal(record.sources.find(item => item.id === 'geography')?.url, 'https://docs.replit.com/features/security/geography');
  assert.equal(record.sources.find(item => item.id === 'privacy-policy')?.url, 'https://replit.com/privacy-policy');
  assert.ok(record.gaps.some(gap => gap.includes('no account or deployment was checked')));
  assert.ok(record.gaps.some(gap => gap.includes('No independent export or deployment test')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Bolt privacy policy draft records prospective training use without claiming account settings',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'bolt-new');
  const fact = record?.facts.find(item => item.key === 'privacy');
  const source = record?.sources.find(item => item.id === 'privacy');
  const faq = record?.faqs.find(item => item.question === 'Can Bolt use project content to develop AI models?');

  assert.ok(record);
  assert.ok(fact?.value);
  assert.deepEqual(fact.sourceIds, ['privacy']);
  assert.equal(fact.checkedAt, '2026-09-28');
  assert.equal(source?.url, 'https://stackblitz.com/privacy-policy');
  assert.equal(source?.accessedAt, '2026-09-28');
  assert.match(fact.value, /no earlier than 2026-10-07/);
  assert.match(fact.value, /Forge content.*2026-09-14/);
  assert.match(faq?.answer ?? '', /this account's effective date, region, agreement and settings were not checked/);
  assert.match(faq?.answer ?? '', /Forge content.*2026-09-14/);
  assert.ok(record.gaps.some(gap => gap.includes("account's applicable Terms effective date")));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);

  const dependents = content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'bolt-new'));
  assert.equal(dependents.length, 6);
  for (const dependent of dependents) {
    const dependency = dependent.dependencies.find(item => item.slug === 'bolt-new');
    assert.equal(dependency.revision, record.revision);
    assert.equal(dependency.digest, contentDigest(record));
    assert.equal(dependent.review.state, 'in-review');
    assert.equal(isIndexable(dependent, content), false);
  }
});
test('Lovable training-policy evidence separates data scopes and keeps account review open',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'lovable');
  const fact = record?.facts.find(item => item.key === 'privacy');
  const regions = record?.facts.find(item => item.key === 'hostingRegions');
  const faq = record?.faqs.find(item => item.question === 'Is Lovable project content used to train models?');
  const regionFaq = record?.faqs.find(item => item.question === 'Does selecting a Lovable Cloud region keep all platform data there?');
  const expectedSources = {
    privacy: 'https://lovable.dev/id/privacy',
    terms: 'https://lovable.dev/terms',
    dpa: 'https://lovable.dev/data-processing-agreement',
    security: 'https://lovable.dev/security',
  };

  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.equal(fact?.checkedAt, '2026-09-28');
  assert.deepEqual(fact?.sourceIds, ['privacy', 'terms', 'dpa', 'security']);
  assert.match(fact?.value ?? '', /Privacy Policy \(effective 2026-09-15\)/);
  assert.match(fact?.value ?? '', /free settings opt-out applies prospectively on any plan/);
  assert.match(fact?.value ?? '', /excludes Business\/Enterprise content and Usage Data, account\/billing details, and Your Users' Data/);
  assert.match(fact?.value ?? '', /Terms grant a broader training license subject to prospective opt-out/);
  assert.match(fact?.value ?? '', /DPA bars model training on Customer Personal Data but allows Service Data training and says customers cannot opt out of Service Data processing while customers/);
  assert.match(fact?.value ?? '', /the account plan, organization agreement and setting were not checked/);
  for (const [id, url] of Object.entries(expectedSources)) {
    const source = record.sources.find(item => item.id === id);
    assert.equal(source?.url, url);
    assert.equal(source?.accessedAt, '2026-09-28');
  }
  assert.match(faq?.answer ?? '', /no-cost opt-out in settings on any plan that applies prospectively/);
  assert.match(faq?.answer ?? '', /verify the actual plan, organization agreement and setting/);
  assert.deepEqual(new Set(faq?.sourceRefs.map(ref => ref.sourceId)), new Set(Object.keys(expectedSources)));
  assert.deepEqual(regions?.sourceIds, ['security', 'privacy']);
  assert.equal(regions?.checkedAt, '2026-09-28');
  assert.match(regions?.value ?? '', /EU, US and Asia Pacific/);
  assert.match(regions?.value ?? '', /does not move across regions by default/);
  assert.match(regions?.value ?? '', /process Personal Data in multiple countries, including the US/);
  assert.match(regions?.value ?? '', /no account\/workspace region was checked/);
  assert.match(regionFaq?.answer ?? '', /no account region or complete provider data map was checked/);
  assert.deepEqual(new Set(regionFaq?.sourceRefs.map(ref => ref.sourceId)), new Set(['security', 'privacy']));
  assert.ok(record.gaps.some(gap => gap.includes('no account or agreement was inspected')));
  assert.ok(record.gaps.some(gap => gap.includes('Customer Content, Usage Data, Customer Personal Data, Service Data or Your Users')));

  const dependents = content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'lovable'));
  assert.equal(dependents.length, 7);
  for (const dependent of dependents) {
    const dependency = dependent.dependencies.find(item => item.slug === 'lovable');
    assert.equal(dependency?.revision, record.revision);
    assert.equal(dependency?.digest, contentDigest(record));
    assert.ok(dependent.faqs.some(item => item.sourceRefs.some(ref => ref.toolSlug === 'lovable' && ref.sourceId === 'privacy')));
    if (['bolt-new','lovable','replit','ai-app-builders-for-prototypes','lovable-vs-bolt','replit-vs-lovable'].includes(dependent.slug)) {
      assert.ok(dependent.faqs.some(item => item.question === 'Does choosing an EU Lovable Cloud region keep all project data in the EU?'));
    }
    assert.equal(dependent.review.state, 'in-review');
    assert.equal(isIndexable(dependent, content), false);
  }
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Aider analytics policy distinguishes opt-in telemetry from model-provider data handling',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'aider');
  const fact = record?.facts.find(item => item.key === 'privacy');
  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.equal(fact?.checkedAt, '2026-09-27');
  assert.deepEqual(fact?.sourceIds, ['analytics', 'privacy']);
  assert.match(fact?.value ?? '', /random subset of users to opt in/);
  assert.match(fact?.value ?? '', /UUID4/);
  assert.match(fact?.value ?? '', /exclude code, prompts\/chat messages, API keys and personal information/);
  assert.match(fact?.value ?? '', /model provider's data terms separately/);
  assert.equal(record.sources.find(item => item.id === 'analytics')?.url, 'https://aider.chat/docs/more/analytics.html');
  assert.equal(record.sources.find(item => item.id === 'privacy')?.url, 'https://aider.chat/docs/legal/privacy.html');
  assert.ok(record.gaps.some(gap => gap.includes('no local settings were inspected')));
  assert.ok(record.gaps.some(gap => gap.includes('selected model provider')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Aider Docker support distinguishes a containerized client from local model inference',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'aider');
  const fact = record?.facts.find(item => item.key === 'selfHosting');
  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.equal(fact?.checkedAt, '2026-09-27');
  assert.deepEqual(fact?.sourceIds, ['docker', 'models']);
  assert.match(fact?.value ?? '', /Docker images/);
  assert.match(fact?.value ?? '', /mounted into \/app/);
  assert.match(fact?.value ?? '', /does not by itself make model inference local/);
  assert.equal(record.sources.find(item => item.id === 'docker')?.url, 'https://aider.chat/docs/install/docker.html');
  assert.ok(record.gaps.some(gap => gap.includes('no deployment or endpoint was tested')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('n8n license and self-hosting evidence preserves vendor examples and unresolved deployment boundaries',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'n8n');
  const privacy = record?.facts.find(item => item.key === 'privacy');
  const deployment = record?.facts.find(item => item.key === 'deployment');
  const license = record?.facts.find(item => item.key === 'license');
  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.deepEqual(privacy?.sourceIds, ['privacy']);
  assert.match(privacy?.value ?? '', /Usage Data for self-hosted deployments unless users opt out/);
  assert.match(privacy?.value ?? '', /workflow usage metrics and enabled integrations/);
  assert.deepEqual(deployment?.sourceIds, ['product', 'security']);
  assert.match(deployment?.value ?? '', /configure TLS termination and handle encryption at rest/);
  assert.equal(record.sources.find(item => item.id === 'privacy')?.url, 'https://n8n.io/legal/privacy/');
  assert.equal(record.sources.find(item => item.id === 'security')?.url, 'https://n8n.io/legal/security/');
  assert.equal(record.sources.find(item => item.id === 'license')?.url, 'https://github.com/n8n-io/n8n/blob/master/LICENSE.md');
  assert.equal(record.sources.find(item => item.id === 'license-use-cases')?.url, 'https://support.n8n.io/article/can-i-use-your-license-for-my-use-case');
  assert.equal(record.sources.find(item => item.id === 'license')?.accessedAt, '2026-09-28');
  assert.equal(record.sources.find(item => item.id === 'license-use-cases')?.accessedAt, '2026-09-28');
  assert.deepEqual(license?.sourceIds, ['license', 'license-use-cases']);
  assert.equal(license?.checkedAt, '2026-09-28');
  assert.match(license?.value ?? '', /own internal business purposes or non-commercial\/personal use/);
  assert.match(license?.value ?? '', /hosting and managing clients' workflows and credentials on your own instance requires Enterprise/);
  assert.match(license?.value ?? '', /embedding n8n to expose workflows to customers requires a white-labeled Embed license/);
  assert.match(license?.value ?? '', /do not determine a specific deployment's terms/);
  assert.ok(record.gaps.some(gap => gap.includes('telemetry opt-out')));
  assert.ok(record.gaps.some(gap => gap.includes('no specific use case, agreement or entitlement was reviewed')));
  const selfHostedEntry = getEvidenceHubGroups('self-hosted').flatMap(group => group.entries).find(entry => entry.tool.slug === 'n8n');
  assert.equal(selfHostedEntry?.fact.key, 'deployment');
  assert.match(selfHostedEntry?.fact.value ?? '', /TLS termination and handle encryption at rest/);
  for (const slug of ['make-vs-n8n', 'workflow-automation-selection']) {
    const decision = content.find(item => item.slug === slug);
    const dependency = decision?.dependencies.find(item => item.slug === 'n8n');
    assert.ok(dependency);
    assert.equal(dependency.revision, 4);
    assert.equal(dependency.digest, contentDigest(record));
    assert.ok(decision?.faqs.some(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'n8n' && ref.sourceId === 'privacy')));
    assert.equal(decision?.review.state, 'in-review');
    assert.equal(isIndexable(decision, content), false);
  }
  const comparison = content.find(item => item.slug === 'make-vs-n8n');
  const guide = content.find(item => item.slug === 'workflow-automation-selection');
  assert.equal(comparison?.revision, 9);
  assert.ok(comparison?.faqs?.some(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'n8n' && ref.sourceId === 'license-use-cases')));
  assert.equal(guide?.revision, 8);
  assert.ok(guide?.faqs?.some(faq => faq.sourceRefs.some(ref => ref.toolSlug === 'n8n' && ref.sourceId === 'license-use-cases')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Cline privacy evidence exposes the public telemetry-policy conflict and API-key routing boundary',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'cline');
  const fact = record?.facts.find(item => item.key === 'privacy');
  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.equal(fact?.checkedAt, '2026-09-28');
  assert.deepEqual(fact?.sourceIds, ['terms', 'privacy', 'telemetry-blog']);
  assert.match(fact?.value ?? '', /Terms of Service, last modified 2025-09-25/);
  assert.match(fact?.value ?? '', /is on by default and can be disabled in extension settings/);
  assert.match(fact?.value ?? '', /Privacy Notice, last updated 2025-09-24/);
  assert.match(fact?.value ?? '', /with the user's own API key/);
  assert.match(fact?.value ?? '', /with Cline-provided API keys/);
  assert.match(fact?.value ?? '', /2025-02-26 Cline telemetry blog describes telemetry as opt-in/);
  assert.match(fact?.value ?? '', /actual settings and payload/);
  assert.equal(record.sources.find(item => item.id === 'privacy')?.url, 'https://cline.bot/privacy');
  assert.equal(record.sources.find(item => item.id === 'terms')?.url, 'https://cline.bot/tos');
  assert.equal(record.sources.find(item => item.id === 'telemetry-blog')?.url, 'https://cline.bot/blog/introducing-anonymous-telemetry-in-cline');
  assert.ok(record.cons.some(item => item.sourceRefs.some(ref => ref.sourceId === 'terms' && ref.toolSlug === 'cline')));
  assert.ok(record.faqs.some(item => item.sourceRefs.some(ref => ref.sourceId === 'privacy' && ref.toolSlug === 'cline')));
  const dependentSlugs = ['claude-code', 'cursor', 'windsurf', 'ai-coding-tools-for-solo-founders', 'open-source-ai-coding-tools', 'cline-vs-claude-code', 'cline-vs-continue', 'ai-editor-vs-terminal-agent'];
  const dependents = content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'cline'));
  assert.deepEqual(dependents.map(item => item.slug).sort(), dependentSlugs.sort());
  for (const decision of dependents) {
    const dependency = decision.dependencies.find(item => item.slug === 'cline');
    assert.equal(dependency.revision, 4);
    assert.equal(dependency.digest, contentDigest(record));
    assert.equal(decision.review.state, 'in-review');
    assert.equal(isIndexable(decision, content), false);
  }
  for (const slug of ['cline-vs-claude-code', 'cline-vs-continue', 'open-source-ai-coding-tools']) {
    const decision = dependents.find(item => item.slug === slug);
    assert.ok(decision.faqs.some(item => item.sourceRefs.some(ref => ref.toolSlug === 'cline' && ref.sourceId === 'terms')));
  }
  assert.ok(record.gaps.some(gap => gap.includes('No client configuration or payload was inspected')));
  assert.ok(record.gaps.some(gap => gap.includes('selected model-provider privacy')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Windsurf transition and current plan prices remain source-bound and separate from legacy account quotes',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'windsurf');
  const workflow = record?.facts.find(item => item.key === 'workflow');
  assert.ok(record);
  assert.equal(record.revision, 5);
  assert.equal(workflow?.checkedAt, '2026-09-28');
  assert.deepEqual(workflow?.sourceIds, ['desktop']);
  assert.match(workflow?.value ?? '', /standard update preserves existing plan and pricing, including legacy Windsurf Enterprise/);
  assert.equal(record.sources.find(item => item.id === 'pricing')?.url, 'https://devin.ai/pricing');
  assert.equal(record.sources.find(item => item.id === 'desktop')?.url, 'https://devin.ai/desktop');
  const prices = Object.fromEntries(record.prices.map(price => [price.name, price]));
  assert.equal(prices.Free.amount, 0);
  assert.equal(prices.Pro.amount, 20);
  assert.equal(prices.Max.amount, 200);
  assert.equal(prices['Teams base plan'].amount, 80);
  assert.match(prices['Teams base plan'].billing, /USD 40\/month per full developer seat/);
  assert.equal(prices['Legacy Windsurf account entitlement'].amount, null);
  assert.ok(prices['Legacy Windsurf account entitlement'].sourceIds.includes('desktop'));
  assert.ok(record.gaps.some(gap => gap.includes('No account-specific transition or legacy entitlement was tested')));
  const dependents = content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'windsurf'));
  assert.deepEqual(dependents.map(item => item.slug).sort(), ['cursor', 'windsurf', 'windsurf-vs-cursor']);
  for (const slug of ['cursor', 'windsurf', 'windsurf-vs-cursor']) {
    const decision = content.find(item => item.slug === slug && item.kind !== 'tools');
    const dependency = decision?.dependencies.find(item => item.slug === 'windsurf');
    assert.ok(dependency, `${decision?.kind}/${slug} should pin Windsurf`);
    assert.equal(dependency.revision, record.revision);
    assert.equal(dependency.digest, contentDigest(record));
    assert.equal(decision?.review.state, 'in-review');
    assert.equal(isIndexable(decision, content), false);
  }
  const manifest = JSON.parse(readFileSync('docs/content-review/TASK-005-review-manifest.json', 'utf8'));
  for (const reviewedRecord of [record, ...dependents]) {
    const path = `/${reviewedRecord.kind}/${reviewedRecord.slug}/`;
    const entry = manifest.find(item => item.path === path);
    assert.ok(entry, `${path} should appear in the exact review manifest`);
    assert.equal(entry.revision, reviewedRecord.revision);
    assert.equal(entry.digest, contentDigest(reviewedRecord));
    assert.equal(entry.state, 'in-review');
    assert.deepEqual(entry.gaps, reviewedRecord.gaps);
  }
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Windsurf privacy sources preserve the distinct Cognition, DPA and Exafunction scopes',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'windsurf');
  const fact = record?.facts.find(item => item.key === 'privacy');
  const faq = record?.faqs.find(item => item.question === "How do Cognition's training terms apply to Windsurf and Devin Desktop?");
  const expectedSources = {
    'privacy-policy': 'https://cognition.com/legal/privacy-policy',
    terms: 'https://cognition.com/legal/platform-terms-of-service',
    dpa: 'https://cognition.com/legal/data-processing-statement',
    'exafunction-msa': 'https://windsurf.com/docs/MSA.pdf',
  };

  assert.ok(record);
  assert.equal(record.revision, 5);
  assert.equal(fact?.checkedAt, '2026-09-28');
  assert.equal(fact?.critical, true);
  assert.deepEqual(fact?.sourceIds, Object.keys(expectedSources));
  assert.match(fact?.value ?? '', /User Content may be used to train, fine-tune and improve its models depending on the terms that apply/);
  assert.match(fact?.value ?? '', /paid Service Tiers may opt out/);
  assert.match(fact?.value ?? '', /with a Teams administrator required to do so/);
  assert.match(fact?.value ?? '', /DPA .* limits processing to documented service purposes/);
  assert.match(fact?.value ?? '', /Exafunction Services only/);
  assert.match(fact?.value ?? '', /no account tier, assignment notice, order form, opt-out setting or enabled persistent feature was checked/);
  for (const [id, url] of Object.entries(expectedSources)) {
    assert.equal(record.sources.find(source => source.id === id)?.url, url);
    assert.equal(record.sources.find(source => source.id === id)?.accessedAt, '2026-09-28');
  }
  assert.match(faq?.answer ?? '', /paid tiers opt out/);
  assert.match(faq?.answer ?? '', /specific to Exafunction Services/);
  assert.deepEqual(faq?.sourceRefs.map(ref => ref.sourceId), Object.keys(expectedSources));
  assert.ok(record.gaps.some(gap => gap.includes('applicable Cognition or Exafunction agreement')));

  const dependents = content.filter(item => item.kind !== 'tools' && item.dependencies.some(dependency => dependency.slug === 'windsurf'));
  assert.deepEqual(dependents.map(item => item.slug).sort(), ['cursor', 'windsurf', 'windsurf-vs-cursor']);
  for (const decision of dependents) {
    const dependency = decision.dependencies.find(item => item.slug === 'windsurf');
    const decisionFaq = decision.faqs.find(item => item.question === faq.question);
    assert.equal(dependency.revision, record.revision);
    assert.equal(dependency.digest, contentDigest(record));
    assert.deepEqual(decisionFaq?.sourceRefs.map(ref => ref.sourceId), Object.keys(expectedSources));
    assert.ok(decision.gaps.some(gap => gap.includes('applicable Cognition or Exafunction agreement')));
    assert.equal(decision.review.state, 'in-review');
    assert.equal(isIndexable(decision, content), false);
  }
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('GitHub Copilot training-use policy distinguishes individual opt-out from organization plans',() => {
  const record = content.find(item => item.kind === 'tools' && item.slug === 'github-copilot');
  const fact = record?.facts.find(item => item.key === 'privacy');
  assert.ok(record);
  assert.equal(record.revision, 4);
  assert.equal(fact?.checkedAt, '2026-09-27');
  assert.deepEqual(fact?.sourceIds, ['model-hosting', 'individual-policies']);
  assert.equal(fact?.value, "GitHub's docs say that, starting April 24, 2026, interactions from Copilot Free, Pro, Pro+ and Max—including inputs, outputs, code snippets and associated context—may be used to train and improve models, with a personal opt-out. GitHub says Business and Enterprise customer data is not used for model training under its policy and Data Protection Agreement. This covers training use only; it does not establish the selected model's retention, this account's setting, organization controls or legal suitability.");
  assert.equal(record.sources.find(item => item.id === 'model-hosting')?.url, 'https://docs.github.com/en/copilot/reference/ai-models/model-hosting');
  assert.equal(record.sources.find(item => item.id === 'individual-policies')?.url, 'https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies');
  assert.ok(record.gaps.some(gap => gap.includes('no account settings were inspected')));
  assert.ok(record.gaps.some(gap => gap.includes('model-specific hosting and retention')));
  assert.equal(record.review.state, 'in-review');
  assert.equal(isIndexable(record, content), false);
});
test('Continue ownership and distribution lifecycle remain channel-specific and pending review',() => {
  const record=content.find(item=>item.kind==='tools'&&item.slug==='continue');
  assert.ok(record);
  assert.equal(record.revision,6);
  assert.equal(record.updatedAt,'2026-09-28');
  const sources=Object.fromEntries(record.sources.map(source=>[source.id,source]));
  for (const [id,url] of Object.entries({
    acquisition:'https://continue.dev/',
    cli:'https://docs.continue.dev/cli/quickstart',
    repository:'https://github.com/continuedev/continue',
    jetbrains:'https://plugins.jetbrains.com/plugin/22707-continue',
    models:'https://docs.continue.dev/customize/models',
    offline:'https://docs.continue.dev/guides/running-continue-without-internet',
    privacy:'https://continue.dev/privacy/',
  })) {
    assert.equal(sources[id]?.url,url);
    assert.equal(sources[id]?.accessedAt,'2026-09-28');
  }
  assert.match(record.facts.find(item=>item.key==='ownership')?.value??'',/acquired by Cursor/);
  assert.match(record.facts.find(item=>item.key==='ownership')?.value??'',/remains freely available/);
  const lifecycle=record.facts.find(item=>item.key==='maintenance');
  assert.deepEqual(lifecycle?.sourceIds,['repository','jetbrains']);
  assert.match(lifecycle?.value??'',/read-only/);
  assert.match(lifecycle?.value??'',/final 2\.0\.0 release/);
  assert.match(lifecycle?.value??'',/community-maintained/);
  assert.match(lifecycle?.value??'',/active development/);
  assert.match(lifecycle?.value??'',/CLI statements conflict/);
  const cli=record.facts.find(item=>item.key==='cliWorkflow');
  assert.deepEqual(cli?.sourceIds,['cli']);
  assert.match(cli?.value??'',/Continue account or Anthropic API key/);
  assert.match(cli?.value??'',/Node\.js 20\+/);
  const privacy=record.facts.find(item=>item.key==='privacy');
  assert.deepEqual(privacy?.sourceIds,['privacy']);
  assert.match(privacy?.value??'',/last updated 2026-02-05/);
  assert.match(privacy?.value??'',/unless users opt out/);
  assert.match(privacy?.value??'',/does not cover Customer Content/);
  assert.match(privacy?.value??'',/post-acquisition applicability/);
  const localModels=record.facts.find(item=>item.key==='localModels');
  assert.deepEqual(localModels?.sourceIds,['models','offline']);
  assert.match(localModels?.value??'',/Ollama/);
  assert.match(localModels?.value??'',/sufficient VRAM/);
  assert.match(localModels?.value??'',/disabling anonymous telemetry/);
  assert.ok(record.faqs.some(item=>item.question.includes('run offline')&&item.sourceRefs.some(ref=>ref.sourceId==='offline')));
  assert.equal(record.prices[0]?.amount,null);
  assert.ok(record.gaps.some(gap=>gap.includes('current version/update path and security response')));
  assert.ok(record.gaps.some(gap=>gap.includes('post-acquisition privacy notice')));
  assert.ok(record.gaps.some(gap=>gap.includes('account/model-provider billing')));
  const dependents=content.filter(item=>item.kind!=='tools'&&item.dependencies.some(dependency=>dependency.slug==='continue'));
  assert.deepEqual(dependents.map(item=>item.slug).sort(),['cline-vs-continue','open-source-ai-coding-tools']);
  for (const decision of dependents) {
    const dependency=decision.dependencies.find(item=>item.slug==='continue');
    assert.equal(dependency.revision,record.revision);
    assert.equal(dependency.digest,contentDigest(record));
    assert.equal(decision.review.state,'in-review');
    assert.equal(isIndexable(decision,content),false);
  }
  assert.equal(record.review.state,'in-review');
  assert.equal(record.review.owner,null);
  assert.equal(isIndexable(record,content),false);
});
test('MCP capability claims cite official docs and remain pending exact owner review',() => {
  const expected = new Map([
    ['claude-code','https://code.claude.com/docs/en/mcp'],
    ['cline','https://docs.cline.bot/mcp/mcp-overview'],
    ['continue','https://docs.continue.dev/customize/deep-dives/mcp'],
    ['cursor','https://cursor.com/docs/mcp'],
    ['github-copilot','https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp'],
  ]);
  const profiles = content.filter(record=>record.kind==='tools');
  const claims = profiles.filter(record=>record.facts.some(fact=>fact.key==='mcp'));
  assert.deepEqual(claims.map(record=>record.slug).sort(),[...expected.keys()].sort());
  for (const record of claims) {
    const fact=record.facts.find(item=>item.key==='mcp');
    const source=record.sources.find(item=>item.id==='mcp');
    assert.equal(record.revision,record.slug==='continue'?6:record.slug==='github-copilot'||record.slug==='cline'?4:3,`${record.slug} revision was bumped`);
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
test('MCP profiles expose source-backed strengths, constraints and FAQs',() => {
  const profiles=content.filter(record=>record.kind==='tools'&&record.facts.some(fact=>fact.key==='mcp'));
  for (const record of profiles) {
    for (const field of ['pros','cons','faqs']) {
      assert.ok(record[field]?.length,`${record.slug} has ${field}`);
      for (const item of record[field]) {
        const refs=item.sourceRefs;
        assert.ok(refs.length,`${record.slug} ${field} has citations`);
        for (const ref of refs) {
          assert.equal(ref.toolSlug,record.slug);
          assert.ok(record.sources.some(source=>source.id===ref.sourceId));
        }
      }
    }
    assert.equal(record.review.state,'in-review');
    assert.equal(isIndexable(record,content),false);
  }
});
test('every current tool profile has source-backed strengths, constraints and FAQs',() => {
  const profiles=content.filter(record=>record.kind==='tools');
  assert.equal(profiles.length,12);
  for (const record of profiles) {
    for (const field of ['pros','cons','faqs']) {
      assert.ok(record[field]?.length,`${record.slug} has ${field}`);
      for (const item of record[field]) {
        assert.ok(item.sourceRefs.length,`${record.slug} ${field} cites a source`);
        for (const ref of item.sourceRefs) {
          const sourceTool=profiles.find(candidate=>candidate.slug===ref.toolSlug);
          assert.ok(sourceTool?.sources.some(source=>source.id===ref.sourceId),`${record.slug} source ${ref.toolSlug}/${ref.sourceId} resolves`);
        }
      }
    }
    assert.equal(record.review.state,'in-review');
    assert.equal(isIndexable(record,content),false);
  }
});
test('TASK-006 P1 additions exist as in-review noindex routes with valid dependencies',() => {
  const required = [
    ...['aider','continue','n8n','make'].map(slug=>`tools/${slug}`),
    ...['make-vs-n8n','claude-code-vs-github-copilot','cline-vs-continue','aider-vs-claude-code','bolt-vs-replit'].map(slug=>`compare/${slug}`),
    'best/open-source-ai-coding-tools','guides/workflow-automation-selection',
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
test('MCP and self-hosted hubs render only facts with resolvable source evidence', () => {
  const expectedProfiles = {
    mcp: ['cursor', 'claude-code', 'github-copilot', 'cline', 'continue'],
    'self-hosted': ['n8n', 'continue', 'aider'],
  };

  for (const [kind, slugs] of Object.entries(expectedProfiles)) {
    const groups = getEvidenceHubGroups(kind);
    const entries = groups.flatMap(group => group.entries);
    assert.deepEqual([...new Set(entries.map(entry => entry.tool.slug))].sort(), [...slugs].sort());
    for (const { tool, fact, sources } of entries) {
      assert.equal(tool.review.state, 'in-review');
      assert.ok(fact.value);
      assert.ok(fact.sourceIds.length > 0);
      assert.equal(sources.length, fact.sourceIds.length);
      assert.ok(sources.every(source => source.publisher && source.accessedAt));
    }
  }
  const aiderLocalEntry = getEvidenceHubGroups('self-hosted').flatMap(group => group.entries).find(entry => entry.tool.slug === 'aider');
  assert.equal(aiderLocalEntry?.fact.key, 'localModels');
  assert.deepEqual(aiderLocalEntry?.fact.sourceIds, ['models']);
});
test('TASK-006 decision pages expose cited strengths, constraints and FAQs while pending review',() => {
  const required = [
    'compare/make-vs-n8n',
    'compare/claude-code-vs-github-copilot',
    'compare/cline-vs-continue',
    'compare/aider-vs-claude-code',
    'compare/bolt-vs-replit',
    'best/open-source-ai-coding-tools',
    'guides/workflow-automation-selection',
  ];
  for (const path of required) {
    const [kind,slug]=path.split('/');
    const record=content.find(r=>r.kind===kind&&r.slug===slug);
    assert.ok(record,`${path} exists`);
    for (const field of ['pros','cons','faqs']) {
      assert.ok(record[field]?.length,`${path} has ${field}`);
      for (const item of record[field]) {
        for (const ref of item.sourceRefs) {
          assert.ok(record.dependencies.some(dependency=>dependency.slug===ref.toolSlug),`${path} cites a declared dependency`);
          assert.ok(content.find(tool=>tool.kind==='tools'&&tool.slug===ref.toolSlug)?.sources.some(source=>source.id===ref.sourceId),`${path} source ${ref.toolSlug}/${ref.sourceId} resolves`);
        }
      }
    }
    assert.equal(record.review.state,'in-review');
    assert.equal(isIndexable(record,content),false);
  }
});
test('TODO-313 covers every dependency-backed decision page and leaves the general guide unclaimed',() => {
  const decisions=content.filter(record=>record.kind!=='tools');
  const covered=decisions.filter(record=>record.dependencies.length>0);
  assert.equal(covered.length,26);
  for (const record of covered) {
    for (const field of ['pros','cons','faqs']) {
      assert.ok(record[field]?.length,`${record.kind}/${record.slug} has ${field}`);
      for (const item of record[field]) {
        for (const ref of item.sourceRefs) {
          assert.ok(record.dependencies.some(dependency=>dependency.slug===ref.toolSlug),`${record.kind}/${record.slug} cites a declared dependency`);
          assert.ok(content.find(tool=>tool.kind==='tools'&&tool.slug===ref.toolSlug)?.sources.some(source=>source.id===ref.sourceId),`${record.kind}/${record.slug} source ${ref.toolSlug}/${ref.sourceId} resolves`);
        }
      }
    }
    assert.equal(record.review.state,'in-review');
    assert.equal(isIndexable(record,content),false);
  }
  const generalGuide=content.find(record=>record.kind==='guides'&&record.slug==='how-to-choose-a-developer-tool');
  assert.deepEqual(generalGuide.dependencies,[]);
  for (const field of ['pros','cons','faqs']) assert.equal(generalGuide[field],undefined);
});
test('TASK-006 review manifest matches each exact in-review revision and digest',() => {
  const manifest=JSON.parse(readFileSync(new URL('../docs/content-review/TASK-006-review-manifest.json',import.meta.url),'utf8'));
  assert.equal(manifest.length,11);
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
test('TASK-005 review manifest matches each exact in-review revision and digest',() => {
  const manifest=JSON.parse(readFileSync(new URL('../docs/content-review/TASK-005-review-manifest.json',import.meta.url),'utf8'));
  assert.equal(manifest.length,28);
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
test('TASK-005 tool evidence packs identify current profile revisions and digests',() => {
  for (const slug of ['cursor','claude-code','github-copilot','cline','bolt-new','lovable','replit','windsurf']) {
    const record=content.find(r=>r.kind==='tools'&&r.slug===slug);
    const pack=readFileSync(new URL(`../docs/content-review/TASK-005/${slug}.md`,import.meta.url),'utf8');
    assert.ok(pack.includes(`Revision: ${record.revision}. Digest: \`${contentDigest(record)}\`.`),`${slug} evidence pack matches current content`);
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
  const a=approve(tool()), b=approve(tool('second-fixture'));approve(b);
  const r=structuredClone(content.find(r=>r.kind==='compare'&&r.slug==='cursor-vs-claude-code'));r.slug='fixture-comparison';
  r.dependencies=[a,b].map(t=>({slug:t.slug,revision:t.revision,digest:contentDigest(t)}));
  for(const field of ['pros','cons','faqs']) r[field]=r[field].map(item=>({...item,sourceRefs:item.sourceRefs.map(ref=>({...ref,toolSlug:ref.toolSlug==='cursor'?a.slug:b.slug}))}));
  approve(r);
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
test('structured editorial evidence rejects missing and unrelated citations',()=> {
  const missing=tool();missing.pros=[{text:'Claim without citations',sourceRefs:[]}];
  assert.ok(validateContent([missing]).some(e=>e.includes('requires source references')));
  const unrelated=structuredClone(content.find(r=>r.kind==='compare'&&r.slug==='cursor-vs-claude-code'));
  unrelated.faqs=[{question:'Question',answer:'Answer',sourceRefs:[{toolSlug:'continue',sourceId:'mcp'}]}];
  assert.ok(validateContent([...content.filter(r=>r!==unrelated),unrelated]).some(e=>e.includes('invalid or unrelated source reference')));
  const unknown=tool();unknown.cons=[{text:'Claim with unknown source',sourceRefs:[{toolSlug:unknown.slug,sourceId:'missing'}]}];
  assert.ok(validateContent([unknown]).some(e=>e.includes('references unknown source')));
});
test('authored related links require unique existing structured destinations',()=> {
  const missing=tool();missing.relatedLinks=[{kind:'guides',slug:'missing-guide'}];
  assert.ok(validateContent([missing]).some(e=>e.includes('unknown related link target')));
  const duplicate=tool();duplicate.relatedLinks=[{kind:'tools',slug:'cursor'},{kind:'tools',slug:'cursor'}];
  assert.ok(validateContent([duplicate]).some(e=>e.includes('duplicate related link')));
  const self=tool('cursor');self.relatedLinks=[{kind:'tools',slug:'cursor'}];
  assert.ok(validateContent([self]).some(e=>e.includes('cannot target itself')));
});
test('pending record cannot impersonate formal review or hands-on testing',()=> {
  const a=tool();a.verifiedAt='2026-09-27';assert.ok(validateContent([a]).some(e=>e.includes('pending')));
  const b=tool();b.testedAt='2026-09-27';assert.ok(validateContent([b]).some(e=>e.includes('test evidence')));
});
test('verification status displays the bound date only for approved content',()=> {
  const r=tool();
  assert.equal(verificationStatusLabel(r,false),'Not yet formally verified');
  approve(r);
  assert.equal(verificationStatusLabel(r,true),'Last verified 2026-09-27');
  assert.equal(verificationStatusLabel(r,false),'Not yet formally verified');
});
test('static route metadata must be unique by title and description',()=> {
  assert.deepEqual(findDuplicateMetadata([
    {path:'/a/',title:'Same title',description:'First description'},
    {path:'/b/',title:'Same title',description:'Second description'},
    {path:'/c/',title:'Third title',description:'Second description'},
  ]),[
    {field:'title',firstPath:'/a/',path:'/b/'},
    {field:'description',firstPath:'/b/',path:'/c/'},
  ]);
  assert.deepEqual(findDuplicateMetadata([
    {path:'/a/',title:'First',description:'First'},
    {path:'/b/',title:'Second',description:'Second'},
  ]),[]);
});
test('vendor link is ordinary until a valid commercial relationship is approved',()=> {
  const r=tool();assert.equal(vendorLink(r,r).href,r.productUrl);assert.equal(vendorLink(r,r).label,null);assert.equal(vendorLink(r,r).disclosure,null);
  r.commercial.affiliate={status:'active',url:'https://example.com/refer',disclosure:'Synthetic affiliate disclosure',evidence:'Synthetic contract'};
  assert.equal(vendorLink(r,r).href,r.productUrl);approve(r);
  assert.equal(vendorLink(r,r).label,'Affiliate link');
  assert.equal(vendorLink(r,r).href,'https://example.com/refer');
  assert.equal(vendorLink(r,r).rel,'sponsored noopener noreferrer');
  assert.equal(vendorLink(r,r).disclosure,'Synthetic affiliate disclosure');
  r.commercial.affiliate.evidence=null;assert.ok(validateContent([r]).some(e=>e.includes('affiliate')));assert.equal(vendorLink(r,r).label,null);assert.equal(vendorLink(r,r).href,r.productUrl);
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
