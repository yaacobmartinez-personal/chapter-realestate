import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTeamMembers } from "@chapter/db";
import LeadershipForm from "../LeadershipForm";

export const dynamic = "force-dynamic";

export default async function EditLeadershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const member = (await getTeamMembers(supabase)).find((m) => m.id === id);
  if (!member) notFound();
  return <LeadershipForm member={member} />;
}
