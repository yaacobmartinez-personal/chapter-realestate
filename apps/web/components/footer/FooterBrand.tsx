import FooterLogo from "./FooterLogo";
import SocialLinks from "./SocialLinks";
import BBBBadge from "./BBBBadge";

export default function FooterBrand() {
  return (
    <div className="lg:col-span-2">
      <FooterLogo />
      <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs mb-8">
        A modern real estate platform redefining how Winnipeg buys, sells, and manages property.
      </p>
      <div className="flex flex-col gap-4">
        <SocialLinks />
        <BBBBadge />
      </div>
    </div>
  );
}
