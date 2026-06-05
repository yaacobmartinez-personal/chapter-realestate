import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import PropertiesTable from "./PropertiesTable";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const supabase = await createClient();
  const properties = await getProperties(supabase);

  return (
    <div>
      <PageHeader
        title="Properties"
        subtitle={`${properties.length} ${properties.length === 1 ? "listing" : "listings"}`}
        actions={
          <Link href="/properties/new">
            <Button>
              <Plus size={16} /> New property
            </Button>
          </Link>
        }
      />
      <PropertiesTable properties={properties} />
    </div>
  );
}
