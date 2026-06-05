"use server";

import { revalidatePath } from "next/cache";
import {
  createServiceClient,
  upsertProfile,
  updateProfile,
  type ProfileRole,
  type ProfileStatus,
} from "@chapter/db";
import { requireAdmin } from "@/lib/auth";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export type CreateState = { error: string } | { ok: true } | null;

export async function createUser(
  _prev: CreateState,
  fd: FormData,
): Promise<CreateState> {
  await requireAdmin();

  const email = str(fd, "email");
  const password = str(fd, "password");
  const fullName = str(fd, "full_name");
  const role = (str(fd, "role") || "tenant") as ProfileRole;
  const status = (str(fd, "status") || "pending") as ProfileStatus;

  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  const admin = createServiceClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (error) return { error: error.message };

  try {
    await upsertProfile(admin, {
      id: data.user.id,
      email,
      full_name: fullName,
      role,
      status,
    });
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/users");
  return { ok: true };
}

export async function setUserStatus(fd: FormData): Promise<void> {
  const me = await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status") as ProfileStatus;
  if (!id) return;
  if (id === me.id && status !== "approved") return; // can't lock yourself out

  await updateProfile(createServiceClient(), id, { status });
  revalidatePath("/users");
}

export async function setUserRole(fd: FormData): Promise<void> {
  const me = await requireAdmin();
  const id = str(fd, "id");
  const role = str(fd, "role") as ProfileRole;
  if (!id) return;
  if (id === me.id && role !== "admin") return; // can't demote yourself

  await updateProfile(createServiceClient(), id, { role });
  revalidatePath("/users");
}

export async function resetPassword(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = str(fd, "id");
  const password = str(fd, "password");
  if (!id || password.length < 6) return;

  const admin = createServiceClient();
  await admin.auth.admin.updateUserById(id, { password });
  revalidatePath("/users");
}

export async function deleteUser(fd: FormData): Promise<void> {
  const me = await requireAdmin();
  const id = str(fd, "id");
  if (!id || id === me.id) return; // can't delete yourself

  const admin = createServiceClient();
  await admin.auth.admin.deleteUser(id); // cascades to profiles row
  revalidatePath("/users");
}
