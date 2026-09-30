import Link from "next/link";
import { AdSlot } from "../../../components/ad-slot";
import { ModelPageAnalytics } from "../../../components/model-page-analytics";
import { OfficialLink } from "../../../components/official-link";
import { CostCalculator } from "../../../components/model-tools";
import { PageFrame } from "../../../components/page-frame";
import { pageMetadata } from "../../../lib/metadata";
import { getModel } from "../../../lib/models";

export const metadata = pageMetadata("/models/jev/");

const jev = getModel("jev");

export default function JevPage() {
  if (!jev) return null;
  const pricing = jev.schedules[0];
  return <PageFrame path="/models/jev/"><article className="page-content shell model-detail">
    <ModelPageAnalytics modelId={jev.id} providerId={jev.provider.id} />
    <header className="page-heading"><p className="eyebrow">{jev.provider.name} · System One model</p><h1>Jev AI API Pricing &amp; Cost Calculator</h1><p className="lede">Jev is TypeSafe AI&apos;s System One model for structured decisions, not a traditional generative LLM. Review its official API access, input-token price, and estimated usage costs.</p></header>
    <section className="detail-section" aria-labelledby="overview-heading"><div className="section-heading"><h2 id="overview-heading">Overview</h2><span className="verified-label">Last verified {jev.lastVerifiedAt}</span></div>
      <dl className="detail-grid"><div><dt>Model</dt><dd>{jev.name}</dd></div><div><dt>Creator</dt><dd>{jev.provider.name}</dd></div><div><dt>Category</dt><dd>System One model</dd></div><div><dt>Release date</dt><dd>{jev.releaseDate}</dd></div><div><dt>API status</dt><dd>{jev.apiStatus}</dd></div><div><dt>Context window</dt><dd>Not publicly specified</dd></div><div><dt>Official website</dt><dd><OfficialLink href={jev.officialUrl} modelId={jev.id} providerId={jev.provider.id} sourceType="website">typesafe.ai</OfficialLink></dd></div></dl>
      <p>Jev is TypeSafe AI&apos;s System One model for structured decisions, not a traditional generative LLM. It returns typed outputs rather than free-form generated text.</p>
    </section>

    <AdSlot placement="model-overview" />

    <section className="detail-section" aria-labelledby="jev-pricing-heading"><div className="section-heading"><h2 id="jev-pricing-heading">Pricing</h2><span className="verified-label">Verified {jev.lastVerifiedAt}</span></div>
      <div className="price-summary"><div><span>Input / 1M tokens</span><strong>${pricing.input}</strong></div><div><span>Cached input</span><strong>Not publicly available</strong></div><div><span>Output / 1M tokens</span><strong>{pricing.output === "not_applicable" ? "Not token-billed" : `$${pricing.output}`}</strong></div></div>
      <p>TypeSafe lists input-token pricing. Jev returns structured decisions rather than generated output tokens, so output is not token-billed. No context-window limit or additional token charge is listed in the cited public sources.</p>
    </section>

    <section className="detail-section" aria-labelledby="access-heading"><div className="section-heading"><h2 id="access-heading">API and access</h2><span className="status-label">Early access</span></div>
      <dl className="detail-grid"><div><dt>Model ID</dt><dd><code>{jev.apiModelId}</code></dd></div><div><dt>Endpoint</dt><dd><code>https://api.typesafe.ai/v1/systemone</code></dd></div><div><dt>Access</dt><dd>TypeSafe console early access</dd></div><div><dt>Documentation</dt><dd><OfficialLink href="https://docs.typesafe.ai/introduction/quickstart" modelId={jev.id} providerId={jev.provider.id} sourceType="documentation">API quickstart</OfficialLink></dd></div><div><dt>SDK</dt><dd>Not listed in the cited quickstart</dd></div></dl>
    </section>

    <section className="detail-section" aria-labelledby="calculator-heading"><div className="section-heading"><h2 id="calculator-heading">Jev Cost Calculator</h2><Link href="/calculator/?model=jev" className="text-link">Open full calculator</Link></div><CostCalculator initialModelId="jev" /></section>

    <section className="detail-section" aria-labelledby="capabilities-heading"><h2 id="capabilities-heading">Model capabilities</h2><ul className="fact-list">{jev.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul><h3>Documented use cases</h3><ul className="fact-list">{jev.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul></section>

    <section className="detail-section" aria-labelledby="related-heading"><h2 id="related-heading">Jev vs other models</h2><p>Compare Jev with any listed model using the same token workload.</p><Link href="/compare/?models=jev" className="text-link">Compare Jev with other models</Link><p className="related-links"><Link href="/pricing/">AI API pricing</Link><Link href="/calculator/?model=jev">Cost calculator</Link><Link href="/compare/?models=jev">Model comparison</Link></p></section>

    <section className="detail-section source-list" aria-labelledby="sources-heading"><h2 id="sources-heading">Official sources</h2><ul>{jev.sources.map((source) => <li key={source.url}><OfficialLink href={source.url} modelId={jev.id} providerId={jev.provider.id} sourceType={source.label.toLowerCase().includes("pricing") ? "pricing" : "documentation"}>{source.label}</OfficialLink><span>{source.url}</span></li>)}</ul><p>All Jev facts on this page were checked on {jev.lastVerifiedAt}.</p></section>
  </article></PageFrame>;
}
