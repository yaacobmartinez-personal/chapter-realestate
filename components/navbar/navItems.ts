import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    label: "Real Estate",
    href: "/brokerage",
    children: [
      { label: "Buy a Home", href: "/brokerage#buy" },
      { label: "Sell a Home", href: "/brokerage#sell" },
      { label: "Featured Listings", href: "/brokerage#listings" },
      { label: "Our Agents", href: "/brokerage#agents" },
      { label: "Market Insights", href: "/brokerage#insights" },
    ],
  },
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Overview", href: "/property-management" },
      { label: "Residential", href: "/property-management#residential" },
      { label: "Commercial", href: "/property-management#commercial" },
      { label: "Owner Portal", href: "/property-management#owners" },
      { label: "Tenant Portal", href: "/property-management#tenants" },
      { label: "Free Rental Analysis", href: "/property-management#analysis" },
    ],
  },
  {
    label: "Investments",
    href: "/investments",
    children: [
      { label: "Opportunities", href: "/investments#opportunities" },
      { label: "Barso Group", href: "/investments#barso" },
      { label: "Investor Relations", href: "/investments#relations" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/recruitment" },
];
