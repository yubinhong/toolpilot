import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/terms/");

export default function TermsPage() {
  return <PageFrame path="/terms/"><article className="page-content shell policy-page">
    <div className="page-heading"><p className="eyebrow">Terms</p><h1>Terms of Use</h1><p className="lede">Use ToolPilot pricing and cost estimates as research aids.</p><p className="last-updated">Last updated: September 30, 2026</p></div>
    <section className="detail-section"><h2>Pricing data and estimates</h2><p>Prices are transcribed from linked public provider sources and show when ToolPilot last checked those sources. Providers may change prices, model availability, billing rules, and terms at any time.</p><p>Calculator and comparison results are estimates based on token counts and the displayed rates. Actual charges may include caching, storage, tools, media, priority tiers, discounts, taxes, or other billing rules not represented by a token-only estimate.</p></section>
    <section className="detail-section"><h2>Provider terms</h2><p>Model access, data handling, usage limits, and payment are governed by the provider. Check the provider documentation and applicable agreements before relying on a model or estimate.</p></section>
    <section className="detail-section"><h2>Availability</h2><p>ToolPilot is provided as a public information service. No provider endorsement or uninterrupted availability is implied.</p></section>
  </article></PageFrame>;
}
