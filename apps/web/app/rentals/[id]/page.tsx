import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRentals, getRentalById, getRelatedRentals } from "@/lib/data/rentals";
import RentalDetail from "@/components/property-management/RentalDetail";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return (await getRentals()).map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const rental = await getRentalById(id);
  if (!rental) return {};
  const title = `${rental.address} — ${rental.rent} | Chapter Property Management`;
  const description = `${rental.category} rental in ${rental.area}, Winnipeg. ${rental.rent}. ${rental.sqft} sqft. Managed by Chapter Real Estate.`;
  return {
    title,
    description,
    openGraph: {
      title: `${rental.address} — ${rental.rent} | Chapter`,
      description,
      url: `https://chapterrealestate.ca/rentals/${rental.id}`,
      // See the note in properties/[slug] — logo, not the SVG placeholder.
      images: [{ url: rental.image || "/logo.png" }],
    },
  };
}

export default async function RentalPage({ params }: Props) {
  const { id } = await params;
  const rental = await getRentalById(id);
  if (!rental) notFound();

  const related = await getRelatedRentals(id);

  return <RentalDetail rental={rental} related={related} />;
}
