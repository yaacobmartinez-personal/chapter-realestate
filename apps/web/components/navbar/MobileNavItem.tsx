import Link from "next/link";
import { NavItem } from "./types";

interface MobileNavItemProps {
  item: NavItem;
  onClose: () => void;
}

export default function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  return (
    <div>
      <Link
        href={item.href}
        className="block py-3 text-sm text-gray-700 hover:text-black font-light tracking-wide border-b border-gray-50"
        onClick={onClose}
      >
        {item.label}
      </Link>
      {item.children && (
        <div className="pl-4 space-y-1 mt-1 mb-3">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block py-2 text-xs text-gray-500 hover:text-black font-light tracking-wide"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
