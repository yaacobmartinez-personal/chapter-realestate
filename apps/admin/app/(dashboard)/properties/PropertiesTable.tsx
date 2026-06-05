"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { Property } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import DropdownMenu, { menuItemCls } from "@/components/ui/DropdownMenu";
import Badge from "@/components/ui/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import { Input, Select } from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { removeProperty } from "./actions";

function statusTone(s: Property["status"]) {
  return s === "For Sale" ? "success" : s === "Pending" ? "warning" : "neutral";
}

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
            {p.image && <Image src={p.image} alt={p.address} fill className="object-cover" sizes="64px" unoptimized />}
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
        <DropdownMenu>
          <Link href={`/properties/${p.id}`} className={menuItemCls}>Edit</Link>
          <form action={removeProperty} className="border-t border-border">
            <input type="hidden" name="id" value={p.id} />
            <ConfirmButton
              message={`Delete ${p.address || "this property"}? This cannot be undone.`}
              className={`${menuItemCls} text-danger`}
            >
              Delete
            </ConfirmButton>
          </form>
        </DropdownMenu>
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
