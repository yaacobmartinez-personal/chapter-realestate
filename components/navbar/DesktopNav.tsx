"use client";

import { navItems } from "./navItems";
import DesktopNavItem from "./DesktopNavItem";

interface DesktopNavProps {
  scrolled: boolean;
}

export default function DesktopNav({ scrolled }: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => (
        <DesktopNavItem key={item.label} item={item} scrolled={scrolled} />
      ))}
    </nav>
  );
}
