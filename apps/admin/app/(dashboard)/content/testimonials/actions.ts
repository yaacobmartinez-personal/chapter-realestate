"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertTestimonial, deleteTestimonial, type Testimonial } from "@chapter/db";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => (Number.isFinite(Number(fd.get(k))) ? Number(fd.get(k)) : 0);

export type SaveState = { error: string } | null;

export async function saveTestimonial(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClient();
  const t: Testimonial = {
    id: str(formData, "id") || randomUUID(),
    text: str(formData, "text"),
    author: str(formData, "author"),
    context: str(formData, "context"),
    sortOrder: num(formData, "sortOrder"),
  };
  try {
    await upsertTestimonial(supabase, t);
  } catch (err) {
    return { error: (err as Error).message };
  }
  revalidatePath("/content/testimonials");
  redirect("/content/testimonials");
}

export async function removeTestimonial(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteTestimonial(supabase, id);
    revalidatePath("/content/testimonials");
  }
}
