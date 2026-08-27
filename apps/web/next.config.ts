import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl"],
  images: {
    // Cloudflare Workers has no Vercel `/_next/image` optimizer, so serve images
    // as-is. Uploads are already compressed and resized by the admin upload
    // route before they reach storage, Unsplash sizes via query params, and the
    // responsive `sizes`/`srcset` markup is preserved.
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
      // Supabase Storage — uploaded property/rental/agent images
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Legacy Cloudflare R2 URLs. R2 is no longer enabled on the account, so
      // the handful of rows still pointing here are dead links — kept only so
      // they render as a broken image rather than blowing up next/image.
      // Drop this entry once those images are re-uploaded through the CMS.
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  // The standalone buyer's guide and sellers pages were merged into /brokerage.
  async redirects() {
    return [
      { source: "/buyers-guide", destination: "/brokerage#buy", permanent: true },
      { source: "/sellers", destination: "/brokerage#sell", permanent: true },
    ];
  },
};

export default nextConfig;

// Enables Cloudflare bindings (R2, env, etc.) during `next dev` via the
// OpenNext adapter. No-op in production builds.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
