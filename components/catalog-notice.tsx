export function CatalogNotice() {
  return (
    <div className="catalog-notice" role="status">
      <span className="notice-dot" aria-hidden="true" />
      <div>
        <strong>50-product research catalog</strong>
        <span>
          These entries are research-derived drafts. Link checks are recorded for review; pricing,
          claims, source freshness, and commission terms are not yet editorially verified.
        </span>
      </div>
    </div>
  );
}
