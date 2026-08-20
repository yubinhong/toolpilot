import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";

export default function AboutPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="About ToolPilot"
        title="A project for making developer tool choices more legible."
        summary="ToolPilot is an early-stage product focused on task-based discovery, comparison, alternatives, and stack decisions."
      />
      <section className="content-section">
        <div className="shell">
          <h2>Editorial rules in plain language.</h2>
          <ul>
            <li>Tool facts, prices, limits, integrations, and links need a source and review date.</li>
            <li>Affiliate, Featured, and Sponsor relationships are separate from independent evaluation and must be visible.</li>
            <li>Paid exposure can buy a labeled placement, never an objective conclusion or natural ranking.</li>
            <li>Unverified content stays marked as draft or is not published.</li>
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
