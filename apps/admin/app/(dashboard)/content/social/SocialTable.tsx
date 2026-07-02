"use client";

import { useRouter } from "next/navigation";
import { Share2, Trash2 } from "lucide-react";
import type { SocialLink } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeSocialLink } from "./actions";

export default function SocialTable({ items }: { items: SocialLink[] }) {
  const router = useRouter();

  const columns: Column<SocialLink>[] = [
    { key: "name", header: "Platform", cell: (s) => <span className="font-medium text-foreground">{s.name}</span> },
    { key: "href", header: "URL", cell: (s) => <span className="max-w-md truncate text-muted">{s.href}</span> },
    { key: "enabled", header: "Shown", cell: (s) => <Badge tone={s.enabled ? "success" : "neutral"} dot>{s.enabled ? "Enabled" : "Hidden"}</Badge> },
    { key: "order", header: "Order", cell: (s) => <span className="tabular text-muted">{s.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (s) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeSocialLink}>
            <input type="hidden" name="id" value={s.id} />
            <ConfirmButton message={`Delete ${s.name || "this link"}?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
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
      onRowClick={(s) => router.push(`/content/social/${s.id}`)}
      empty={<EmptyState icon={<Share2 size={28} />} title="No social links yet" description="Add your first social link." />}
    />
  );
}
