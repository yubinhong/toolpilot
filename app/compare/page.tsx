import { ModelComparison } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/compare/");

export default function ComparePage() {
  return <PageFrame path="/compare/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Side-by-side costs</p><h1>AI Model Comparison</h1><p className="lede">Compare up to three models using the same workload and an explicitly selected pricing schedule for each model.</p></div>
    <ModelComparison />
  </section></PageFrame>;
}
