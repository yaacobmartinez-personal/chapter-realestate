import PageHero from "@/components/ui/PageHero";
import {
  WhyJoin,
  CommissionModels,
  AgentBenefits,
  ApplyForm,
} from "@/components/recruitment";

export default function RecruitmentPage() {
  return (
    <>
      <PageHero
        label="Join Chapter"
        heading="Elevate Your"
        headingAccent="Real Estate Career."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
      />
      <WhyJoin />
      <CommissionModels />
      <AgentBenefits />
      <ApplyForm />
    </>
  );
}
