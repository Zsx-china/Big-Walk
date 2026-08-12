import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ArticleView from "@/components/ArticleView";
import Card from "@/components/Card";
import { SECTIONS, SITE, sectionByKey, type CategoryKey } from "@/lib/site";
import { getArticle, groupArticlesByCategory, listArticles } from "@/lib/content";
import { TOOL_CARDS, TOOLS_UPDATED } from "@/lib/tools";
import { t } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildFaqPageJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = sectionByKey(section);
  if (!meta) return {};
  return {
    title: meta.label,
    description: meta.description,
    alternates: { canonical: `/${meta.key}` },
    openGraph: {
      title: `${meta.label} · ${SITE.name}`,
      description: meta.description,
      url: `${SITE.url}/${meta.key}`,
    },
  };
}

function RelatedSections({ current }: { current: string }) {
  const others = SECTIONS.filter((s) => s.key !== current);
  return (
    <div className="shell" style={{ paddingBottom: "var(--sp-8)" }}>
      <p className="mono" style={{ color: "var(--text-light-muted)", marginBottom: "var(--sp-4)" }}>
        {t.common.continueOnTrail}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
        {others.map((s) => (
          <Link key={s.key} href={`/${s.key}`} className="chip" style={{ padding: "0.5rem 0.9rem" }}>
            <span className="blaze" style={{ ["--blaze-color" as string]: s.color }} aria-hidden="true" />
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = sectionByKey(section);
  if (!meta) return notFound();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: SITE.url },
    { name: meta.label, href: `${SITE.url}/${meta.key}` },
  ]);

  // Tools — static card page (no interactive components in Phase 1)
  if (section === "tools") {
    return (
      <>
        <PageHero
          label={`${meta.waypoint} · ${meta.short}`}
          color={meta.color}
          title={meta.label}
          desc="Small utilities that live next to the wiki — plan your crew and keep the answers one tab away."
          meta={[
            `${TOOL_CARDS.length} ${t.common.tools}`,
            t.common.staticTools,
            `${t.common.updated} ${TOOLS_UPDATED}`,
          ]}
        />
        <div className="shell section">
          <div className="grid grid--3">
            {TOOL_CARDS.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 70}>
                <Card
                  href={tool.href}
                  waypoint={`TOOL-${String(i + 1).padStart(2, "0")}`}
                  title={tool.title}
                  desc={tool.desc}
                  titleLevel={2}
                  meta={<span className="card__cta">{tool.cta} →</span>}
                />
              </Reveal>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </>
    );
  }

  // FAQ — render the FAQ article directly (single source of truth)
  if (section === "faq") {
    const faqArticle = getArticle("faq", "faq");
    if (!faqArticle) return notFound();
    const faqItems = faqArticle.frontmatter.faq ?? [];
    return (
      <>
        <PageHero
          label={`${meta.waypoint} · ${meta.short}`}
          color={meta.color}
          title={meta.label}
          desc="Straight answers to the questions players ask most — no forums to dig through."
          meta={[
            `${faqItems.length} ${t.common.questions}`,
            `${t.common.updated} ${faqArticle.frontmatter.updated}`,
          ]}
        />
        <ArticleView article={faqArticle} />
        <RelatedSections current={section} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildFaqPageJsonLd(faqItems, `${SITE.url}/faq`, faqArticle.frontmatter.title),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </>
    );
  }

  const articles = listArticles(section as CategoryKey);
  if (articles.length === 0) return notFound();

  // Database — group by sub-category (Classes / Items / Mechanics / Locations / Systems)
  const grouped =
    section === "database" ? groupArticlesByCategory(articles) : null;

  return (
    <>
      <PageHero
        label={`${meta.waypoint} · ${meta.short}`}
        color={meta.color}
        title={meta.label}
        desc={meta.description}
        meta={[`${articles.length} ${t.common.pages}`, t.common.communityMaintained]}
        breadcrumbs={[{ label: meta.label }]}
      />

      <div className="shell section">
        {grouped ? (
          grouped.map((group, gi) => (
            <div key={group.category} style={{ marginBottom: gi < grouped.length - 1 ? "var(--sp-8)" : 0 }}>
              <SectionHeading
                eyebrow={`${meta.waypoint} · ${t.common.subIndex}`}
                title={group.category}
                desc={`${group.articles.length} ${group.articles.length === 1 ? t.common.entry : t.common.entries} in the ${group.category} reference.`}
              />
              <div className="grid grid--3">
                {group.articles.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 70}>
                    <ArticleCard article={a} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid--3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <ArticleCard article={a} titleLevel={2} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <RelatedSections current={section} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
