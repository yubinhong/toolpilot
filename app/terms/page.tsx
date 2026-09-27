import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/terms/');
export default function Page() {
  return <PageFrame breadcrumbPath="/terms/"><PageIntro eyebrow="ToolPilot / Trust" title={"Terms and research limitations"} summary={"A clear boundary for the current research site."}/>
      <ContentSection><h2>Research scope</h2><p>ToolPilot helps readers inspect tool choices and trade-offs. Draft content is not a formally approved recommendation. Dated product facts can change, and the vendor’s current terms and checkout determine the offer available to you.</p></ContentSection>
      <ContentSection><h2>Your evaluation</h2><p>Use a reversible trial and inspect the result before adopting a tool. A suggested test procedure is not a claim that ToolPilot has performed it. This site does not guarantee a result, product availability, price or compatibility.</p></ContentSection>
      <ContentSection><h2>Operator review pending</h2><p>The legal operator, contact channel and final operating terms remain unconfirmed. No paid listing, checkout, account service or commercial performance commitment is offered in this version. These statements describe the implementation and do not replace final operator review.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Methodology</Link> · <Link href="/disclosure/">Affiliate Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
