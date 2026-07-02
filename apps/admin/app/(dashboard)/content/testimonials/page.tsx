import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getTestimonials } from "@chapter/db";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import TestimonialsTable from "./TestimonialsTable";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const items = await getTestimonials(supabase);
  return (
    <div>
      <PageHeader
        title="Testimonials"
        backHref="/content"
        backLabel="Site Content"
        subtitle={`${items.length} ${items.length === 1 ? "quote" : "quotes"}`}
        actions={
          <Link href="/content/testimonials/new">
            <Button><Plus size={16} /> New testimonial</Button>
          </Link>
        }
      />
      <TestimonialsTable items={items} />
    </div>
  );
}
