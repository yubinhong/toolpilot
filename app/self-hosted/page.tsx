import { pageMetadata } from '../../lib/metadata';
import { SourceEvidenceHub } from '../../components/source-evidence-hub';

export const metadata = pageMetadata('/self-hosted/');

export default function SelfHostedPage() {
  return <SourceEvidenceHub kind="self-hosted" />;
}
