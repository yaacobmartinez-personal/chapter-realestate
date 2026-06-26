import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
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
