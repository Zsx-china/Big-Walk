import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Big Walk Wiki handles data: a fan-made site with no accounts. We use Google Analytics to understand traffic and may show ads served by Google AdSense.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy · ${SITE.name}`,
    description:
      "How Big Walk Wiki handles data: no accounts, no forms. We use Google Analytics for anonymous traffic insights and may show ads served by Google AdSense.",
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
        desc="The short version: this is a fan-made wiki with no accounts and no forms. We use Google Analytics for anonymous traffic insights and may display ads served by Google AdSense."
        meta={["Last updated Aug 21, 2026"]}
        breadcrumbs={[{ label: "Privacy" }]}
      />

      <div className="shell section">
        <article className="prose" style={{ maxWidth: "720px" }}>
          <h2>What we collect</h2>
          <p>
            Big Walk Wiki is a static, fan-made website. We do not collect or
            store personal information about our visitors, and we never sell
            or share visitor data with third parties.
          </p>
          <p>
            There are no user accounts, no comment systems, and no forms on
            this site — so there is nothing to sign up for and nothing to
            submit.
          </p>

          <h2>Google Analytics</h2>
          <p>
            This site uses Google Analytics (GA4) to understand how visitors
            use the wiki — for example, which pages are read most and which
            devices visitors use. Google Analytics processes anonymous usage
            data and may set cookies, and may record IP addresses as part of
            that processing. This data is used in aggregate to improve the
            site; we do not use it to identify individual visitors.
          </p>
          <p>
            Google's handling of this data is governed by Google's privacy
            policy, and you can learn more or opt out using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>

          <h2>Advertising</h2>
          <p>
            We may display advertisements served by Google AdSense. Google and
            its partners may use cookies (including the DoubleClick cookie) to
            serve ads based on your visits to this and other websites. You can
            control personalized advertising through Google's{" "}
            <a
              href="https://adssettings.google.com"
              rel="noopener noreferrer"
            >
              Ads Settings
            </a>{" "}
            or opt out of some third-party cookies at{" "}
            <a href="https://www.aboutads.info" rel="noopener noreferrer">
              aboutads.info
            </a>
            .
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
