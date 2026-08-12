/**
 * Site-wide configuration: navigation, sections, category metadata.
 *
 * The information architecture mirrors the Big Walk Wiki 2.0 spec:
 * HOME / START HERE / GUIDES / DATABASE / TOOLS / FAQ / ABOUT
 * (UPDATES is deferred to a future extension module.)
 */

export type CategoryKey =
  | "start-here"
  | "guides"
  | "database"
  | "tools"
  | "faq";

export interface SectionMeta {
  key: string;
  label: string;
  short: string;
  description: string;
  /** Trail-blaze color used across cards, chips and route markers. */
  color: string;
  /** Waypoint coordinate shown in mono labels, e.g. "WP-02". */
  waypoint: string;
  nav: boolean;
}

export const SITE = {
  name: "Big Walk Wiki",
  tagline: "The Big Walk field guide",
  url: "https://bigwalk.wiki",
  description:
    "A premium Big Walk knowledge hub: beginner guides, walkthroughs, database, tools and answers for House House's co-op walk-and-talk adventure.",
};

export const SECTIONS: SectionMeta[] = [
  {
    key: "start-here",
    label: "Start Here",
    short: "Getting started",
    description:
      "New to the island? Start with the essentials and learn how the walk works before you set out.",
  color: "var(--primary)",
    waypoint: "WP-01",
    nav: true,
  },
  {
    key: "guides",
    label: "Guides",
    short: "How-to & strategy",
    description:
      "Walkthroughs, tips and advanced guides for every part of the trail.",
  color: "var(--accent-gold)",
    waypoint: "WP-02",
    nav: true,
  },
  {
    key: "database",
    label: "Database",
    short: "Reference data",
    description:
      "Structured reference for locations, mechanics, items and systems — the wiki core.",
  color: "var(--accent-fern)",
    waypoint: "WP-03",
    nav: true,
  },
  {
    key: "tools",
    label: "Tools",
    short: "Quick-reference tools",
    description:
      "Small utilities that live next to the wiki: quick-reference cards for planning your run.",
  color: "var(--accent-sky)",
    waypoint: "WP-04",
    nav: true,
  },
  {
    key: "faq",
    label: "FAQ",
    short: "Quick answers",
    description:
      "Straight answers to the questions players ask most, before and during the walk.",
  color: "var(--accent-violet)",
    waypoint: "WP-05",
    nav: true,
  },
];

/** About is a fixed page, not a content section — it lives in the nav only. */
export const ABOUT: SectionMeta = {
  key: "about",
  label: "About",
  short: "About this wiki",
  description:
    "What Big Walk Wiki is, who maintains it, and the official resources for Big Walk.",
  color: "var(--accent-slate)",
  waypoint: "INFO",
  nav: true,
};

export const sectionByKey = (key: string): SectionMeta | undefined =>
  SECTIONS.find((s) => s.key === key);

export const NAV_SECTIONS = [...SECTIONS, ABOUT];
