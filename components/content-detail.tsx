import Link from 'next/link';
import type { Content } from '../lib/content-types';
import { content, contentPath, findContent } from '../lib/content.mjs';
import { isIndexable, vendorLink } from '../lib/content-policy.mjs';
import { PageFrame } from './page-frame';
import { PageIntro } from './page-intro';
import { ContentSection } from './content-section';
import { CatalogNotice } from './catalog-notice';

function SourceLinks({ record, ids }: { record: Content; ids: string[] }) {
  return <>{ids.map(id => { const s = record.sources.find(s => s.id === id); return s ? <a className="source-citation" key={id} href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> : null; })}</>;
}
function Facts({ record }: { record: Content }) {
  return <div className="table-scroll" role="region" aria-label={`${record.title} facts`} tabIndex={0}><table className="source-table"><caption>{record.title}: documented facts and unknowns</caption><thead><tr><th scope="col">Dimension</th><th scope="col">Evidence</th><th scope="col">Source / checked</th></tr></thead><tbody>{record.facts.map(f => <tr key={f.key}><th scope="row">{f.label}</th><td>{f.value ?? 'Unknown — not yet verified'}</td><td><SourceLinks record={record} ids={f.sourceIds}/>{f.checkedAt && <small>{f.checkedAt}</small>}</td></tr>)}</tbody></table></div>;
}
function Prices({ record }: { record: Content }) {
  return <div className="table-scroll" role="region" aria-label={`${record.title} pricing`} tabIndex={0}><table className="source-table"><caption>{record.title}: price evidence, not a total-cost guarantee</caption><thead><tr><th scope="col">Plan</th><th scope="col">Base amount</th><th scope="col">Basis and limits</th><th scope="col">Source / checked</th></tr></thead><tbody>{record.prices.map(p => <tr key={p.name}><th scope="row">{p.name}</th><td>{p.amount === null ? 'Unknown — confirm with vendor' : `${p.currency} ${p.amount} / ${p.interval}`}</td><td>{p.billing}<br/>Allowance: {p.allowance ?? 'Not yet verified'}<br/>Overage: {p.overage ?? 'Not yet verified'}<br/>Taxes: {p.taxes ?? 'Not yet verified'}</td><td><SourceLinks record={record} ids={p.sourceIds}/>{p.checkedAt && <small>{p.checkedAt}</small>}</td></tr>)}</tbody></table></div>;
}
export function ContentDetail({ record }: { record: Content }) {
  const published = isIndexable(record, content);
  const dependencies = record.dependencies.map(d => findContent('tools', d.slug)).filter((r): r is Content => Boolean(r));
  const related = content.filter(r => r !== record && (record.kind === 'tools' ? r.dependencies.some(d => d.slug === record.slug) : r.dependencies.some(d => record.dependencies.some(rd => rd.slug === d.slug))));
  const sourceRecords = [record, ...dependencies].filter(r => r.sources.length);
  const gaps = [...record.gaps, ...dependencies.flatMap(r => r.gaps.map(g => `${r.title}: ${g}`))];
  return <PageFrame>
    <PageIntro eyebrow={`${record.kind} / ${published ? 'Reviewed' : 'Editorial draft'}`} title={record.title} summary={record.summary}/>
    <ContentSection>
      {!published && <CatalogNotice title="Editorial review pending" message="Source-based research and proposed judgments await the site owner's approval. This is not a published evaluation."/>}
      <p className="review-date">Updated {record.updatedAt} · {published ? `Reviewed ${record.review.reviewedAt}` : 'Not yet formally verified'} · {record.testedAt ? `Tested ${record.testedAt}` : 'No hands-on benchmark performed'}</p>
      <h2>The decision in brief</h2><p>{record.verdict}</p>
      <div className="detail-grid"><div><h3>Consider for</h3><p>{record.bestFor}</p></div><div><h3>Not a fit for</h3><p>{record.notFor}</p></div></div>
      {record.productUrl && (() => { const link = vendorLink(record, record); return <div className="vendor-cta">{link.disclosure && <p>{link.disclosure}</p>}<a className="primary-button" href={link.href} rel={link.rel} target="_blank">Visit {record.title} ↗</a></div>; })()}
      {(['featured','sponsor'] as const).map(type => published && record.commercial[type].status === 'active' ? <p key={type}>{type === 'featured' ? 'Featured placement' : 'Sponsor'}: {record.commercial[type].disclosure}</p> : null)}
    </ContentSection>
    {record.kind === 'compare' && <ContentSection><h2>Compare the same dimensions</h2><div className="table-scroll" role="region" aria-label="Tool comparison" tabIndex={0}><table className="source-table"><caption>Unknown is different from unsupported. Read the dated profiles below.</caption><thead><tr><th scope="col">Dimension</th>{dependencies.map(t => <th scope="col" key={t.slug}><Link href={contentPath(t)}>{t.title}</Link></th>)}</tr></thead><tbody>{['workflow','privacy','selfHosting','localModels','portability'].map(key => <tr key={key}><th scope="row">{dependencies[0]?.facts.find(f => f.key === key)?.label || key}</th>{dependencies.map(t => <td key={t.slug}>{t.facts.find(f => f.key === key)?.value ?? 'Unknown — not yet verified'}</td>)}</tr>)}</tbody></table></div></ContentSection>}
    {record.sections.map(s => <ContentSection key={s.heading}><h2>{s.heading}</h2>{s.paragraphs.map((p,i) => <p key={i}>{p}</p>)}</ContentSection>)}
    {record.facts.length > 0 && <ContentSection><h2>Facts and sources</h2><Facts record={record}/></ContentSection>}
    {record.prices.length > 0 && <ContentSection><h2>Pricing evidence</h2><Prices record={record}/></ContentSection>}
    {dependencies.length > 0 && <ContentSection><h2>{record.kind === 'pricing' ? 'Current price evidence' : 'Candidate evidence'}</h2>{dependencies.map(t => <div className="candidate-evidence" key={t.slug}><h3><Link href={contentPath(t)}>{t.title}</Link></h3><p>{t.bestFor}. {t.notFor}.</p>{record.kind !== 'pricing' && <Facts record={t}/>}<Prices record={t}/><p><strong>Switching effort:</strong> {t.migration}</p></div>)}</ContentSection>}
    <ContentSection><h2>Migration and limits</h2><p>{record.migration}</p>{gaps.length > 0 && <><h3>Unresolved before a final recommendation</h3><ul>{gaps.map((g,i) => <li key={i}>{g}</li>)}</ul></>}<p>Local software, a configurable model provider and a self-hosted product are different capabilities. Unknown fields must be resolved for your own requirements.</p></ContentSection>
    {sourceRecords.length > 0 && <ContentSection><h2>Source trail</h2>{sourceRecords.map(t => <div key={`${t.kind}/${t.slug}`}><h3>{t.title}</h3><ul>{t.sources.map(s => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> — {s.publisher}; accessed {s.accessedAt}</li>)}</ul></div>)}</ContentSection>}
    <ContentSection><h2>Content updates</h2><ul>{record.changes.map((c,i) => <li key={i}>{c.date}: {c.summary}</li>)}</ul><p><Link href="/editorial-policy/">How we research and review</Link> · <Link href="/disclosure/">Commercial disclosure</Link></p></ContentSection>
    {related.length > 0 && <ContentSection><h2>Related decisions</h2><ul>{related.map(r => <li key={contentPath(r)}><Link href={contentPath(r)}>{r.title}</Link> — {isIndexable(r,content) ? 'Reviewed' : 'In review'}</li>)}</ul></ContentSection>}
  </PageFrame>;
}
