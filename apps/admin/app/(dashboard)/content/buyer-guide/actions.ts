"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertBuyerGuideStep, deleteBuyerGuideStep, type BuyerGuideStep } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveBuyerGuideStep(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();

  let images: string[] = [];
  try { images = JSON.parse(str(formData, "images") || "[]"); } catch { images = []; }

  // Paragraphs are entered separated by a blank line.
  const paragraphs = str(formData, "paragraphs")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const stepItem: BuyerGuideStep = {
    id: str(formData, "id") || randomUUID(),
    step: str(formData, "step"),
    title: str(formData, "title"),
    shortDesc: str(formData, "shortDesc"),
    paragraphs,
    image: images[0] ?? str(formData, "image"),
    sortOrder: num(formData, "sortOrder"),
  };

  try {
    await upsertBuyerGuideStep(supabase, stepItem);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/buyer-guide");
  redirect("/content/buyer-guide");
}

export async function removeBuyerGuideStep(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteBuyerGuideStep(supabase, id);
    revalidatePath("/content/buyer-guide");
  }
}
