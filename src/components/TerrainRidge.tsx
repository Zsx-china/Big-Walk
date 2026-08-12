/**
 * Decorative layered ridgelines — the night-hike horizon under dark
 * surfaces. Static SVG, token colors, back-to-front light-to-dark.
 */

const RIDGES = [
  {
    d: "M0,420 C120,380 240,410 360,375 C480,340 560,390 700,360 C840,330 980,385 1120,355 C1260,325 1380,380 1440,350 L1440,620 L0,620 Z",
    fill: "var(--color-night-4)",
    opacity: 0.85,
  },
  {
    d: "M0,470 C150,440 300,465 460,435 C620,405 760,460 920,430 C1080,400 1260,455 1440,425 L1440,620 L0,620 Z",
    fill: "var(--color-night-3)",
    opacity: 0.9,
  },
  {
    d: "M0,530 C180,505 340,525 520,495 C700,465 860,520 1040,490 C1220,460 1340,515 1440,490 L1440,620 L0,620 Z",
    fill: "var(--color-night-2)",
    opacity: 0.95,
  },
];

export default function TerrainRidge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      role="presentation"
    >
      {RIDGES.map((r, i) => (
        <path key={i} d={r.d} fill={r.fill} fillOpacity={r.opacity} />
      ))}
    </svg>
  );
}
