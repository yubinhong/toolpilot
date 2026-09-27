import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/privacy/');
export default function Page() {
  return <PageFrame><PageIntro eyebrow="ToolPilot / Trust" title={"Privacy information"} summary={"Current site practices; operator details remain under review."}/>
      <ContentSection><h2>What this version does</h2><p>The application serves static pages. Catalog search and category filtering operate in the browser. This version has no accounts, submission forms, analytics integration, advertising scripts or application database.</p></ContentSection>
      <ContentSection><h2>Hosting and external websites</h2><p>Requests still pass through the hosting infrastructure, which may process request and security information. This page does not claim that no technical data is processed. Vendor links lead to external sites with their own policies; those sites do not become part of ToolPilot.</p></ContentSection>
      <ContentSection><h2>Information awaiting confirmation</h2><p>The operator identity, public contact channel, applicable retention details and final policy wording must be confirmed before this is treated as a complete privacy policy. Any future analytics, submissions or advertising require a separate data and consent review before activation.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Editorial policy</Link> · <Link href="/disclosure/">Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
