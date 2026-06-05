"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertBlogPost, deleteBlogPost, type BlogPost } from "@chapter/db";
import { parseBody } from "./body";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type SaveState = { error: string } | null;

export async function saveBlogPost(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const supabase = await createClient();

  const title = str(formData, "title");
  // originalSlug lets us keep the PK stable on edit even if title changes.
  const slug = str(formData, "originalSlug") || str(formData, "slug") || slugify(title);

  let images: string[] = [];
  try {
    images = JSON.parse(str(formData, "images") || "[]");
  } catch {
    images = [];
  }

  const post: BlogPost = {
    slug,
    title,
    tag: str(formData, "tag"),
    date: str(formData, "date"),
    excerpt: str(formData, "excerpt"),
    readTime: str(formData, "readTime"),
    image: images[0] ?? str(formData, "image"),
    body: parseBody(str(formData, "body")),
  };

  try {
    await upsertBlogPost(supabase, post);
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/resources");
  redirect("/resources"); // throws NEXT_REDIRECT — must stay outside the try
}

export async function removeBlogPost(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const slug = String(formData.get("slug") ?? "");
  if (slug) {
    await deleteBlogPost(supabase, slug);
    revalidatePath("/resources");
  }
}
