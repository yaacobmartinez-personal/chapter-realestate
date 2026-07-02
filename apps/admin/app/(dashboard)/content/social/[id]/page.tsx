import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSocialLinks } from "@chapter/db";
import SocialForm from "../SocialForm";

export const dynamic = "force-dynamic";

export default async function EditSocialLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const s = (await getSocialLinks(supabase)).find((x) => x.id === id);
  if (!s) notFound();
  return <SocialForm link={s} />;
}
