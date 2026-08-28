import type { SupabaseClient } from "@supabase/supabase-js";
import type { RentalUnit, RentalUnitRow } from "./types";

const TABLE = "rentals";

function rowToRental(row: RentalUnitRow): RentalUnit {
  return {
    id: row.id,
    image: row.image,
    images: row.images ?? [],
    rent: row.rent,
    address: row.address,
    area: row.area,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    category: row.category,
    status: row.status,
  };
}

export function rentalToRow(r: RentalUnit): RentalUnitRow {
  return {
    id: r.id,
    image: r.image,
    images: r.images ?? [],
    rent: r.rent,
    address: r.address,
    area: r.area,
    beds: r.beds,
    baths: r.baths,
    sqft: r.sqft,
    category: r.category,
    status: r.status,
  };
}

export async function getRentals(db: SupabaseClient): Promise<RentalUnit[]> {
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getRentals: ${error.message}`);
  return (data as RentalUnitRow[]).map(rowToRental);
}

export async function upsertRental(db: SupabaseClient, r: RentalUnit): Promise<RentalUnit> {
  const { data, error } = await db
    .from(TABLE)
    .upsert(rentalToRow(r), { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw new Error(`upsertRental: ${error.message}`);
  return rowToRental(data as RentalUnitRow);
}

export async function deleteRental(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`deleteRental: ${error.message}`);
}

/**
 * Finds a rental at the same address, ignoring case and surrounding space.
 *
 * Used to catch a rental being created twice from the same property — the
 * table has no unique constraint on `address` (and shouldn't: two units in one
 * building legitimately share a street address, distinguished by unit number),
 * so this is a guard against the accidental case, not a schema rule.
 *
 * `excludeId` keeps an edit from matching the row being edited.
 */
export async function findRentalByAddress(
  db: SupabaseClient,
  address: string,
  excludeId?: string,
): Promise<RentalUnit | null> {
  const needle = address.trim();
  if (!needle) return null;

  // `ilike` treats % and _ as wildcards; escape them so an address containing
  // one matches literally rather than as a pattern.
  const pattern = needle.replace(/[\%_]/g, (c) => `\${c}`);

  let query = db.from(TABLE).select("*").ilike("address", pattern).limit(1);
  if (excludeId) query = query.neq("id", excludeId);

  const { data, error } = await query;
  if (error) throw new Error(`findRentalByAddress: ${error.message}`);
  return data?.length ? rowToRental(data[0] as RentalUnitRow) : null;
}
