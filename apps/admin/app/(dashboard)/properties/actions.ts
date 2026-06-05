"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  upsertProperty,
  deleteProperty,
  type Property,
  type PropertyType,
  type PropertyStatus,
} from "@chapter/db";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function num(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : 0;
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export type SaveState = { error: string } | null;

export async function saveProperty(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const supabase = await createClient();

  const id = str(formData, "id") || randomUUID();
  const address = str(formData, "address");
  const slug = str(formData, "slug") || slugify(address || id);

  // images: JSON array of URLs from the uploader; features: newline-separated.
  let images: string[] = [];
  try {
    images = JSON.parse(str(formData, "images") || "[]");
  } catch {
    images = [];
  }
  const features = str(formData, "features")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const property: Property = {
    id,
    slug,
    image: images[0] ?? str(formData, "image"),
    images,
    price: str(formData, "price"),
    address,
    area: str(formData, "area"),
    city: str(formData, "city"),
    province: str(formData, "province"),
    beds: num(formData, "beds"),
    baths: num(formData, "baths"),
    sqft: str(formData, "sqft"),
    garage: num(formData, "garage"),
    lot: str(formData, "lot"),
    yearBuilt: num(formData, "yearBuilt"),
    mls: str(formData, "mls"),
    tag: str(formData, "tag"),
    type: (str(formData, "type") || "Residential") as PropertyType,
    status: (str(formData, "status") || "For Sale") as PropertyStatus,
    description: str(formData, "description"),
    features,
    coordinates: { lng: num(formData, "lng"), lat: num(formData, "lat") },
  };

  try {
    await upsertProperty(supabase, property);
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/properties");
  redirect("/properties"); // throws NEXT_REDIRECT — must stay outside the try
}

export async function removeProperty(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteProperty(supabase, id);
    revalidatePath("/properties");
  }
}
