type CatalogNoticeProps = {
  title?: string;
  message?: string;
};

export function CatalogNotice({
  title = "Research and review status",
  message = "Each entry shows its review state. Research drafts are not published evaluations; source access does not replace factual and editorial review.",
}: CatalogNoticeProps) {
  return (
    <div className="catalog-notice" role="status">
      <span className="notice-dot" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
