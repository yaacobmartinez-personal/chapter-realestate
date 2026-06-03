import PageHero from "@/components/ui/PageHero";
import {
  Opportunities,
  BarsoGroup,
  InvestorRelations,
} from "@/components/investments";

export default function InvestmentsPage() {
  return (
    <>
      <PageHero
        label="Investments & Development"
        heading="Build Wealth"
        headingAccent="Through Property."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
      />
      <Opportunities />
      <BarsoGroup />
      <InvestorRelations />
    </>
  );
}
