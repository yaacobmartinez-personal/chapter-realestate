"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import DesktopCTA from "./DesktopCTA";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenu from "./MobileMenu";
import type { SocialLink } from "@/lib/data/social";

export default function Navbar({ socialLinks }: { socialLinks: SocialLink[] }) {
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
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <TopBar socialLinks={socialLinks} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Logo />
          <div className="hidden lg:flex items-center gap-8">
            <DesktopNav />
            <DesktopCTA />
          </div>
          <MobileMenuToggle isOpen={mobileOpen} onToggle={toggleMobileMenu} />
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobileMenu} />
    </header>
  );
}
