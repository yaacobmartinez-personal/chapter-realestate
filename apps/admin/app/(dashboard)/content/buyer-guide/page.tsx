import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBuyerGuideSteps } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import BuyerGuideTable from "./BuyerGuideTable";

export const dynamic = "force-dynamic";

export default async function BuyerGuidePage() {
  const supabase = await createClient();
  const items = await getBuyerGuideSteps(supabase);
  return (
    <div>
      <PageHeader
        title="Buyer's Guide"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "step" : "steps"}`}
        actions={
          <Link href="/content/buyer-guide/new">
            <Button><Plus size={16} /> New step</Button>
          </Link>
        }
      />
      <BuyerGuideTable items={items} />
    </div>
  );
}
