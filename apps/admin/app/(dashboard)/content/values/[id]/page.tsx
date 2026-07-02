import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCompanyValues } from "@chapter/db";
import ValueForm from "../ValueForm";

export const dynamic = "force-dynamic";

export default async function EditValuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const v = (await getCompanyValues(supabase)).find((x) => x.id === id);
  if (!v) notFound();
  return <ValueForm value={v} />;
}
