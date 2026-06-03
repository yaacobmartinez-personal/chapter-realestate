"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./types";
import DesktopDropdown from "./DesktopDropdown";

interface DesktopNavItemProps {
  item: NavItem;
  scrolled: boolean;
}

export default function DesktopNavItem({ item, scrolled }: DesktopNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-1 text-sm font-light tracking-wide transition-colors ${
          scrolled ? "text-gray-700 hover:text-black" : "text-white/80 hover:text-white"
        }`}
      >
        {item.label}
        {item.children && <ChevronDown size={13} className="opacity-50" />}
      </Link>

      {item.children && isOpen && <DesktopDropdown items={item.children} />}
    </div>
  );
}
