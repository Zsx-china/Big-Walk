import Breadcrumbs from "./Breadcrumbs";
import Contours from "./Contours";

export default function PageHero({
  label,
  color,
  title,
  desc,
  meta,
  breadcrumbs,
}: {
  label?: string;
  color: string;
  title: string;
  desc?: string;
  meta?: string[];
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <div
      className="page-hero"
      style={{ ["--page-glow" as string]: color }}
    >
      <Contours variant="hero" className="page-hero__contours" />
      <div className="shell page-hero__inner">
        {breadcrumbs && <div className="page-hero__breadcrumbs"><Breadcrumbs items={breadcrumbs} /></div>}
        {label && (
          <span className="page-hero__label">
            <span className="blaze" style={{ ["--blaze-color" as string]: color }} aria-hidden="true" />
            {label}
          </span>
        )}
        <h1 className="page-hero__title">{title}</h1>
        {desc && <p className="page-hero__desc">{desc}</p>}
        {meta && meta.length > 0 && (
          <div className="page-hero__meta">
            {meta.map((m) => (
              <span className="chip chip--dark" key={m}>
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
