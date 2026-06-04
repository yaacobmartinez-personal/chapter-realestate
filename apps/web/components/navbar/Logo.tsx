import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  scrolled: boolean;
}

export default function Logo({ scrolled }: LogoProps) {
  return (
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
  );
}
