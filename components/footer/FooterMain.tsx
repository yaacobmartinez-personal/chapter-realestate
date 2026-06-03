import FooterBrand from "./FooterBrand";
import FooterLinkColumn from "./FooterLinkColumn";
import { footerLinkGroups } from "./footerData";

export default function FooterMain() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <FooterBrand />
        {footerLinkGroups.map((group) => (
          <FooterLinkColumn key={group.title} group={group} />
        ))}
      </div>
    </div>
  );
}
