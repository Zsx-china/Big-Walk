import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Big Walk Wiki — Terms of Use";

export default function TermsOgImage() {
  return renderOgImage({
    eyebrow: "Site policy",
    title: "Terms of Use",
    sub: "A fan-made resource, clearly defined.",
  });
}
