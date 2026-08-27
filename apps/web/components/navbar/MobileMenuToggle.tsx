import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      className="lg:hidden text-white transition-colors"
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}
