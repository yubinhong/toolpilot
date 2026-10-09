import { OfficialLink } from "../../../components/official-link";
import { PageFrame } from "../../../components/page-frame";
import { estimateRequestCost } from "../../../lib/model-cost";
import { getModel } from "../../../lib/models";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata("/compare/haiku-5-5-vs-luna-6/");

const keywordHeading = "Haiku 5.5 vs Luna 6";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 });

function price(value: number | null | undefined) {
  return value == null ? "Not publicly available" : currency.format(value);
}

function requestCost(model: NonNullable<ReturnType<typeof getModel>>, inputTokens: number, outputTokens: number) {
  const estimate = estimateRequestCost(model, { inputTokens, outputTokens });
  return estimate.available ? currency.format(estimate.requestCost!) : "Not publicly available";
}

export default function Haiku55VsLuna6Page() {
  const haiku = getModel("claude-haiku-5-5");
  const luna = getModel("gpt-6-luna");
  if (!haiku || !luna) return null;

  const haikuSchedule = haiku.schedules.find(({ id }) => id === haiku.defaultSchedule)!;
  const lunaSchedule = luna.schedules.find(({ id }) => id === luna.defaultSchedule)!;
  const haikuTier = haikuSchedule.longContext!;
  const lunaTier = lunaSchedule.longContext!;
  const haikuPricingSource = haiku.sources.find(({ label }) => /pricing/i.test(label))!;
  const haikuModelSource = haiku.sources.find(({ label }) => /model/i.test(label))!;
  const lunaPricingSource = luna.sources.find(({ label }) => /pricing/i.test(label))!;
  const lunaModelSource = luna.sources.find(({ label }) => /model/i.test(label))!;
  const haikuWrites = haikuSchedule.cacheWriteOptions ?? [];
  const haikuTierWrites = haikuTier.cacheWriteOptions ?? [];
  const lunaWrites = lunaSchedule.cacheWriteOptions ?? [];
  const lunaTierWrites = lunaTier.cacheWriteOptions ?? [];

  return (
    <PageFrame path="/compare/haiku-5-5-vs-luna-6/">
      <article className="seo-comparison shell">
        <header className="page-heading">
          <p className="eyebrow">Anthropic and OpenAI API pricing</p>
          <h1>Haiku 5.5 vs Luna 6: API Pricing and Use Cases</h1>
          <p className="lede">Compare Claude Haiku 5.5 with GPT-6 Luna by prompt length, caching, context limits, and the kind of production work each model is designed to handle.</p>
          <p className="page-heading last-updated">Pricing checked: {haiku.lastVerifiedAt}. Rates are in USD per million tokens.</p>
        </header>

        <section className="seo-section">
          <h2>{keywordHeading}: Standard API Pricing</h2>
          <p>At the standard tier, Claude Haiku 5.5 and GPT-6 Luna have the same published input, cached-input, and output prices: $0.10, $0.01, and $0.50 per million tokens. Cache writes are separate: Haiku lists five-minute and one-hour options, while Luna publishes one cache-write rate. These matching base rates make the prompt-length breakpoints and task results more useful decision points than a headline price alone.</p>
          <div className="table-scroll">
            <table className="seo-price-table">
              <caption>Official standard and prompt-length prices, USD per million tokens</caption>
              <thead><tr><th scope="col">Model</th><th scope="col">Input</th><th scope="col">Cached input</th><th scope="col">Cache writes</th><th scope="col">Output</th><th scope="col">Context / max output</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">{haiku.name}</th>
                  <td>{price(haikuSchedule.input)} standard<br />{price(haikuTier.input)} above {haikuTier.threshold.toLocaleString("en-US")} input tokens</td>
                  <td>{price(haikuSchedule.cachedInput)} standard<br />{price(haikuTier.cachedInput)} above threshold</td>
                  <td>{haikuWrites.map(({ label, rate }) => label + ": " + price(rate)).join("; ")}<br />Over threshold: {haikuTierWrites.map(({ label, rate }) => label + ": " + price(rate)).join("; ")}</td>
                  <td>{price(haikuSchedule.output as number)} standard<br />{price(haikuTier.output as number)} above threshold</td>
                  <td>{haiku.contextWindow?.toLocaleString("en-US")} / {haiku.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
                <tr>
                  <th scope="row">{luna.name}</th>
                  <td>{price(lunaSchedule.input)} standard<br />{price(lunaTier.input)} above {lunaTier.threshold.toLocaleString("en-US")} input tokens</td>
                  <td>{price(lunaSchedule.cachedInput)} standard<br />{price(lunaTier.cachedInput)} above threshold</td>
                  <td>{lunaWrites.map(({ label, rate }) => label + ": " + price(rate)).join("; ")}<br />Over threshold: {lunaTierWrites.map(({ label, rate }) => label + ": " + price(rate)).join("; ")}</td>
                  <td>{price(lunaSchedule.output as number)} standard<br />{price(lunaTier.output as number)} above threshold</td>
                  <td>{luna.contextWindow?.toLocaleString("en-US")} / {luna.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Both providers publish a 128,000-token maximum output. Haiku lists a 1,000,000-token context window; Luna lists 1,050,000. The higher-price tiers apply to requests whose input exceeds the model-specific threshold shown above.</p>
        </section>

        <section className="seo-section">
          <h3>{keywordHeading}: What a Request Costs</h3>
          <p>For a request with 60,000 uncached input tokens and 12,000 output tokens, the shared official rates estimate {requestCost(haiku, 60_000, 12_000)} on either model. At 150,000 input and 30,000 output tokens, Haiku has crossed its 100,000-token threshold while Luna has not: the estimates become {requestCost(haiku, 150_000, 30_000)} for Haiku and {requestCost(luna, 150_000, 30_000)} for Luna. This example isolates the effect of the tier; it does not predict model quality or latency.</p>
          <p>At 300,000 input tokens and 60,000 output tokens, both models use their higher tier. The estimate is {requestCost(haiku, 300_000, 60_000)} for Haiku and {requestCost(luna, 300_000, 60_000)} for Luna. The gap remains because the published over-threshold rates differ. Estimates use uncached input and exclude cache writes, tools, retries, taxes, and provider-specific discounts.</p>
        </section>

        <section className="seo-section">
          <h4>{keywordHeading}: Best-Fit Workloads</h4>
          <p>Consider Claude Haiku 5.5 for high-volume, latency-sensitive classification, extraction, routing, and subagent work when your stack already uses the Anthropic API. Anthropic describes Haiku as suited to these smaller, fast-turnaround tasks and lists adaptive thinking. Its standard token rates match the Luna rates, so validate whether its response quality, latency, and integration behavior improve your actual pipeline before choosing it.</p>
          <p>GPT-6 Luna is a practical candidate for focused, repeated text workloads where predictable low cost matters. OpenAI positions Luna as an efficient model for high-volume tasks. Its standard rates match Haiku, but the 100,000-to-272,000 input range stays on the Luna standard schedule while Haiku has moved to higher rates. For long prompts, this can make Luna materially cheaper before either model reaches its context limit.</p>
          <p>Compare both on representative requests for correctness, format compliance, latency, and accepted-result cost. Include failures, retries, and human corrections: cheaper tokens can still create more downstream work.</p>
        </section>

        <section className="seo-section">
          <h5>{keywordHeading}: A Practical Selection Rule</h5>
          <p>Use the expected prompt length as an early routing signal. If most requests stay below 100,000 input tokens, compare the models on output quality, response time, and provider integration because their base token rates are equal. If prompts often fall between 100,000 and 272,000 tokens, Luna has a price advantage on the listed token rates. If prompts exceed 272,000, calculate both higher-tier totals rather than extrapolating from the standard column.</p>
          <p>For mixed workloads, route requests to the lower-cost model that clears your quality gate; reserve the alternative for task classes where tests show an advantage. Keep prompts, tools, output budgets, and acceptance checks fixed. Set a retry ceiling, and keep usage logs in your own system. ToolPilot does not receive token counts or prompt text.</p>
        </section>

        <section className="seo-section">
          <h6>{keywordHeading}: Caching, Context, and Limits</h6>
          <p>Prompt caching changes the input portion of a bill only when the provider recognizes reusable prompt content. Both models list cached input at $0.01 per million tokens on their standard schedules. Above the respective thresholds, Haiku lists $0.05 cached input and Luna $0.02. Compare cache-hit rates from your provider response metadata, and use the applicable tier rather than assuming every repeated token is cached.</p>
          <p>Cache writes are also billed separately. Anthropic publishes five-minute and one-hour write options for Haiku, with different rates in its higher prompt tier. The OpenAI Luna record lists a single cache-write rate. The calculator and comparison tool exclude cache-write charges because they do not ask how many tokens are written; include those charges separately when estimating a cache-heavy workload.</p>
          <p>The context window is a maximum capacity, not a recommendation to send a full window on every request. Haiku has a documented 1,000,000-token input context and Luna has 1,050,000; each lists a 128,000-token output limit. Long prompts can also incur higher prices well before the context ceiling. Recheck provider terms and your own usage before budgeting. This comparison reports vendor-published rates and model descriptions, not an independent benchmark or a universal winner.</p>
          <ul className="seo-sources">
            <li><OfficialLink href={haikuPricingSource.url} modelId={haiku.id} providerId={haiku.provider.id} sourceType="pricing">Anthropic API pricing</OfficialLink></li>
            <li><OfficialLink href={haikuModelSource.url} modelId={haiku.id} providerId={haiku.provider.id} sourceType="model_documentation">Claude Haiku 5.5 model overview</OfficialLink></li>
            <li><OfficialLink href={lunaPricingSource.url} modelId={luna.id} providerId={luna.provider.id} sourceType="pricing">OpenAI API pricing</OfficialLink></li>
            <li><OfficialLink href={lunaModelSource.url} modelId={luna.id} providerId={luna.provider.id} sourceType="model_documentation">GPT-6 Luna model documentation</OfficialLink></li>
          </ul>
        </section>
      </article>
    </PageFrame>
  );
}
