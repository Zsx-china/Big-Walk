import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ArticleView from "@/components/ArticleView";
import { getArticle, listArticles } from "@/lib/content";
import { SITE, sectionByKey } from "@/lib/site";
import { t } from "@/lib/i18n";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  // /faq renders the FAQ content at the section index — no duplicate article route.
  return listArticles()
    .filter((a) => !(a.section === "faq" && a.slug === "faq"))
    .map((a) => ({ section: a.section, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const article = getArticle(section, slug);
  if (!article) return {};
  const fm = article.frontmatter;
  return {
    title: fm.title,
    description: fm.summary,
    alternates: { canonical: `/${section}/${slug}` },
    keywords: fm.tags,
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.summary,
      url: `${SITE.url}/${section}/${slug}`,
      publishedTime: fm.updated,
      tags: fm.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const article = getArticle(section, slug);
  if (!article) return notFound();

  const sectionMeta = sectionByKey(section);
  const fm = article.frontmatter;
  const metaChips = [
    `${t.common.updated} ${fm.updated}`,
    fm.readTime ? `${fm.readTime} ${t.common.minRead}` : null,
    fm.confidence ? t.confidence[fm.confidence] : null,
  ].filter(Boolean) as string[];

  const jsonLd = buildArticleJsonLd(article);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: SITE.url },
    { name: sectionMeta?.label ?? section, href: `${SITE.url}/${section}` },
    { name: fm.title },
  ]);

  return (
    <>
      <PageHero
        label={fm.category ?? sectionMeta?.label}
        color={sectionMeta?.color ?? "var(--primary)"}
        title={fm.title}
        desc={fm.summary}
        meta={metaChips}
        breadcrumbs={[
          { label: sectionMeta?.label ?? section, href: `/${section}` },
          { label: fm.title },
        ]}
      />
      <ArticleView article={article} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
