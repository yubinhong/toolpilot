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
  </section></PageFrame>;
}
