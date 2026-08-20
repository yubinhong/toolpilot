import Link from "next/link";
import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";
import { guides } from "../../lib/catalog.mjs";

export default function GuidesPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="Guides"
        title="Useful guidance starts before the shortlist."
        summary="Short, practical notes for developers making tool and stack decisions. Each guide is a draft until its sources and review date are recorded."
      />
      <section className="content-section">
        <div className="shell">
          <ul className="guide-list">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}/`}>
                  <p className="card-kicker">{guide.tag}</p>
                  <strong>{guide.title}</strong>
                  <span>{guide.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}
