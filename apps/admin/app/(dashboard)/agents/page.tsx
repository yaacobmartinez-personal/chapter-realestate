import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAgents } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import AgentsTable from "./AgentsTable";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const supabase = await createClient();
  const agents = await getAgents(supabase);

  return (
    <div>
      <PageHeader
        title="Agents"
        subtitle={`${agents.length} ${agents.length === 1 ? "agent" : "agents"}`}
        actions={
          <Link href="/agents/new">
            <Button>
              <Plus size={16} /> New agent
            </Button>
          </Link>
        }
      />
      <AgentsTable agents={agents} />
    </div>
  );
}
