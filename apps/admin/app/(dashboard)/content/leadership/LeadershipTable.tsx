"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Contact, Trash2 } from "lucide-react";
import { cover, type TeamMember } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeTeamMember } from "./actions";

export default function LeadershipTable({ members }: { members: TeamMember[] }) {
  const router = useRouter();

  const columns: Column<TeamMember>[] = [
    {
      key: "member",
      header: "Member",
      cell: (m) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-2">
            <Image src={cover(m.image)} alt={m.name} fill className="object-cover" sizes="44px" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{m.name || "Unnamed"}</p>
            <p className="truncate text-xs text-muted">{m.role || "—"}</p>
          </div>
        </div>
      ),
    },
    { key: "order", header: "Order", cell: (m) => <span className="tabular text-muted">{m.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (m) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeTeamMember}>
            <input type="hidden" name="id" value={m.id} />
            <ConfirmButton message={`Delete ${m.name || "this member"}?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
              <Trash2 size={16} />
            </ConfirmButton>
          </form>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={members}
      rowKey={(m) => m.id}
      onRowClick={(m) => router.push(`/content/leadership/${m.id}`)}
      empty={<EmptyState icon={<Contact size={28} />} title="No leadership yet" description="Add your first team member." />}
    />
  );
}
