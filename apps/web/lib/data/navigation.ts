export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  {
    label: "Real Estate",
    href: "/brokerage",
    children: [
      { label: "Buy a Home", href: "/brokerage#buy" },
      { label: "Sell a Home", href: "/brokerage#sell" },
      { label: "Featured Listings", href: "/brokerage#listings" },
      { label: "Our Agents", href: "/brokerage#agents" },
    ],
  },
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Overview", href: "/property-management" },
      { label: "Available Rentals", href: "/property-management#residential" },
      { label: "Owner Portal", href: "/property-management#owners" },
      { label: "Tenant Portal", href: "/property-management#tenants" },
      { label: "Landlord Enquiry", href: "/property-management#analysis" },
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
