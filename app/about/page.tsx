import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/about/");

export default function AboutPage() {
  return <PageFrame path="/about/"><article className="page-content shell policy-page">
    <div className="page-heading"><p className="eyebrow">About</p><h1>ToolPilot</h1><p className="lede">AI model pricing and API cost tools for developers and builders.</p></div>
    <section className="detail-section"><h2>What ToolPilot does</h2><p>ToolPilot organizes public AI model pricing so developers can compare token rates, estimate usage costs, and inspect official model resources in one place.</p><p>The model database is separate from the page list. V1 publishes a single model detail page for Jev; other model records support search, pricing, calculator, and comparison workflows.</p></section>
    <section className="detail-section"><h2>Sources and updates</h2><p>Model prices and API facts link to provider documentation or announcements. Each record displays its last verification date. A date records when ToolPilot checked the cited source; it is not a guarantee that a provider has not changed its terms since then.</p><p>When a source does not establish a fact, ToolPilot labels it as unavailable or not publicly specified instead of estimating it.</p></section>
    <section className="detail-section"><h2>Independence</h2><p>V1 does not sell model rankings or sponsored placements. Comparisons show documented information and workload estimates without naming a model as universally best.</p></section>
  </article></PageFrame>;
}
