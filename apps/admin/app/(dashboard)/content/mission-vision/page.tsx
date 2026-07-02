import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getMissionVision } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import MissionVisionTable from "./MissionVisionTable";

export const dynamic = "force-dynamic";

export default async function MissionVisionPage() {
  const supabase = await createClient();
  const items = await getMissionVision(supabase);
  return (
    <div>
      <PageHeader
        title="Mission & Vision"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "statement" : "statements"}`}
        actions={
          <Link href="/content/mission-vision/new">
            <Button><Plus size={16} /> New statement</Button>
          </Link>
        }
      />
      <MissionVisionTable items={items} />
    </div>
  );
}
