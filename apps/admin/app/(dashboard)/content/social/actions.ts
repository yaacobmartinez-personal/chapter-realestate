"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertSocialLink, deleteSocialLink, type SocialLink } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveSocialLink(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  const s: SocialLink = {
    id: str(formData, "id") || randomUUID(),
    name: str(formData, "name"),
    href: str(formData, "href"),
    enabled: formData.get("enabled") === "on",
    sortOrder: num(formData, "sortOrder"),
  };
  try {
    await upsertSocialLink(supabase, s);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/social");
  redirect("/content/social");
}

export async function removeSocialLink(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteSocialLink(supabase, id);
    revalidatePath("/content/social");
  }
}
