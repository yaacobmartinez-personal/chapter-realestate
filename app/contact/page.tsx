import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ContactSection, MapEmbed } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Chapter Real Estate. Whether you're buying, selling, investing, or looking for property management in Winnipeg — we're here to help.",
  openGraph: {
    title: "Contact Us | Chapter Real Estate",
    description:
      "Get in touch with Chapter Real Estate. Whether you're buying, selling, investing, or looking for property management in Winnipeg — we're here to help.",
    url: "https://chapterrealestate.ca/contact",
  },
  twitter: {
    title: "Contact Us | Chapter Real Estate",
    description:
      "Get in touch with Chapter Real Estate. Whether you're buying, selling, investing, or looking for property management in Winnipeg — we're here to help.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        heading="Let's Start"
        headingAccent="a Conversation."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
      />
      <ContactSection />
      <MapEmbed />
    </>
  );
}
