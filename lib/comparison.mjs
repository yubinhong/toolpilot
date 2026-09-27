export function getComparisonDimensions(tools) {
  const dimensions = new Map();
  for (const tool of tools) {
    for (const fact of tool.facts) {
      if (!dimensions.has(fact.key)) dimensions.set(fact.key, fact.label);
    }
  }
  return [...dimensions].map(([key, label]) => ({ key, label }));
}
