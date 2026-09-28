import { findContent } from './content.mjs';

/** @typedef {{ tool: import('./content-types').Content, fact: import('./content-types').Fact, sources: import('./content-types').Source[] }} ResolvedEvidenceHubEntry */

const evidenceHubDefinitions = {
  mcp: [
    {
      title: 'Profiles with an explicit MCP fact',
      summary: 'These tool profiles cite official documentation that describes MCP behavior. Other products are not classified as unsupported by their absence here.',
      entries: [
        { slug: 'cursor', factKey: 'mcp' },
        { slug: 'claude-code', factKey: 'mcp' },
        { slug: 'github-copilot', factKey: 'mcp' },
        { slug: 'cline', factKey: 'mcp' },
        { slug: 'continue', factKey: 'mcp' },
      ],
    },
  ],
  'self-hosted': [
    {
      title: 'Connect hosted workflows to a local network',
      summary: 'A customer-installed network agent can let scenarios access local APIs through the vendor Organization dashboard; this does not establish where scenario execution or workflow data is hosted.',
      entries: [{ slug: 'make', factKey: 'selfHosting' }],
    },
    {
      title: 'Host the workflow application',
      summary: 'This is the application deployment boundary: the workflow engine itself runs on infrastructure operated by its user.',
      entries: [{ slug: 'n8n', factKey: 'deployment' }],
    },
    {
      title: 'Connect a coding assistant to a self-hosted model',
      summary: 'A client that connects to a self-hosted model endpoint is not the same thing as a self-hosted client application.',
      entries: [{ slug: 'continue', factKey: 'selfHosting' }],
    },
    {
      title: 'Deploy an enterprise coding assistant in your environment',
      summary: 'Cline currently describes VPC, on-premises and air-gapped Enterprise deployments. Confirm entitlement, architecture and model-provider route; public documentation does not verify a particular account or installation.',
      entries: [{ slug: 'cline', factKey: 'selfHosting' }],
    },
    {
      title: 'Run coding-agent sessions on self-hosted infrastructure',
      summary: 'Customer-run workers move tool execution, not necessarily agent orchestration or model inference; check each provider route, data flow and plan limit.',
      entries: [
        { slug: 'claude-code', factKey: 'selfHosting' },
        { slug: 'cursor', factKey: 'selfHosting' },
      ],
    },
    {
      title: 'Review enterprise deployment signals with limited public detail',
      summary: 'A vendor extension listing can indicate a customer path without documenting deployment topology, data placement, model inference or current-plan eligibility.',
      entries: [{ slug: 'windsurf', factKey: 'selfHosting' }],
    },
    {
      title: 'Run model inference locally',
      summary: 'Local inference describes where a model runs; provider terms, hardware needs, data flow and quality still require separate checks.',
      entries: [
        { slug: 'aider', factKey: 'localModels' },
        { slug: 'continue', factKey: 'localModels' },
      ],
    },
  ],
};

/** @param {'mcp' | 'self-hosted'} kind @returns {Array<{ title: string, summary: string, entries: ResolvedEvidenceHubEntry[] }>} */
export function getEvidenceHubGroups(kind) {
  const definitions = evidenceHubDefinitions[kind];
  if (!definitions) throw new Error(`Unknown evidence hub: ${kind}`);

  return definitions.map(group => ({
    ...group,
    entries: group.entries.map(({ slug, factKey }) => {
      const tool = findContent('tools', slug);
      const fact = tool?.facts.find(candidate => candidate.key === factKey);
      if (!tool || !fact?.value || !fact.sourceIds.length) {
        throw new Error(`Evidence hub ${kind} is missing ${slug}.${factKey}`);
      }

      const sources = fact.sourceIds.map(sourceId => tool.sources.find(source => source.id === sourceId));
      if (sources.some(source => !source)) {
        throw new Error(`Evidence hub ${kind} has an unresolved source for ${slug}.${factKey}`);
      }

      return { tool, fact, sources };
    }),
  }));
}
