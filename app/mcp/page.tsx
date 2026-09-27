import { pageMetadata } from '../../lib/metadata';
import { SourceEvidenceHub } from '../../components/source-evidence-hub';

export const metadata = pageMetadata('/mcp/');

export default function McpPage() {
  return <SourceEvidenceHub kind="mcp" />;
}
