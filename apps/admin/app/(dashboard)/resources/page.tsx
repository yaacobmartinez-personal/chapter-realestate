import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBlogPosts } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ResourcesTable from "./ResourcesTable";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const supabase = await createClient();
  const posts = await getBlogPosts(supabase);

  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle={`${posts.length} ${posts.length === 1 ? "article" : "articles"}`}
        actions={
          <Link href="/resources/new">
            <Button>
              <Plus size={16} /> New article
            </Button>
          </Link>
        }
      />
      <ResourcesTable posts={posts} />
    </div>
  );
}
