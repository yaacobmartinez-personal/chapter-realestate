import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow everything except stale/removed paths that only 404 (e.g. legacy /items/*).
      { userAgent: "*", allow: "/", disallow: "/items/" },
      // Block aggressive third-party crawlers (advisory — only honored by well-behaved bots)
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
    ],
    sitemap: "https://chapterrealestate.ca/sitemap.xml",
  };
}
