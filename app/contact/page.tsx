import PageHero from "@/components/ui/PageHero";
import { ContactSection, MapEmbed } from "@/components/contact";

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
