import { createServiceClient, listProfiles } from "@chapter/db";
import { requireAdmin } from "@/lib/auth";
import PageHeader from "@/components/ui/PageHeader";
import CreateUserModal from "./CreateUserModal";
import UsersTable, { type UserRow } from "./UsersTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const me = await requireAdmin();
  const admin = createServiceClient();

  const profiles = await listProfiles(admin);

  // Merge last sign-in time from the auth users list.
  const lastActive = new Map<string, string | null>();
  try {
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    for (const u of data.users) lastActive.set(u.id, u.last_sign_in_at ?? null);
  } catch {
    // non-fatal — table just shows "—" for last active
  }

  const users: UserRow[] = profiles.map((p) => ({
    id: p.id,
    email: p.email,
    full_name: p.full_name,
    role: p.role,
    status: p.status,
    created_at: p.created_at,
    last_active: lastActive.get(p.id) ?? null,
  }));

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${users.length} ${users.length === 1 ? "account" : "accounts"} · new sign-ups stay pending until approved.`}
        actions={<CreateUserModal />}
      />
      <UsersTable users={users} meId={me.id} />
    </div>
  );
}
