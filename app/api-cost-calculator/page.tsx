import { AdSlot } from "../../components/ad-slot";
import { CostCalculator } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata("/api-cost-calculator/");

export default function CalculatorPage() {
  return <PageFrame path="/api-cost-calculator/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Browser-based estimate</p><h1>API Cost Calculator</h1><p className="lede">Estimate per-request, daily, monthly, and annual costs from token usage and the selected model pricing schedule.</p></div>
    <CostCalculator />
    <AdSlot placement="calculator-result" />
    <p className="data-policy">Estimates use public token rates and are not provider invoices. Cache writes, storage, tools, taxes, discounts, and multimodal billing may change actual charges.</p>
    <section className="detail-section" aria-labelledby="cost-formula-heading">
      <h2 id="cost-formula-heading">How API cost is calculated</h2>
      <p>Estimated request cost combines input-token and output-token charges. Cached input uses its listed rate when selected; schedule adjustments apply only when the chosen model has a documented schedule.</p>
      <p><code>Input tokens / 1,000,000 × input rate + output tokens / 1,000,000 × output rate</code></p>
      <p>Daily, monthly, and annual estimates multiply request cost by requests per day and 1, 30, or 365 days. A model with unpublished required rates returns no dollar estimate. The calculator shows the selected model&apos;s source and last verification date beside the estimate.</p>
      <p>Use <Link href="/pricing/" className="text-link">AI model pricing</Link> to review official input, cached-input, and output rates, or <Link href="/compare/" className="text-link">compare up to three models</Link> against the same workload.</p>
    </section>
  </section></PageFrame>;
}
