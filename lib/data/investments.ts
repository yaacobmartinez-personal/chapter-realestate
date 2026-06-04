import rawContent from "@/lib/content/investments.json";

// ─── Opportunities ────────────────────────────────────────────────────────────
export interface InvestmentOpportunity {
  iconKey: string;
  title: string;
  desc: string;
  tag: "Active" | "Upcoming";
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
