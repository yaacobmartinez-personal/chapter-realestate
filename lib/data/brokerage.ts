import rawContent from "@/lib/content/brokerage.json";

// ─── Buy Section ─────────────────────────────────────────────────────────────
export interface BuyCategory {
  image: string;
  label: string;
}

// ─── Sell Section ─────────────────────────────────────────────────────────────
export interface SellStep {
  step: string;
  title: string;
  desc: string;
}

// ─── Featured Listings ────────────────────────────────────────────────────────
export interface Listing {
  image: string;
  price: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
}

// ─── Agents Directory ─────────────────────────────────────────────────────────
export interface Agent {
  name: string;
  specialties: string;
  phone: string;
  email: string;
  image: string;
  listings: number;
}

// ─── Market Stats ─────────────────────────────────────────────────────────────
export interface MarketStat {
  label: string;
  value: string;
  note: string;
}

const raw = rawContent as unknown as {
  buyCategories: BuyCategory[];
  buyBenefits: string[];
  sellingSteps: SellStep[];
  featuredListings: Listing[];
  listingFilters: string[];
  agents: Agent[];
  brokerageMarketStats: MarketStat[];
};

export const buyCategories = raw.buyCategories;
export const buyBenefits = raw.buyBenefits;
export const sellingSteps = raw.sellingSteps;
export const featuredListings = raw.featuredListings;
export const listingFilters = raw.listingFilters;
export const agents = raw.agents;
export const brokerageMarketStats = raw.brokerageMarketStats;
