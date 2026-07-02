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
