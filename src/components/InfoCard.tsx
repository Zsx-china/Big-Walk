import type { ArticleFrontmatter } from "@/lib/content";
import { t } from "@/lib/i18n";

const CONFIDENCE_COLOR: Record<string, string> = {
  verified: "var(--accent-fern)",
  community: "var(--accent-gold)",
  "needs-testing": "var(--primary)",
};

export default function InfoCard({
  info,
  confidence,
}: {
  info: Record<string, string>;
  confidence?: ArticleFrontmatter["confidence"];
}) {
  return (
    <aside className="info-card" aria-label="Information card">
      <div className="info-card__head">
        <span className="blaze" style={{ ["--blaze-color" as string]: "var(--primary)" }} aria-hidden="true" />
        {t.common.information}
      </div>
      <dl>
        {Object.entries(info).map(([k, v]) => (
          <div className="info-card__row" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {confidence && (
        <div className="info-card__foot">
          <span
            className="confidence-dot"
            style={{ ["--confidence-color" as string]: CONFIDENCE_COLOR[confidence] }}
            aria-hidden="true"
          />
          {t.confidence[confidence]}
        </div>
      )}
    </aside>
  );
}
