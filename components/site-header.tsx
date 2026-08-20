import Link from "next/link";

const primaryLinks = [
  ["Tools", "/tools/"],
  ["Compare", "/compare/"],
  ["Alternatives", "/alternatives/"],
  ["Stacks", "/stacks/"],
  ["Guides", "/guides/"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="ToolPilot home">
          <span className="brand-mark">TP</span>
          <span>ToolPilot</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          {primaryLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-action" href="/about/">
          About the project
        </Link>
      </div>
    </header>
  );
}
