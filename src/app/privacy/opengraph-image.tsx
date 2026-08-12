import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Big Walk Wiki — Privacy Policy";

export default function PrivacyOgImage() {
  return renderOgImage({
    eyebrow: "Site policy",
    title: "Privacy Policy",
    sub: "No accounts, no analytics, no personal data collection.",
  });
}
