"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import type { ProfileRole, ProfileStatus } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Input, Select } from "@/components/ui/Field";
import UserDetailModal from "./UserDetailModal";

export type UserRow = {
  id: string;
  email: string;
  full_name: string;
  role: ProfileRole;
  status: ProfileStatus;
  created_at?: string;
  last_active: string | null;
};

const statusTone: Record<ProfileStatus, "success" | "warning" | "danger"> = {
  approved: "success",
  pending: "warning",
  suspended: "danger",
};

const AVATAR_COLORS = [
  "bg-rose-200 text-rose-700",
  "bg-sky-200 text-sky-700",
  "bg-amber-200 text-amber-700",
  "bg-violet-200 text-violet-700",
  "bg-emerald-200 text-emerald-700",
  "bg-orange-200 text-orange-700",
];

function initials(name: string, email: string): string {
  const base = name.trim() || email;
  const parts = base.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}
function colorFor(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function fmt(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function UsersTable({ users, meId }: { users: UserRow[]; meId: string }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = users.filter((u) => {
    const q = search.toLowerCase();
    const matchesQ =
      !q || u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchesQ && (role === "All" || u.role === role) && (status === "All" || u.status === status);
  });

  // Re-derive from the latest props so server-action updates reflect live.
  const selected = users.find((u) => u.id === selectedId) ?? null;

  const columns: Column<UserRow>[] = [
    {
      key: "user",
      header: "User name",
      cell: (u) => (
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${colorFor(u.id)}`}>
            {initials(u.full_name, u.email)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {u.full_name || "—"}
              {u.id === meId && <span className="ml-2 text-xs text-subtle">(you)</span>}
            </p>
            <p className="truncate text-xs text-muted">{u.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role", cell: (u) => <span className="capitalize text-muted">{u.role}</span> },
    { key: "registered", header: "Registered", cell: (u) => <span className="tabular text-muted">{fmt(u.created_at)}</span> },
    { key: "active", header: "Last active", cell: (u) => <span className="tabular text-muted">{fmt(u.last_active)}</span> },
    { key: "status", header: "Status", cell: (u) => <Badge tone={statusTone[u.status]} dot>{u.status}</Badge> },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(u) => u.id}
        onRowClick={(u) => setSelectedId(u.id)}
        toolbar={
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr]">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email…" />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="All">All roles</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </Select>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </Select>
          </div>
        }
        empty={<EmptyState icon={<Users size={28} />} title="No users found" description="Adjust filters or create a new user." />}
      />

      <UserDetailModal user={selected} isSelf={selected?.id === meId} onClose={() => setSelectedId(null)} />
    </>
  );
}
