import Image from 'next/image';

import type { Locale } from '../i18n/config';
import { localizeHref } from '../lib/links';
import type { HeroCard as HeroCardData } from '../lib/types';

type HeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  heroCard: HeroCardData;
  showResearchActions?: boolean;
};

const researchActions = [
  ['Start Beginner Guide', '/beginner-tips'],
  ['Join Code Guide', '/codes'],
  ['Puzzle Solutions', '/puzzles'],
] as const;

export function Hero({ locale, eyebrow, title, description, heroCard, showResearchActions = false }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/images/bigwalk-hero.png"
        alt="A scenic Big Walk trail through a sunlit forest"
        fill
        sizes="100vw"
        priority
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />
      <div className={`mx-auto grid min-h-[560px] max-w-[1200px] gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ${showResearchActions ? 'items-center' : 'items-end lg:grid-cols-[1fr_340px]'}`}>
        <div className="max-w-3xl">
          <p className="mb-4 font-black uppercase tracking-[0.2em] text-ember-light">{eyebrow}</p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-tighter sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">{description}</p>
          {showResearchActions && (
            <div className="mt-8 flex flex-wrap gap-3">
              {researchActions.map(([label, href], index) => (
                <a
                  key={href}
                  href={localizeHref(locale, href)}
                  className={index === 0
                    ? 'border-2 border-ember-light bg-ember-light px-5 py-3 text-sm font-black uppercase tracking-wide text-ink'
                    : 'border-2 border-white bg-ink/60 px-5 py-3 text-sm font-black uppercase tracking-wide text-white'}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
        {!showResearchActions && (
          <aside className="border-4 border-ink bg-ember-light p-6 text-ink shadow-[8px_8px_0_0_var(--color-ember)]">
            <p className="text-xs font-black uppercase tracking-[0.18em]">Verified multiplayer guide</p>
            <h2 className="mt-4 text-3xl font-black leading-none tracking-tight">{heroCard.title}</h2>
            <p className="mt-4 text-sm font-semibold leading-6">{heroCard.description}</p>
          </aside>
        )}
      </div>
    </section>
  );
}
