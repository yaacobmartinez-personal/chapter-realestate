import rawContent from "@/lib/content/resources.json";

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  body: ContentBlock[];
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

export function getArticleBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): BlogPost[] {
  const article = getArticleBySlug(slug);
  if (!article) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== slug && (p.tag === article.tag || p.slug !== slug))
    .slice(0, limit);
}
