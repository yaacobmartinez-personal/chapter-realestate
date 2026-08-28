import { createClient } from "@/lib/supabase/server";
import { getProperties, getRentals } from "@chapter/db";
import RentalForm from "../RentalForm";

export const dynamic = "force-dynamic";

export default async function NewRentalPage() {
  const supabase = await createClient();
  // Properties are offered as a starting point in the form: picking one copies
  // its address, size and photos across. Existing rentals come along so the
  // picker can flag the ones already listed, rather than only failing on save.
  const [properties, rentals] = await Promise.all([
    getProperties(supabase),
    getRentals(supabase),
  ]);

  return (
    <RentalForm
      properties={properties}
      takenAddresses={rentals.map((r) => r.address)}
    />
  );
}
