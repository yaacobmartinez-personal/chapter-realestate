import Link from "next/link";
import { navItems } from "./navItems";
import MobileNavItem from "./MobileNavItem";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
        {navItems.map((item) => (
          <MobileNavItem key={item.label} item={item} onClose={onClose} />
        ))}
        <div className="pt-4">
          <Link
            href="/contact#book"
            className="block w-full bg-black text-white text-center text-sm font-light tracking-widest py-4 uppercase hover:bg-[#c8a96e]"
            onClick={onClose}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
