import rawContent from "@/lib/content/property-management.json";

// ─── The Chapter Advantage (key strengths) ────────────────────────────────────
export interface PMStrength {
  iconKey: string;
  title: string;
  desc: string;
}

// Why landlords choose Chapter (adapted for the Manitoba market).
export const pmStrengths: PMStrength[] = [
  {
    iconKey: "Award",
    title: "Expertise & Experience",
    desc: "Years of property management experience — we handle everything from tenant screening to maintenance coordination with professionalism.",
  },
  {
    iconKey: "BarChart3",
    title: "Maximize Rental Income",
    desc: "We run market analyses to set competitive rental pricing, so your property generates the best possible returns.",
  },
  {
    iconKey: "Heart",
    title: "Personalized Service",
    desc: "Tailored solutions for your needs as a landlord, with ongoing availability whenever you have questions or concerns.",
  },
];

// ─── Chapter's Process ────────────────────────────────────────────────────────
export interface PMProcessStep {
  step: string;
  title: string;
  desc: string;
}

// How Chapter manages a rental property, start to finish (Manitoba).
export const pmProcess: PMProcessStep[] = [
  { step: "01", title: "Initial Consultation", desc: "We start by understanding your rental goals and walk you through how Chapter manages your property." },
  { step: "02", title: "Property Evaluation", desc: "We assess your property's rental value based on location, size, condition, and amenities." },
  { step: "03", title: "Marketing Strategy", desc: "We create a custom marketing plan with professional photography and targeted advertising to attract quality tenants." },
  { step: "04", title: "Tenant Screening", desc: "We run thorough background checks, employment verification, and rental history reviews." },
  { step: "05", title: "Lease Agreement", desc: "We prepare a compliant lease outlining terms, rent, duration, and responsibilities." },
  { step: "06", title: "Move-In Inspection", desc: "We document the property's condition in detail to protect your interests." },
  { step: "07", title: "Periodic Inspections", desc: "We monitor your property over time to catch maintenance issues early." },
  { step: "08", title: "Rent Collection & Maintenance", desc: "We handle rent payments and coordinate repairs so you don't have to." },
  { step: "09", title: "Regular Communication", desc: "We keep you informed throughout the tenancy with clear, consistent updates." },
  { step: "10", title: "End-of-Tenancy Inspection", desc: "We complete a final assessment and handle the deposit per Manitoba's Residential Tenancies rules." },
];

// ─── Available Rentals ────────────────────────────────────────────────────────
export type RentalCategory = "Residential" | "Commercial";

export interface RentalUnit {
  id: string;
  image: string;
  rent: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: string;
  category: RentalCategory;
  status: "Available" | "Leased";
}

export const rentalCategories = ["All", "Residential", "Commercial"] as const;

// ⚠️ PLACEHOLDER RENTALS — mock data showing how available units render.
// Replace with real Chapter-managed units. Recommended: move to a Supabase
// `rentals` table (mirroring the `properties` flow in @chapter/db) so listings
// are editable without a deploy.
const RENTAL_PHOTO_RES = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80";
const RENTAL_PHOTO_COM = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export const rentalUnits: RentalUnit[] = [
  { id: "r1", image: RENTAL_PHOTO_RES, rent: "$1,650/mo", address: "Unit — Osborne Village", area: "Osborne Village", beds: 2, baths: 1, sqft: "850", category: "Residential", status: "Available" },
  { id: "r2", image: RENTAL_PHOTO_RES, rent: "$2,100/mo", address: "Unit — River Heights", area: "River Heights", beds: 3, baths: 2, sqft: "1,150", category: "Residential", status: "Available" },
  { id: "r3", image: RENTAL_PHOTO_RES, rent: "$1,250/mo", address: "Suite — Exchange District", area: "Exchange District", beds: 1, baths: 1, sqft: "600", category: "Residential", status: "Available" },
  { id: "r4", image: RENTAL_PHOTO_COM, rent: "$18/sqft", address: "Office Suite — Downtown", area: "Downtown", beds: 0, baths: 2, sqft: "2,400", category: "Commercial", status: "Available" },
  { id: "r5", image: RENTAL_PHOTO_COM, rent: "$14/sqft", address: "Retail Bay — St. Boniface", area: "St. Boniface", beds: 0, baths: 1, sqft: "1,800", category: "Commercial", status: "Available" },
  { id: "r6", image: RENTAL_PHOTO_COM, rent: "$12/sqft", address: "Warehouse — Inkster", area: "Inkster Industrial", beds: 0, baths: 1, sqft: "6,000", category: "Commercial", status: "Available" },
];

const raw = rawContent as unknown as {
  ownerPortalFeatures: string[];
  tenantPortalFeatures: string[];
};

export const ownerPortalFeatures = raw.ownerPortalFeatures;
export const tenantPortalFeatures = raw.tenantPortalFeatures;
