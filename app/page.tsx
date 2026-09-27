import Link from 'next/link';
import { HomeExplorer } from '../components/home-explorer';
import { PageFrame } from '../components/page-frame';
import { ContentSection } from '../components/content-section';
import { tools, categories } from '../lib/catalog.mjs';
import { publicTool, publishedContent, contentPath } from '../lib/content.mjs';
import { pageMetadata } from '../lib/metadata';
export const metadata = pageMetadata('/');
export default function HomePage() {
  const reviewed = publishedContent(undefined).filter(r => ['compare','alternatives','pricing','best'].includes(r.kind));
  return <PageFrame breadcrumbPath="/"><section className="home-hero shell"><div className="hero-copy">
    <p className="eyebrow">Choose by the job</p><h1>Find the right AI &amp; developer tool for the job.</h1>
    <p className="hero-summary">Understand the workflow, cost and switching effort before choosing your next tool. Start with a concrete task and inspect the evidence.</p>
    <div className="hero-actions"><Link className="primary-button" href="/compare/">Compare development tools →</Link><Link className="secondary-link" href="/editorial-policy/">How we research</Link></div>
  </div><div className="hero-signal"><h2>Start with your constraint</h2><p>Working in an existing repository? Evaluate the review loop.</p><p>Building an app prototype? Evaluate the handoff and running costs.</p><p>Every research page shows its sources, unknowns and review status.</p></div></section>
  <ContentSection><h2>Two decisions to start with</h2><div className="decision-grid"><article className="tool-card"><h3>Choose an AI coding assistant</h3><p>Compare editor, terminal and provider workflows using a small reversible task.</p><Link href="/best/">Explore task-based shortlists →</Link></article><article className="tool-card"><h3>Choose an app builder</h3><p>Compare prototypes, code handoff and operational responsibility.</p><Link href="/compare/">Explore comparisons →</Link></article><article className="tool-card"><h3>Understand the budget</h3><p>Separate subscription price from usage and live-service costs.</p><Link href="/pricing/">Explore pricing research →</Link></article></div></ContentSection>
  <ContentSection><h2>Reviewed decisions</h2>{reviewed.length ? <ul>{reviewed.map(r => <li key={contentPath(r)}><Link href={contentPath(r)}>{r.title}</Link></li>)}</ul> : <p>The first decision pages are awaiting the site owner’s review. <Link href="/compare/">Browse the clearly labeled research drafts</Link> or <Link href="/guides/">read the decision methods</Link>.</p>}</ContentSection>
  <HomeExplorer tools={tools.map(publicTool)} categories={categories}/>
  </PageFrame>;
}
