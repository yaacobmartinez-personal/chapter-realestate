import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @chapter/db ships raw TypeScript from the monorepo — transpile it here.
  transpilePackages: ["@chapter/db"],
  images: {
    // Internal CMS — skip optimization so any R2/Unsplash/remote URL renders
    // without maintaining a remotePatterns allowlist.
    unoptimized: true,
  },
};

export default nextConfig;
