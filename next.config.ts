import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];
    const locales = ["en", "es"] as const;
    // Legacy bigwalk.blog paths -> new site routes (permanent 301).
    const map: Record<string, string> = {
      codes: "/database/systems-crossplay",
      crossplay: "/database/systems-crossplay",
      "beginner-tips": "/guides/tips-and-tricks",
      classes: "/database/classes-team-roles",
      characters: "/database/classes-team-roles",
      tools: "/tools",
      game: "/start-here/what-is-big-walk",
      puzzles: "/guides/puzzles",
      about: "/about",
      wiki: "/database",
      map: "/database/locations-island",
      save: "/database/systems-save",
      requirements: "/start-here/beginner-guide",
      review: "/start-here/what-is-big-walk",
      price: "/start-here/what-is-big-walk",
      walkthrough: "/guides/walkthrough",
      achievements: "/database/achievements",
      privacy: "/privacy",
      terms: "/terms",
    };
    const rules: Redirect[] = [];
    for (const locale of locales) {
      rules.push({ source: `/${locale}`, destination: "/", permanent: true });
      rules.push({ source: `/${locale}/`, destination: "/", permanent: true });
      for (const [slug, dest] of Object.entries(map)) {
        rules.push({ source: `/${locale}/${slug}`, destination: dest, permanent: true });
        rules.push({ source: `/${locale}/${slug}/`, destination: dest, permanent: true });
      }
    }
    return rules;
  },
};

export default nextConfig;
