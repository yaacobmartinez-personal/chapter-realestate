import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperties, getPropertyBySlug, getRelatedProperties } from "@/lib/data/properties";
import PropertyDetail from "@/components/properties/PropertyDetail";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.address} — ${property.price} | Chapter Real Estate`,
    description: `${property.beds} bed, ${property.baths} bath home in ${property.area}, Winnipeg. Listed at ${property.price}. ${property.sqft} sqft.`,
    openGraph: {
      title: `${property.address} — ${property.price} | Chapter`,
      description: `${property.beds} bed, ${property.baths} bath in ${property.area}. ${property.sqft} sqft.`,
      url: `https://chapterrealestate.ca/properties/${property.slug}`,
      // Social scrapers largely ignore SVG, so an image-less listing falls back to
      // the logo rather than the on-page placeholder. Resolved against metadataBase.
      images: [{ url: property.image || "/logo.png" }],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const related = await getRelatedProperties(slug);

  return <PropertyDetail property={property} related={related} />;
}
