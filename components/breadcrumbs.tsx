import Link from 'next/link';
import { getSiteUrl } from '../lib/site-config.mjs';

const labels: Record<string, string> = {
  "/pricing/": "Pricing",
  "/calculator/": "Calculator",
  "/compare/": "Compare",
  "/compare/gpt-6-1-sol-vs-astra/": "GPT 6.1 Sol vs Astra",
  "/compare/haiku-5-5-vs-luna-6/": "Haiku 5.5 vs Luna 6",
  "/compare/fable-5-1-vs-opus-5-5/": "Fable 5.1 vs Opus 5.5",
  "/compare/opus-5-5-vs-astra/": "Opus 5.5 vs Astra",
  "/models/jev/": "Jev",
  "/models/gemini-4-argon/": "Gemini 4 Argon",
  "/about/": "About",
  "/privacy/": "Privacy",
  "/terms/": "Terms",
};

export function Breadcrumbs({ path }: { path: string }) {
  const label = labels[path];
  if (!label) return null;
  const site = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${site}${path}` },
    ],
  };
  return (
    <div className="shell breadcrumb-wrap"><nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{label}</li>
      </ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></div>
  );
}
