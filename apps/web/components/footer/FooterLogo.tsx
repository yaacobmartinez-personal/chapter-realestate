import Image from "next/image";

export default function FooterLogo() {
  return (
    <div className="mb-6">
      <Image
        src="/logo.png"
        alt="Chapter Real Estate"
        width={240}
        height={78}
        className="h-16 w-auto object-contain brightness-0 invert"
      />
    </div>
  );
}
