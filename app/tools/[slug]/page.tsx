import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "../../../components/page-frame";
import { PageIntro } from "../../../components/page-intro";
import { tools } from "../../../lib/catalog.mjs";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const tool = tools.find((candidate) => candidate.slug === slug);
    return { title: tool ? tool.name : "Draft tool" };
  });
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((candidate) => candidate.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <PageFrame>
      <PageIntro
        eyebrow={`${tool.category} / draft entry`}
        title={tool.name}
        summary={tool.summary}
      />
      <section className="content-section">
        <div className="shell">
          <div className="catalog-notice">
            <span className="notice-dot" aria-hidden="true" />
            <div>
              <strong>Not a published evaluation</strong>
              <span>This page is a content-model placeholder. Pricing, feature claims, links, and commercial relationships still need source review.</span>
            </div>
          </div>
          <div className="detail-grid">
            <div>
              <p className="eyebrow">Working brief</p>
              <h2>Where this candidate may fit</h2>
              <p>{tool.bestFor}</p>
            </div>
            <div>
              <p className="eyebrow">Review status</p>
              <table className="source-table">
                <tbody>
                  <tr><th scope="row">Category</th><td>{tool.category}</td></tr>
                  <tr><th scope="row">Decision signal</th><td>{tool.signal}</td></tr>
                  <tr><th scope="row">Official site</th><td><a href={tool.productUrl} target="_blank" rel="noopener noreferrer">{tool.productUrl}</a></td></tr>
                  <tr><th scope="row">Research source</th><td>{tool.sourceUrl ? <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer">{tool.sourceUrl}</a> : "TBD - source link not supplied"}</td></tr>
                  <tr><th scope="row">Research snapshot</th><td>{tool.source}</td></tr>
                  <tr><th scope="row">Commercial status</th><td>{tool.affiliateLabel}</td></tr>
                  <tr><th scope="row">Commission note</th><td>{tool.commission}</td></tr>
                  <tr><th scope="row">Product link check</th><td>{tool.productLinkCheck.status === "http-ok" ? `HTTP checked ${tool.productLinkCheck.checkedAt}` : `Reachable but restricted ${tool.productLinkCheck.checkedAt}`}</td></tr>
                  <tr><th scope="row">Source status</th><td>{tool.sourceStatus === "provided" ? `Provided; ${tool.sourceLinkCheck.status === "http-ok" ? "HTTP checked" : "reachable but restricted"}` : "Missing from research snapshot"}</td></tr>
                  <tr><th scope="row">Editorial review</th><td>{tool.reviewStatus === "pending-editorial" ? "Pending; owner TBD" : tool.reviewStatus}</td></tr>
                  <tr><th scope="row">Verified at</th><td>{tool.verifiedAt || "TBD - editorial review required"}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link className="text-link" href="/tools/">&lt;- Back to all draft tools</Link>
        </div>
      </section>
    </PageFrame>
  );
}
