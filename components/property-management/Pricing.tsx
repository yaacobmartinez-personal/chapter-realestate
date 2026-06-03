import Link from "next/link";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Leasing Only",
    fee: "One Month's Rent",
    desc: "Perfect for landlords who want help finding quality tenants.",
    features: ["Property marketing", "Tenant screening", "Lease preparation", "Move-in coordination"],
    cta: "Get Started",
  },
  {
    name: "Full Management",
    fee: "8–10% of Rent",
    desc: "Complete hands-off management from lease to lease.",
    features: ["Everything in Leasing", "Rent collection", "Maintenance coordination", "Inspections & reporting", "24/7 emergency support"],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Premium Portfolio",
    fee: "Custom Pricing",
    desc: "Tailored for multi-unit and commercial property owners.",
    features: ["Everything in Full Management", "Dedicated portfolio manager", "Commercial leasing", "Custom reporting", "Investor dashboard"],
    cta: "Contact Us",
  },
];

export default function Pricing() {
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Pricing</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Simple, Transparent Fees</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-px bg-gray-200">
          {plans.map(({ name, fee, desc, features, cta, featured }) => (
            <div key={name} className={`p-10 ${featured ? "bg-black text-white" : "bg-white"}`}>
              <p className={`text-xs tracking-widest uppercase font-light mb-4 ${featured ? "text-[#c8a96e]" : "text-gray-400"}`}>{name}</p>
              <p className={`text-3xl font-light mb-2 ${featured ? "text-white" : "text-black"}`}>{fee}</p>
              <p className={`text-sm font-light mb-8 ${featured ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
              <ul className="space-y-3 mb-10">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm font-light ${featured ? "text-gray-300" : "text-gray-600"}`}>
                    <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact#book" className={`block text-center text-sm font-light tracking-widest uppercase py-4 transition-colors ${featured ? "bg-[#c8a96e] text-black hover:bg-white" : "border border-gray-200 text-gray-700 hover:border-black hover:text-black"}`}>
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
