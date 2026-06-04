import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  Opportunities,
  BarsoGroup,
  InvestorRelations,
} from "@/components/investments";

export const metadata: Metadata = {
  title: "Real Estate Investments & Development in Winnipeg",
  description:
    "Explore real estate investment and development opportunities in Winnipeg with Chapter. Build long-term wealth through strategic property acquisitions and the Barso Group.",
  openGraph: {
    title: "Real Estate Investments & Development in Winnipeg | Chapter",
    description:
      "Explore real estate investment and development opportunities in Winnipeg with Chapter. Build long-term wealth through strategic property acquisitions and the Barso Group.",
    url: "https://chapterrealestate.ca/investments",
  },
  twitter: {
    title: "Real Estate Investments & Development in Winnipeg | Chapter",
    description:
      "Explore real estate investment and development opportunities in Winnipeg with Chapter. Build long-term wealth through strategic property acquisitions and the Barso Group.",
  },
};

export default function InvestmentsPage() {
  return (
    <>
      <PageHero
        label="Investments & Development"
        heading="Build Wealth"
        headingAccent="Through Property."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
      />
      <Opportunities />
      <BarsoGroup />
      <InvestorRelations />
    </>
  );
}
