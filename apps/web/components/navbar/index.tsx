"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import DesktopCTA from "./DesktopCTA";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <TopBar scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Logo scrolled={scrolled} />
          <div className="hidden lg:flex items-center gap-8">
            <DesktopNav scrolled={scrolled} />
            <DesktopCTA scrolled={scrolled} />
          </div>
          <MobileMenuToggle
            isOpen={mobileOpen}
            scrolled={scrolled}
            onToggle={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobileMenu} />
    </header>
  );
}
