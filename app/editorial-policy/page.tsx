import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/editorial-policy/');
export default function Page() {
  return <PageFrame breadcrumbPath="/editorial-policy/"><PageIntro eyebrow="ToolPilot / Trust" title={"Editorial policy"} summary={"Evidence, uncertainty and review are part of the recommendation."}/>
      <ContentSection><h2>Sources and dates</h2><p>We prioritize official product documentation, current pricing pages and public vendor repositories. Each factual field has its own source and reading date. Missing information is marked unknown. Successful HTTP access only establishes link reachability.</p></ContentSection>
      <ContentSection><h2>Facts and judgments</h2><p>Selection criteria, trade-offs and suggested trial procedures are editorial reasoning. They are not customer reviews or measured results. Hands-on claims require a documented test, date and reproducible conditions. No unperformed benchmark is represented as tested.</p></ContentSection>
      <ContentSection><h2>Approval and updates</h2><p>Research drafts await the site owner’s approval. Formal approval applies to one content revision. Material changes to price, features, sources, relationships or conclusions require review again. Dependent comparisons must also be checked. Historical research is retained separately from the current public profile.</p></ContentSection>
      <ContentSection><h2>Corrections</h2><p>For a correction, identify the page, the disputed statement, an official source and the date it changed. Our public contact channel is still being finalized. Do not send account credentials or private customer records. Critical factual errors require withdrawing the affected recommendation while it is reviewed.</p></ContentSection>
      <ContentSection><h2>Commercial independence</h2><p>Affiliate links, featured placements and sponsorships are distinct. Commercial payments do not determine factual verification, comparison conclusions or natural ordering. Vendor descriptions are inputs to review, not independent evaluations.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Editorial policy</Link> · <Link href="/disclosure/">Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
