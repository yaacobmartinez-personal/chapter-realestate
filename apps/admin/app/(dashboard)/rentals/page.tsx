import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getRentals } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import RentalsTable from "./RentalsTable";

export const dynamic = "force-dynamic";

export default async function RentalsPage() {
  const supabase = await createClient();
  const rentals = await getRentals(supabase);

  return (
    <div>
      <PageHeader
        title="Rentals"
        subtitle={`${rentals.length} ${rentals.length === 1 ? "unit" : "units"}`}
        actions={
          <Link href="/rentals/new">
            <Button>
              <Plus size={16} /> New rental
            </Button>
          </Link>
        }
      />
      <RentalsTable rentals={rentals} />
    </div>
  );
}
