import { content, contentPath } from './content.mjs';
import { tools, guides } from './catalog.mjs';
import { isIndexable } from './content-policy.mjs';
export const HUBS = {
  tools: { title: 'Developer tools', summary: 'Explore tools by the work you need to do. Review status is shown on every entry.' },
  compare: { title: 'Compare AI development tools', summary: 'Compare a concrete workflow, its operating cost and the conditions that would make you switch.' },
  alternatives: { title: 'Find a useful alternative', summary: 'Start with the constraint your current tool cannot meet, then evaluate the cost of changing.' },
  pricing: { title: 'Understand tool pricing', summary: 'Separate base subscriptions, usage allowances and operating costs before estimating a budget.' },
  best: { title: 'Choose tools for a task', summary: 'Conditional shortlists for a particular job, with selection criteria and reasons not to choose a candidate.' },
  guides: { title: 'Make a defensible tool decision', summary: 'Methods for evaluating claims, running bounded trials and preserving an exit path.' },
};
export const staticPages = [
  { path: '/', title: 'Find the right AI & developer tool for the job', description: 'Task-based tool research for developers, indie hackers and AI builders.', index: true },
  { path: '/about/', title: 'About ToolPilot', description: 'Our scope and approach to independent tool research.', index: true },
  { path: '/editorial-policy/', title: 'Editorial policy', description: 'How sources, review dates and editorial judgments are handled.', index: true },
  { path: '/disclosure/', title: 'Commercial disclosure', description: 'How ordinary links, affiliate recommendations and paid exposure differ.', index: true },
  { path: '/contact/', title: 'Contact information', description: 'Contact availability and correction guidance.', index: false },
  { path: '/privacy/', title: 'Privacy information', description: 'Current site data practices and the information awaiting operator confirmation.', index: false },
  { path: '/terms/', title: 'Terms and limitations', description: 'Research limitations and operating terms awaiting confirmation.', index: false },
  { path: '/stacks/', title: 'Developer stack decisions', description: 'A working framework for separating application, data and operational responsibilities.', index: false },
];
export function getRoutes() {
  const routes = [...staticPages, ...Object.entries(HUBS).map(([kind,h]) => ({path:`/${kind}/`,title:h.title,description:h.summary,index:content.some(r => r.kind === kind && isIndexable(r,content))}))];
  for (const t of tools) routes.push({path:`/tools/${t.slug}/`,title:t.name,description:t.summary,index:false});
  for (const g of guides) routes.push({path:`/guides/${g.slug}/`,title:g.title,description:g.summary,index:false});
  for (const r of content) {
    const row = {path:contentPath(r),title:r.title,description:r.summary,index:isIndexable(r,content)};
    const i = routes.findIndex(p => p.path === row.path);
    if (i === -1) routes.push(row); else routes[i] = row;
  }
  return routes;
}
export function getRoute(path) { return getRoutes().find(r => r.path === path); }
