import Card from "./Card";
import type { Article } from "@/lib/content";
import { sectionByKey } from "@/lib/site";
import { t } from "@/lib/i18n";

export default function ArticleCard({
  article,
  titleLevel,
}: {
  article: Article;
  titleLevel?: 2 | 3;
}) {
  const section = sectionByKey(article.section);
  return (
    <Card
      href={`/${article.section}/${article.slug}`}
      className="article-card"
      waypoint={section ? `${section.waypoint} · ${section.short}` : undefined}
      title={article.frontmatter.title}
      desc={article.frontmatter.summary}
      blazeColor={section?.color}
      titleLevel={titleLevel}
      meta={
        <>
        <span className="chip">
          <span className="blaze" aria-hidden="true" />
          {article.frontmatter.category ?? section?.label}
        </span>
        {article.frontmatter.confidence && (
          <span className="chip">{t.confidence[article.frontmatter.confidence]}</span>
        )}
        </>
      }
    />
  );
}
