import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";

export default function PrivacyPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Privacy" title="Privacy details are being prepared before analytics or submissions go live." summary="This placeholder page records the current boundary: the first slice has no accounts, vendor submissions, database, or analytics integration." />
      <section className="content-section"><div className="shell"><h2>Current data boundary</h2><p>The static MVP does not ask for personal information and does not send tool catalog interactions to an external service. A complete policy, retention schedule, consent mechanism, and contact will be added before any such processing is enabled.</p></div></section>
    </PageFrame>
  );
}
