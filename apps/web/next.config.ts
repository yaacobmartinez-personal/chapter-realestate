import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl"],
  images: {
    // Cloudflare Workers has no Vercel `/_next/image` optimizer, so serve images
    // as-is. Sources (R2, Unsplash) already deliver reasonably sized assets and
    // the responsive `sizes`/`srcset` markup is preserved.
    //
    // To enable on-the-fly optimization later, turn on Cloudflare Image
    // Resizing (Images) for the zone and swap this for a custom loader:
    //   loader: "custom", loaderFile: "./lib/cf-image-loader.ts"
    // (loader returns `/cdn-cgi/image/width=${width},quality=${quality}/${src}`)
    unoptimized: true,
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
  },
};

export default nextConfig;

// Enables Cloudflare bindings (R2, env, etc.) during `next dev` via the
// OpenNext adapter. No-op in production builds.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
