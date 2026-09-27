import Link from 'next/link';
import { content, contentPath } from '../lib/content.mjs';
import { isIndexable } from '../lib/content-policy.mjs';
import { HUBS } from '../lib/routes.mjs';
import { PageFrame } from './page-frame';
import { PageIntro } from './page-intro';
import { ContentSection } from './content-section';
export function ContentHub({ kind }: { kind: keyof typeof HUBS }) {
  const records = content.filter(r => r.kind === kind);
  const reviewed = records.filter(r => isIndexable(r,content));
  const pending = records.filter(r => !isIndexable(r,content));
  return <PageFrame breadcrumbPath={`/${kind}/`}><PageIntro eyebrow="Decision library" title={HUBS[kind].title} summary={HUBS[kind].summary}/>
    <ContentSection><h2>Reviewed decisions</h2>{reviewed.length ? <ul className="guide-list">{reviewed.map(r => <li key={r.slug}><Link href={contentPath(r)}><strong>{r.title}</strong><span>{r.summary}</span></Link></li>)}</ul> : <p>Owner-reviewed decisions will appear here. The research drafts below have not yet passed final review.</p>}</ContentSection>
    {pending.length > 0 && <ContentSection><h2>Research awaiting review</h2><ul className="guide-list">{pending.map(r => <li key={r.slug}><Link href={contentPath(r)}><strong>{r.title}</strong><span>{r.summary} · In review</span></Link></li>)}</ul></ContentSection>}
  </PageFrame>;
}
