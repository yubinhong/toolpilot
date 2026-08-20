export function CatalogNotice() {
  return (
    <div className="catalog-notice" role="status">
      <span className="notice-dot" aria-hidden="true" />
      <div>
        <strong>50-product research catalog</strong>
        <span>
          These entries are research-derived drafts. Product links and commercial relationship
          notes are visible for review; pricing, claims, and commission terms are not yet verified.
        </span>
      </div>
    </div>
  );
}
