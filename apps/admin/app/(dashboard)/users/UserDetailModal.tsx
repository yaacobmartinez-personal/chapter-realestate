"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import ConfirmButton from "@/components/ConfirmButton";
import type { UserRow } from "./UsersTable";
import { setUserStatus, setUserRole, resetPassword, deleteUser } from "./actions";

const statusTone = { approved: "success", pending: "warning", suspended: "danger" } as const;

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

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{children}</span>
    </div>
  );
}

export default function UserDetailModal({
  user,
  isSelf,
  onClose,
}: {
  user: UserRow | null;
  isSelf: boolean;
  onClose: () => void;
}) {
  const [pw, setPw] = useState("");

  return (
    <Modal open={!!user} onClose={onClose}>
      {user && (
        <div>
          {/* Header */}
          <div className="flex items-center gap-4">
            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-base font-semibold ${colorFor(user.id)}`}>
              {initials(user.full_name, user.email)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-foreground">
                {user.full_name || "—"}
                {isSelf && <span className="ml-2 text-xs text-subtle">(you)</span>}
              </p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
            <div className="ml-auto">
              <Badge tone={statusTone[user.status]} dot>{user.status}</Badge>
            </div>
          </div>

          {/* Info */}
          <div className="mt-5 rounded-xl border border-border bg-surface-2/50 px-4">
            <InfoRow label="Role"><span className="capitalize">{user.role}</span></InfoRow>
            <InfoRow label="Status"><span className="capitalize">{user.status}</span></InfoRow>
            <InfoRow label="Registered"><span className="tabular">{fmt(user.created_at)}</span></InfoRow>
            <InfoRow label="Last active"><span className="tabular">{fmt(user.last_active)}</span></InfoRow>
            <InfoRow label="User ID"><span className="font-mono text-xs">{user.id}</span></InfoRow>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-5">
            {/* Approval + role */}
            <div className="flex flex-wrap items-end gap-3">
              {user.status !== "approved" && (
                <form action={setUserStatus} onSubmit={onClose}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="status" value="approved" />
                  <Button type="submit" variant="secondary" className="border-success/40 text-success">
                    Approve
                  </Button>
                </form>
              )}
              {user.status === "approved" && !isSelf && (
                <form action={setUserStatus} onSubmit={onClose}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="status" value="suspended" />
                  <Button type="submit" variant="secondary" className="border-warning/40 text-warning">
                    Suspend
                  </Button>
                </form>
              )}

              <form action={setUserRole} onSubmit={onClose} className="flex items-end gap-2">
                <input type="hidden" name="id" value={user.id} />
                <Field label="Role" className="w-40">
                  <Select name="role" defaultValue={user.role} disabled={isSelf}>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                    <option value="tenant">Tenant</option>
                  </Select>
                </Field>
                {!isSelf && <Button type="submit" variant="secondary">Update role</Button>}
              </form>
            </div>

            {/* Reset password */}
            <form
              action={resetPassword}
              onSubmit={(e) => {
                if (pw.length < 6) {
                  e.preventDefault();
                  return;
                }
                onClose();
              }}
              className="flex items-end gap-2"
            >
              <input type="hidden" name="id" value={user.id} />
              <Field label="Set new password" className="flex-1" help="Minimum 6 characters.">
                <Input name="password" type="text" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••" />
              </Field>
              <Button type="submit" variant="secondary">Set</Button>
            </form>

            {/* Delete */}
            {!isSelf && (
              <form action={deleteUser} onSubmit={onClose} className="border-t border-border pt-4">
                <input type="hidden" name="id" value={user.id} />
                <ConfirmButton
                  message={`Delete ${user.email}? This cannot be undone.`}
                  className="inline-flex items-center gap-2 rounded-lg border border-danger/40 px-4 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger-surface"
                >
                  Delete user
                </ConfirmButton>
              </form>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
