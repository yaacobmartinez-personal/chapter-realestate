import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { getProperties } from "@/lib/data/properties";

// Revalidate from the CMS-backed database at most once a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Properties — Winnipeg Real Estate Listings | Chapter",
  description:
    "Browse Chapter's curated property listings across Winnipeg — residential, luxury, and investment properties. Find your next home or investment today.",
  openGraph: {
    title: "Properties — Winnipeg Real Estate Listings | Chapter",
    description:
      "Browse Chapter's curated property listings across Winnipeg — residential, luxury, and investment properties.",
    url: "https://chapterrealestate.ca/properties",
  },
  twitter: {
    title: "Properties — Winnipeg Real Estate Listings | Chapter",
    description:
      "Browse Chapter's curated property listings across Winnipeg — residential, luxury, and investment properties.",
  },
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <>
      <PageHero
        label="Property Listings"
        heading="Find Your"
        headingAccent="Next Property."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80"
      />
      <PropertyGrid properties={properties} />
    </>
  );
}
