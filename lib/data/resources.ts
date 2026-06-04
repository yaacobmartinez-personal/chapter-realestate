import rawContent from "@/lib/content/resources.json";

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export interface BlogPost {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
}

// ─── Guides ───────────────────────────────────────────────────────────────────
export interface Guide {
  title: string;
  desc: string;
  tag: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  q: string;
  a: string;
}

const raw = rawContent as unknown as {
  blogPosts: BlogPost[];
  guides: Guide[];
  faqs: FAQItem[];
};

export const blogPosts = raw.blogPosts;
export const guides = raw.guides;
export const faqs = raw.faqs;
