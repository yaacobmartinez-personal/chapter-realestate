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
// Rentals are now database-backed — see `@/lib/data/rentals` (getRentals) and the
// `rentals` table in @chapter/db. The `RentalUnit` type lives in @chapter/db.

const raw = rawContent as unknown as {
  ownerPortalFeatures: string[];
  tenantPortalFeatures: string[];
};

export const ownerPortalFeatures = raw.ownerPortalFeatures;
export const tenantPortalFeatures = raw.tenantPortalFeatures;
