import Link from "next/link";
import Contours from "@/components/Contours";

export default function NotFound() {
  return (
    <section className="cta-band">
      <Contours variant="band" className="cta-band__contours" />
      <div className="shell cta-band__inner">
        <div>
          <p className="eyebrow" style={{ color: "var(--primary)" }}>
            WP-404 · Off the map
          </p>
          <h1 className="cta-band__title" style={{ marginTop: "var(--sp-4)" }}>
            This trail doesn&apos;t exist.
          </h1>
          <p className="cta-band__desc">
            You wandered past the last waypoint. Head back to the start — or
            browse the database to find your way.
          </p>
        </div>
        <div className="cta-band__actions">
          <Link href="/" className="btn btn--primary">
            Back to the hub
          </Link>
          <Link href="/database" className="btn btn--ghost">
            Browse the database
          </Link>
        </div>
      </div>
    </section>
  );
}
