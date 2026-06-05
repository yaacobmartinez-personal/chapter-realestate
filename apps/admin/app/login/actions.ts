"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileById } from "@chapter/db";

export type LoginState = { error: string } | null;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  // CMS gate: only approved admins may stay signed in.
  const profile = data.user ? await getProfileById(supabase, data.user.id) : null;
  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "This account isn't authorized for the CMS." };
  }
  if (profile.status !== "approved") {
    await supabase.auth.signOut();
    return {
      error:
        profile.status === "suspended"
          ? "This account has been suspended."
          : "Your account is pending approval.",
    };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
