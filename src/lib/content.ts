import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoryKey, SectionMeta } from "./site";
import { sectionByKey } from "./site";

export const CONTENT_DIR = path.join(process.cwd(), "content");

/** English is the only shipped locale in Phase 1; structure is ready for more. */
export const DEFAULT_LOCALE = "en";

export function contentRootFor(locale: string = DEFAULT_LOCALE): string {
  return path.join(CONTENT_DIR, locale);
}

export interface ArticleFrontmatter {
  title: string;
  summary: string;
  section: CategoryKey;
  category?: string;
  updated: string;
  readTime?: number;
  order?: number;
  featured?: boolean;
  tags?: string[];
  /** Fields for the information card (article template requirement). */
  info?: Record<string, string>;
  faq?: { q: string; a: string }[];
  related?: string[];
  confidence?: "verified" | "community" | "needs-testing";
}

export interface Article {
  slug: string;
  section: CategoryKey;
  frontmatter: ArticleFrontmatter;
  source: string;
  /** Raw markdown body (used to derive the table of contents). */
  body: string;
}

function readArticle(
  section: CategoryKey,
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Article | null {
  const file = path.join(contentRootFor(locale), section, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  // Drafts are excluded from routes and sitemap (no preview system in Phase 1).
  if (data.draft) return null;
  return {
    slug,
    section,
    frontmatter: data as ArticleFrontmatter,
    source: raw,
    body: content,
  };
}

export function getArticle(
  section: string,
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Article | null {
  if (!sectionByKey(section)) return null;
  return readArticle(section as CategoryKey, slug, locale);
}

export function listArticles(
  section?: CategoryKey,
  locale: string = DEFAULT_LOCALE,
): Article[] {
  const root = contentRootFor(locale);
  const dirs = section
    ? [section]
    : (fs
        .readdirSync(root, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name) as CategoryKey[]);

  const articles: Article[] = [];
  for (const dir of dirs) {
    const dirPath = path.join(root, dir);
    if (!fs.existsSync(dirPath)) continue;
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const article = readArticle(dir as CategoryKey, slug, locale);
      if (article) articles.push(article);
    }
  }

  return articles.sort((a, b) => {
    const ao = a.frontmatter.order ?? 999;
    const bo = b.frontmatter.order ?? 999;
    if (ao !== bo) return ao - bo;
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

export function getSectionMeta(key: string): SectionMeta | undefined {
  return sectionByKey(key);
}

export function featuredArticles(): Article[] {
  return listArticles().filter((a) => a.frontmatter.featured);
}

const DB_GROUP_ORDER = ["Classes", "Items", "Mechanics", "Locations", "Systems"];

/**
 * Group database articles by their frontmatter `category`, keeping the
 * canonical sub-index order (Classes / Items / Mechanics / Locations /
 * Systems), with unknown categories sorted alphabetically at the end.
 */
export function groupArticlesByCategory(
  articles: Article[],
): { category: string; articles: Article[] }[] {
  const map = new Map<string, Article[]>();
  for (const a of articles) {
    const cat = a.frontmatter.category ?? "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(a);
  }
  return [...map.entries()]
    .sort((a, b) => {
      const ia = DB_GROUP_ORDER.indexOf(a[0]);
      const ib = DB_GROUP_ORDER.indexOf(b[0]);
      if (ia === -1 && ib === -1) return a[0].localeCompare(b[0]);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    })
    .map(([category, articles]) => ({ category, articles }));
}

/**
 * Resolve `frontmatter.related` references (`section/slug`) into Article
 * objects, dropping broken links and capping the list.
 */
export function resolveRelated(article: Article, limit = 3): Article[] {
  const all = listArticles();
  return (article.frontmatter.related ?? [])
    .map((ref) => all.find((a) => `${a.section}/${a.slug}` === ref))
    .filter((a): a is Article => Boolean(a))
    .slice(0, limit);
}
