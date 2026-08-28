"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Contact, Trash2 } from "lucide-react";
import { cover, type Agent } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import { Input } from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { removeAgent } from "./actions";

export default function AgentsTable({ agents }: { agents: Agent[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const rows = agents.filter((a) => {
    const q = search.toLowerCase();
    return (
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.specialties.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  });

  const columns: Column<Agent>[] = [
    {
      key: "agent",
      header: "Agent",
      cell: (a) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-2">
            <Image src={cover(a.image)} alt={a.name} fill className="object-cover" sizes="44px" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{a.name || "Unnamed"}</p>
            <p className="truncate text-xs text-muted">{a.specialties || "—"}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", cell: (a) => <span className="text-muted">{a.phone || "—"}</span> },
    { key: "email", header: "Email", cell: (a) => <span className="text-muted">{a.email || "—"}</span> },
    { key: "listings", header: "Listings", cell: (a) => <span className="tabular text-foreground">{a.listings}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (a) => (
        // Stop propagation so deleting doesn't also trigger the row's edit navigation.
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeAgent}>
            <input type="hidden" name="id" value={a.id} />
            <ConfirmButton
              message={`Delete ${a.name || "this agent"}? This cannot be undone.`}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger"
            >
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
      rows={rows}
      rowKey={(a) => a.id}
      onRowClick={(a) => router.push(`/agents/${a.id}`)}
      toolbar={
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, specialty, or email…"
        />
      }
      empty={
        <EmptyState
          icon={<Contact size={28} />}
          title="No agents found"
          description="Try a different search, or add your first agent."
        />
      }
    />
  );
}
