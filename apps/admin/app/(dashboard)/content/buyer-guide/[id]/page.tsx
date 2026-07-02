import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBuyerGuideSteps } from "@chapter/db";
import BuyerGuideForm from "../BuyerGuideForm";

export const dynamic = "force-dynamic";

export default async function EditBuyerGuideStepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const step = (await getBuyerGuideSteps(supabase)).find((x) => x.id === id);
  if (!step) notFound();
  return <BuyerGuideForm step={step} />;
}
