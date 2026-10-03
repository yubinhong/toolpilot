import Image from "next/image";
import Link from "next/link";

const primaryLinks = [
  ["Pricing", "/pricing/"],
  ["Calculator", "/calculator/"],
  ["Compare", "/compare/"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="ToolPilot home">
          <Image className="brand-mark" src="/favicon.svg" alt="" width={30} height={30} />
          <span>ToolPilot</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          {primaryLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-action" href="/calculator/">
          Estimate API cost
        </Link>
      </div>
    </header>
  );
}
