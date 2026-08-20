import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";

export default function TermsPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Terms" title="The public catalog is an editorial work in progress." summary="This placeholder records that draft pages are informational and should not be treated as a guarantee, endorsement, or current pricing statement." />
      <section className="content-section"><div className="shell"><h2>Before public launch</h2><p>Final terms, disclaimers, commercial disclosures, contact details, and vendor submission rules require confirmation by the project owner and applicable legal reviewer.</p></div></section>
    </PageFrame>
  );
}
