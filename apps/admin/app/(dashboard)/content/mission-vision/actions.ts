"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertMissionVision, deleteMissionVision, type MissionVisionItem } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveMissionVision(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  const item: MissionVisionItem = {
    id: str(formData, "id") || randomUUID(),
    label: str(formData, "label"),
    heading: str(formData, "heading"),
    body: str(formData, "body"),
    sortOrder: num(formData, "sortOrder"),
  };
  try {
    await upsertMissionVision(supabase, item);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/mission-vision");
  redirect("/content/mission-vision");
}

export async function removeMissionVision(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteMissionVision(supabase, id);
    revalidatePath("/content/mission-vision");
  }
}
