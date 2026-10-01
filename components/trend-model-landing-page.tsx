import Link from "next/link";
import { AdSlot } from "./ad-slot";
import { CostCalculator } from "./model-tools";
import { ModelPageAnalytics } from "./model-page-analytics";
import { OfficialLink } from "./official-link";
import type { ModelRecord } from "../lib/model-types";

function formatRate(value: number | null | "not_applicable" | undefined) {
  if (value === "not_applicable") return "Not token-billed";
  if (value == null) return "Not publicly specified";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 6 }).format(value);
}

function pricingStatus(model: ModelRecord) {
  if (model.pricingStatus === "not_public") return "Not publicly announced";
  if (model.pricingStatus === "announced") return "Official rates announced; API access limited";
  return "Public pricing";
}

export function TrendModelLandingPage({ model }: { model: ModelRecord }) {
  const landing = model.landing;
  if (!landing) return null;
  const defaultSchedule = model.schedules.find(({ id }) => id === model.defaultSchedule) ?? model.schedules[0];

  return <article className="page-content shell model-detail">
    <ModelPageAnalytics modelId={model.id} providerId={model.provider.id} />
    <header className="page-heading">
      <p className="eyebrow">{model.provider.name} · {landing.category}</p>
      <h1>{landing.heading}</h1>
      <p className="lede">{landing.summary}</p>
    </header>

    <section className="detail-section" aria-labelledby="status-heading">
      <div className="section-heading"><h2 id="status-heading">At a glance</h2><span className="verified-label">Last verified {model.lastVerifiedAt}</span></div>
      <dl className="detail-grid">
        <div><dt>Provider</dt><dd>{model.provider.name}</dd></div>
        <div><dt>{landing.dateLabel ?? "Release date"}</dt><dd>{model.releaseDate ?? "Not publicly specified"}</dd></div>
        <div><dt>API access</dt><dd>{model.apiStatus}</dd></div>
        <div><dt>Pricing</dt><dd>{pricingStatus(model)}</dd></div>
        <div><dt>Context window</dt><dd>{model.contextWindow == null ? "Not publicly specified" : `${new Intl.NumberFormat("en-US").format(model.contextWindow)} input tokens`}</dd></div>
        <div><dt>Maximum output</dt><dd>{model.outputTokenLimit == null ? "Not publicly specified" : `${new Intl.NumberFormat("en-US").format(model.outputTokenLimit)} tokens`}</dd></div>
        <div><dt>Official website</dt><dd><OfficialLink href={model.officialUrl} modelId={model.id} providerId={model.provider.id} sourceType="website">{new URL(model.officialUrl).hostname}</OfficialLink></dd></div>
      </dl>
    </section>

    <section className="detail-section" aria-labelledby="overview-heading">
      <h2 id="overview-heading">What is {model.name}?</h2>
      <p>{landing.overview ?? landing.summary}</p>
    </section>

    <AdSlot placement="model-overview" />

    <section className="detail-section" aria-labelledby="availability-heading">
      <h2 id="availability-heading">API availability and access</h2>
      <p>{landing.apiAccessNote}</p>
      <dl className="detail-grid">
        <div><dt>API status</dt><dd>{model.apiStatus}</dd></div>
        <div><dt>API model ID</dt><dd>{model.apiModelId ? <code>{model.apiModelId}</code> : "Not publicly listed"}</dd></div>
        {model.apiEndpoint && <div><dt>Endpoint</dt><dd><code>{model.apiEndpoint}</code></dd></div>}
      </dl>
    </section>

    <section className="detail-section" aria-labelledby="pricing-heading">
      <div className="section-heading"><h2 id="pricing-heading">{model.name} pricing</h2><span className="verified-label">Verified {model.lastVerifiedAt}</span></div>
      {model.pricingStatus === "not_public" ? <p>API pricing has not been publicly announced. No numeric cost estimate is available.</p> : <>
        <div className="price-summary">
          <div><span>Input / 1M tokens · {defaultSchedule.label}</span><strong>{formatRate(defaultSchedule.input)}</strong></div>
          <div><span>Cached input / 1M tokens</span><strong>{formatRate(defaultSchedule.cachedInput)}</strong></div>
          <div><span>Output / 1M tokens</span><strong>{formatRate(defaultSchedule.output)}</strong></div>
        </div>
        {model.schedules.map((schedule) => <div className="pricing-detail" key={schedule.id}>
          <strong>{schedule.label}</strong>
          <span>Input {formatRate(schedule.input)} · Cached input {formatRate(schedule.cachedInput)} · Output {formatRate(schedule.output)} / 1M tokens</span>
          {schedule.pricingNotes?.map((note) => <small key={note}>{note}</small>)}
        </div>)}
      </>}
    </section>

    <section className="detail-section" aria-labelledby="limits-heading">
      <h2 id="limits-heading">Context and token limits</h2>
      <p>{model.contextWindow == null ? `${model.provider.name} has not publicly specified an input context-window limit.` : `The documented context window is ${new Intl.NumberFormat("en-US").format(model.contextWindow)} input tokens.`} {model.outputTokenLimit == null ? "The cited sources do not list a separate maximum output-token limit." : `${model.provider.name} documents a maximum output-token limit of ${new Intl.NumberFormat("en-US").format(model.outputTokenLimit)} tokens.`}</p>
    </section>

    <section className="detail-section" aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading">Capabilities</h2>
      <ul className="fact-list">{model.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
      <h3>Documented use cases</h3>
      <ul className="fact-list">{model.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul>
    </section>

    {!!landing.benchmarks?.length && <section className="detail-section" aria-labelledby="benchmarks-heading">
      <h2 id="benchmarks-heading">Google-reported benchmark results</h2>
      <div className="table-scroll"><table className="comparison-table"><thead><tr><th>Benchmark</th><th>Argon result</th><th>Reporting note</th></tr></thead><tbody>
        {landing.benchmarks.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.result}</td><td>{item.note}</td></tr>)}
      </tbody></table></div>
      <p>These are provider-reported results, not independent evaluations. See Google&apos;s evaluation methodology in the official sources below.</p>
    </section>}

    <section className="detail-section" aria-labelledby="calculator-heading">
      <div className="section-heading"><h2 id="calculator-heading">{model.name} cost calculator</h2><Link href={`/calculator/?model=${model.id}`} className="text-link">Open full calculator</Link></div>
      <CostCalculator initialModelId={model.id} />
    </section>

    <section className="detail-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div className="faq-list">{landing.faq.map((item) => <section key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}</div>
    </section>

    <section className="detail-section" aria-labelledby="related-heading">
      <h2 id="related-heading">Pricing, calculator, and comparison</h2>
      <p className="related-links"><Link href="/pricing/">AI API pricing</Link><Link href={`/calculator/?model=${model.id}`}>Cost calculator</Link><Link href={`/compare/?models=${model.id}`}>Compare models</Link></p>
    </section>

    <section className="detail-section source-list" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Official sources</h2>
      <ul>{model.sources.map((source) => <li key={source.url}><OfficialLink href={source.url} modelId={model.id} providerId={model.provider.id} sourceType={/pricing/i.test(source.label) ? "pricing" : "documentation"}>{source.label}</OfficialLink><span>{source.url}</span></li>)}</ul>
      <p>Facts and rates on this page were checked on {model.lastVerifiedAt}.</p>
    </section>
  </article>;
}
