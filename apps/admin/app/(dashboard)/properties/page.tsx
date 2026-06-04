import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@chapter/db";
import { removeProperty } from "./actions";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const supabase = await createClient();
  const properties = await getProperties(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
          <p className="text-muted mt-1">{properties.length} listings</p>
        </div>
        <Link
          href="/properties/new"
          className="flex items-center gap-2 rounded-lg bg-foreground text-white px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} />
          New property
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {properties.length === 0 && (
          <p className="p-6 text-sm text-muted">No properties yet.</p>
        )}
        {properties.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-background">
              {p.image && (
                <Image src={p.image} alt={p.address} fill className="object-cover" sizes="80px" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.address || "Untitled"}</p>
              <p className="truncate text-sm text-muted">
                {p.price} · {p.area} · {p.status}
              </p>
            </div>
            <Link
              href={`/properties/${p.id}`}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent"
            >
              Edit
            </Link>
            <form action={removeProperty}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-red-600 hover:border-red-300"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
