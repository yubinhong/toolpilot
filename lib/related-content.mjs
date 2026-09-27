const priorities = {
  tools: ['compare', 'alternatives', 'pricing', 'best', 'guides'],
  compare: ['alternatives', 'best', 'pricing', 'guides'],
  alternatives: ['compare', 'best', 'pricing'],
  best: ['compare', 'alternatives', 'pricing'],
  pricing: ['compare', 'alternatives', 'best'],
  guides: ['compare', 'best', 'alternatives', 'pricing'],
};

/** @typedef {import('./content-types').Content} Content */

function toolSlugs(record) {
  return new Set(record.kind === 'tools' ? [record.slug] : record.dependencies.map(dependency => dependency.slug));
}

function isContextual(record, candidate, shared) {
  if (record.kind === 'tools') return shared === 1;
  if (record.kind === 'compare') {
    return (['alternatives', 'best'].includes(candidate.kind) && shared >= 2) ||
      (candidate.kind === 'pricing' && shared === 1) ||
      (candidate.kind === 'guides' && shared >= 1);
  }
  if (record.kind === 'alternatives') {
    return (['compare', 'best'].includes(candidate.kind) && shared >= 2) ||
      (candidate.kind === 'pricing' && shared === 1);
  }
  if (record.kind === 'best') {
    return (candidate.kind === 'compare' && shared === 2) ||
      (candidate.kind === 'alternatives' && shared >= 2) ||
      (candidate.kind === 'pricing' && shared === 1);
  }
  if (record.kind === 'pricing') {
    return (candidate.kind === 'compare' && shared === 1) ||
      (candidate.kind === 'alternatives' && shared >= 1) ||
      (candidate.kind === 'best' && shared >= 1);
  }
  if (record.kind === 'guides') {
    return (candidate.kind === 'compare' && shared === 2) ||
      (['alternatives', 'best'].includes(candidate.kind) && shared >= 2) ||
      (candidate.kind === 'pricing' && shared >= 1);
  }
  return false;
}

/** @param {Content} record @param {Content[]} records @param {number} [limit] @returns {Content[]} */
export function getRelatedContent(record, records, limit = 5) {
  if (!Number.isInteger(limit) || limit < 1) return [];
  const slugs = toolSlugs(record);
  const priority = priorities[record.kind] ?? [];
  const curated = (record.relatedLinks ?? []).flatMap(link => {
    const candidate = records.find(item => item.kind === link.kind && item.slug === link.slug);
    return candidate && candidate !== record ? [candidate] : [];
  });
  const automatic = records.flatMap(candidate => {
    if (candidate === record || candidate.kind === 'tools') return [];
    const shared = candidate.dependencies.filter(dependency => slugs.has(dependency.slug)).length;
    return isContextual(record, candidate, shared) ? [{ candidate, shared }] : [];
  }).sort((a, b) => priority.indexOf(a.candidate.kind) - priority.indexOf(b.candidate.kind) || b.shared - a.shared ||
    a.candidate.title.localeCompare(b.candidate.title)).map(({ candidate }) => candidate);
  const seen = new Set();
  return [...curated, ...automatic].filter(candidate => {
    const key = `${candidate.kind}/${candidate.slug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}
