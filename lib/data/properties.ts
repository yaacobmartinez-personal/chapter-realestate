import rawContent from "@/lib/content/properties.json";

export interface Property {
  id: string;
  slug: string;
  image: string;
  images: string[];
  price: string;
  address: string;
  area: string;
  city: string;
  province: string;
  beds: number;
  baths: number;
  sqft: string;
  garage: number;
  lot: string;
  yearBuilt: number;
  mls: string;
  tag: string;
  type: "Residential" | "Luxury" | "Investment";
  status: "For Sale" | "Sold" | "Pending";
  description: string;
  features: string[];
  coordinates: { lng: number; lat: number };
}

const raw = rawContent as unknown as { properties: Property[] };

export const properties = raw.properties;

export const propertyTypes = ["All", "Residential", "Luxury", "Investment"] as const;

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const property = getPropertyBySlug(slug);
  if (!property) return properties.slice(0, limit);
  return properties
    .filter((p) => p.slug !== slug && (p.type === property.type || p.area === property.area))
    .slice(0, limit);
}
