import Link from 'next/link';
import { HomeExplorer } from '../components/home-explorer';
import { PageFrame } from '../components/page-frame';
import { ContentSection } from '../components/content-section';
import { tools, categories } from '../lib/catalog.mjs';
import { content, publicTool, publishedContent, contentPath } from '../lib/content.mjs';
import { pageMetadata } from '../lib/metadata';
import { categoryAnchor, getHomepageContent, HOME_CATEGORY_SHORTCUTS, reviewLabel } from '../lib/homepage.mjs';
export const metadata = pageMetadata('/');
export default function HomePage() {
  const reviewed = publishedContent(undefined).filter(r => ['compare','alternatives','pricing','best'].includes(r.kind));
  const homeContent = getHomepageContent(content);
  const categoryShortcuts = HOME_CATEGORY_SHORTCUTS.map(item => ({
    ...item,
    count: tools.filter(tool => tool.category === item.category).length,
  }));
  return <PageFrame breadcrumbPath="/"><section className="home-hero shell"><div className="hero-copy">
    <p className="eyebrow">Choose by the job</p><h1>Find the right<br />AI &amp; developer<br />tool for the job.</h1>
    <p className="hero-summary">Compare workflows, pricing and switching effort before choosing a tool.</p>
    <div className="hero-actions"><Link className="primary-button" href="/compare/">Compare Tools →</Link><Link className="secondary-link" href="/tools/#category-ai-coding">Explore AI Coding Tools</Link></div>
  </div><div className="hero-signal"><h2>Start with your constraint</h2><p>Working in an existing repository? Evaluate the review loop.</p><p>Building an app prototype? Evaluate the handoff and running costs.</p><p>Every research page shows its sources, unknowns and review status.</p></div></section>
  <ContentSection><div className="section-heading-row"><div><p className="eyebrow">Browse workflows</p><h2>Start with a tool category.</h2></div><p>Each profile shows whether it is a draft, under review or approved.</p></div><ul className="category-list home-category-links">{categoryShortcuts.map(item => <li key={item.category}><strong><Link href={`/tools/#${categoryAnchor(item.category)}`}>{item.label}</Link></strong><span>{item.summary}</span><small>{item.count} catalog entries</small></li>)}</ul></ContentSection>
  <ContentSection><div className="section-heading-row"><div><p className="eyebrow">Comparison research</p><h2>Comparisons under review</h2></div><p>These plan-listed drafts show their review state; no popularity ranking is available.</p></div>{homeContent.comparisons.length ? <div className="decision-grid">{homeContent.comparisons.map(record => <article className="tool-card" key={record.slug}><p className="card-kicker">{reviewLabel(record)}</p><h3><Link href={contentPath(record)}>{record.title}</Link></h3><p>{record.summary}</p><Link href={contentPath(record)}>Open comparison research →</Link></article>)}</div> : <p>The selected comparison drafts have completed review. <Link href="/compare/">Browse all comparisons</Link>.</p>}</ContentSection>
  <ContentSection><div className="section-heading-row"><div><p className="eyebrow">Research updates</p><h2>Latest Pricing Updates</h2></div><p>Dates show when the research record changed, not a guarantee that a price is current.</p></div>{homeContent.pricingUpdates.length ? <ul className="guide-list">{homeContent.pricingUpdates.map(record => <li key={record.slug}><strong><Link href={contentPath(record)}>{record.title}</Link></strong><span>Updated {record.updatedAt} · {reviewLabel(record)}</span></li>)}</ul> : <p>No pricing research is available yet. <Link href="/pricing/">Browse pricing research</Link>.</p>}</ContentSection>
  <ContentSection><div className="section-heading-row"><div><p className="eyebrow">Verification status</p><h2>Recently Verified Tools</h2></div></div>{homeContent.recentlyVerified.length ? <ul>{homeContent.recentlyVerified.map(record => <li key={record.slug}><Link href={contentPath(record)}>{record.name}</Link> · Verified {record.verifiedAt}</li>)}</ul> : <p>No tool profile currently has both an approved review and a verification date. <Link href="/tools/">Browse profiles with their review status</Link>.</p>}</ContentSection>
  {reviewed.length ? <ContentSection><h2>Reviewed decisions</h2><ul>{reviewed.map(r => <li key={contentPath(r)}><Link href={contentPath(r)}>{r.title}</Link></li>)}</ul></ContentSection> : null}
  <HomeExplorer tools={tools.map(publicTool)} categories={categories}/>
  </PageFrame>;
}
