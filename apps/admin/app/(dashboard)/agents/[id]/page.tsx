import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAgents } from "@chapter/db";
import AgentForm from "../AgentForm";

export const dynamic = "force-dynamic";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const agent = (await getAgents(supabase)).find((a) => a.id === id);
  if (!agent) notFound();

  return <AgentForm agent={agent} />;
}
