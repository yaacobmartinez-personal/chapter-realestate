import Link from "next/link";
import { legalLinks } from "./footerData";

export default function FooterBottom() {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-600 font-light">
          © {new Date().getFullYear()} Chapter Real Estate & Property Management. All rights reserved.
        </p>
        <div className="flex gap-6">
          {legalLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs text-gray-600 hover:text-gray-400 font-light"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
