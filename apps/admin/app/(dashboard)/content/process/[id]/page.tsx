import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProcessSteps } from "@chapter/db";
import ProcessForm from "../ProcessForm";

export const dynamic = "force-dynamic";

export default async function EditProcessStepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const s = (await getProcessSteps(supabase)).find((x) => x.id === id);
  if (!s) notFound();
  return <ProcessForm step={s} />;
}
