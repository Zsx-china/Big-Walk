import { OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Big Walk Wiki — Know the route. Enjoy the walk.";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "The Big Walk field guide",
    title: "Know the route. Enjoy the walk.",
    sub: SITE.description,
  });
}
