import rawContent from "@/lib/content/resources.json";
import {
  createAnonClient,
  getBlogPosts as dbGetBlogPosts,
  type BlogPost,
  type ContentBlock,
} from "@chapter/db";

export type { BlogPost, ContentBlock } from "@chapter/db";

// ─── Guides (static) ────────────────────────────────────────────────────────
export interface Guide {
  title: string;
  desc: string;
  tag: string;
}

// ─── FAQ (static) ───────────────────────────────────────────────────────────
export interface FAQItem {
  q: string;
  a: string;
}

const raw = rawContent as unknown as {
  blogPosts: BlogPost[];
  guides: Guide[];
  faqs: FAQItem[];
};

// Guides and FAQs aren't managed by the CMS yet — keep serving them statically.
export const guides = raw.guides;
export const faqs = raw.faqs;

const fallbackPosts = raw.blogPosts;

let warned = false;
async function loadPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGetBlogPosts(createAnonClient());
    return data.length ? data : fallbackPosts;
  } catch (err) {
    if (!warned) {
      console.warn("[data] blog posts: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallbackPosts;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return loadPosts();
}

export async function getArticleBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await loadPosts()).find((p) => p.slug === slug);
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<BlogPost[]> {
  const all = await loadPosts();
  const article = all.find((p) => p.slug === slug);
  if (!article) return all.slice(0, limit);
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

// Re-exported for type consumers that referenced the old constant name.
export type { BlogPost as Article };
