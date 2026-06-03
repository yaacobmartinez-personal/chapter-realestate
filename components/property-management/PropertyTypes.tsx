import { Home, Building2 } from "lucide-react";

const types = [
  { icon: Home, title: "Residential", subtitle: "Single-Family & Condos", desc: "Single-family homes, duplexes, and condominiums — we manage the full spectrum of residential properties with care.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { icon: Building2, title: "Multi-Family", subtitle: "Apartment Buildings", desc: "Streamlined management for multi-unit buildings with centralized reporting and efficient tenant coordination.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
  { icon: Building2, title: "Commercial", subtitle: "Office, Retail & Mixed-Use", desc: "Commercial leasing, tenant coordination, and full facilities management for office, retail, and mixed-use assets.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
];

export default function PropertyTypes() {
  return (
    <section id="residential" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Property Types</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">We Manage It All</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-6">
          {types.map(({ icon: Icon, title, subtitle, desc, image }) => (
            <div key={title} className="group overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-4/3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <Icon size={20} className="text-[#c8a96e] mb-4" strokeWidth={1} />
                <h3 className="text-xl font-light text-black mb-1">{title}</h3>
                <p className="text-xs text-gray-400 font-light mb-3">{subtitle}</p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
