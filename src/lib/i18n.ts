/**
 * UI copy dictionary — the single source for chrome strings.
 *
 * Phase 1 ships English only, but the structure is locale-ready:
 * adding a future locale means adding a key here and pointing `t` at it.
 * Page-level copy lives with its page; section labels live in `lib/site.ts`.
 */

const en = {
  nav: {
    cta: "Start here",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
    mobileLabel: "Mobile",
  },
  hero: {
    eyebrow: "The Big Walk field guide",
    titleLine1: "Know the route.",
    titleLine2: "Enjoy the walk.",
    sub: "The community knowledge hub for Big Walk — House House's co-op walk-and-talk adventure for 2–12 players. Start here, solve anything, and keep exploring the island together.",
    ctaPrimary: "Start here",
    ctaSecondary: "Browse the database",
    statPlayers: "walkers per party",
    statIsland: "shared island",
    statPlatforms: "platforms, one route",
    statCoop: "co-op, no solo mode",
    mapLabel:
      "Stylised trail map of the Big Walk island with the route marked from start to summit",
  },
  footer: {
    blurb:
      "A community field guide to Big Walk — the co-op walk-and-talk adventure from House House, published by Panic.",
    note: "Fan-made knowledge hub. Not affiliated with or endorsed by House House or Panic. Big Walk is a registered trademark of its owners.",
    sections: "Sections",
    startHere: "Start here",
    official: "Official",
    copyright: "© 2026 Big Walk Wiki · Built with Next.js + MDX",
    lastUpdated: "Last updated",
    updatedDate: "August 13, 2026",
    madeBy: "Made by walkers, for walkers",
  },
  common: {
    home: "Home",
    breadcrumbSep: "/",
    onThisPage: "On this page",
    information: "Information",
    questionsAnswers: "Questions & answers",
    nextOnTrail: "Next on the trail",
    updated: "Updated",
    minRead: "min read",
    continueOnTrail: "Continue on the trail",
    pages: "pages",
    communityMaintained: "Community maintained",
    subIndex: "Sub-index",
    entry: "entry",
    entries: "entries",
    tools: "tools",
    staticTools: "Static",
    questions: "questions",
    skipToContent: "Skip to content",
  },
  confidence: {
    verified: "Verified in-game",
    community: "Community-reported",
    "needs-testing": "Needs testing",
  },
} as const;

export const dict = { en } as const;
export type Locale = keyof typeof dict;

/** Active locale for Phase 1. Swap this when multi-locale ships. */
export const t = dict.en;
