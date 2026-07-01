import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SellServices from "@/components/brokerage/SellServices";

export const metadata: Metadata = {
  title: "Selling Your Home — Services for Sellers in Winnipeg & Manitoba",
  description:
    "Make a strategic sale with Chapter Real Estate. Full-service listing support, eye-capturing marketing, and expert negotiation to net you the best possible price across Manitoba.",
  openGraph: {
    title: "Services for Sellers | Chapter Real Estate",
    description:
      "Full-service listing support, marketing, and expert negotiation to net you the best possible price for your home or commercial property in Manitoba.",
    url: "https://chapterrealestate.ca/sellers",
  },
  twitter: {
    title: "Services for Sellers | Chapter Real Estate",
    description:
      "Full-service listing support, marketing, and expert negotiation to net you the best possible price for your property in Manitoba.",
  },
};

export default function SellersPage() {
  return (
    <>
      <PageHero
        label="Selling a Home"
        heading="Make a"
        headingAccent="Strategic Sale."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80"
      />
      <SellServices />
    </>
  );
}
