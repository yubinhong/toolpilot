import Link from "next/link";
import { ModelComparison } from "../../components/model-tools";
import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/compare/");

const articles = [
  { href: "/compare/gpt-6-1-sol-vs-astra/", title: "GPT 6.1 Sol vs Astra" },
  { href: "/compare/haiku-5-5-vs-luna-6/", title: "Haiku 5.5 vs Luna 6" },
  { href: "/compare/fable-5-1-vs-opus-5-5/", title: "Fable 5.1 vs Opus 5.5" },
  { href: "/compare/opus-5-5-vs-astra/", title: "Opus 5.5 vs Astra" },
] as const;

export default function ComparePage() {
  return <PageFrame path="/compare/"><section className="page-content shell">
    <div className="page-heading"><p className="eyebrow">Side-by-side costs</p><h1>AI Model Comparison</h1><p className="lede">Compare up to three models using the same workload and an explicitly selected pricing schedule for each model.</p></div>
    <nav className="comparison-articles-nav" aria-label="Comparison articles">
      <h2>Comparison articles</h2>
      <details>
        <summary>Browse articles <span>{articles.length}</span></summary>
        <ul>
          {articles.map(({ href, title }) => <li key={href}><Link href={href}>{title}<span>Pricing and use cases</span></Link></li>)}
        </ul>
      </details>
    </nav>
    <ModelComparison />
  </section></PageFrame>;
}
