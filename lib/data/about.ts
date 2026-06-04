import rawContent from "@/lib/content/about.json";

// ─── Values ──────────────────────────────────────────────────────────────────
export interface CompanyValue {
  iconKey: string;
  title: string;
  description: string;
}

// ─── Leadership Team ─────────────────────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface LeadershipGroup {
  label: string;
  heading: string;
  members: TeamMember[];
}

const raw = rawContent as unknown as {
  values: CompanyValue[];
  leadershipGroups: LeadershipGroup[];
};

export const companyValues = raw.values;
export const leadershipGroups = raw.leadershipGroups;
