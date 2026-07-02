"use client";

import { useRouter } from "next/navigation";
import { Sparkles, Trash2 } from "lucide-react";
import type { CompanyValue } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeValue } from "./actions";

export default function ValuesTable({ items }: { items: CompanyValue[] }) {
  const router = useRouter();

  const columns: Column<CompanyValue>[] = [
    { key: "title", header: "Value", cell: (v) => <span className="font-medium text-foreground">{v.title || "Untitled"}</span> },
    { key: "icon", header: "Icon", cell: (v) => <span className="text-muted">{v.iconKey}</span> },
    { key: "desc", header: "Description", cell: (v) => <p className="max-w-md truncate text-muted">{v.description}</p> },
    { key: "order", header: "Order", cell: (v) => <span className="tabular text-muted">{v.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (v) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeValue}>
            <input type="hidden" name="id" value={v.id} />
            <ConfirmButton message={`Delete "${v.title || "this value"}"?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
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
      rows={items}
      rowKey={(v) => v.id}
      onRowClick={(v) => router.push(`/content/values/${v.id}`)}
      empty={<EmptyState icon={<Sparkles size={28} />} title="No values yet" description="Add your first company value." />}
    />
  );
}
