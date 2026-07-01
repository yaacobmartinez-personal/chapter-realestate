import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Services from "@/components/home/Services";
import FeaturedListings from "@/components/home/FeaturedListings";
import WhyChapter from "@/components/home/WhyChapter";
import PMCta from "@/components/home/PMCta";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";
import { getProperties } from "@/lib/data/properties";

export const revalidate = 60;

export default async function HomePage() {
  const properties = await getProperties();
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <FeaturedListings properties={properties} />
      <WhyChapter />
      <PMCta />
      <Team />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
