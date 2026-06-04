import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@chapter/db";
import PropertyForm from "../PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const property = (await getProperties(supabase)).find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Edit property</h1>
      <PropertyForm property={property} />
    </div>
  );
}
