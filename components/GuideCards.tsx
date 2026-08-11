import type { Locale } from '../i18n/config';
import { localizeHref } from '../lib/links';
import type { RelatedLink } from '../lib/types';

export function GuideCards({ locale, guides }: { locale: Locale; guides: RelatedLink[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="guide-heading">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-4 border-slate-950 pb-4">
        <div><p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Pick a direction</p><h2 id="guide-heading" className="mt-1 text-3xl font-black tracking-tight text-ink">Trailhead guides</h2></div>
        <p className="max-w-md text-sm font-medium text-slate-700">Short, useful notes for when you want a nudge without losing the joy of discovery.</p>
      </div>
      <div className="grid gap-4 py-6 md:grid-cols-3">
        {guides.map((guide, index) => (
          <a key={guide.slug} href={localizeHref(locale, `/${guide.slug}`)} className="group border-2 border-ink bg-white p-6 text-ink shadow-[5px_5px_0_0_var(--color-ember)] transition-transform hover:-translate-y-1">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-teal">0{index + 1}</span>
            <h3 className="mt-4 text-2xl font-black tracking-tight group-hover:underline">{guide.label}</h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{guide.description}</p>
            <span className="mt-5 inline-block text-sm font-black uppercase tracking-wide text-slate-950">Read guide →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
