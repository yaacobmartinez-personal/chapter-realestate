import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, BlogPostRow } from "./types";

const TABLE = "blog_posts";

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    tag: row.tag,
    date: row.date,
    title: row.title,
    excerpt: row.excerpt,
    readTime: row.read_time,
    image: row.image,
    body: row.body ?? [],
  };
}

export function postToRow(p: BlogPost): BlogPostRow {
  return {
    slug: p.slug,
    tag: p.tag,
    date: p.date,
    title: p.title,
    excerpt: p.excerpt,
    read_time: p.readTime,
    image: p.image,
    body: p.body ?? [],
  };
}

export async function getBlogPosts(db: SupabaseClient): Promise<BlogPost[]> {
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(`getBlogPosts: ${error.message}`);
  return (data as BlogPostRow[]).map(rowToPost);
}

export async function getBlogPostBySlug(
  db: SupabaseClient,
  slug: string,
): Promise<BlogPost | null> {
  const { data, error } = await db.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`getBlogPostBySlug: ${error.message}`);
  return data ? rowToPost(data as BlogPostRow) : null;
}

export async function upsertBlogPost(db: SupabaseClient, p: BlogPost): Promise<BlogPost> {
  const { data, error } = await db
    .from(TABLE)
    .upsert(postToRow(p), { onConflict: "slug" })
    .select("*")
    .single();
  if (error) throw new Error(`upsertBlogPost: ${error.message}`);
  return rowToPost(data as BlogPostRow);
}

export async function deleteBlogPost(db: SupabaseClient, slug: string): Promise<void> {
  const { error } = await db.from(TABLE).delete().eq("slug", slug);
  if (error) throw new Error(`deleteBlogPost: ${error.message}`);
}
