import rawContent from "@/lib/content/property-management.json";

// ─── Overview Benefits ────────────────────────────────────────────────────────
export interface PMBenefit {
  iconKey: string;
  title: string;
  desc: string;
}

// ─── Services ─────────────────────────────────────────────────────────────────
export interface PMServiceType {
  title: string;
  items: string[];
}

// ─── Property Types ───────────────────────────────────────────────────────────
export interface PMPropertyType {
  iconKey: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

// ─── Pricing Plans ────────────────────────────────────────────────────────────
export interface PMPlan {
  name: string;
  fee: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const raw = rawContent as unknown as {
  pmBenefits: PMBenefit[];
  pmServiceTypes: PMServiceType[];
  pmPropertyTypes: PMPropertyType[];
  pmPlans: PMPlan[];
  ownerPortalFeatures: string[];
  tenantPortalFeatures: string[];
};

export const pmBenefits = raw.pmBenefits;
export const pmServiceTypes = raw.pmServiceTypes;
export const pmPropertyTypes = raw.pmPropertyTypes;
export const pmPlans = raw.pmPlans;
export const ownerPortalFeatures = raw.ownerPortalFeatures;
export const tenantPortalFeatures = raw.tenantPortalFeatures;
