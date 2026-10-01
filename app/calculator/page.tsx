import { AdSlot } from "../../components/ad-slot";
import { CostCalculator } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/calculator/");

export default function CalculatorPage() {
  return <PageFrame path="/calculator/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Token cost estimator</p><h1>AI API Cost Calculator</h1><p className="lede">Estimate request, daily, monthly, and annual costs from your token usage and selected model pricing schedule.</p></div>
    <CostCalculator />
    <AdSlot placement="calculator-result" />
    <p className="data-policy">Estimates use public token rates and are not provider invoices. Cache writes, storage, tools, taxes, discounts, and multimodal billing may change actual charges.</p>
    <section className="detail-section" aria-labelledby="cost-formula-heading">
      <h2 id="cost-formula-heading">How AI API cost is calculated</h2>
      <p>Estimated request cost is input-token cost plus output-token cost, with cached-input rates or schedule adjustments applied when selected and publicly priced.</p>
      <p><code>Input tokens / 1,000,000 × input rate + output tokens / 1,000,000 × output rate</code></p>
      <p>Daily, monthly, and annual estimates multiply request cost by requests per day and 1, 30, or 365 days. A model with unpublished required rates returns no dollar estimate.</p>
    </section>
  </section></PageFrame>;
}
