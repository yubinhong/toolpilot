import Link from "next/link";
import { PageFrame } from "../components/page-frame";

export const metadata = { title: "Page not found | ToolPilot", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <PageFrame path="/">
      <section className="shell not-found">
        <p className="eyebrow">404 · Not found</p>
        <h1>This page is not available.</h1>
        <p className="lede">The address may be outdated or no longer part of ToolPilot.</p>
        <div className="not-found-actions"><Link className="primary-button" href="/pricing/">Browse AI API pricing</Link><Link className="text-link" href="/">Go to ToolPilot home</Link></div>
      </section>
    </PageFrame>
  );
}
