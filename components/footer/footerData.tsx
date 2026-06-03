import { SocialLink, FooterLinkGroup, FooterLink } from "./types";

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Real Estate",
    links: [
      { label: "Buy a Home", href: "/brokerage#buy" },
      { label: "Sell a Home", href: "/brokerage#sell" },
      { label: "Featured Listings", href: "/brokerage#listings" },
      { label: "Our Agents", href: "/brokerage#agents" },
      { label: "Market Insights", href: "/brokerage#insights" },
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
      { label: "Free Analysis", href: "/property-management#analysis" },
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
