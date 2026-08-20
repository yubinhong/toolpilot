import Link from "next/link";

type Tool = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  bestFor: string;
  signal: string;
  status: string;
  source: string;
  productUrl: string;
  sourceUrl: string | null;
  affiliateLabel: string;
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="tool-card">
      <div className="tool-card-topline">
        <span className="signal-mark" aria-hidden="true">
          {tool.signal.slice(0, 1)}
        </span>
        <div className="tool-card-labels">
          <span className="draft-label">{tool.status}</span>
          <span className="affiliate-label">{tool.affiliateLabel}</span>
        </div>
      </div>
      <div className="tool-card-heading">
        <div>
          <p className="card-kicker">{tool.category}</p>
        <h3>{tool.name}</h3>
        </div>
        <span className="tool-index">{tool.signal}</span>
      </div>
      <p className="tool-summary">{tool.summary}</p>
      <div className="tool-card-meta">
        <span>Best for</span>
        <strong>{tool.bestFor}</strong>
      </div>
      <div className="tool-card-footer">
        <span className="tool-source">
          {tool.sourceUrl ? (
            <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer">
              Research source
            </a>
          ) : (
            "Source link TBD"
          )}
        </span>
        <span className="tool-card-actions">
          <a href={tool.productUrl} target="_blank" rel="noopener noreferrer">
            Official site <span aria-hidden="true">-&gt;</span>
          </a>
          <Link href={`/tools/${tool.slug}/`} aria-label={`Open ${tool.name} draft page`}>
            Draft <span aria-hidden="true">-&gt;</span>
          </Link>
        </span>
      </div>
    </article>
  );
}
