"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { cover, type Property } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import { Input, Select } from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { removeProperty } from "./actions";

function statusTone(s: Property["status"]) {
  return s === "For Sale" ? "success" : s === "Pending" ? "warning" : "neutral";
}

// Row actions sit inline rather than in a dropdown: the menu was clipped by the
// table on the last row, and it closed on click — unmounting the delete form
// before the browser could submit it. Matches the other admin tables.
const iconBtnCls =
  "grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground";
const dangerBtnCls =
  "grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger";

export default function PropertiesTable({ properties }: { properties: Property[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const rows = properties.filter((p) => {
    const q = search.toLowerCase();
    const matchesQ =
      !q || p.address.toLowerCase().includes(q) || p.area.toLowerCase().includes(q);
    return matchesQ && (type === "All" || p.type === type) && (status === "All" || p.status === status);
  });

  const columns: Column<Property>[] = [
    {
      key: "property",
      header: "Property",
      cell: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-surface-2">
            <Image src={cover(p.image, p.images)} alt={p.address} fill className="object-cover" sizes="64px" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{p.address || "Untitled"}</p>
            <p className="truncate text-xs text-muted">{p.area || "—"}</p>
          </div>
        </div>
      ),
    },
    { key: "price", header: "Price", cell: (p) => <span className="tabular text-foreground">{p.price || "—"}</span> },
    { key: "type", header: "Type", cell: (p) => <span className="text-muted">{p.type}</span> },
    { key: "status", header: "Status", cell: (p) => <Badge tone={statusTone(p.status)} dot>{p.status}</Badge> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (p) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/properties/${p.id}`}
            title="Edit"
            aria-label={`Edit ${p.address || "property"}`}
            className={iconBtnCls}
          >
            <Pencil size={16} />
          </Link>
          <form action={removeProperty}>
            <input type="hidden" name="id" value={p.id} />
            <ConfirmButton
              message={`Delete ${p.address || "this property"}? This cannot be undone.`}
              className={dangerBtnCls}
              title="Delete"
              aria-label={`Delete ${p.address || "property"}`}
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
      rowKey={(p) => p.id}
      toolbar={
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search address or area…" />
          <Select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
            <option value="All">All types</option>
            <option>Residential</option>
            <option>Luxury</option>
            <option>Investment</option>
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
            <option value="All">All statuses</option>
            <option>For Sale</option>
            <option>Pending</option>
            <option>Sold</option>
          </Select>
        </div>
      }
      empty={
        <EmptyState
          icon={<Building2 size={28} />}
          title="No properties found"
          description="Try adjusting filters, or add your first listing."
        />
      }
    />
  );
}
