import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getTeamMembers } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import LeadershipTable from "./LeadershipTable";

export const dynamic = "force-dynamic";

export default async function LeadershipPage() {
  const supabase = await createClient();
  const members = await getTeamMembers(supabase);
  return (
    <div>
      <PageHeader
        title="Leadership"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${members.length} ${members.length === 1 ? "member" : "members"}`}
        actions={
          <Link href="/content/leadership/new">
            <Button><Plus size={16} /> New member</Button>
          </Link>
        }
      />
      <LeadershipTable members={members} />
    </div>
  );
}
