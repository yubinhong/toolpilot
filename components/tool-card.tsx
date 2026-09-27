import Link from 'next/link';
import type { PublicTool } from '../lib/content-types';
export function ToolCard({ tool }: { tool: PublicTool }) {
  return <article className="tool-card">
    <p className="card-kicker">{tool.category} · {tool.status}</p>
    <h3><Link href={`/tools/${tool.slug}/`}>{tool.name}</Link></h3>
    <p className="tool-summary">{tool.summary}</p>
    <div className="tool-card-meta"><span>Consider for</span><strong>{tool.bestFor}</strong></div>
    <div className="tool-card-footer"><Link href={`/tools/${tool.slug}/`}>Read profile →</Link>
      <a href={tool.productUrl} target="_blank" rel="noopener noreferrer">Official site ↗</a>
    </div>
  </article>;
}
