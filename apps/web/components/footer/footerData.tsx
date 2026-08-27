import { FooterLinkGroup, FooterLink } from "./types";

// Social links now live in the database — see `@/lib/data/social` (getSocialLinks)
// and icons in `@/components/social-icons`.

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Real Estate",
    links: [
      { label: "Buy a Home", href: "/brokerage#buy" },
      { label: "Buyer's Guide", href: "/brokerage#buy" },
      { label: "Sell a Home", href: "/brokerage#sell" },
      { label: "Featured Listings", href: "/brokerage#listings" },
      { label: "Our Agents", href: "/brokerage#agents" },
    ],
  },
  {
    title: "Management",
    links: [
      { label: "Overview", href: "/property-management" },
      { label: "Residential PM", href: "/property-management#residential" },
      { label: "Commercial PM", href: "/property-management#commercial" },
      { label: "Owner Portal", href: "/property-management#owners" },
      { label: "Tenant Portal", href: "/property-management#tenants" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Investments", href: "/investments" },
      { label: "Careers", href: "/recruitment" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
];
