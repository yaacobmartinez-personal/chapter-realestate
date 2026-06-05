import Link from "next/link";
import { Building2, FileText, Users, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  createServiceClient,
  getProperties,
  getBlogPosts,
  listProfiles,
  type Property,
} from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

const STATUSES: Property["status"][] = ["For Sale", "Pending", "Sold"];

export default async function DashboardPage() {
  const supabase = await createClient();
  const admin = createServiceClient();

  const [properties, posts, profiles] = await Promise.all([
    getProperties(supabase),
    getBlogPosts(supabase),
    listProfiles(admin),
  ]);

  const pending = profiles.filter((p) => p.status === "pending");
  const byStatus = STATUSES.map((s) => ({
    status: s,
    count: properties.filter((p) => p.status === s).length,
  }));
  const maxCount = Math.max(1, ...byStatus.map((b) => b.count));

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your listings, content, and accounts." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Properties" value={properties.length} icon={<Building2 size={20} />} href="/properties" />
        <StatCard label="Articles" value={posts.length} icon={<FileText size={20} />} href="/resources" />
        <StatCard label="Users" value={profiles.length} icon={<Users size={20} />} href="/users" />
        <StatCard
          label="Pending approvals"
          value={pending.length}
          icon={<Clock size={20} />}
          href="/users"
          tone={pending.length > 0 ? "warning" : "neutral"}
        />
      </div>

      {/* Pending approvals callout */}
      {pending.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-warning/30 bg-warning-surface px-5 py-4">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-warning" />
            <p className="text-sm text-foreground">
              {pending.length} account{pending.length === 1 ? "" : "s"} waiting for approval.
            </p>
          </div>
          <Link href="/users" className="text-sm font-medium text-accent hover:underline">
            Review →
          </Link>
        </div>
      )}

      {/* Listings by status */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-5 text-sm font-semibold text-foreground">Listings by status</h2>
        <div className="space-y-4">
          {byStatus.map(({ status, count }) => (
            <div key={status} className="flex items-center gap-4">
              <div className="w-24 shrink-0">
                <Badge tone={status === "Sold" ? "neutral" : status === "Pending" ? "warning" : "success"}>
                  {status}
                </Badge>
              </div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-sm tabular text-muted">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
