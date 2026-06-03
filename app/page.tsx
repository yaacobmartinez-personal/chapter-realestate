import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Services from "@/components/home/Services";
import FeaturedListings from "@/components/home/FeaturedListings";
import WhyChapter from "@/components/home/WhyChapter";
import PMCta from "@/components/home/PMCta";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import MarketInsights from "@/components/home/MarketInsights";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <FeaturedListings />
      <WhyChapter />
      <PMCta />
      <Team />
      <Testimonials />
      <MarketInsights />
      <ContactCTA />
    </>
  );
}
