export default function SectionHeading({
  eyebrow,
  title,
  desc,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`section-head ${dark ? "section-head--dark" : ""}`}
      style={align === "center" ? { marginInline: "auto", textAlign: "center" } : undefined}
    >
      {eyebrow && <p className="eyebrow section-head__eyebrow">{eyebrow}</p>}
      <h2 className="section-head__title">{title}</h2>
      {desc && <p className="section-head__desc">{desc}</p>}
    </div>
  );
}
