import Link from "next/link";

export function DecisionCard({
  href,
  label,
  eyebrow,
  title,
  summary,
}: {
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <article className="decision-card">
      <div className="decision-card-number" aria-hidden="true">
        {label.slice(0, 1)}
      </div>
      <p className="card-kicker">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{summary}</p>
      <Link className="text-link" href={href}>
        Open {label} <span aria-hidden="true">-&gt;</span>
      </Link>
    </article>
  );
}
