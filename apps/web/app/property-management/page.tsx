import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  Overview,
  AvailableRentals,
  OwnerTenantPortals,
  LandlordLead,
} from "@/components/property-management";
import { getRentals } from "@/lib/data/rentals";
import { getProcess } from "@/lib/data/process";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Property Management Winnipeg — Hands-Off, High Returns",
  description:
    "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting — hands-off management with high returns.",
  openGraph: {
    title: "Property Management Winnipeg — Hands-Off, High Returns | Chapter",
    description:
      "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting — hands-off management with high returns.",
    url: "https://chapterrealestate.ca/property-management",
  },
  twitter: {
    title: "Property Management Winnipeg — Hands-Off, High Returns | Chapter",
    description:
      "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting — hands-off management with high returns.",
  },
};

export default async function PropertyManagementPage() {
  const [rentals, steps] = await Promise.all([getRentals(), getProcess()]);
  return (
    <>
      <PageHero label="Property Management" heading="Hands-Off." headingAccent="High Returns." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80" />
      <Overview steps={steps} />
      <AvailableRentals rentals={rentals} />
      <OwnerTenantPortals />
      <LandlordLead />
    </>
  );
}
