"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, Trash2 } from "lucide-react";
import type { BuyerGuideStep } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeBuyerGuideStep } from "./actions";

export default function BuyerGuideTable({ items }: { items: BuyerGuideStep[] }) {
  const router = useRouter();

  const columns: Column<BuyerGuideStep>[] = [
    {
      key: "step",
      header: "Step",
      cell: (s) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-surface-2">
            {s.image && <Image src={s.image} alt={s.title} fill className="object-cover" sizes="64px" unoptimized />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground"><span className="text-accent">{s.step}</span> · {s.title || "Untitled"}</p>
            <p className="truncate text-xs text-muted">{s.paragraphs[0] ?? ""}</p>
          </div>
        </div>
      ),
    },
    { key: "paras", header: "Paragraphs", cell: (s) => <span className="tabular text-muted">{s.paragraphs.length}</span> },
    { key: "order", header: "Order", cell: (s) => <span className="tabular text-muted">{s.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (s) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeBuyerGuideStep}>
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
      onRowClick={(s) => router.push(`/content/buyer-guide/${s.id}`)}
      empty={<EmptyState icon={<BookOpen size={28} />} title="No steps yet" description="Add your first buyer's guide step." />}
    />
  );
}
