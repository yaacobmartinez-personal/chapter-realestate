// Canonical shared types. Source of truth for both web and admin apps.

export type PropertyType = "Residential" | "Luxury" | "Investment";
export type PropertyStatus = "For Sale" | "Sold" | "Pending";

export interface Property {
  id: string;
  slug: string;
  image: string;
  images: string[];
  price: string;
  address: string;
  area: string;
  city: string;
  province: string;
  beds: number;
  baths: number;
  sqft: string;
  garage: number;
  lot: string;
  yearBuilt: number;
  mls: string;
  tag: string;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  coordinates: { lng: number; lat: number };
}

export interface Agent {
  id: string;
  name: string;
  specialties: string;
  phone: string;
  email: string;
  image: string;
  listings: number;
}

export type RentalCategory = "Residential" | "Commercial";
export type RentalStatus = "Available" | "Leased";

export interface RentalUnit {
  id: string;
  image: string;
  images: string[];
  rent: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  category: RentalCategory;
  status: RentalStatus;
}

// ─── Site content (managed in admin → Site Content) ──────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  context: string;
  sortOrder: number;
}

export interface CompanyValue {
  id: string;
  iconKey: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  desc: string;
  sortOrder: number;
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  sortOrder: number;
}

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

// Row shapes as stored in Postgres (snake_case). Mapped to/from the app types above.
export interface PropertyRow {
  id: string;
  slug: string;
  image: string;
  images: string[];
  price: string;
  address: string;
  area: string;
  city: string;
  province: string;
  beds: number;
  baths: number;
  sqft: string;
  garage: number;
  lot: string;
  year_built: number;
  mls: string;
  tag: string;
  type: PropertyType;
  status: PropertyStatus;
  description: string;
  features: string[];
  coordinates: { lng: number; lat: number };
  created_at?: string;
  updated_at?: string;
}

export interface BlogPostRow {
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  read_time: string;
  image: string;
  body: ContentBlock[];
  created_at?: string;
  updated_at?: string;
}

export interface AgentRow {
  id: string;
  name: string;
  specialties: string;
  phone: string;
  email: string;
  image: string;
  listings: number;
  created_at?: string;
  updated_at?: string;
}

export interface RentalUnitRow {
  id: string;
  image: string;
  images: string[];
  rent: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  category: RentalCategory;
  status: RentalStatus;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  author: string;
  context: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyValueRow {
  id: string;
  icon_key: string;
  title: string;
  description: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProcessStepRow {
  id: string;
  step: string;
  title: string;
  description: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLinkRow {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}
