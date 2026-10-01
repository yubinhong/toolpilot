import Link from "next/link";
import { AdSlot } from "../../components/ad-slot";
import { PageFrame } from "../../components/page-frame";
import { PricingTable } from "../../components/model-tools";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/pricing/");

export default function PricingPage() {
  return <PageFrame path="/pricing/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Official API rates</p><h1>AI API Pricing Comparison</h1><p className="lede">Compare input, cached input, output, context, and API availability across current AI models, including introductory and peak/off-peak schedules.</p></div>
    <AdSlot placement="pricing-table" />
    <PricingTable />
    <p className="data-policy">Each model record links to official pricing or model documentation and shows its last verification date. Prices are listed in USD per 1 million tokens unless provider documentation states otherwise.</p>
    <section className="detail-section" aria-labelledby="pricing-basics-heading">
      <h2 id="pricing-basics-heading">How AI API pricing works</h2>
      <p>Input tokens are billed when a prompt is sent; output tokens are billed for generated responses. Cached input can use a separate rate, and cache writes or storage may have additional charges.</p>
      <p>Some providers publish pricing schedules. Introductory rates may change after a stated period; DeepSeek separates Peak and Off-peak rates by UTC hours. If a provider has not announced a price, ToolPilot marks it Not public and does not estimate a dollar cost.</p>
      <p><Link href="/calculator/" className="text-link">Estimate API costs</Link> or <Link href="/compare/" className="text-link">compare model rates</Link> using the same workload.</p>
    </section>
  </section></PageFrame>;
}
