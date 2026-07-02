import rawContent from "@/lib/content/rentals.json";
import { createAnonClient, getRentals as dbGetRentals, type RentalUnit } from "@chapter/db";

export type { RentalUnit } from "@chapter/db";

export const rentalCategories = ["All", "Residential", "Commercial"] as const;

// Static snapshot — fallback when the DB is unreachable or env vars are absent.
const fallback = (rawContent as unknown as { rentals: RentalUnit[] }).rentals;

let warned = false;
async function load(): Promise<RentalUnit[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGetRentals(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] rentals: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}

export async function getRentals(): Promise<RentalUnit[]> {
  return load();
}

export async function getRentalById(id: string): Promise<RentalUnit | undefined> {
  return (await load()).find((r) => r.id === id);
}

export async function getRelatedRentals(id: string, limit = 3): Promise<RentalUnit[]> {
  const all = await load();
  const current = all.find((r) => r.id === id);
  return all
    .filter((r) => r.id !== id && (!current || r.category === current.category))
    .slice(0, limit);
}
