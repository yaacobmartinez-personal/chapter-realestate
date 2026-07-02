import Link from "next/link";
import { Contact, Quote, Sparkles, ListChecks, Share2, Compass, BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const sections = [
  { href: "/content/leadership", label: "Leadership", desc: "Founders & partners shown on the About and Home pages.", icon: Contact },
  { href: "/content/testimonials", label: "Testimonials", desc: "Client quotes shown on the Home page.", icon: Quote },
  { href: "/content/values", label: "Our Values", desc: "Company values shown on the About page.", icon: Sparkles },
  { href: "/content/mission-vision", label: "Mission & Vision", desc: "Mission and vision statements on the About page.", icon: Compass },
  { href: "/content/process", label: "Chapter's Process", desc: "The property-management process steps.", icon: ListChecks },
  { href: "/content/buyer-guide", label: "Buyer's Guide", desc: "The step-by-step guide on the Buyer's Guide page.", icon: BookOpen },
  { href: "/content/social", label: "Social Links", desc: "Social media links in the header and footer.", icon: Share2 },
];

export default function SiteContentPage() {
  return (
    <div>
      <PageHeader title="Site Content" subtitle="Manage the editable content across the public website" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, label, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-surface-2 text-accent group-hover:bg-surface">
              <Icon size={20} />
            </div>
            <p className="font-medium text-foreground">{label}</p>
            <p className="mt-1 text-sm text-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
