import { readFileSync } from 'node:fs';
import { content } from '../lib/content.mjs';
import { researchTools } from '../lib/catalog.mjs';
import { checkLink } from './link-policy.mjs';
const allowed = JSON.parse(readFileSync(new URL('../content/link-hosts.json',import.meta.url),'utf8'));
const urls = [...new Set([...content.flatMap(r => r.sources.map(s => s.url)),...researchTools.flatMap(t => [t.productUrl,t.sourceUrl].filter(Boolean))])];
const queue = [...urls]; const results = [];
await Promise.all(Array.from({length:3},async () => {
  while (queue.length) {
    const url = queue.shift(); const parsed = new URL(url);
    results.push({origin:parsed.origin,path:parsed.pathname,...await checkLink(url,allowed)});
  }
}));
console.log(JSON.stringify({checkedAt:new Date().toISOString(),note:'HTTP reachability only; never changes editorial approval.',results:results.sort((a,b)=>(a.origin+a.path).localeCompare(b.origin+b.path))},null,2));
