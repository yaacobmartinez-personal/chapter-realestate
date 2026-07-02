import type { SupabaseClient } from "@supabase/supabase-js";
import type { Agent, AgentRow } from "./types";

const TABLE = "agents";

function rowToAgent(row: AgentRow): Agent {
  return {
    id: row.id,
    name: row.name,
    specialties: row.specialties,
    phone: row.phone,
    email: row.email,
    image: row.image,
    listings: row.listings,
  };
}

export function agentToRow(a: Agent): AgentRow {
  return {
    id: a.id,
    name: a.name,
    specialties: a.specialties,
    phone: a.phone,
    email: a.email,
    image: a.image,
    listings: a.listings,
  };
}

export async function getAgents(db: SupabaseClient): Promise<Agent[]> {
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(`getAgents: ${error.message}`);
  return (data as AgentRow[]).map(rowToAgent);
}

export async function upsertAgent(db: SupabaseClient, a: Agent): Promise<Agent> {
  const { data, error } = await db
    .from(TABLE)
    .upsert(agentToRow(a), { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw new Error(`upsertAgent: ${error.message}`);
  return rowToAgent(data as AgentRow);
}

export async function deleteAgent(db: SupabaseClient, id: string): Promise<void> {
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(`deleteAgent: ${error.message}`);
}
