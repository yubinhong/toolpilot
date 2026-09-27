import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/about/');
export default function Page() {
  return <PageFrame breadcrumbPath="/about/"><PageIntro eyebrow="ToolPilot / Trust" title={"About ToolPilot"} summary={"Tools should be chosen around a job, not a logo."}/>
      <ContentSection><h2>Who this is for</h2><p>ToolPilot organizes research for developers, indie hackers and AI builders. The first detailed collection focuses on AI coding and app building. The wider developer-tool catalog remains available with per-entry review states.</p></ContentSection>
      <ContentSection><h2>How to read a page</h2><p>Vendor documentation supports factual claims. Suggested use cases and selection criteria are editorial judgments. A research date means the source was read; it does not mean a hands-on trial was performed. Drafts remain clearly labeled until the site owner approves the exact revision.</p></ContentSection>
      <ContentSection><h2>Independence</h2><p>Basic inclusion does not require payment. A paid placement cannot buy a factual conclusion, a comparison result or an organic ranking. See the Methodology and Affiliate Disclosure for the boundaries.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Methodology</Link> · <Link href="/disclosure/">Affiliate Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
