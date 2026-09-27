import Link from "next/link";
import { PageFrame } from "../components/page-frame";
import { PageIntro } from "../components/page-intro";

export default function NotFound() {
  return (
    <PageFrame breadcrumbPath={null}>
      <PageIntro
        eyebrow="404 / Not found"
        title="That decision page is not in the catalog."
        summary="The route may be a draft that has not been added yet, or the link may be stale."
      >
        <Link className="primary-button not-found-action" href="/tools/">
          Return to draft tools <span aria-hidden="true">-&gt;</span>
        </Link>
      </PageIntro>
    </PageFrame>
  );
}
