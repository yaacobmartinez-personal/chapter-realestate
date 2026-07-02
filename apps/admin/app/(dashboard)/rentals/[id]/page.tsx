import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRentals } from "@chapter/db";
import RentalForm from "../RentalForm";

export const dynamic = "force-dynamic";

export default async function EditRentalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const rental = (await getRentals(supabase)).find((r) => r.id === id);
  if (!rental) notFound();

  return <RentalForm rental={rental} />;
}
