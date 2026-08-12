import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import GithubSlugger from "github-slugger";
import { mdxComponents } from "@/components/mdx-components";
import type { Article } from "./content";

/**
 * Compile an MDX article body to React with the site's component map.
 * GFM tables, heading anchors (for the TOC) and autolinks are applied.
 */
export async function renderMdx(body: string) {
  return compileMDX({
    source: body,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: ["heading-link"], ariaLabel: "Link to this section" },
            },
          ],
        ],
      },
    },
  });
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Derive the table of contents from markdown headings (## and ###),
 * skipping code blocks. Slugs must match rehype-slug output.
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  const slugger = new GithubSlugger();
  const headings: HeadingItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/[`*_]/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}

export function isArticleWithBody(article: Article): article is Article {
  return article.body.length > 0;
}
