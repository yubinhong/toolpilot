import Link from "next/link";
import { AdSlot } from "../components/ad-slot";
import { CostCalculator, ModelSearch, PopularModels, PricingTable } from "../components/model-tools";
import { PageFrame } from "../components/page-frame";
import { pageMetadata } from "../lib/metadata";
import { models } from "../lib/models";
import type { ModelRecord } from "../lib/model-types";
import { getSiteUrl } from "../lib/site-config.mjs";

export const metadata = pageMetadata("/");

function HomeStructuredData() {
  const site = getSiteUrl();
  const data = [
    { "@context": "https://schema.org", "@type": "WebSite", name: "ToolPilot", url: `${site}/` },
    { "@context": "https://schema.org", "@type": "WebApplication", name: "ToolPilot AI API Cost Calculator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", url: `${site}/calculator/`, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function HomePage() {
  const recent = (models as ModelRecord[]).filter((model) => model.releaseDate).sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")).slice(0, 3);
  return <PageFrame path="/">
    <HomeStructuredData />
    <section className="home-intro shell">
      <div className="intro-copy"><p className="eyebrow">ToolPilot · AI API tools</p><h1>AI Model Pricing &amp; API Cost Calculator</h1><p className="lede">Compare AI API pricing and calculate the real cost of running your AI applications.</p></div>
      <ModelSearch />
    </section>

    <section className="content-section shell" aria-labelledby="popular-heading">
      <div className="section-heading"><div><p className="eyebrow">Model discovery</p><h2 id="popular-heading">Popular AI models</h2></div><Link href="/pricing/" className="text-link">All model pricing</Link></div>
      <PopularModels />
    </section>

    <section className="content-section shell" aria-labelledby="latest-heading">
      <div className="section-heading"><div><p className="eyebrow">Recently released</p><h2 id="latest-heading">Latest models</h2></div><p>Release dates appear only where official documentation confirms them.</p></div>
      {recent.length ? <div className="latest-list">{recent.map((model) => <article key={model.id}><div><Link href={model.landingPath ?? `/calculator/?model=${model.id}`} className="model-name">{model.name}</Link><span>{model.provider.name}</span></div><time dateTime={model.releaseDate ?? undefined}>{model.releaseDate}</time><Link href={model.landingPath ?? `/calculator/?model=${model.id}`}>{model.landingPath ? "View details" : "Estimate cost"}</Link></article>)}</div> : <p className="empty-state">No release date is currently confirmed in the model data.</p>}
    </section>

    <section className="content-section shell" aria-labelledby="pricing-preview-heading">
      <div className="section-heading"><div><p className="eyebrow">Official rates</p><h2 id="pricing-preview-heading">API pricing preview</h2></div><Link href="/pricing/" className="text-link">View full pricing</Link></div>
      <PricingTable limit={5} />
    </section>

    <div className="shell"><AdSlot placement="homepage-content" /></div>

    <section className="content-section shell" aria-labelledby="quick-calc-heading">
      <div className="section-heading"><div><p className="eyebrow">Usage estimate</p><h2 id="quick-calc-heading">Quick cost calculator</h2></div><Link href="/calculator/" className="text-link">Advanced calculator</Link></div>
      <CostCalculator compact />
    </section>

    <section className="compare-band"><div className="shell compare-band-inner"><div><p className="eyebrow">Workload comparison</p><h2>Compare costs across models</h2><p>Use the same token workload to compare up to three APIs.</p></div><Link href="/compare/" className="primary-button">Compare models <span aria-hidden="true">→</span></Link></div></section>
  </PageFrame>;
}
