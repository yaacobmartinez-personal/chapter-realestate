import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BuyerGuide from "@/components/brokerage/BuyerGuide";

export const metadata: Metadata = {
  title: "Buyer's Guide — Buying a Home in Winnipeg & Manitoba",
  description:
    "Chapter Real Estate's step-by-step buyer's guide walks you through buying a home in Winnipeg and across Manitoba — from research and budgeting to closing day.",
  openGraph: {
    title: "Buyer's Guide | Chapter Real Estate",
    description:
      "A step-by-step guide to buying a home in Winnipeg and across Manitoba — from research and budgeting to closing day.",
    url: "https://chapterrealestate.ca/buyers-guide",
  },
  twitter: {
    title: "Buyer's Guide | Chapter Real Estate",
    description:
      "A step-by-step guide to buying a home in Winnipeg and across Manitoba — from research and budgeting to closing day.",
  },
};

export default function BuyersGuidePage() {
  return (
    <>
      <PageHero
        label="Buying a Home"
        heading="Buyer's"
        headingAccent="Guide"
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80"
      />
      <BuyerGuide />
    </>
  );
}
