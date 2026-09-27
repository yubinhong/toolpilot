import { createHash } from 'node:crypto';

export const CONTENT_KINDS = ['tools', 'compare', 'alternatives', 'pricing', 'best', 'guides'];
export function isHttpsUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port && !u.hash;
  } catch { return false; }
}
const date = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v;
const text = (v) => typeof v === 'string' && v.trim().length > 0 && v !== 'TBD';
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, stable(value[k])]));
  return value;
}
// Approval binds all editorial data, not just a manually maintained revision counter.
export function contentDigest(record) {
  const { review, verifiedAt, ...editorial } = record;
  void review; void verifiedAt;
  return createHash('sha256').update(JSON.stringify(stable(editorial))).digest('hex');
}
export function hasApproval(record) {
  const r = record?.review;
  return r?.state === 'published' && text(r.owner) && date(r.reviewedAt) &&
    r.approvedRevision === record.revision && r.approvedDigest === contentDigest(record) &&
    text(r.evidence) && date(record.verifiedAt) && record.verifiedAt === r.reviewedAt;
}
export function isIndexable(record, records = []) {
  return Boolean(hasApproval(record) && record.gaps.length === 0 &&
    record.facts.every(f => !f.critical || f.value !== null) &&
    record.dependencies.every(dep => {
      const tool = records.find(r => r.kind === 'tools' && r.slug === dep.slug);
      return tool && tool.revision === dep.revision && dep.digest === contentDigest(tool) && hasApproval(tool) && tool.gaps.length === 0;
    }));
}
export function validateContent(records) {
  const errors = [];
  const keys = new Set();
  if (!Array.isArray(records)) return ['content must be an array'];
  for (const r of records) {
    if (!r || typeof r !== 'object') { errors.push('content record must be an object'); continue; }
    const key = `${r.kind}/${r.slug}`;
    const fail = message => errors.push(`${key}: ${message}`);
    if (keys.has(key)) fail('duplicate route');
    keys.add(key);
    if (!CONTENT_KINDS.includes(r.kind) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug)) fail('invalid kind or slug');
    for (const field of ['title','summary','verdict','bestFor','notFor','migration']) if (!text(r[field])) fail(`${field} required`);
    if (!Number.isInteger(r.revision) || r.revision < 1 || !date(r.updatedAt)) fail('revision and updatedAt required');
    if (!['draft','in-review','published'].includes(r.review?.state)) fail('invalid review state');
    const arrays = ['sources','facts','prices','sections','dependencies','gaps','changes'];
    if (arrays.some(f => !Array.isArray(r[f]))) { fail('content collections must be arrays'); continue; }
    if (['sources','facts','prices','sections','dependencies','changes'].some(field => r[field].some(item => !item || typeof item !== 'object' || Array.isArray(item)))) { fail('content collection entries must be objects'); continue; }
    const evidenceFields = ['pros','cons','faqs'];
    if (evidenceFields.some(field => r[field] !== undefined && !Array.isArray(r[field]))) fail('evidence collections must be arrays');
    if (evidenceFields.some(field => Array.isArray(r[field]) && r[field].some(item => !item || typeof item !== 'object' || Array.isArray(item)))) fail('evidence collection entries must be objects');
    if (r.relatedLinks !== undefined && !Array.isArray(r.relatedLinks)) fail('relatedLinks must be an array');
    if (Array.isArray(r.relatedLinks) && r.relatedLinks.some(item => !item || typeof item !== 'object' || Array.isArray(item))) fail('relatedLinks entries must be objects');
    if (r.gaps.some(g => !text(g))) fail('gaps must contain nonempty descriptions');
    const ids = new Set();
    for (const s of r.sources) {
      if (!text(s.id) || ids.has(s.id)) fail('source ID missing or duplicated');
      ids.add(s.id);
      if (!isHttpsUrl(s.url) || !text(s.title) || !text(s.publisher) || !date(s.accessedAt)) fail(`invalid source ${s.id}`);
    }
    const factKeys = new Set();
    for (const f of r.facts) {
      if (!text(f.key) || factKeys.has(f.key)) fail('fact key missing or duplicated');
      factKeys.add(f.key);
      if (!text(f.label) || !(f.value === null || text(f.value)) || typeof f.critical !== 'boolean') fail(`invalid fact ${f.key}`);
      if (!Array.isArray(f.sourceIds) || f.sourceIds.some(id => !ids.has(id))) fail(`unknown fact source ${f.key}`);
      if (f.value !== null && (!f.sourceIds?.length || !date(f.checkedAt))) fail(`fact ${f.key} requires source and checkedAt`);
    }
    for (const p of r.prices) {
      if (!text(p.name) || !text(p.currency) || !text(p.interval) || !text(p.billing)) fail('price basis required');
      if (!(p.amount === null || (Number.isFinite(p.amount) && p.amount >= 0))) fail('invalid price amount');
      if (!Array.isArray(p.sourceIds) || p.sourceIds.some(id => !ids.has(id))) fail('unknown price source');
      if ((p.amount !== null || p.allowance || p.overage || p.taxes) && (!p.sourceIds?.length || !date(p.checkedAt))) fail('price claim requires source/date');
    }
    if (!r.sections.length || r.sections.some(s => !text(s.heading) || !Array.isArray(s.paragraphs) || !s.paragraphs.length || s.paragraphs.some(p => !text(p)))) fail('substantive sections required');
    if (!r.changes.length || r.changes.some(c => !date(c.date) || !text(c.summary))) fail('change history required');
    if (new Set(r.dependencies.map(d => d.slug)).size !== r.dependencies.length) fail('duplicate dependency');
    for (const d of r.dependencies) {
      const target = records.find(t => t.kind === 'tools' && t.slug === d.slug);
      if (!target || target.revision !== d.revision || d.digest !== contentDigest(target) || r.kind === 'tools') fail(`missing/stale tool dependency ${d.slug}`);
    }
    const relatedKeys = new Set();
    for (const link of Array.isArray(r.relatedLinks) ? r.relatedLinks : []) {
      if (!text(link.kind) || !text(link.slug) || !CONTENT_KINDS.includes(link.kind) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(link.slug)) {
        fail('invalid related link target');
        continue;
      }
      const key = `${link.kind}/${link.slug}`;
      if (relatedKeys.has(key)) fail(`duplicate related link ${key}`);
      relatedKeys.add(key);
      if (key === `${r.kind}/${r.slug}`) fail('related link cannot target itself');
      if (!records.some(target => target.kind === link.kind && target.slug === link.slug)) fail(`unknown related link target ${key}`);
    }
    const allowedEvidenceTools = new Set(r.kind === 'tools' ? [r.slug] : r.dependencies.map(d => d.slug));
    const validateEvidenceRefs = (item, label) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return;
      if (!Array.isArray(item.sourceRefs) || item.sourceRefs.length === 0) { fail(`${label} requires source references`); return; }
      for (const ref of item.sourceRefs) {
        if (!ref || typeof ref !== 'object' || Array.isArray(ref) || !text(ref.toolSlug) || !text(ref.sourceId) || !allowedEvidenceTools.has(ref.toolSlug)) {
          fail(`${label} has an invalid or unrelated source reference`);
          continue;
        }
        const target = records.find(t => t.kind === 'tools' && t.slug === ref.toolSlug);
        if (!target?.sources.some(source => source.id === ref.sourceId)) fail(`${label} references unknown source ${ref.toolSlug}/${ref.sourceId}`);
      }
    };
    for (const field of ['pros','cons']) {
      for (const [index, item] of (Array.isArray(r[field]) ? r[field] : []).entries()) {
        if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
        if (!text(item.text)) fail(`${field}[${index}] requires text`);
        validateEvidenceRefs(item, `${field}[${index}]`);
      }
    }
    for (const [index, item] of (Array.isArray(r.faqs) ? r.faqs : []).entries()) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
      if (!text(item.question) || !text(item.answer)) fail(`faqs[${index}] requires question and answer`);
      validateEvidenceRefs(item, `faqs[${index}]`);
    }
    if (r.kind === 'tools' && (!text(r.name) || !text(r.category) || !isHttpsUrl(r.productUrl))) fail('tool identity/HTTPS product URL required');
    if (r.kind === 'compare' && r.dependencies.length !== 2) fail('comparison requires two tools');
    if (r.kind === 'alternatives' && r.dependencies.length < 4) fail('alternatives require original plus three candidates');
    if (r.kind === 'pricing' && r.dependencies.length !== 1) fail('pricing requires one tool');
    if (r.kind === 'best' && r.dependencies.length < 3) fail('best requires at least three candidates');
    if (r.testedAt !== null && (!date(r.testedAt) || !text(r.testEvidence))) fail('test date requires actual test evidence');
    for (const type of ['affiliate','featured','sponsor']) {
      const rel = r.commercial?.[type];
      if (!rel || !['unconfirmed','none','active'].includes(rel.status)) { fail(`invalid ${type} relationship`); continue; }
      if (rel.status === 'active' && (!text(rel.evidence) || !text(rel.disclosure) || (type === 'affiliate' && !isHttpsUrl(rel.url)))) fail(`active ${type} requires evidence/disclosure/valid destination`);
      if (rel.status !== 'active' && rel.url !== null) fail(`inactive ${type} must not have a commercial URL`);
    }
    if (r.review?.state === 'published' && !isIndexable(r, records)) fail('published content requires exact owner approval, complete facts and approved dependencies');
    if (r.review?.state !== 'published' && (r.verifiedAt !== null || r.review?.approvedRevision !== null || r.review?.approvedDigest !== null || r.review?.reviewedAt !== null || r.review?.owner !== null || r.review?.evidence !== null)) fail('pending content cannot carry formal approval');
  }
  return errors;
}
export function vendorLink(tool, content) {
  const rel = content?.commercial?.affiliate;
  if (hasApproval(content) && rel?.status === 'active' && isHttpsUrl(rel.url) && text(rel.disclosure) && text(rel.evidence)) {
    return { href: rel.url, rel: 'sponsored noopener noreferrer', disclosure: rel.disclosure };
  }
  return { href: tool.productUrl, rel: 'noopener noreferrer', disclosure: null };
}
export function freshness(records, asOf) {
  if (!date(asOf)) throw new Error('asOf must be YYYY-MM-DD');
  const result = [];
  for (const r of records) {
    for (const [type, items, days] of [['price',r.prices,30],['fact',r.facts,90]]) {
      for (const item of items) {
        const age = item.checkedAt ? Math.floor((Date.parse(asOf) - Date.parse(item.checkedAt)) / 86400000) : null;
        if (age === null || age > days) result.push({ path:`/${r.kind}/${r.slug}/`,type,field:item.key || item.name,ageDays:age,status:age === null ? 'unverified' : 'review-due' });
      }
    }
  }
  return result;
}
