import { DecisionCard } from "../../components/decision-card";
import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";
import { decisionPages } from "../../lib/catalog.mjs";

export default function ComparePage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="Decision page"
        title="Compare the criteria before comparing the logos."
        summary="The first Compare route is a framework for making trade-offs explicit. A published comparison needs reviewed facts and a dated source trail."
      />
      <section className="content-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Comparison frame</p>
              <h2>Four questions keep a shortlist honest.</h2>
            </div>
          </div>
          <ul className="category-list">
            <li><strong>Fit</strong><span>Does the tool match the job, team, and current workflow?</span></li>
            <li><strong>Control</strong><span>Which decisions remain yours, and which become vendor dependencies?</span></li>
            <li><strong>Cost</strong><span>What is known, what changes with scale, and what is still pending verification?</span></li>
            <li><strong>Switching effort</strong><span>What would migration, rollback, or a future second provider require?</span></li>
          </ul>
        </div>
      </section>
      <section className="content-section">
        <div className="shell">
          <div className="decision-grid">
            {decisionPages.map((page) => (
              <DecisionCard key={page.href} {...page} />
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
