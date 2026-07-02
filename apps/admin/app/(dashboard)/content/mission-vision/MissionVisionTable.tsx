"use client";

import { useRouter } from "next/navigation";
import { Compass, Trash2 } from "lucide-react";
import type { MissionVisionItem } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeMissionVision } from "./actions";

export default function MissionVisionTable({ items }: { items: MissionVisionItem[] }) {
  const router = useRouter();

  const columns: Column<MissionVisionItem>[] = [
    { key: "label", header: "Label", cell: (m) => <span className="font-medium text-foreground">{m.label || "Untitled"}</span> },
    { key: "heading", header: "Heading", cell: (m) => <p className="max-w-md truncate text-muted">{m.heading}</p> },
    { key: "order", header: "Order", cell: (m) => <span className="tabular text-muted">{m.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (m) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeMissionVision}>
            <input type="hidden" name="id" value={m.id} />
            <ConfirmButton message={`Delete "${m.label || "this statement"}"?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
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
      rowKey={(m) => m.id}
      onRowClick={(m) => router.push(`/content/mission-vision/${m.id}`)}
      empty={<EmptyState icon={<Compass size={28} />} title="No statements yet" description="Add your mission and vision." />}
    />
  );
}
