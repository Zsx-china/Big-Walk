import { OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE, sectionByKey } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Big Walk Wiki section overview";

export default async function SectionOgImage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = sectionByKey(section);
  return renderOgImage({
    eyebrow: meta ? `${meta.waypoint} · ${meta.short}` : SITE.tagline,
    title: meta?.label ?? SITE.name,
    sub: meta?.description ?? SITE.description,
  });
}
