/**
 * Film-grain overlay. Purely decorative; the texture comes from the
 * `--texture-grain` visual-asset token (data-URI SVG noise).
 */
export default function GrainTexture({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`grain ${className}`} aria-hidden="true" />;
}
