import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";

const alternatives = [
  ["You need lower lock-in", "Prefer tools with portable data, documented APIs, and a clear exit path."],
  ["You need to ship this week", "Prefer a narrower managed surface when operating the infrastructure is not the current job."],
  ["You need more control", "Prefer explicit primitives and ownership when the team can carry the operational cost."],
  ["You need a second option", "Compare the same decision dimensions so the alternative is a real fit, not a cheaper logo."],
];

export default function AlternativesPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="Decision page"
        title="An alternative is useful when it changes the constraint."
        summary="ToolPilot alternatives are meant to explain why a different path fits, not to create another unreviewed ranking."
      />
      <section className="content-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Constraint first</p>
              <h2>Start with the reason to change direction.</h2>
            </div>
            <p>These are editorial prompts for future sourced pages, not product claims about any individual vendor.</p>
          </div>
          <ul className="category-list">
            {alternatives.map(([title, summary]) => (
              <li key={title}><strong>{title}</strong><span>{summary}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
