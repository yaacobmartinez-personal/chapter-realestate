import rawContent from "@/lib/content/recruitment.json";

// ─── Why Join ─────────────────────────────────────────────────────────────────
export interface WhyJoinReason {
  iconKey: string;
  title: string;
  desc: string;
}

// ─── Commission Models ────────────────────────────────────────────────────────
export interface CommissionModel {
  name: string;
  structure: string;
  fee: string;
  best: string;
  features: string[];
  featured?: boolean;
}

const raw = rawContent as unknown as {
  whyJoinReasons: WhyJoinReason[];
  commissionModels: CommissionModel[];
  agentBenefits: string[];
};

export const whyJoinReasons = raw.whyJoinReasons;
export const commissionModels = raw.commissionModels;
export const agentBenefits = raw.agentBenefits;
