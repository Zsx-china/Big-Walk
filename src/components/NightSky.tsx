/**
 * Decorative night-sky layer: deep-to-mid gradient with scattered static
 * stars. Pure SVG, token colors, no animation and no interaction.
 */

const STARS = [
  { x: 90, y: 70, r: 1.1, o: 0.55 },
  { x: 210, y: 130, r: 1.6, o: 0.75 },
  { x: 330, y: 60, r: 0.9, o: 0.4 },
  { x: 460, y: 150, r: 1.2, o: 0.6 },
  { x: 590, y: 90, r: 0.8, o: 0.35 },
  { x: 700, y: 170, r: 1.4, o: 0.65 },
  { x: 830, y: 55, r: 1.0, o: 0.5 },
  { x: 950, y: 135, r: 1.7, o: 0.8 },
  { x: 1080, y: 80, r: 0.9, o: 0.4 },
  { x: 1210, y: 160, r: 1.2, o: 0.55 },
  { x: 1330, y: 70, r: 1.5, o: 0.7 },
  { x: 1430, y: 130, r: 1.0, o: 0.45 },
  { x: 150, y: 220, r: 0.8, o: 0.35 },
  { x: 420, y: 240, r: 0.9, o: 0.4 },
  { x: 690, y: 260, r: 1.1, o: 0.5 },
  { x: 1000, y: 225, r: 0.8, o: 0.3 },
  { x: 1280, y: 250, r: 1.0, o: 0.45 },
];

export default function NightSky({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "band";
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={variant === "band" ? "bww-sky-band" : "bww-sky-hero"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-night-deep)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--color-night)" }} />
        </linearGradient>
      </defs>
      <rect width="1440" height="620" fill={`url(#${variant === "band" ? "bww-sky-band" : "bww-sky-hero"})`} />
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="var(--color-mist)"
          fillOpacity={s.o}
        />
      ))}
    </svg>
  );
}
