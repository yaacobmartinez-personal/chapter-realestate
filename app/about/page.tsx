import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  OurStory,
  MissionVision,
  Values,
  LeadershipTeam,
  Careers,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Chapter Real Estate — a Winnipeg-based company built on integrity, driven by vision, and committed to exceptional client outcomes.",
  openGraph: {
    title: "About Us | Chapter Real Estate",
    description:
      "Learn the story behind Chapter Real Estate — a Winnipeg-based company built on integrity, driven by vision, and committed to exceptional client outcomes.",
    url: "https://chapterrealestate.ca/about",
  },
  twitter: {
    title: "About Us | Chapter Real Estate",
    description:
      "Learn the story behind Chapter Real Estate — a Winnipeg-based company built on integrity, driven by vision, and committed to exceptional client outcomes.",
  },
};

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
