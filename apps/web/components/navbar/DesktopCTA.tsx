import Link from "next/link";

export default function DesktopCTA() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link
        href="/contact"
        className="text-sm font-light tracking-wide text-white/80 transition-colors hover:text-white"
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
  );
}
