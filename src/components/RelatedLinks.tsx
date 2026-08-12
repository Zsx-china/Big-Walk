import Link from "next/link";
import type { Article } from "@/lib/content";
import { t } from "@/lib/i18n";

/** Pure presentational — related articles are resolved by the page layer. */
export default function RelatedLinks({ items }: { items: Article[] }) {
  if (items.length === 0) return null;

  return (
    <div className="related">
      <p className="related__title">{t.common.nextOnTrail}</p>
      <div className="related__grid">
        {items.map((a) => (
          <Link key={`${a.section}/${a.slug}`} href={`/${a.section}/${a.slug}`} className="related__item">
            <span className="card__waypoint">{a.frontmatter.category ?? a.section}</span>
            <span className="related__item-title">{a.frontmatter.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
