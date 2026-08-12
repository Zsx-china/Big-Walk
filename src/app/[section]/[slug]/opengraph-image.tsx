import { OG_SIZE, renderOgImage } from "@/lib/og";
import { getArticle } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Big Walk Wiki article";

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const article = getArticle(section, slug);
  if (!article) {
    return renderOgImage({
      eyebrow: "Big Walk Wiki",
      title: "Big Walk Wiki",
    });
  }
  return renderOgImage({
    eyebrow: article.frontmatter.category ?? section,
    title: article.frontmatter.title,
    sub: article.frontmatter.summary,
  });
}
