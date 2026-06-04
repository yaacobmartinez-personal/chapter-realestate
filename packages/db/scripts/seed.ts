/**
 * One-time seed: loads the existing static JSON content into Supabase.
 * Run: `npm run db:seed` from the repo root (needs packages/db/.env with
 * NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createServiceClient } from "../src/client";
import { propertyToRow } from "../src/properties";
import { postToRow } from "../src/resources";
import type { Property, BlogPost } from "../src/types";

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, "..", "..", "..", "apps", "web", "lib", "content");

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(join(contentDir, file), "utf-8")) as T;
}

async function main() {
  const db = createServiceClient();

  const { properties } = readJson<{ properties: Property[] }>("properties.json");
  const { blogPosts } = readJson<{ blogPosts: BlogPost[] }>("resources.json");

  console.log(`Seeding ${properties.length} properties...`);
  const { error: pErr } = await db
    .from("properties")
    .upsert(properties.map(propertyToRow), { onConflict: "id" });
  if (pErr) throw pErr;

  console.log(`Seeding ${blogPosts.length} blog posts...`);
  const { error: bErr } = await db
    .from("blog_posts")
    .upsert(blogPosts.map(postToRow), { onConflict: "slug" });
  if (bErr) throw bErr;

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
