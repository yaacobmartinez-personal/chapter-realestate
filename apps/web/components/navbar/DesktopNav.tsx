"use client";

import { navItems } from "./navItems";
import DesktopNavItem from "./DesktopNavItem";

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => (
        <DesktopNavItem key={item.label} item={item} />
      ))}
    </nav>
  );
}
