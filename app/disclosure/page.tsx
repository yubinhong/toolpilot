import { publishedContent } from '../../lib/content.mjs';
import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/disclosure/');
export default function Page() {
  const active = publishedContent(undefined).filter(r => Object.values(r.commercial).some(rel => rel.status === "active"));
  return <PageFrame breadcrumbPath="/disclosure/"><PageIntro eyebrow="ToolPilot / Trust" title={"Affiliate Disclosure"} summary={"How ordinary links, affiliate recommendations and paid placements are identified."}/>
      <ContentSection><h2>Ordinary links</h2><p>A link labeled Official site takes you to the vendor and does not by itself create a commercial relationship. A vendor offering an affiliate program does not establish that ToolPilot participates in it. Historical research about commissions is not displayed as a current partnership.</p></ContentSection>
      <ContentSection><h2>Affiliate recommendations</h2><p>When an affiliate relationship has approved terms and recorded evidence, the relevant call to action carries a nearby disclosure. The destination link is marked sponsored. Affiliate recommendations are distinct from ordinary vendor links and paid exposure placements.</p></ContentSection>
      <ContentSection><h2>Featured and Sponsor placements</h2><p>Featured identifies a paid exposure placement and Sponsor identifies a sponsorship. Each is visibly labeled on the relevant page and recorded separately from Affiliate links. Payment cannot purchase factual verification, a comparison conclusion or an organic ranking.</p></ContentSection>
      <ContentSection><h2>Current implementation</h2><p>{active.length ? "Confirmed commercial relationships are disclosed beside their relevant links or placements. Ordinary vendor links remain distinct from Affiliate destinations and paid exposure." : "No affiliate destination, Featured placement or Sponsor placement is active in this version. Unconfirmed relationships are not presented as partnerships."} No advertising script is active. Any relationship change requires recorded evidence and a disclosure review before activation.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Methodology</Link> · <Link href="/disclosure/">Affiliate Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
