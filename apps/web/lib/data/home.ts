import rawContent from "@/lib/content/home.json";

// ─── Stats Bar ───────────────────────────────────────────────────────────────
export interface HomeStat {
  value: number;
  suffix: string;
  label: string;
}

// ─── Services ────────────────────────────────────────────────────────────────
export interface HomeService {
  iconKey: string;
  title: string;
  description: string;
  href: string;
  accent: string;
}

// ─── Featured Listings (home preview) ────────────────────────────────────────
export interface HomeListing {
  image: string;
  price: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
}

// ─── Why Chapter ─────────────────────────────────────────────────────────────
export interface WhyPillar {
  number: string;
  title: string;
  description: string;
}

// ─── Market Insights (home preview) ──────────────────────────────────────────
export interface InsightPost {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

// Team & testimonials are now database-backed — see `@/lib/data/leadership` and
// `@/lib/data/testimonials`.

const raw = rawContent as unknown as {
  stats: HomeStat[];
  services: HomeService[];
  featuredListings: HomeListing[];
  whyPillars: WhyPillar[];
  insightPosts: InsightPost[];
  pmCtaBenefits: string[];
};

export const homeStats = raw.stats;
export const homeServices = raw.services;
export const homeFeaturedListings = raw.featuredListings;
export const whyPillars = raw.whyPillars;
export const homeInsightPosts = raw.insightPosts;
export const pmCtaBenefits = raw.pmCtaBenefits;
