import rawContent from "@/lib/content/investments.json";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

// ─── Opportunities ────────────────────────────────────────────────────────────
export interface InvestmentOpportunity {
  slug: string;
  iconKey: string;
  title: string;
  desc: string;
  tag: "Active" | "Upcoming";
  body: ContentBlock[];
}

export interface InvestmentStat {
  number: string;
  label: string;
}

// ─── Barso Group ──────────────────────────────────────────────────────────────
export interface BarsoEntity {
  name: string;
  desc: string;
  image: string;
  href: string;
}

// ─── Investor Process Steps ───────────────────────────────────────────────────
export interface InvestorStep {
  step: string;
  title: string;
  desc: string;
}

const raw = rawContent as unknown as {
  investmentOpportunities: InvestmentOpportunity[];
  investmentStats: InvestmentStat[];
  barsoEntities: BarsoEntity[];
  investorSteps: InvestorStep[];
};

export const investmentOpportunities = raw.investmentOpportunities;
export const investmentStats = raw.investmentStats;
export const barsoEntities = raw.barsoEntities;
export const investorSteps = raw.investorSteps;

export function getOpportunityBySlug(slug: string): InvestmentOpportunity | undefined {
  return investmentOpportunities.find((o) => o.slug === slug);
}
