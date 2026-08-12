import { OG_SIZE, renderOgImage } from "@/lib/og";
import { ABOUT } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "About Big Walk Wiki — a fan-made field guide";

export default function AboutOgImage() {
  return renderOgImage({
    eyebrow: ABOUT.short,
    title: "A fan-made field guide",
    sub: ABOUT.description,
  });
}
