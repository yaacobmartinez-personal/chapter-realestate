import Link from "next/link";
import { Building2, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProperties, getBlogPosts } from "@chapter/db";

export default async function DashboardPage() {
  const supabase = await createClient();
  const [properties, posts] = await Promise.all([
    getProperties(supabase),
    getBlogPosts(supabase),
  ]);

  const cards = [
    {
      href: "/properties",
      label: "Properties",
      count: properties.length,
      icon: Building2,
    },
    { href: "/resources", label: "Resources", count: posts.length, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted mt-1">Manage listings and articles for the site.</p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {cards.map(({ href, label, count, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-border bg-surface p-6 hover:border-accent transition-colors"
          >
            <Icon className="text-accent" size={24} />
            <p className="mt-4 text-3xl font-semibold">{count}</p>
            <p className="text-muted text-sm">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
