import PageHero from "@/components/ui/PageHero";
import {
  OurStory,
  MissionVision,
  Values,
  LeadershipTeam,
  Careers,
} from "@/components/about";

export default function AboutPage() {
  return (
    <>
      <PageHero label="About Chapter" heading="Built on Integrity." headingAccent="Driven by Vision." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80" />
      <OurStory />
      <MissionVision />
      <Values />
      <LeadershipTeam />
      <Careers />
    </>
  );
}
