import Link from "next/link";
import { CatalogNotice } from "../components/catalog-notice";
import { DecisionCard } from "../components/decision-card";
import { HomeExplorer } from "../components/home-explorer";
import { PageFrame } from "../components/page-frame";
import { decisionPages } from "../lib/catalog.mjs";

export default function HomePage() {
  return (
    <PageFrame>
      <section className="home-hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A calmer way to choose your stack</p>
          <h1>Make the next tool decision with the trade-offs in view.</h1>
          <p className="hero-summary">
            ToolPilot is being built for developers, indie hackers, and AI builders who need a
            useful shortlist instead of another wall of tool names.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="#explorer-title">
              Explore the draft catalog <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="secondary-link" href="/guides/">
              Read the decision guides
            </Link>
          </div>
        </div>
        <div className="hero-signal" aria-label="ToolPilot editorial signal">
          <div className="signal-header">
            <span>Decision signal</span>
            <span className="signal-live">In progress</span>
          </div>
          <div className="signal-rule" />
          <div className="signal-row">
            <span>Task</span>
            <strong>Ship a small product</strong>
          </div>
          <div className="signal-row">
            <span>First question</span>
            <strong>What constraint matters most?</strong>
          </div>
          <div className="signal-bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>Compare fit, control, cost, and switching effort before a logo becomes a decision.</p>
        </div>
      </section>

      <section className="shell notice-section">
        <CatalogNotice />
      </section>

      <HomeExplorer />

      <section className="decision-section shell" aria-labelledby="decision-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Decision pages</p>
            <h2 id="decision-title">The useful pages are about a choice.</h2>
          </div>
          <p>Each route starts with a task and exposes the criteria behind the recommendation.</p>
        </div>
        <div className="decision-grid">
          {decisionPages.map((page) => (
            <DecisionCard key={page.href} {...page} />
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
