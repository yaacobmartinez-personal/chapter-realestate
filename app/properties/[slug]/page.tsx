import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug, getRelatedProperties } from "@/lib/data/properties";
import PropertyDetail from "@/components/properties/PropertyDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.address} — ${property.price} | Chapter Real Estate`,
    description: `${property.beds} bed, ${property.baths} bath home in ${property.area}, Winnipeg. Listed at ${property.price}. ${property.sqft} sqft.`,
    openGraph: {
      title: `${property.address} — ${property.price} | Chapter`,
      description: `${property.beds} bed, ${property.baths} bath in ${property.area}. ${property.sqft} sqft.`,
      url: `https://chapterrealestate.ca/properties/${property.slug}`,
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const related = getRelatedProperties(slug);

  return <PropertyDetail property={property} related={related} />;
}
