import rawContent from "@/lib/content/agents.json";
import { createAnonClient, getAgents as dbGetAgents, type Agent } from "@chapter/db";

export type { Agent } from "@chapter/db";

// Static snapshot — seeds Supabase and acts as a fallback when the DB is
// unreachable (or env vars are absent, e.g. during a local build).
const fallback = (rawContent as unknown as { agents: Agent[] }).agents;

let warned = false;
async function load(): Promise<Agent[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("Supabase env not set");
    const data = await dbGetAgents(createAnonClient());
    return data.length ? data : fallback;
  } catch (err) {
    if (!warned) {
      console.warn("[data] agents: using static fallback —", (err as Error).message);
      warned = true;
    }
    return fallback;
  }
}

export async function getAgents(): Promise<Agent[]> {
  return load();
}
