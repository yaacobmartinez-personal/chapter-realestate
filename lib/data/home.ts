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

// ─── Team (home preview) ─────────────────────────────────────────────────────
export interface HomeTeamMember {
  name: string;
  role: string;
  image: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  text: string;
  author: string;
  context: string;
}

// ─── Market Insights (home preview) ──────────────────────────────────────────
export interface InsightPost {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

const raw = rawContent as unknown as {
  stats: HomeStat[];
  services: HomeService[];
  featuredListings: HomeListing[];
  whyPillars: WhyPillar[];
  teamMembers: HomeTeamMember[];
  testimonials: Testimonial[];
  insightPosts: InsightPost[];
  pmCtaBenefits: string[];
};

export const homeStats = raw.stats;
export const homeServices = raw.services;
export const homeFeaturedListings = raw.featuredListings;
export const whyPillars = raw.whyPillars;
export const homeTeamMembers = raw.teamMembers;
export const homeTestimonials = raw.testimonials;
export const homeInsightPosts = raw.insightPosts;
export const pmCtaBenefits = raw.pmCtaBenefits;
