import Link from "next/link";
import { NavChild } from "./types";

interface DesktopDropdownProps {
  items: NavChild[];
}

export default function DesktopDropdown({ items }: DesktopDropdownProps) {
  return (
    <div className="absolute top-full left-0 pt-4">
      <div className="bg-white border border-gray-100 shadow-xl min-w-52 py-2">
        {items.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            className="block px-5 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 font-light tracking-wide"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
