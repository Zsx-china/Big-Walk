import { useTranslations } from 'next-intl';

import { renderMdxContent } from '../mdx-components';
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
import { StatusCards } from './StatusCards';
import { StepGuide } from './StepGuide';

function sectionId(page: PageDocument, match: string, fallback: string) {
  return page.frontmatter.toc.find((item) => item.id.toLowerCase().includes(match))?.id ?? fallback;
}

function faqTocItem(page: PageDocument) {
  return page.frontmatter.toc.find((item) => /faq|preguntas-frecuentes/i.test(`${item.id} ${item.label}`));
}

function tocItem(page: PageDocument, pattern: RegExp) {
  return page.frontmatter.toc.find((item) => pattern.test(`${item.id} ${item.label}`));
}

export function GuidePage({ page }: { page: PageDocument }) {
  const t = useTranslations('GuidePage');
  const { locale, frontmatter } = page;
  const stepsId = sectionId(page, 'step', 'steps');
  const faqItem = faqTocItem(page);
  const faqId = faqItem?.id ?? 'faq';
  const stepsItem = tocItem(page, /step|paso/i);
  const relatedItem = tocItem(page, /related|relacion/i);
  const navigationToc = frontmatter.toc.map((item) => {
    if (item.id === faqItem?.id) return { ...item, id: `${faqId}-list` };
    if (item.id === stepsItem?.id) return { ...item, id: `${stepsId}-guide` };
    return item;
  });

  return <><Header locale={locale} href={`/${page.slug}`} /><main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8"><Breadcrumbs items={[{ label: t('Home'), href: localizeHref(locale, '/') }, { label: frontmatter.title }]} /><div className="mt-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10"><aside className="sticky top-3 z-10 self-start lg:top-8"><SidebarNav items={navigationToc} /></aside><article className="mt-8 min-w-0 lg:mt-0"><p className="text-sm font-black uppercase tracking-wide text-amber-700">{frontmatter.eyebrow}</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{frontmatter.title}</h1><p className="mt-4 max-w-3xl text-lg">{frontmatter.description}</p><StatusCards cards={frontmatter.heroCard.statusCards} /><section className="mt-10 scroll-mt-24"><div className="mt-3">{renderMdxContent(page.content, frontmatter.toc.map((item) => item.id))}</div><div className="mt-5"><ContentTable rows={[{ label: t('LastUpdated'), value: frontmatter.updatedAt }, { label: t('Guide'), value: frontmatter.title }]} /></div></section><section id={`${stepsId}-guide`} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">{t('HowToProceed')}</h2><div className="mt-4"><StepGuide steps={frontmatter.steps} /></div></section><section id={`${faqId}-list`} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">{t('FAQ')}</h2><div className="mt-4"><Faq items={frontmatter.faqs} /></div></section>{relatedItem && frontmatter.relatedLinks.length > 0 && <section id={relatedItem.id} className="mt-10 scroll-mt-24"><h2 className="text-2xl font-black text-slate-950">{relatedItem.label}</h2><ul className="mt-4 grid gap-3">{frontmatter.relatedLinks.map((link) => <li key={link.slug}><a href={localizeHref(locale, `/${link.slug}`)} className="font-bold underline">{link.label}</a><p>{link.description}</p></li>)}</ul></section>}<div className="mt-10"><EvidenceQuote>{t('Evidence')}</EvidenceQuote></div></article></div><BottomCta locale={locale} /></main><Footer locale={locale} /></>;
}
