import type { PageDocument } from '../lib/content';
import { localizeHref } from '../lib/links';
import { BottomCta } from './BottomCta';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentTable } from './ContentTable';
import { EvidenceQuote } from './EvidenceQuote';
import { Faq } from './Faq';
import { Footer } from './Footer';
import { Header } from './Header';
import { SidebarNav } from './SidebarNav';
import { StepGuide } from './StepGuide';

function sectionId(page: PageDocument, match: string, fallback: string) {
  return page.frontmatter.toc.find((item) => item.id.toLowerCase().includes(match))?.id ?? fallback;
}

export function GuidePage({ page }: { page: PageDocument }) {
  const { locale, frontmatter } = page;
  const introId = frontmatter.toc[0]?.id ?? 'guide';
  const stepsId = sectionId(page, 'step', 'steps');
  const faqId = sectionId(page, 'faq', 'faq');

  return <><Header locale={locale} /><main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8"><Breadcrumbs items={[{ label: 'Home', href: localizeHref(locale, '/') }, { label: frontmatter.title }]} /><div className="mt-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10"><aside className="sticky top-3 z-10 self-start lg:top-8"><SidebarNav items={frontmatter.toc} /></aside><article className="mt-8 min-w-0 lg:mt-0"><p className="text-sm font-black uppercase tracking-wide text-amber-700">{frontmatter.eyebrow}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{frontmatter.title}</h1><p className="mt-4 max-w-3xl text-lg">{frontmatter.description}</p><section id={introId} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">{frontmatter.toc[0]?.label ?? 'Guide'}</h2><p className="mt-3">{page.content}</p><div className="mt-5"><ContentTable rows={[{ label: 'Last updated', value: frontmatter.updatedAt }, { label: 'Guide', value: frontmatter.title }]} /></div></section><section id={stepsId} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">How to proceed</h2><div className="mt-4"><StepGuide steps={frontmatter.steps} /></div></section><section id={faqId} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">FAQ</h2><div className="mt-4"><Faq items={frontmatter.faqs} /></div></section><div className="mt-10"><EvidenceQuote>Guide details are reviewed against the information available on the date shown.</EvidenceQuote></div></article></div><BottomCta locale={locale} /></main><Footer locale={locale} /></>;
}
