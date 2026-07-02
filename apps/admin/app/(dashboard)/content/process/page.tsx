import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProcessSteps } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ProcessTable from "./ProcessTable";

export const dynamic = "force-dynamic";

export default async function ProcessPage() {
  const supabase = await createClient();
  const items = await getProcessSteps(supabase);
  return (
    <div>
      <PageHeader
        title="Chapter's Process"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "step" : "steps"}`}
        actions={
          <Link href="/content/process/new">
            <Button><Plus size={16} /> New step</Button>
          </Link>
        }
      />
      <ProcessTable items={items} />
    </div>
  );
}
