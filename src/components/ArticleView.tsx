import { extractHeadings, renderMdx } from "@/lib/mdx";
import { getSectionMeta, resolveRelated } from "@/lib/content";
import type { Article } from "@/lib/content";
import { t } from "@/lib/i18n";
import InfoCard from "./InfoCard";
import TableOfContents from "./TableOfContents";
import FAQList from "./FAQList";
import RelatedLinks from "./RelatedLinks";

export default async function ArticleView({ article }: { article: Article }) {
  const { content } = await renderMdx(article.body);
  const headings = extractHeadings(article.body);
  const section = getSectionMeta(article.section);
  const hasFAQ = (article.frontmatter.faq?.length ?? 0) > 0;
  const hasInfo = Object.keys(article.frontmatter.info ?? {}).length > 0;
  const related = resolveRelated(article);

  return (
    <div className="shell section">
      <div className="article-body">
        <article className="article-main">
          <div className="prose">{content}</div>

          {hasFAQ && (
            <div style={{ marginTop: "var(--sp-8)" }}>
              <h2 className="display" style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--sp-5)" }}>
                {t.common.questionsAnswers}
              </h2>
              <FAQList items={article.frontmatter.faq!} />
            </div>
          )}

          <RelatedLinks items={related} />
        </article>

        <aside className="article-rail">
          {hasInfo && (
            <div style={{ marginBottom: "var(--sp-5)" }}>
              <InfoCard info={article.frontmatter.info!} confidence={article.frontmatter.confidence} />
            </div>
          )}
          {headings.length > 0 && <TableOfContents items={headings} />}
        </aside>
      </div>
    </div>
  );
}
