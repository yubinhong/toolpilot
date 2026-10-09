import Link from "next/link";
import { ModelComparison } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/compare/");

export default function ComparePage() {
  return <PageFrame path="/compare/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Side-by-side costs</p><h1>AI Model Comparison</h1><p className="lede">Compare up to three models using the same workload and an explicitly selected pricing schedule for each model.</p></div>
    <nav className="comparison-articles-nav" aria-label="Comparison articles">
      <h2>Comparison articles</h2>
      <ul>
        <li><Link href="/compare/gpt-6-1-sol-vs-astra/">GPT 6.1 Sol vs Astra <span>Pricing and use cases</span></Link></li>
        <li><Link href="/compare/haiku-5-5-vs-luna-6/">Haiku 5.5 vs Luna 6 <span>Pricing and use cases</span></Link></li>
      </ul>
    </nav>
    <ModelComparison />
  </section></PageFrame>;
}
