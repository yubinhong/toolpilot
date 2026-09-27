import Link from 'next/link';
import { ContentSection } from '../../components/content-section';
import { PageFrame } from '../../components/page-frame';
import { PageIntro } from '../../components/page-intro';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/contact/');
export default function Page() {
  return <PageFrame breadcrumbPath="/contact/"><PageIntro eyebrow="ToolPilot / Trust" title={"Contact information"} summary={"A public correction channel is being finalized."}/>
      <ContentSection><h2>Contact availability</h2><p>The operator name and a monitored public contact address have not yet been confirmed. We do not display an invented email address or offer a form that no one can process.</p></ContentSection>
      <ContentSection><h2>Prepare a useful correction</h2><p>Keep the page URL, the specific claim, a current official source and the observed date. Please do not include passwords, tokens, private contracts or customer data. A contact channel will be listed here once the operator confirms it.</p></ContentSection>
      <ContentSection><p><Link href="/editorial-policy/">Methodology</Link> · <Link href="/disclosure/">Affiliate Disclosure</Link> · <Link href="/contact/">Contact</Link></p></ContentSection>
    </PageFrame>;
}
