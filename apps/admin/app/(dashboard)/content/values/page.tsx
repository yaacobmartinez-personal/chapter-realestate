import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCompanyValues } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ValuesTable from "./ValuesTable";

export const dynamic = "force-dynamic";

export default async function ValuesPage() {
  const supabase = await createClient();
  const items = await getCompanyValues(supabase);
  return (
    <div>
      <PageHeader
        title="Our Values"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "value" : "values"}`}
        actions={
          <Link href="/content/values/new">
            <Button><Plus size={16} /> New value</Button>
          </Link>
        }
      />
      <ValuesTable items={items} />
    </div>
  );
}
