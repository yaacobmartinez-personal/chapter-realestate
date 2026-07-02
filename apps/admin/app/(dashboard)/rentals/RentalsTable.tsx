"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KeyRound, Trash2 } from "lucide-react";
import type { RentalUnit } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import { Input, Select } from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { removeRental } from "./actions";

export default function RentalsTable({ rentals }: { rentals: RentalUnit[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const rows = rentals.filter((r) => {
    const q = search.toLowerCase();
    const matchesQ = !q || r.address.toLowerCase().includes(q) || r.area.toLowerCase().includes(q);
    return (
      matchesQ &&
      (category === "All" || r.category === category) &&
      (status === "All" || r.status === status)
    );
  });

  const columns: Column<RentalUnit>[] = [
    {
      key: "unit",
      header: "Unit",
      cell: (r) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-surface-2">
            {r.image && <Image src={r.image} alt={r.address} fill className="object-cover" sizes="64px" unoptimized />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{r.address || "Untitled"}</p>
            <p className="truncate text-xs text-muted">{r.area || "—"}</p>
          </div>
        </div>
      ),
    },
    { key: "rent", header: "Rent", cell: (r) => <span className="tabular text-foreground">{r.rent || "—"}</span> },
    { key: "category", header: "Category", cell: (r) => <span className="text-muted">{r.category}</span> },
    {
      key: "status",
      header: "Status",
      cell: (r) => <Badge tone={r.status === "Available" ? "success" : "neutral"} dot>{r.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (r) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeRental}>
            <input type="hidden" name="id" value={r.id} />
            <ConfirmButton
              message={`Delete ${r.address || "this unit"}? This cannot be undone.`}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger"
            >
              <Trash2 size={16} />
            </ConfirmButton>
          </form>
        </div>
      ),
    },
  ];

  const selectCls = "rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-ring";

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      onRowClick={(r) => router.push(`/rentals/${r.id}`)}
      toolbar={
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search address or area…" />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
            <option value="All">All categories</option>
            <option>Residential</option>
            <option>Commercial</option>
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
            <option value="All">All statuses</option>
            <option>Available</option>
            <option>Leased</option>
          </Select>
        </div>
      }
      empty={
        <EmptyState
          icon={<KeyRound size={28} />}
          title="No rentals found"
          description="Try adjusting filters, or add your first unit."
        />
      }
    />
  );
}
