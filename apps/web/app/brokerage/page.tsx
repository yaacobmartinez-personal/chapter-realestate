import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  SearchBar,
  BuySection,
  FeaturedListings,
  SellSection,
  AgentsDirectory,
} from "@/components/brokerage";
import { getProperties } from "@/lib/data/properties";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg",
  description:
    "Browse Winnipeg listings, connect with expert agents, and get top dollar for your home. Chapter's brokerage team guides buyers and sellers every step of the way.",
  openGraph: {
    title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg | Chapter",
    description:
      "Browse Winnipeg listings, connect with expert agents, and get top dollar for your home. Chapter's brokerage team guides buyers and sellers every step of the way.",
    url: "https://chapterrealestate.ca/brokerage",
  },
  twitter: {
    title: "Real Estate Brokerage — Buy & Sell Homes in Winnipeg | Chapter",
    description:
      "Browse Winnipeg listings, connect with expert agents, and get top dollar for your home. Chapter's brokerage team guides buyers and sellers every step of the way.",
  },
};

export default async function BrokeragePage() {
  const properties = await getProperties();
  return (
    <>
      <PageHero label="Real Estate Brokerage" heading="Buy. Sell." headingAccent="Succeed." image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" />
      <SearchBar />
      <BuySection />
      <FeaturedListings properties={properties} />
      <SellSection />
      <AgentsDirectory />
    </>
  );
}
