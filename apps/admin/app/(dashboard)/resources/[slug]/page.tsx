import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBlogPostBySlug } from "@chapter/db";
import ResourceForm from "../ResourceForm";

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getBlogPostBySlug(supabase, slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Edit article</h1>
      <ResourceForm post={post} />
    </div>
  );
}
