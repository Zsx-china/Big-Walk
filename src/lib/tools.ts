/** Data-layer metadata for the Tools section (kept with its data). */
export const TOOLS_UPDATED = "Aug 2026";

export interface ToolCard {
  title: string;
  desc: string;
  href: string;
  cta: string;
}

export const TOOL_CARDS: ToolCard[] = [
  {
    title: "Party size planner",
    desc:
      "Big Walk supports 2–12 players with no solo mode. Pick your crew before you load in — the island scales puzzles to your group.",
    href: "/database/systems-multiplayer",
    cta: "Read the multiplayer guide",
  },
  {
    title: "Join code quick card",
    desc:
      "Cross-platform walkers need a join code from the host's pause menu. Keep this card open on a second screen while you sort the lobby.",
    href: "/database/systems-crossplay",
    cta: "How join codes work",
  },
  {
    title: "Red bridge puzzle card",
    desc:
      "Four puzzles, four red figures, one key, one shredder. The steps for lowering the red drawbridge, condensed to one card.",
    href: "/guides/red-bridge-puzzle",
    cta: "Open the puzzle card",
  },
];
