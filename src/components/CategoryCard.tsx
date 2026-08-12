import Card from "./Card";
import type { SectionMeta } from "@/lib/site";

export default function CategoryCard({ section }: { section: SectionMeta }) {
  return (
    <Card
      href={`/${section.key}`}
      waypoint={section.waypoint}
      title={section.label}
      desc={section.description}
      blazeColor={section.color}
      topRight={<span className="blaze" aria-hidden="true" />}
    />
  );
}
