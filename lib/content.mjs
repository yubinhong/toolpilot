import { join } from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { validateContent, isIndexable } from './content-policy.mjs';

/** @type {import('./content-types').Content[]} */
export const content = ['tools', 'decisions'].flatMap(dir => {
  const root = join(process.cwd(), 'content', dir);
  return readdirSync(root).filter(f => f.endsWith('.json')).sort().map(file => JSON.parse(readFileSync(join(root, file), 'utf8')));
});
const errors = validateContent(content);
if (errors.length) throw new Error(`Content validation failed:\n${errors.join('\n')}`);
export const toolContent = content.filter(r => r.kind === 'tools');
export function findContent(kind, slug) { return content.find(r => r.kind === kind && r.slug === slug); }
export function contentPath(record) { return `/${record.kind}/${record.slug}/`; }
export function publishedContent(kind) { return content.filter(r => (!kind || r.kind === kind) && isIndexable(r, content)); }
/** Only this allowlisted DTO may cross into client-side catalog components. */
export function publicTool(tool) {
  return { slug: tool.slug, name: tool.name, category: tool.category, summary: tool.summary,
    bestFor: tool.bestFor, status: tool.status, productUrl: tool.productUrl };
}
