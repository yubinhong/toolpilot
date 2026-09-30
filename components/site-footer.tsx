import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link className="footer-brand" href="/">ToolPilot</Link>
          <p>AI model pricing and cost estimates with dated official sources.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about/">About</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
