import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  Overview,
  Services,
  PropertyTypes,
  Pricing,
  OwnerTenantPortals,
  FreeAnalysisCTA,
} from "@/components/property-management";

export const metadata: Metadata = {
  title: "Property Management Winnipeg — Hands-Off, High Returns",
  description:
    "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting. Get a free rental analysis today.",
  openGraph: {
    title: "Property Management Winnipeg — Hands-Off, High Returns | Chapter",
    description:
      "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting. Get a free rental analysis today.",
    url: "https://chapterrealestate.ca/property-management",
  },
  twitter: {
    title: "Property Management Winnipeg — Hands-Off, High Returns | Chapter",
    description:
      "Chapter's property management services in Winnipeg handle everything — tenant screening, maintenance, rent collection, and reporting. Get a free rental analysis today.",
  },
};

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero label="Property Management" heading="Hands-Off." headingAccent="High Returns." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80" />
      <Overview />
      <Services />
      <PropertyTypes />
      <Pricing />
      <OwnerTenantPortals />
      <FreeAnalysisCTA />
    </>
  );
}
