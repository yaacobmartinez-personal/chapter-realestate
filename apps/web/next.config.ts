import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Cloudflare R2 — public dev domain (pub-*.r2.dev)
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      // Cloudflare R2 — custom CDN domain (matches R2_PUBLIC_BASE_URL)
      {
        protocol: "https",
        hostname: "media.chapterrealestate.ca",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  }
};

export default nextConfig;
