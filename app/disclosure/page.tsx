import { publishedContent } from '../../lib/content.mjs';
import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/disclosure/');
export default function Page() {
  const active = publishedContent(undefined).filter(r => Object.values(r.commercial).some(rel => rel.status === "active"));
  return <PageFrame><PageIntro eyebrow="ToolPilot / Trust" title={"Commercial disclosure"} summary={"Understand the relationship behind a link or placement."}/>
      <ContentSection><h2>Ordinary links</h2><p>A link labeled Official site takes you to the vendor. A vendor offering an affiliate program does not establish that ToolPilot participates in it. Historical research about commissions is not displayed as a current partnership.</p></ContentSection>
      <ContentSection><h2>Affiliate recommendations</h2><p>When a confirmed affiliate relationship is active, its disclosure appears next to the relevant outbound call to action. The link is marked sponsored. A commercial program must have approved terms and recorded relationship evidence before activation.</p></ContentSection>
      <ContentSection><h2>Featured and sponsored placements</h2><p>Featured means a labeled exposure placement; Sponsor means a disclosed sponsorship. Neither purchases objective evaluation, a comparison conclusion or an organic rank. These relationships are recorded separately from affiliate links.</p></ContentSection>
      <ContentSection><h2>Current implementation</h2><p>{active.length ? "Confirmed commercial relationships are disclosed on their relevant pages. Ordinary vendor links remain distinct from affiliate destinations and paid exposure." : "No affiliate destination or paid placement is activated in this version. Unconfirmed relationships are not presented as partnerships."} No advertising script is activated. Future changes require a new disclosure review.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Editorial policy</Link> · <Link href="/disclosure/">Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
