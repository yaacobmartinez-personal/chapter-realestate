import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  scrolled: boolean;
  onToggle: () => void;
}

export default function MobileMenuToggle({ isOpen, scrolled, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      className={`lg:hidden transition-colors ${scrolled ? "text-black" : "text-white"}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}
