import { ImageResponse } from "next/og";

/**
 * Shared Open Graph image renderer — used by the default (root) image and
 * the dynamic section/article images. Design-token aligned; no CSS vars in
 * satori, so values are duplicated here as data.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  const long = title.length > 36;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          background: "#0c1310",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 18,
              height: 18,
              background: "#f0641f",
              transform: "rotate(45deg)",
              borderRadius: 3,
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#829a8f" }}>
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            fontSize: long ? 54 : 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          {title}
        </div>
        {sub && (
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#adbfb6", maxWidth: 940 }}>
            {sub.length > 150 ? `${sub.slice(0, 147)}…` : sub}
          </div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}
