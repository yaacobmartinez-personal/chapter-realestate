import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTestimonials } from "@chapter/db";
import TestimonialForm from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const t = (await getTestimonials(supabase)).find((x) => x.id === id);
  if (!t) notFound();
  return <TestimonialForm testimonial={t} />;
}
