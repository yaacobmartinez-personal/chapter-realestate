"use client";

import { useRouter } from "next/navigation";
import { Quote, Trash2 } from "lucide-react";
import type { Testimonial } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ConfirmButton from "@/components/ConfirmButton";
import EmptyState from "@/components/ui/EmptyState";
import { removeTestimonial } from "./actions";

export default function TestimonialsTable({ items }: { items: Testimonial[] }) {
  const router = useRouter();

  const columns: Column<Testimonial>[] = [
    {
      key: "quote",
      header: "Quote",
      cell: (t) => <p className="max-w-xl truncate text-foreground">“{t.text}”</p>,
    },
    { key: "author", header: "Author", cell: (t) => <span className="text-muted">{t.author}</span> },
    { key: "context", header: "Context", cell: (t) => <span className="text-muted">{t.context}</span> },
    { key: "order", header: "Order", cell: (t) => <span className="tabular text-muted">{t.sortOrder}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (t) => (
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <form action={removeTestimonial}>
            <input type="hidden" name="id" value={t.id} />
            <ConfirmButton message={`Delete this testimonial from ${t.author || "the author"}?`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-danger-surface hover:text-danger">
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
      rowKey={(t) => t.id}
      onRowClick={(t) => router.push(`/content/testimonials/${t.id}`)}
      empty={<EmptyState icon={<Quote size={28} />} title="No testimonials yet" description="Add your first client quote." />}
    />
  );
}
