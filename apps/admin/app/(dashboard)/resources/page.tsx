import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBlogPosts } from "@chapter/db";
import { removeBlogPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const supabase = await createClient();
  const posts = await getBlogPosts(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
          <p className="text-muted mt-1">{posts.length} articles</p>
        </div>
        <Link
          href="/resources/new"
          className="flex items-center gap-2 rounded-lg bg-foreground text-white px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} />
          New article
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {posts.length === 0 && <p className="p-6 text-sm text-muted">No articles yet.</p>}
        {posts.map((post) => (
          <div key={post.slug} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{post.title || "Untitled"}</p>
              <p className="truncate text-sm text-muted">
                {post.tag} · {post.date} · {post.readTime}
              </p>
            </div>
            <Link
              href={`/resources/${post.slug}`}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent"
            >
              Edit
            </Link>
            <form action={removeBlogPost}>
              <input type="hidden" name="slug" value={post.slug} />
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-red-600 hover:border-red-300"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
