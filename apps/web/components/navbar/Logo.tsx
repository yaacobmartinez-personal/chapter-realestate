import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Chapter Real Estate"
        width={330}
        height={108}
        className="h-24 w-auto object-contain brightness-0 invert transition-all duration-300"
        priority
      />
    </Link>
  );
}
