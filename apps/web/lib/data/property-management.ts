import rawContent from "@/lib/content/property-management.json";

// ─── The Chapter Advantage (key strengths) ────────────────────────────────────
export interface PMStrength {
  iconKey: string;
  title: string;
  desc: string;
}

// Photos of Chapter-managed rental properties, shown as a 2x2 grid beside the
// "Chapter Advantage for Landlords" intro. Files live in `apps/web/public`.
export const pmGalleryImages = [
  { src: "/landlords.jpg", alt: "A Chapter-managed rental duplex in Winnipeg" },
  { src: "/landlords2.jpg", alt: "A Chapter-managed rental property in Winnipeg" },
  { src: "/landlords3.jpeg", alt: "A Chapter-managed rental property in Winnipeg" },
  { src: "/landlords4.jpeg", alt: "A Chapter-managed rental property in Winnipeg" },
];

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
// Process steps are now database-backed — see `@/lib/data/process` (getProcess)
// and the `process_steps` table in @chapter/db.

// ─── Available Rentals ────────────────────────────────────────────────────────
// Rentals are now database-backed — see `@/lib/data/rentals` (getRentals) and the
// `rentals` table in @chapter/db. The `RentalUnit` type lives in @chapter/db.

const raw = rawContent as unknown as {
  ownerPortalFeatures: string[];
  tenantPortalFeatures: string[];
};

export const ownerPortalFeatures = raw.ownerPortalFeatures;
export const tenantPortalFeatures = raw.tenantPortalFeatures;
