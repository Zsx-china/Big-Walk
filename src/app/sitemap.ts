import type { MetadataRoute } from "next";
import { ABOUT, SITE, SECTIONS } from "@/lib/site";
import { listArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const section of SECTIONS) {
    entries.push({
      url: `${SITE.url}/${section.key}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  entries.push({
    url: `${SITE.url}/${ABOUT.key}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  });

  for (const slug of ["privacy", "terms"]) {
    entries.push({
      url: `${SITE.url}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  for (const article of listArticles()) {
    // The FAQ lives at /faq only — skip the duplicate article route.
    if (article.section === "faq" && article.slug === "faq") continue;
    entries.push({
      url: `${SITE.url}/${article.section}/${article.slug}`,
      lastModified: new Date(article.frontmatter.updated),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
