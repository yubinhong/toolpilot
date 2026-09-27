export function findDuplicateMetadata(entries) {
  const duplicates = [];
  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const entry of entries) {
      if (!entry[field]) continue;
      const firstPath = seen.get(entry[field]);
      if (firstPath) duplicates.push({ field, firstPath, path: entry.path });
      else seen.set(entry[field], entry.path);
    }
  }
  return duplicates;
}
