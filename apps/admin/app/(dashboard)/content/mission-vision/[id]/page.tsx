import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMissionVision } from "@chapter/db";
import MissionVisionForm from "../MissionVisionForm";

export const dynamic = "force-dynamic";

export default async function EditMissionVisionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const item = (await getMissionVision(supabase)).find((x) => x.id === id);
  if (!item) notFound();
  return <MissionVisionForm item={item} />;
}
