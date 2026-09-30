import { PageFrame } from "../../components/page-frame";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata("/privacy/");

export default function PrivacyPage() {
  return <PageFrame path="/privacy/"><article className="page-content shell policy-page">
    <div className="page-heading"><p className="eyebrow">Privacy</p><h1>Privacy Policy</h1><p className="lede">How ToolPilot handles information while you use this static site.</p><p className="last-updated">Last updated: September 30, 2026</p></div>
    <section className="detail-section"><h2>Calculator inputs</h2><p>Token counts, model selections, and request volumes are processed in your browser to calculate estimates. ToolPilot does not submit these calculator values to an application server.</p></section>
    <section className="detail-section"><h2>Hosting and security logs</h2><p>ToolPilot is hosted on Cloudflare Pages. The hosting provider may process request metadata and security logs to deliver and protect the site under its own policies and service terms.</p></section>
    <section className="detail-section"><h2>Analytics and cookies</h2><p>Google Analytics 4 loads only when a measurement ID is configured for a site build. When enabled, ToolPilot sends page views and limited product events with model/provider identifiers, filter types, and official-source categories. It does not send token counts, request volumes, cached-input percentages, raw search text, or URL query strings. Google may process analytics data under its own policies and the settings on the configured Analytics property. Without a measurement ID, the application sends no Google Analytics events.</p><p>Cloudflare Pages may process request data and can inject its own analytics beacon if that Dashboard feature is enabled. The production Dashboard setting has not been checked in this task; the application Content Security Policy blocks that beacon.</p></section>
    <section className="detail-section"><h2>External provider links</h2><p>Links to model providers and documentation leave ToolPilot. Those sites apply their own privacy policies and terms.</p></section>
  </article></PageFrame>;
}
