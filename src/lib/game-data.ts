/**
 * Verified Big Walk game facts.
 *
 * Rule: display stats must come from this module — never hardcode numbers
 * in components for visual effect. Every stat carries its source.
 * Sources as of 2026-08-13: official Steam page, House House / Panic,
 * and in-game observation.
 */

export type StatLabelKey =
  | "statPlayers"
  | "statIsland"
  | "statPlatforms"
  | "statCoop";

export interface GameStat {
  value: string;
  labelKey: StatLabelKey;
  /** Where this fact comes from. */
  source: string;
}

export const GAME_STATS: GameStat[] = [
  {
    value: "2–12",
    labelKey: "statPlayers",
    source: "Official — 2–12 players per session",
  },
  {
    value: "1",
    labelKey: "statIsland",
    source: "In-game — one continuous open world",
  },
  {
    value: "4",
    labelKey: "statPlatforms",
    source: "Official — PC, Mac, PS5, Switch 2",
  },
  {
    value: "100%",
    labelKey: "statCoop",
    source: "Official design — co-op only, no solo mode",
  },
];
