export const HOME_CATEGORY_SHORTCUTS = [
  {
    label: "AI Coding Tools",
    category: "AI Coding",
    summary: "Compare assistants for editing, reviewing and working inside an existing codebase.",
  },
  {
    label: "AI App Builders",
    category: "AI App Builders",
    summary: "Explore tools for moving from an app idea to a working prototype.",
  },
  {
    label: "Automation & Agents",
    category: "Automation",
    summary: "Browse workflow tools for connecting services and coordinating repeatable work.",
  },
];

export const HOME_COMPARISON_SLUGS = [
  "cursor-vs-claude-code",
  "bolt-vs-replit",
  "make-vs-n8n",
];

/** @param {string} category */
export function categoryAnchor(category) {
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `category-${slug}`;
}

/** @param {import('./content-types').Content[]} records */
export function getHomepageContent(records) {
  const comparisons = HOME_COMPARISON_SLUGS.flatMap(slug => {
    const record = records.find(item => item.kind === "compare" && item.slug === slug);
    return record && record.review.state !== "published" ? [record] : [];
  });
  const pricingUpdates = records
    .filter(record => record.kind === "pricing")
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.title.localeCompare(right.title));
  const recentlyVerified = records
    .filter(record => record.kind === "tools" && record.review.state === "published" && record.verifiedAt)
    .sort((left, right) => right.verifiedAt.localeCompare(left.verifiedAt) || left.title.localeCompare(right.title));

  return { comparisons, pricingUpdates, recentlyVerified };
}

/** @param {import('./content-types').Content} record */
export function reviewLabel(record) {
  if (record.review.state === "published") return "Published";
  if (record.review.state === "in-review") return "In review";
  return "Draft";
}
