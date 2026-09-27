import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools } from '../../../lib/catalog.mjs';
import { findContent } from '../../../lib/content.mjs';
import { pageMetadata } from '../../../lib/metadata';
import { ContentDetail } from '../../../components/content-detail';
import { PageFrame } from '../../../components/page-frame';
import { PageIntro } from '../../../components/page-intro';
import { ContentSection } from '../../../components/content-section';
import { CatalogNotice } from '../../../components/catalog-notice';
export const dynamicParams = false;
export function generateStaticParams() { return tools.map(t => ({ slug:t.slug })); }
export async function generateMetadata({ params }: { params:Promise<{slug:string}> }) {
  const {slug} = await params; return pageMetadata(`/tools/${slug}/`);
}
export default async function ToolPage({ params }: { params:Promise<{slug:string}> }) {
  const {slug} = await params;
  const tool = tools.find(t => t.slug === slug);
  if (!tool) notFound();
  const record = findContent('tools',slug);
  if (record) return <ContentDetail record={record}/>;
  return <PageFrame><PageIntro eyebrow={`${tool.category} / Draft`} title={tool.name} summary={tool.summary}/>
    <ContentSection><CatalogNotice title="Editorial review pending" message="Historical research draft. Product facts, pricing and suitability have not been formally verified."/>
      <h2>Research candidate</h2><p>{tool.bestFor}</p>
      <p>Research snapshot: {tool.researchSnapshotDate}. A link check is not a fact check.</p>
      <p>Historical official link: {tool.productLinkCheck.status === 'http-ok' ? 'HTTP checked' : 'Reachable but restricted'} {tool.productLinkCheck.checkedAt}</p>
      <p>Historical research source: {tool.sourceUrl ? 'Recorded in the research archive; not treated as product evidence.' : 'Missing from research snapshot'}</p>
      <p>Pricing, privacy and migration evidence: not yet verified.</p>
      <a className="primary-button" href={tool.productUrl} rel="noopener noreferrer" target="_blank">Visit official site ↗</a>
      <p><Link href="/tools/">Back to tools</Link></p>
    </ContentSection></PageFrame>;
}
