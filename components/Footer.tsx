import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Chapter Real Estate"
                width={240}
                height={78}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs mb-8">
              A modern real estate platform redefining how Winnipeg buys, sells, and manages property.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Real Estate */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-5">Real Estate</h4>
            <ul className="space-y-3">
              {["Buy a Home", "Sell a Home", "Featured Listings", "Our Agents", "Market Insights"].map((link) => (
                <li key={link}>
                  <Link href="/brokerage" className="text-sm text-gray-400 hover:text-white font-light">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Management */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-5">Management</h4>
            <ul className="space-y-3">
              {["Overview", "Residential PM", "Commercial PM", "Owner Portal", "Tenant Portal", "Free Analysis"].map((link) => (
                <li key={link}>
                  <Link href="/property-management" className="text-sm text-gray-400 hover:text-white font-light">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Investments", href: "/investments" },
                { label: "Careers", href: "/recruitment" },
                { label: "Resources", href: "/resources" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white font-light">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-light">
            © {new Date().getFullYear()} Chapter Real Estate & Property Management. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((link) => (
              <Link key={link} href="#" className="text-xs text-gray-600 hover:text-gray-400 font-light">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
