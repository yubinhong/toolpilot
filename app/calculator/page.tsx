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
  </section></PageFrame>;
}
