import Sidebar from "@/components/Sidebar";
import { requireAdmin } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();

  return (
    <div className="min-h-screen flex">
      <Sidebar email={profile.email ?? ""} />
      <main className="flex-1 p-8 max-w-7xl">{children}</main>
    </div>
  );
}
