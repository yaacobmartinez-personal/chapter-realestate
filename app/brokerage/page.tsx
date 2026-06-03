import PageHero from "@/components/ui/PageHero";
import {
  SearchBar,
  BuySection,
  FeaturedListings,
  SellSection,
  AgentsDirectory,
  MarketInsights,
} from "@/components/brokerage";

export default function BrokeragePage() {
  return (
    <>
      <PageHero label="Real Estate Brokerage" heading="Buy. Sell." headingAccent="Succeed." image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" />
      <SearchBar />
      <BuySection />
      <FeaturedListings />
      <SellSection />
      <AgentsDirectory />
      <MarketInsights />
    </>
  );
}
