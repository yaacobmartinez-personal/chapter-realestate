import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSocialLinks } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import SocialTable from "./SocialTable";

export const dynamic = "force-dynamic";

export default async function SocialPage() {
  const supabase = await createClient();
  const items = await getSocialLinks(supabase);
  return (
    <div>
      <PageHeader
        title="Social Links"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "link" : "links"}`}
        actions={
          <Link href="/content/social/new">
            <Button><Plus size={16} /> New link</Button>
          </Link>
        }
      />
      <SocialTable items={items} />
    </div>
  );
}
