import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext adapter for Cloudflare Workers.
//
// ISR / `export const revalidate` pages render correctly with the default
// (in-memory) incremental cache, but the cache is per-isolate and does not
// persist across deployments. To make revalidation durable, add an R2-backed
// incremental cache:
//
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
//
// ...then bind an R2 bucket named `NEXT_INC_CACHE_R2_BUCKET` in wrangler.jsonc.
export default defineCloudflareConfig();
