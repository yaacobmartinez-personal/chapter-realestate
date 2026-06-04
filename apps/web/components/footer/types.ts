import { ReactNode } from "react";

export interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}
