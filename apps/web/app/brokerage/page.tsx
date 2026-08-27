import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  SearchBar,
  FeaturedListings,
  BuyerGuide,
  SellServices,
  AgentsDirectory,
} from "@/components/brokerage";
import { getProperties } from "@/lib/data/properties";
import { getAgents } from "@/lib/data/agents";
import { getBuyerGuideSteps } from "@/lib/data/buyer-guide";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg",
  description:
    "Browse Winnipeg listings, follow our step-by-step buyer's guide, and get top dollar for your home with full-service seller support. Chapter's brokerage team guides buyers and sellers every step of the way.",
  alternates: { canonical: "https://chapterrealestate.ca/brokerage" },
  openGraph: {
    title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg | Chapter",
    description:
      "Browse Winnipeg listings, follow our step-by-step buyer's guide, and get top dollar for your home with full-service seller support.",
    url: "https://chapterrealestate.ca/brokerage",
  },
  twitter: {
    title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg | Chapter",
    description:
      "Browse Winnipeg listings, follow our step-by-step buyer's guide, and get top dollar for your home with full-service seller support.",
  },
};

export default async function BrokeragePage() {
  const [properties, agents, guideSteps] = await Promise.all([
    getProperties(),
    getAgents(),
    getBuyerGuideSteps(),
  ]);
  return (
    <>
      <PageHero label="Real Estate Brokerage" heading="Buy. Sell." headingAccent="Succeed." image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" />
      <SearchBar />
      <FeaturedListings properties={properties} />

      {/* Buying — the full buyer's guide, previously at /buyers-guide */}
      <div id="buy" className="scroll-mt-28">
        <BuyerGuide steps={guideSteps} />
      </div>

      {/* Selling — the full seller services, previously at /sellers */}
      <div id="sell" className="scroll-mt-28">
        <SellServices />
      </div>

      <AgentsDirectory agents={agents} />
    </>
  );
}
