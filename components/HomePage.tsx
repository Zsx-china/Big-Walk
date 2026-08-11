import type { PageDocument } from '../lib/content';
import { OFFICIAL_LINKS, localizeHref } from '../lib/links';
import { renderMdxContent } from '../mdx-components';
import { BottomCta } from './BottomCta';
import { ContentTable } from './ContentTable';
import { Footer } from './Footer';
import { GuideCards } from './GuideCards';
import { Header } from './Header';
import { Hero } from './Hero';
import { StatusCards } from './StatusCards';

export function HomePage({ page }: { page: PageDocument }) {
  const { locale, frontmatter } = page;
  const isResearchHome = locale === 'en';

  if (!isResearchHome) {
    return (
      <>
        <Header locale={locale} />
        <main>
          <Hero locale={locale} eyebrow={frontmatter.eyebrow} title={frontmatter.title} description={frontmatter.description} heroCard={frontmatter.heroCard} />
          <StatusCards cards={frontmatter.heroCard.statusCards} />
          <GuideCards locale={locale} guides={frontmatter.relatedLinks} />
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"><BottomCta locale={locale} /></div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} eyebrow={frontmatter.eyebrow} title={frontmatter.title} description={frontmatter.description} heroCard={frontmatter.heroCard} showResearchActions />
        <StatusCards cards={frontmatter.heroCard.statusCards} showDetails={false} />

        <section className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="journey-heading">
          <h2 id="journey-heading" className="border-b-4 border-ink pb-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">Your Big Walk Journey</h2>
          <div className="grid gap-5 py-6 sm:grid-cols-2">
            {frontmatter.relatedLinks.map((guide, index) => (
              <a key={guide.slug} href={localizeHref(locale, `/${guide.slug}`)} className="group border-2 border-ink bg-white p-6 text-ink shadow-[5px_5px_0_0_var(--color-ember)] transition-transform hover:-translate-y-1">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-teal">0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-black tracking-tight group-hover:underline">{guide.label}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{guide.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-slate-100 py-14" aria-labelledby="what-is-big-walk">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:px-8">
            <div className="[&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-5 [&_p]:text-base [&_p]:leading-7 sm:[&_h2]:text-4xl">
              {renderMdxContent(page.content)}
              <a href={localizeHref(locale, '/walkthrough')} className="mt-7 inline-block border-2 border-ink bg-ink px-5 py-3 text-sm font-black uppercase tracking-wide text-white">Explore All Guides</a>
            </div>
            <ContentTable rows={frontmatter.steps.map((fact) => ({ label: fact.title, value: fact.description }))} />
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1200px] border-4 border-ink bg-ember-light px-6 py-10 shadow-[8px_8px_0_0_var(--color-ember)] sm:px-10" aria-labelledby="master-heading">
          <h2 id="master-heading" className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Ready to Master Big Walk?</h2>
          <p className="mt-4 max-w-3xl font-medium leading-7 text-body">From your first steps into the open world to solving every last puzzle, our community wiki has you covered. Join thousands of players finding codes, solutions, and tips updated daily.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={localizeHref(locale, '/beginner-tips')} className="border-2 border-ink bg-ink px-5 py-3 text-sm font-black uppercase tracking-wide text-white">Read the Beginner Guide</a>
            <a href={OFFICIAL_LINKS.steam} target="_blank" rel="noreferrer" className="border-2 border-ink bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-ink">Play on Steam</a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
