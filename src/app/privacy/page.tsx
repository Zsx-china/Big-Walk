import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Big Walk Wiki handles data: a fan-made site with no accounts, no analytics and no personal data collection.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy · ${SITE.name}`,
    description:
      "How Big Walk Wiki handles data: no accounts, no analytics, no personal data collection.",
    url: `${SITE.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Site policy"
        color="var(--accent-slate)"
        title="Privacy Policy"
        desc="The short version: this is a fan-made wiki with no accounts, no analytics and no personal data collection."
        meta={["Last updated Aug 2026"]}
        breadcrumbs={[{ label: "Privacy" }]}
      />

      <div className="shell section">
        <article className="prose" style={{ maxWidth: "720px" }}>
          <h2>What we collect</h2>
          <p>
            Big Walk Wiki is a static, fan-made website. It does not run
            analytics, does not use cookies for tracking, and does not collect
            or store personal information about its visitors.
          </p>
          <p>
            There are no user accounts, no comment systems, and no forms on
            this site — so there is nothing to sign up for and nothing to
            submit.
          </p>

          <h2>Server logs</h2>
          <p>
            Like any website, our hosting provider (Vercel) may keep standard
            server logs — such as IP addresses and request times — for
            operational and security purposes. We do not use this data to
            identify individual visitors.
          </p>

          <h2>External links</h2>
          <p>
            Pages link to external services (such as the Steam store, House
            House and Panic). Those sites have their own privacy policies, and
            we are not responsible for them.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the update date at the top of this page
            will be bumped. For anything else, see our{" "}
            <Link href="/terms">Terms</Link> or the{" "}
            <Link href="/about">About</Link> page.
          </p>
        </article>
      </div>
    </>
  );
}
