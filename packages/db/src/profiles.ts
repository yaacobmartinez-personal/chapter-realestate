import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileRole = "admin" | "tenant" | "owner";
export type ProfileStatus = "pending" | "approved" | "suspended";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: ProfileRole;
  status: ProfileStatus;
  created_at?: string;
}

const TABLE = "profiles";

export async function getProfileById(
  db: SupabaseClient,
  id: string,
): Promise<Profile | null> {
  const { data, error } = await db.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getProfileById: ${error.message}`);
  return (data as Profile) ?? null;
}

/** Lists all profiles. Requires a service-role client (RLS hides other users). */
export async function listProfiles(db: SupabaseClient): Promise<Profile[]> {
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`listProfiles: ${error.message}`);
  return data as Profile[];
}

export async function upsertProfile(
  db: SupabaseClient,
  profile: Partial<Profile> & { id: string },
): Promise<void> {
  const { error } = await db.from(TABLE).upsert(profile, { onConflict: "id" });
  if (error) throw new Error(`upsertProfile: ${error.message}`);
}

export async function updateProfile(
  db: SupabaseClient,
  id: string,
  patch: Partial<Pick<Profile, "role" | "status" | "full_name">>,
): Promise<void> {
  const { error } = await db.from(TABLE).update(patch).eq("id", id);
  if (error) throw new Error(`updateProfile: ${error.message}`);
}
