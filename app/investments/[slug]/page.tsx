import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { investmentOpportunities, getOpportunityBySlug } from "@/lib/data/investments";
import OpportunityDetail from "@/components/investments/OpportunityDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return investmentOpportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);
  if (!opportunity) return {};
  return {
    title: `${opportunity.title} — Real Estate Investment in Winnipeg | Chapter`,
    description: opportunity.desc,
    openGraph: {
      title: `${opportunity.title} | Chapter Real Estate`,
      description: opportunity.desc,
      url: `https://chapterrealestate.ca/investments/${slug}`,
    },
  };
}

export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);
  if (!opportunity) notFound();

  const related = investmentOpportunities.filter((o) => o.slug !== slug).slice(0, 2);

  return <OpportunityDetail opportunity={opportunity} related={related} />;
}
