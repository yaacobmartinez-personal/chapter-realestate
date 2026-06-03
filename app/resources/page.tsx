import PageHero from "@/components/ui/PageHero";
import { BlogInsights, Guides, FAQ } from "@/components/resources";

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
