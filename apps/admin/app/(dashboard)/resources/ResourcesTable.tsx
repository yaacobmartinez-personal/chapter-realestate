"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { BlogPost } from "@chapter/db";
import DataTable, { type Column } from "@/components/ui/DataTable";
import DropdownMenu, { menuItemCls } from "@/components/ui/DropdownMenu";
import Badge from "@/components/ui/Badge";
import ConfirmButton from "@/components/ConfirmButton";
import { Input } from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { removeBlogPost } from "./actions";

export default function ResourcesTable({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");

  const rows = posts.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
  });

  const columns: Column<BlogPost>[] = [
    {
      key: "article",
      header: "Article",
      cell: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-surface-2">
            {p.image && <Image src={p.image} alt={p.title} fill className="object-cover" sizes="64px" unoptimized />}
          </div>
          <p className="min-w-0 truncate font-medium text-foreground">{p.title || "Untitled"}</p>
        </div>
      ),
    },
    { key: "tag", header: "Tag", cell: (p) => (p.tag ? <Badge tone="accent">{p.tag}</Badge> : <span className="text-muted">—</span>) },
    { key: "date", header: "Date", cell: (p) => <span className="text-muted">{p.date || "—"}</span> },
    { key: "read", header: "Read time", cell: (p) => <span className="text-muted">{p.readTime || "—"}</span> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (p) => (
        <DropdownMenu>
          <Link href={`/resources/${p.slug}`} className={menuItemCls}>Edit</Link>
          <form action={removeBlogPost} className="border-t border-border">
            <input type="hidden" name="slug" value={p.slug} />
            <ConfirmButton
              message={`Delete "${p.title || "this article"}"? This cannot be undone.`}
              className={`${menuItemCls} text-danger`}
            >
              Delete
            </ConfirmButton>
          </form>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(p) => p.slug}
      toolbar={
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title or tag…"
          className="max-w-sm"
        />
      }
      empty={<EmptyState icon={<FileText size={28} />} title="No articles found" description="Adjust your search, or write a new one." />}
    />
  );
}
