import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Generic link card — the standard card shell used across section indices,
 * the tools page and article lists. Pure presentational.
 */
export default function Card({
  href,
  title,
  desc,
  waypoint,
  topRight,
  meta,
  blazeColor,
  className = "",
  titleLevel = 3,
}: {
  href: string;
  title: string;
  desc?: string;
  waypoint?: string;
  /** Replaces the default arrow in the top-right corner. */
  topRight?: ReactNode;
  meta?: ReactNode;
  /** Data-driven accent (CSS variable, e.g. var(--accent-gold)). */
  blazeColor?: string;
  className?: string;
  /** Heading level — h3 under an h2 section, h2 when the card is the page's main content. */
  titleLevel?: 2 | 3;
}) {
  const TitleTag = (titleLevel === 2 ? "h2" : "h3") as "h2" | "h3";
  return (
    <Link
      href={href}
      className={`card ${className}`}
      style={blazeColor ? { ["--blaze-color" as string]: blazeColor } : undefined}
    >
      <div className="card__top">
        {waypoint ? <span className="card__waypoint">{waypoint}</span> : <span />}
        {topRight ?? <span className="card__arrow" aria-hidden="true">→</span>}
      </div>
      <TitleTag className="card__title">{title}</TitleTag>
      {desc && <p className="card__desc">{desc}</p>}
      {meta && <span className="card__meta">{meta}</span>}
    </Link>
  );
}
