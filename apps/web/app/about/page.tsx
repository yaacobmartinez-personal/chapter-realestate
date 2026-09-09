import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  OurStory,
  MissionVision,
  Values,
  LeadershipTeam,
  Careers,
} from "@/components/about";

export const revalidate = 60;

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
      <PageHero label="About Chapter" heading="Built on Integrity." headingAccent="Driven by Vision." image="https://images.unsplash.com/photo-1579454577332-6c8a8f99a23c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <OurStory />
      <MissionVision />
      <Values />
      <LeadershipTeam />
      <Careers />
    </>
  );
}
