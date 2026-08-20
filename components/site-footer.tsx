import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">ToolPilot</p>
          <p className="footer-copy">
            A decision workspace for choosing developer tools with clearer trade-offs.
          </p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="footer-links">
            <Link href="/tools/">Tools</Link>
            <Link href="/compare/">Compare</Link>
            <Link href="/stacks/">Stacks</Link>
            <Link href="/guides/">Guides</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Trust</p>
          <div className="footer-links">
            <Link href="/about/">About</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>Independent research and editorial work in progress.</span>
        <span>All catalog entries are draft until sourced.</span>
      </div>
    </footer>
  );
}
