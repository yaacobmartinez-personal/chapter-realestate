import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { BlogInsights, Guides, FAQ } from "@/components/resources";

export const metadata: Metadata = {
  title: "Real Estate Resources — Guides, Insights & FAQ",
  description:
    "Access expert real estate guides, Winnipeg market insights, and answers to common buyer, seller, and investor questions from the Chapter Real Estate team.",
  openGraph: {
    title: "Real Estate Resources — Guides, Insights & FAQ | Chapter",
    description:
      "Access expert real estate guides, Winnipeg market insights, and answers to common buyer, seller, and investor questions from the Chapter Real Estate team.",
    url: "https://chapterrealestate.ca/resources",
  },
  twitter: {
    title: "Real Estate Resources — Guides, Insights & FAQ | Chapter",
    description:
      "Access expert real estate guides, Winnipeg market insights, and answers to common buyer, seller, and investor questions from the Chapter Real Estate team.",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        label="Resources"
        heading="Insights &"
        headingAccent="Expertise."
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1800&q=80"
      />
      <BlogInsights />
      <Guides />
      <FAQ />
    </>
  );
}
