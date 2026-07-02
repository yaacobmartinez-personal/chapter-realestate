"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  upsertRental,
  deleteRental,
  type RentalUnit,
  type RentalCategory,
  type RentalStatus,
} from "@chapter/db";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : 0;
}

export type SaveState = { error: string } | null;

export async function saveRental(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = str(formData, "id") || randomUUID();

  let images: string[] = [];
  try {
    images = JSON.parse(str(formData, "images") || "[]");
  } catch {
    images = [];
  }

  const rental: RentalUnit = {
    id,
    image: images[0] ?? str(formData, "image"),
    images,
    rent: str(formData, "rent"),
    address: str(formData, "address"),
    area: str(formData, "area"),
    beds: num(formData, "beds"),
    baths: num(formData, "baths"),
    sqft: str(formData, "sqft"),
    category: (str(formData, "category") || "Residential") as RentalCategory,
    status: (str(formData, "status") || "Available") as RentalStatus,
  };

  try {
    await upsertRental(supabase, rental);
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/rentals");
  redirect("/rentals"); // throws NEXT_REDIRECT — must stay outside the try
}

export async function removeRental(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteRental(supabase, id);
    revalidatePath("/rentals");
  }
}
