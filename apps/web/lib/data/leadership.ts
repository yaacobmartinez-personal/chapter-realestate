import rawContent from "@/lib/content/leadership.json";
import { createAnonClient, getTeamMembers, type TeamMember } from "@chapter/db";

export type { TeamMember } from "@chapter/db";

const fallback = (rawContent as unknown as { leadership: TeamMember[] }).leadership;

let warned = false;
export async function getLeadership(): Promise<TeamMember[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await getTeamMembers(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] leadership: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}
