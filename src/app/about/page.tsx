import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ABOUT, SITE } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${SITE.name}`,
    description: ABOUT.description,
    url: `${SITE.url}/about`,
  },
};

const OFFICIAL = [
  {
    name: "Big Walk on Steam",
    href: "https://store.steampowered.com/app/1478500/Big_Walk/",
    desc: "The official store page — buy the game, read the description, and check reviews.",
  },
  {
    name: "House House",
    href: "https://househou.se/",
    desc: "The Melbourne studio behind Big Walk (and Untitled Goose Game).",
  },
  {
    name: "Panic",
    href: "https://panic.com/",
    desc: "The publisher — the place for official news about the game.",
  },
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: SITE.url },
    { name: ABOUT.label },
  ]);
  return (
    <>
      <PageHero
        label={ABOUT.short}
        color={ABOUT.color}
        title="A fan-made field guide"
        desc="Big Walk Wiki is a knowledge hub for Big Walk, built by players for players — with no affiliation to the game's creators."
        meta={["Fan-made", "Community maintained", "Not official"]}
        breadcrumbs={[{ label: ABOUT.label }]}
      />

      <div className="shell section">
        <article className="prose" style={{ maxWidth: "720px" }}>
          <h2>What this is</h2>
          <p>
            Big Walk Wiki is a fan-made knowledge hub for{" "}
            <strong>Big Walk</strong>, the co-op walk-and-talk adventure from
            House House, published by Panic. It collects the essentials in one
            place: a starting guide for new walkers, walkthroughs and puzzle
            solutions, a structured database of the island&apos;s mechanics,
            locations and systems, and straight answers to common questions.
          </p>
          <p>
            The goal is professional-grade quality — clear structure, reliable
            information, and a design that feels like a proper game site —
            while staying a volunteer project.
          </p>

          <h2>How the content is maintained</h2>
          <p>
            Every page carries an <em>updated</em> date, and entries use
            confidence markers — <em>verified</em>, <em>community-reported</em>,
            or <em>needs testing</em> — so you know how solid a claim is before
            you plan a route around it. Verified facts come from in-game play;
            anything based on early community reports is labelled as such and
            tightened as more walkers confirm it.
          </p>

          <h2>Fan site disclaimer</h2>
          <p>
            Big Walk Wiki is an <strong>independent, fan-made resource</strong>,
            created by players and maintained without any involvement from the
            game&apos;s creators. It is{" "}
            <strong>not affiliated with, endorsed by, or sponsored by</strong>{" "}
            House House (the developer) or Panic (the publisher). Big Walk and
            all related names, artwork and material belong to their respective
            owners. Nothing on this site is official — it exists to help
            players, not to represent the developers or publishers.
          </p>

          <h2>Official resources</h2>
          <p>
            For the source of truth — purchase, official news, and anything
            this wiki can&apos;t answer — go straight to the makers:
          </p>
          <ul>
            {OFFICIAL.map((o) => (
              <li key={o.href}>
                <a href={o.href} target="_blank" rel="noopener noreferrer">
                  {o.name} ↗
                </a>
                <br />
                {o.desc}
              </li>
            ))}
          </ul>

          <p>
            Otherwise, start with the{" "}
            <Link href="/start-here">Start Here</Link> section — the whole walk
            begins with a single step.
          </p>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
