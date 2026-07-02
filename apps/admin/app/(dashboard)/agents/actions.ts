"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertAgent, deleteAgent, type Agent } from "@chapter/db";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : 0;
}

export type SaveState = { error: string } | null;

export async function saveAgent(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  const id = str(formData, "id") || randomUUID();

  // Image comes from the uploader as a JSON array; use the first (headshot).
  let images: string[] = [];
  try {
    images = JSON.parse(str(formData, "images") || "[]");
  } catch {
    images = [];
  }

  const agent: Agent = {
    id,
    name: str(formData, "name"),
    specialties: str(formData, "specialties"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    image: images[0] ?? str(formData, "image"),
    listings: num(formData, "listings"),
  };

  try {
    await upsertAgent(supabase, agent);
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/agents");
  redirect("/agents"); // throws NEXT_REDIRECT — must stay outside the try
}

export async function removeAgent(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteAgent(supabase, id);
    revalidatePath("/agents");
  }
}
