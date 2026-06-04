import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

/**
 * Anonymous client — public, read-only access governed by RLS policies.
 * Safe to use in the public web app (server components).
 */
export function createAnonClient(): SupabaseClient {
  return createClient(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    { auth: { persistSession: false } },
  );
}

/**
 * Service-role client — bypasses RLS. SERVER-ONLY. Never import into a
 * client component or expose the key with a NEXT_PUBLIC_ prefix.
 * Used by the admin app for writes and by seed scripts.
 */
export function createServiceClient(): SupabaseClient {
  return createClient(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
}

export type { SupabaseClient };
