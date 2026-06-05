import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileById, type Profile } from "@chapter/db";

/** Current signed-in user's profile (or null). */
export async function getSessionProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return getProfileById(supabase, user.id);
}

/**
 * Gate for CMS-only areas: must be an approved admin.
 * Redirects to /login otherwise. Returns the profile when allowed.
 */
export async function requireAdmin(): Promise<Profile> {
  const profile = await getSessionProfile();
  if (!profile || profile.role !== "admin" || profile.status !== "approved") {
    redirect("/login?error=forbidden");
  }
  return profile;
}
