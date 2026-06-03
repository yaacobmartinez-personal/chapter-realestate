import PageHero from "@/components/ui/PageHero";
import {
  Overview,
  Services,
  PropertyTypes,
  Pricing,
  OwnerTenantPortals,
  FreeAnalysisCTA,
} from "@/components/property-management";

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero label="Property Management" heading="Hands-Off." headingAccent="High Returns." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80" />
      <Overview />
      <Services />
      <PropertyTypes />
      <Pricing />
      <OwnerTenantPortals />
      <FreeAnalysisCTA />
    </>
  );
}
