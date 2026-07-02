"use client";

import { useRouter } from "next/navigation";
import { ListChecks, Trash2 } from "lucide-react";
import type { ProcessStep } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeStep } from "./actions";

export default function ProcessTable({ items }: { items: ProcessStep[] }) {
  const router = useRouter();

  const columns: Column<ProcessStep>[] = [
    { key: "step", header: "Step", cell: (s) => <span className="tabular text-accent">{s.step}</span> },
    { key: "title", header: "Title", cell: (s) => <span className="font-medium text-foreground">{s.title || "Untitled"}</span> },
    { key: "desc", header: "Description", cell: (s) => <p className="max-w-md truncate text-muted">{s.desc}</p> },
    { key: "order", header: "Order", cell: (s) => <span className="tabular text-muted">{s.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (s) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeStep}>
            <input type="hidden" name="id" value={s.id} />
            <ConfirmButton message={`Delete step "${s.title || s.step}"?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
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
      rowKey={(s) => s.id}
      onRowClick={(s) => router.push(`/content/process/${s.id}`)}
      empty={<EmptyState icon={<ListChecks size={28} />} title="No steps yet" description="Add your first process step." />}
    />
  );
}
