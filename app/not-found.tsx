import Link from "next/link";
import { PageFrame } from "../components/page-frame";

export default function NotFound() {
  return (
    <PageFrame>
      <section className="page-intro shell">
        <p className="eyebrow">404 / Not found</p>
        <h1>That decision page is not in the catalog.</h1>
        <p className="intro-copy">The route may be a draft that has not been added yet, or the link may be stale.</p>
        <Link className="primary-button not-found-action" href="/tools/">Return to draft tools <span aria-hidden="true">-&gt;</span></Link>
      </section>
    </PageFrame>
  );
}
