import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import FAQList from "@/components/FAQList";
import Contours from "@/components/Contours";
import { SECTIONS, SITE } from "@/lib/site";
import { featuredArticles, listArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = featuredArticles().slice(0, 3);
  const startArticles = listArticles("start-here");
  const faqArticle = listArticles("faq")[0];
  const faqTeaser = faqArticle?.frontmatter.faq?.slice(0, 3) ?? [];

  return (
    <>
      <Hero />

      {/* User onboarding */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="WP-01 · First time?"
              title="Start the walk right"
              desc="Big Walk is built around talking while you walk. Before you call your crew, take ten minutes with these two pages."
            />
          </Reveal>
          <div className="grid grid--2">
            {startArticles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge navigation */}
      <section className="section section--paper-2">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Know the territory"
              title="Five stops on the trail"
              desc="Guides to follow, a database to browse, tools to keep at hand, and quick answers when you're stuck."
            />
          </Reveal>
          <div className="category-grid">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.key} delay={i * 60}>
                <CategoryCard section={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured content */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Latest on the trail"
              title="Fresh from the field"
              desc="The pages players reach for most, updated as the community confirms new findings."
            />
          </Reveal>
          <div className="grid grid--3">
            {featured.map((a, i) => (
              <Reveal key={`${a.section}/${a.slug}`} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      {faqTeaser.length > 0 && (
        <section className="section section--paper-2">
          <div className="shell">
            <div className="grid grid--2" style={{ alignItems: "start" }}>
              <Reveal>
                <SectionHeading
                  eyebrow="WP-05 · Quick answers"
                  title="Asked, answered"
                  desc="No forums to dig through — just the questions players ask most, answered straight."
                />
                <Link href="/faq" className="btn btn--light" style={{ marginTop: "var(--sp-4)" }}>
                  All questions
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
              <Reveal delay={100}>
                <FAQList items={faqTeaser} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="cta-band">
        <Contours variant="band" className="cta-band__contours" />
        <div className="cta-band__glow" aria-hidden="true" />
        <div className="shell cta-band__inner">
          <div>
            <h2 className="cta-band__title">Ready to take the walk?</h2>
            <p className="cta-band__desc">
              Round up two friends — or eleven — and let the island do the rest.
              The guide will still be here when you get lost.
            </p>
          </div>
          <div className="cta-band__actions">
            <Link href="/start-here/beginner-guide" className="btn btn--primary">
              Read the beginner guide
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/database" className="btn btn--ghost">
              Browse the database
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
