import type { Locale } from '../i18n/config';

export const pageSlugs = [
  'home',
  'codes',
  'crossplay',
  'review',
  'price',
  'map',
  'save',
  'puzzles',
  'walkthrough',
  'beginner-tips',
  'classes',
  'tools',
  'achievements',
  'game',
  'about',
  'privacy',
  'terms',
] as const;

export type PageSlug = (typeof pageSlugs)[number];

export interface TableOfContentsItem {
  id: string;
  label: string;
}

export interface StatusCard {
  label: string;
  value: string;
  detail: string;
}

export interface HeroCard {
  title: string;
  description: string;
  statusCards: StatusCard[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface RelatedLink {
  slug: PageSlug;
  label: string;
  description: string;
}

export interface PageFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  updatedAt: string;
  toc: TableOfContentsItem[];
  heroCard: HeroCard;
  faqs: FaqItem[];
  steps: StepItem[];
  relatedLinks: RelatedLink[];
}

export interface PageDocument {
  locale: Locale;
  slug: PageSlug;
  frontmatter: PageFrontmatter;
  /** Raw MDX body. Render it through renderMdxContent rather than evaluating imports. */
  content: string;
}
