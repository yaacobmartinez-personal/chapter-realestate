"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertProcessStep, deleteProcessStep, type ProcessStep } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveStep(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  const s: ProcessStep = {
    id: str(formData, "id") || randomUUID(),
    step: str(formData, "step"),
    title: str(formData, "title"),
    desc: str(formData, "desc"),
    sortOrder: num(formData, "sortOrder"),
  };
  try {
    await upsertProcessStep(supabase, s);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/process");
  redirect("/content/process");
}

export async function removeStep(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteProcessStep(supabase, id);
    revalidatePath("/content/process");
  }
}
