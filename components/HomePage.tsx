import type { PageDocument } from '../lib/content';
import { BottomCta } from './BottomCta';
import { Footer } from './Footer';
import { GuideCards } from './GuideCards';
import { Header } from './Header';
import { Hero } from './Hero';
import { StatusCards } from './StatusCards';

export function HomePage({ page }: { page: PageDocument }) {
  const { locale, frontmatter } = page;

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero eyebrow={frontmatter.eyebrow} title={frontmatter.title} description={frontmatter.description} heroCard={frontmatter.heroCard} />
        <StatusCards cards={frontmatter.heroCard.statusCards} />
        <GuideCards locale={locale} guides={frontmatter.relatedLinks} />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"><BottomCta locale={locale} /></div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
