import { existsSync } from 'node:fs';
import { content } from '../lib/content.mjs';
import { contentDigest, freshness } from '../lib/content-policy.mjs';
for (const record of content.filter(r => r.review.state === 'published')) {
  const ref = record.review.evidence;
  if (!ref.startsWith('docs/content-review/') || ref.includes('..') || !existsSync(ref)) {
    throw new Error(`${record.kind}/${record.slug}: approved content requires an existing owner decision record under docs/content-review/`);
  }
}
if (process.argv.includes('--freshness')) {
  const asOf = process.argv.find(a => a.startsWith('--as-of='))?.slice(8) || new Date().toISOString().slice(0,10);
  console.log(JSON.stringify({ asOf, reviewQueue:freshness(content,asOf) }, null, 2));
} else if (process.argv.includes('--review')) {
  console.log(JSON.stringify(content.map(r => ({path:`/${r.kind}/${r.slug}/`,revision:r.revision,digest:contentDigest(r),state:r.review.state,gaps:r.gaps})),null,2));
} else console.log(`Content validation passed: ${content.length} records. Owner approval is separate from source access.`);
