/**
 * Structured data builders — the single entry point for SEO JSON-LD.
 * Phase 1 covers Article + embedded FAQ; extend here, never in pages.
 */
import type { Article } from "./content";
import { SITE } from "./site";

interface QuestionEntity {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
}

export interface ArticleJsonLd {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  dateModified: string;
  inLanguage: "en";
  publisher: {
    "@type": "Organization";
    name: string;
    logo: { "@type": "ImageObject"; url: string };
  };
  mainEntityOfPage: string;
  mainEntity?: QuestionEntity[];
}

export function buildArticleJsonLd(article: Article): ArticleJsonLd {
  const fm = article.frontmatter;
  const url = `${SITE.url}/${article.section}/${article.slug}`;
  const base: ArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.summary,
    dateModified: fm.updated,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon.svg`,
      },
    },
    mainEntityOfPage: url,
  };

  if (fm.faq && fm.faq.length > 0) {
    base.mainEntity = fm.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }));
  }

  return base;
}

/**
 * FAQPage schema for the standalone /faq page. Article pages keep their
 * Article + embedded FAQ via buildArticleJsonLd — the two never mix.
 */
export function buildFaqPageJsonLd(
  faq: { q: string; a: string }[],
  url: string,
  headline?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(headline ? { headline } : {}),
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    url,
  };
}

/**
 * BreadcrumbList — used on pages with visible breadcrumbs (sections,
 * articles, about). Items are ordered; the last one usually has no href.
 */
export function buildBreadcrumbJsonLd(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
}
