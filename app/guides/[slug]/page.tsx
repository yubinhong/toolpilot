import { notFound } from "next/navigation";
import { PageFrame } from "../../../components/page-frame";
import { PageIntro } from "../../../components/page-intro";
import { guides } from "../../../lib/catalog.mjs";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((candidate) => candidate.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <PageFrame>
      <PageIntro eyebrow={`${guide.tag} / draft guide`} title={guide.title} summary={guide.summary} />
      <section className="content-section">
        <div className="shell">
          <div className="catalog-notice">
            <span className="notice-dot" aria-hidden="true" />
            <div><strong>Editorial draft</strong><span>This guide establishes the reading path. Sources, examples, and review date are still pending.</span></div>
          </div>
          <div className="guide-body">
            <p className="eyebrow">The working outline</p>
            <h2>Define the decision before you evaluate the tool.</h2>
            <p>Start with the job to be done, the constraints that cannot move, and the evidence needed to trust a claim. Then compare only the candidates that can plausibly satisfy the brief.</p>
            <ol>
              <li>Name the job and the smallest acceptable outcome.</li>
              <li>Separate hard constraints from preferences and future options.</li>
              <li>Record source, date, uncertainty, and commercial relationship for each claim.</li>
              <li>Trial the smallest path and document what would make you switch.</li>
            </ol>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
