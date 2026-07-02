"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertCompanyValue, deleteCompanyValue, type CompanyValue } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveValue(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  const v: CompanyValue = {
    id: str(formData, "id") || randomUUID(),
    iconKey: str(formData, "iconKey") || "Heart",
    title: str(formData, "title"),
    description: str(formData, "description"),
    sortOrder: num(formData, "sortOrder"),
  };
  try {
    await upsertCompanyValue(supabase, v);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/values");
  redirect("/content/values");
}

export async function removeValue(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteCompanyValue(supabase, id);
    revalidatePath("/content/values");
  }
}
