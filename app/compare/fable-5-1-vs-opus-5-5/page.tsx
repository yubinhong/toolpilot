import { OfficialLink } from "../../../components/official-link";
import { PageFrame } from "../../../components/page-frame";
import { estimateRequestCost } from "../../../lib/model-cost";
import { getModel } from "../../../lib/models";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata("/compare/fable-5-1-vs-opus-5-5/");

const keywordHeading = "Fable 5.1 vs Opus 5.5";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 });

function price(value: number | null | undefined) {
  return value == null ? "Not publicly available" : currency.format(value);
}

function requestCost(model: NonNullable<ReturnType<typeof getModel>>, inputTokens: number, outputTokens: number) {
  const estimate = estimateRequestCost(model, { inputTokens, outputTokens });
  return estimate.available ? currency.format(estimate.requestCost!) : "Not publicly available";
}

export default function Fable51VsOpus55Page() {
  const fable = getModel("claude-fable-5-1");
  const opus = getModel("claude-opus-5-5");
  if (!fable || !opus) return null;

  const fableSchedule = fable.schedules.find(({ id }) => id === fable.defaultSchedule)!;
  const opusSchedule = opus.schedules.find(({ id }) => id === opus.defaultSchedule)!;
  const fableWrites = fableSchedule.cacheWriteOptions ?? [];
  const opusWrites = opusSchedule.cacheWriteOptions ?? [];
  const fablePricingSource = fable.sources.find(({ label }) => /pricing/i.test(label))!;
  const fableModelSource = fable.sources.find(({ label }) => /model/i.test(label))!;
  const opusPricingSource = opus.sources.find(({ label }) => /pricing/i.test(label))!;
  const opusModelSource = opus.sources.find(({ label }) => /model/i.test(label))!;

  return (
    <PageFrame path="/compare/fable-5-1-vs-opus-5-5/">
      <article className="seo-comparison shell">
        <header className="page-heading">
          <p className="eyebrow">Anthropic API pricing</p>
          <h1>Fable 5.1 vs Opus 5.5: API Pricing and Workload Fit</h1>
          <p className="lede">Compare Claude Fable 5.1 and Claude Opus 5.5 by token rates, caching, context limits, and the work each provider says the models are designed to handle.</p>
          <p className="page-heading last-updated">Pricing checked: {fable.lastVerifiedAt}. Rates are in USD per million tokens.</p>
        </header>

        <section className="seo-section">
          <h2>{keywordHeading}: Standard Token Pricing</h2>
          <p>The largest difference in Fable 5.1 vs Opus 5.5 is the standard input and output rate. Fable costs $10 per million input tokens and $50 per million output tokens; Opus costs $4 and $20. That makes Fable 2.5 times the listed input and output price. Both models have the same documented one-million-token context window and 128,000-token maximum output, so the higher Fable rate does not buy a larger listed context limit.</p>
          <div className="table-scroll">
            <table className="seo-price-table">
              <caption>Standard Claude API prices, USD per million tokens</caption>
              <thead><tr><th scope="col">Model</th><th scope="col">Input</th><th scope="col">Cached input</th><th scope="col">5-minute cache write</th><th scope="col">1-hour cache write</th><th scope="col">Output</th><th scope="col">Context / max output</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">{fable.name}</th>
                  <td>{price(fableSchedule.input)}</td>
                  <td>{price(fableSchedule.cachedInput)}</td>
                  <td>{price(fableWrites.find(({ label }) => /5-minute/i.test(label))?.rate)}</td>
                  <td>{price(fableWrites.find(({ label }) => /1-hour/i.test(label))?.rate)}</td>
                  <td>{price(fableSchedule.output as number)}</td>
                  <td>{fable.contextWindow?.toLocaleString("en-US")} / {fable.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
                <tr>
                  <th scope="row">{opus.name}</th>
                  <td>{price(opusSchedule.input)}</td>
                  <td>{price(opusSchedule.cachedInput)}</td>
                  <td>{price(opusWrites.find(({ label }) => /5-minute/i.test(label))?.rate)}</td>
                  <td>{price(opusWrites.find(({ label }) => /1-hour/i.test(label))?.rate)}</td>
                  <td>{price(opusSchedule.output as number)}</td>
                  <td>{opus.contextWindow?.toLocaleString("en-US")} / {opus.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Anthropic lists these standard rates across each model&apos;s one-million-token context window. Fable&apos;s cached-input rate is $0.25 per million tokens, compared with $0.20 for Opus; cache writes are billed separately at the rates shown above.</p>
        </section>

        <section className="seo-section">
          <h3>{keywordHeading}: Example Request Costs</h3>
          <p>For 50,000 uncached input tokens and 10,000 output tokens, the shared published rates estimate {requestCost(fable, 50_000, 10_000)} with Fable and {requestCost(opus, 50_000, 10_000)} with Opus. At 400,000 input tokens and 50,000 output tokens, the estimates are {requestCost(fable, 400_000, 50_000)} and {requestCost(opus, 400_000, 50_000)}, respectively. There is no model-specific long-prompt tier in these standard prices, and both examples remain within the published context limit.</p>
          <p>These calculations use uncached input and exclude cache writes, tools, taxes, retries, and provider discounts. They compare the same token volumes, not the cost of completing an accepted task. A model that uses more tokens, needs fewer retries, or produces more usable work can change the total for a real application.</p>
        </section>

        <section className="seo-section">
          <h4>{keywordHeading}: Best-Fit Workloads</h4>
          <p>Anthropic positions Opus 5.5 for long-running agentic coding and knowledge work. It is the more economical starting point for implementation agents, large refactors, research assistance, and repeated tool-calling turns when it meets your quality bar. The model defaults to medium effort, which gives teams room to test higher effort only on requests that need it.</p>
          <p>Fable 5.1 is aimed at demanding reasoning and long-horizon agentic work, including multistep research and work that carries through into a document, spreadsheet, or presentation. Its default effort is high. Consider it for planning, synthesis, or review stages where a wrong early decision is costly and your evaluation shows that Opus still misses requirements even after increasing effort.</p>
          <p>The official model-selection guidance recommends starting with Opus 5.5 for most workloads and moving to Fable when Opus at higher effort still falls short. This is a useful escalation policy, not a guarantee that one model wins every task. Keep prompts and acceptance checks fixed, then compare correctness, latency, retries, and cost per accepted result on your own examples.</p>
        </section>

        <section className="seo-section">
          <h5>{keywordHeading}: A Practical Routing Rule</h5>
          <p>Start routine production traffic on Opus 5.5 when it passes your tests. Label task types where it fails, raise effort for those cases, and send only the unresolved class to Fable 5.1. Track the extra spend against measurable gains such as fewer incorrect outputs, less human rework, or successful completion of a multistep workflow.</p>
          <p>This two-stage approach is especially useful when an application mixes predictable coding or knowledge tasks with a smaller set of ambiguous, high-consequence jobs. Keep fallback limits explicit: a retry to Fable should have a reason and a ceiling, not silently send every failed Opus response to the more expensive model. If Fable does not improve the measured result, route the workload back to Opus.</p>
        </section>

        <section className="seo-section">
          <h6>{keywordHeading}: Caching, Context, and Limits</h6>
          <p>Prompt caching lowers the read rate for reusable prompt prefixes, but the absolute cached-input price is still slightly higher for Fable: $0.25 versus $0.20 per million tokens. Fable&apos;s cache read is a smaller fraction of its own input rate, while Opus remains cheaper in dollars per cached token. Include the relevant cache-write price and actual cache-hit volume when estimating a cache-heavy workflow.</p>
          <p>Both models list a one-million-token context window and a 128,000-token maximum output. Anthropic&apos;s pricing guide says Claude 4.6 and later models use standard rates across the full context window, with Haiku 5.5 as an exception; it publishes no separate long-context tier for Fable 5.1 or Opus 5.5. A large context still increases cost because more input tokens are billed.</p>
          <p>Fable 5.1 vs Opus 5.5 is therefore a choice between a lower-cost default and a narrower escalation path for harder work. The price gap is clear from the published schedule; the quality and accepted-task cost depend on your prompts, effort settings, cache behavior, and evaluation set. Recheck official pricing before budgeting.</p>
          <ul className="seo-sources">
            <li><OfficialLink href={fablePricingSource.url} modelId={fable.id} providerId={fable.provider.id} sourceType="pricing">Anthropic API pricing</OfficialLink></li>
            <li><OfficialLink href={fableModelSource.url} modelId={fable.id} providerId={fable.provider.id} sourceType="model_documentation">Claude Fable 5.1 model overview</OfficialLink></li>
            <li><OfficialLink href={opusModelSource.url} modelId={opus.id} providerId={opus.provider.id} sourceType="model_documentation">Claude Opus 5.5 model overview</OfficialLink></li>
            <li><OfficialLink href="https://platform.claude.com/docs/en/about-claude/models/choosing-a-model" modelId={opus.id} providerId={opus.provider.id} sourceType="model_documentation">Anthropic model selection guide</OfficialLink></li>
            <li><OfficialLink href={opusPricingSource.url} modelId={opus.id} providerId={opus.provider.id} sourceType="pricing">Anthropic Opus pricing details</OfficialLink></li>
          </ul>
        </section>
      </article>
    </PageFrame>
  );
}
