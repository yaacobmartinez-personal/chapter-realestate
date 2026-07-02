"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertTeamMember, deleteTeamMember, type TeamMember } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveTeamMember(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  let images: string[] = [];
  try { images = JSON.parse(str(formData, "images") || "[]"); } catch { images = []; }

  const member: TeamMember = {
    id: str(formData, "id") || randomUUID(),
    name: str(formData, "name"),
    role: str(formData, "role"),
    bio: str(formData, "bio"),
    image: images[0] ?? str(formData, "image"),
    sortOrder: num(formData, "sortOrder"),
  };

  try {
    await upsertTeamMember(supabase, member);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/leadership");
  redirect("/content/leadership");
}

export async function removeTeamMember(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteTeamMember(supabase, id);
    revalidatePath("/content/leadership");
  }
}
