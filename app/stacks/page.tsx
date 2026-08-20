import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";

const stackAreas = [
  ["Application layer", "The framework and deployment loop should make the main product path obvious."],
  ["Data layer", "Decide what must be portable, queryable, branchable, or private before choosing a default."],
  ["Trust layer", "Identity, permissions, secrets, and auditability deserve their own boundary."],
  ["Operations layer", "Email, payments, background work, and monitoring define the product after the demo."],
];

export default function StacksPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="Decision page"
        title="A stack is a set of boundaries, not a list of logos."
        summary="The first Stacks route gives future content a reviewable shape for combining categories without hiding operational trade-offs."
      />
      <section className="content-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Stack map</p>
              <h2>Review the system one responsibility at a time.</h2>
            </div>
          </div>
          <ul className="stack-list">
            {stackAreas.map(([title, summary], index) => (
              <li key={title}><strong>0{index + 1} / {title}</strong><span>{summary}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
