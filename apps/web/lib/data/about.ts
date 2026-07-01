import rawContent from "@/lib/content/about.json";

// ─── Values ──────────────────────────────────────────────────────────────────
export interface CompanyValue {
  iconKey: string;
  title: string;
  description: string;
}

// Chapter's core values (adapted for the Manitoba market).
export const companyValues: CompanyValue[] = [
  {
    iconKey: "Heart",
    title: "Put People First",
    description:
      "We prioritize relationships over transactions — listening closely, anticipating needs, and treating every client with respect.",
  },
  {
    iconKey: "Lightbulb",
    title: "Innovative Service",
    description:
      "We challenge the conventional way of doing things and find better, more creative ways to exceed expectations.",
  },
  {
    iconKey: "Users",
    title: "Build Community",
    description:
      "We foster a supportive environment where our team and our clients feel like an extended family.",
  },
  {
    iconKey: "Award",
    title: "Lead by Example",
    description:
      "We model transparency, humility, and integrity — inspiring change across our team and the wider industry.",
  },
  {
    iconKey: "TrendingUp",
    title: "Growth & Learning",
    description:
      "We stay curious and never stop learning, always sharpening our craft for the people we serve.",
  },
  {
    iconKey: "Zap",
    title: "Embrace Change",
    description:
      "We lead transformation in Manitoba real estate rather than react to it — always improving how we work.",
  },
];

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
  leadershipGroups: LeadershipGroup[];
};

export const leadershipGroups = raw.leadershipGroups;

// Flattened leadership list — shared by the homepage Team section so it stays
// in sync with the About page leadership.
export const leaders: TeamMember[] = leadershipGroups.flatMap((g) => g.members);
