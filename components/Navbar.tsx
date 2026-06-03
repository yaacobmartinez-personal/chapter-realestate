"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "Real Estate",
    href: "/brokerage",
    children: [
      { label: "Buy a Home", href: "/brokerage#buy" },
      { label: "Sell a Home", href: "/brokerage#sell" },
      { label: "Featured Listings", href: "/brokerage#listings" },
      { label: "Our Agents", href: "/brokerage#agents" },
      { label: "Market Insights", href: "/brokerage#insights" },
    ],
  },
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Overview", href: "/property-management" },
      { label: "Residential", href: "/property-management#residential" },
      { label: "Commercial", href: "/property-management#commercial" },
      { label: "Owner Portal", href: "/property-management#owners" },
      { label: "Tenant Portal", href: "/property-management#tenants" },
      { label: "Free Rental Analysis", href: "/property-management#analysis" },
    ],
  },
  {
    label: "Investments",
    href: "/investments",
    children: [
      { label: "Opportunities", href: "/investments#opportunities" },
      { label: "Barso Group", href: "/investments#barso" },
      { label: "Investor Relations", href: "/investments#relations" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/recruitment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Chapter Real Estate"
              width={220}
              height={72}
              className={`h-16 w-auto object-contain transition-all duration-300 ${
                scrolled ? "brightness-0" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
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

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-4">
                    <div className="bg-white border border-gray-100 shadow-xl min-w-52 py-2">
                      {item.children.map((child) => (
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
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className={`text-sm font-light tracking-wide transition-colors ${
                scrolled ? "text-gray-700 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/contact#book"
              className="bg-black text-white text-sm font-light tracking-widest px-6 py-3 hover:bg-[#c8a96e] uppercase"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden transition-colors ${scrolled ? "text-black" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm text-gray-700 hover:text-black font-light tracking-wide border-b border-gray-50"
                  onClick={() => setMobileOpen(false)}
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
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/contact#book"
                className="block w-full bg-black text-white text-center text-sm font-light tracking-widest py-4 uppercase hover:bg-[#c8a96e]"
                onClick={() => setMobileOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
