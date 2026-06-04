import rawContent from "@/lib/content/properties.json";
import { createAnonClient, getProperties as dbGetProperties, type Property } from "@chapter/db";

export type { Property } from "@chapter/db";

// Static snapshot — used to seed Supabase and as a fallback if the DB is
// unreachable (or env vars are absent, e.g. during a local build).
const fallback = (rawContent as unknown as { properties: Property[] }).properties;

export const propertyTypes = ["All", "Residential", "Luxury", "Investment"] as const;

let warned = false;
async function load(): Promise<Property[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGetProperties(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] properties: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}

export async function getProperties(): Promise<Property[]> {
  return load();
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  return (await load()).find((p) => p.slug === slug);
}

export async function getRelatedProperties(slug: string, limit = 3): Promise<Property[]> {
  const all = await load();
  const property = all.find((p) => p.slug === slug);
  if (!property) return all.slice(0, limit);
  return all
    .filter((p) => p.slug !== slug && (p.type === property.type || p.area === property.area))
    .slice(0, limit);
}
