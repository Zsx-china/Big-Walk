import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using Big Walk Wiki — an independent, fan-made knowledge hub not affiliated with House House or Panic.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Use · ${SITE.name}`,
    description:
      "The terms for using Big Walk Wiki — an independent, fan-made knowledge hub.",
    url: `${SITE.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Site policy"
        color="var(--accent-slate)"
        title="Terms of Use"
        desc="A few clear terms for using a fan-made wiki — read once, then get back to the walk."
        meta={["Last updated Aug 2026"]}
        breadcrumbs={[{ label: "Terms" }]}
      />

      <div className="shell section">
        <article className="prose" style={{ maxWidth: "720px" }}>
          <h2>Fan-made, not official</h2>
          <p>
            Big Walk Wiki is an <strong>independent fan-made resource</strong>.
            It is not affiliated with, endorsed by, or sponsored by House House
            (the developer) or Panic (the publisher). Big Walk and all related
            names, artwork and material belong to their respective owners.
          </p>

          <h2>Using the content</h2>
          <p>
            The guide content on this site is provided for personal,
            informational use. You are welcome to link to pages and share them.
            If you reuse substantial content elsewhere, please credit the
            source and link back.
          </p>

          <h2>Accuracy</h2>
          <p>
            Wiki content is maintained by players and may contain errors or
            outdated information. Pages carry{" "}
            <em>updated</em> dates and confidence markers (<em>verified</em>,{" "}
            <em>community-reported</em>, <em>needs testing</em>) so you can
            judge how solid a claim is. Use the site at your own discretion —
            it is a helper, not the source of truth.
          </p>

          <h2>Official resources</h2>
          <p>
            For purchase, official news and authoritative information, use the
            official sources listed on our <Link href="/about">About</Link>{" "}
            page (Steam, House House, Panic).
          </p>

          <h2>Changes</h2>
          <p>
            These terms may be updated as the site evolves; the update date at
            the top of this page reflects the latest revision. Our{" "}
            <Link href="/privacy">Privacy Policy</Link> explains the data side.
          </p>
        </article>
      </div>
    </>
  );
}
