import Link from "next/link";
import { ModelComparison } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/compare/");

export default function ComparePage() {
  return <PageFrame path="/compare/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Side-by-side costs</p><h1>AI Model Comparison</h1><p className="lede">Compare up to three models using the same workload and an explicitly selected pricing schedule for each model.</p><p className="comparison-guide-link"><Link href="/compare/gpt-6-1-sol-vs-astra/">GPT 6.1 Sol vs Astra price and use-case guide</Link></p></div>
    <ModelComparison />
  </section></PageFrame>;
}
