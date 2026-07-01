import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  Overview,
  AvailableRentals,
  OwnerTenantPortals,
  LandlordLead,
} from "@/components/property-management";

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

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero label="Property Management" heading="Hands-Off." headingAccent="High Returns." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80" />
      <Overview />
      <AvailableRentals />
      <OwnerTenantPortals />
      <LandlordLead />
    </>
  );
}
