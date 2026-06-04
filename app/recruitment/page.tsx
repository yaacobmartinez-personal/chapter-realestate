import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import {
  WhyJoin,
  CommissionModels,
  AgentBenefits,
  ApplyForm,
} from "@/components/recruitment";

export const metadata: Metadata = {
  title: "Join Chapter — Grow Your Real Estate Career in Winnipeg",
  description:
    "Join Chapter Real Estate and elevate your career with industry-leading commission models, mentorship, and full agent support. Apply to join our Winnipeg team today.",
  openGraph: {
    title: "Join Chapter — Grow Your Real Estate Career in Winnipeg",
    description:
      "Join Chapter Real Estate and elevate your career with industry-leading commission models, mentorship, and full agent support. Apply to join our Winnipeg team today.",
    url: "https://chapterrealestate.ca/recruitment",
  },
  twitter: {
    title: "Join Chapter — Grow Your Real Estate Career in Winnipeg",
    description:
      "Join Chapter Real Estate and elevate your career with industry-leading commission models, mentorship, and full agent support. Apply to join our Winnipeg team today.",
  },
};

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
