"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./types";
import DesktopDropdown from "./DesktopDropdown";

interface DesktopNavItemProps {
  item: NavItem;
}

export default function DesktopNavItem({ item }: DesktopNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-light tracking-wide text-white/80 transition-colors hover:text-white"
      >
        {item.label}
        {item.children && <ChevronDown size={13} className="opacity-50" />}
      </Link>

      {item.children && isOpen && <DesktopDropdown items={item.children} />}
    </div>
  );
}
