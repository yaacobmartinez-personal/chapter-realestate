import type { SupabaseClient } from "@supabase/supabase-js";
import type { Property, PropertyRow } from "./types";

const TABLE = "properties";

function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    image: row.image,
    images: row.images ?? [],
    price: row.price,
    address: row.address,
    area: row.area,
    city: row.city,
    province: row.province,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    garage: row.garage,
    lot: row.lot,
    yearBuilt: row.year_built,
    mls: row.mls,
    tag: row.tag,
    type: row.type,
    status: row.status,
    description: row.description,
    features: row.features ?? [],
    coordinates: row.coordinates,
  };
}

export function propertyToRow(p: Property): PropertyRow {
  return {
    id: p.id,
    slug: p.slug,
    image: p.image,
    images: p.images ?? [],
    price: p.price,
    address: p.address,
    area: p.area,
    city: p.city,
    province: p.province,
    beds: p.beds,
    baths: p.baths,
    sqft: p.sqft,
    garage: p.garage,
    lot: p.lot,
    year_built: p.yearBuilt,
    mls: p.mls,
    tag: p.tag,
    type: p.type,
    status: p.status,
    description: p.description,
    features: p.features ?? [],
    coordinates: p.coordinates,
  };
}

export async function getProperties(db: SupabaseClient): Promise<Property[]> {
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getProperties: ${error.message}`);
  return (data as PropertyRow[]).map(rowToProperty);
}

export async function getPropertyBySlug(
  db: SupabaseClient,
  slug: string,
): Promise<Property | null> {
  const { data, error } = await db.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`getPropertyBySlug: ${error.message}`);
  return data ? rowToProperty(data as PropertyRow) : null;
}

export async function upsertProperty(db: SupabaseClient, p: Property): Promise<Property> {
  const { data, error } = await db
    .from(TABLE)
    .upsert(propertyToRow(p), { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw new Error(`upsertProperty: ${error.message}`);
  return rowToProperty(data as PropertyRow);
}

export async function deleteProperty(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`deleteProperty: ${error.message}`);
}
