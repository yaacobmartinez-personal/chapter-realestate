import Image from "next/image";
import { Home, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pmPropertyTypes } from "@/lib/data/property-management";

const iconMap: Record<string, LucideIcon> = { Home, Building2 };

export default function PropertyTypes() {
  return (
    <section id="residential" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Property Types</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">We Manage It All</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-6">
          {pmPropertyTypes.map(({ iconKey, title, subtitle, desc, image }) => {
            const Icon = iconMap[iconKey];
            return (
              <div key={title} className="group overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    fill
                    src={image}
                    alt={title}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <Icon size={20} className="text-[#c8a96e] mb-4" strokeWidth={1} />
                  <h3 className="text-xl font-light text-black mb-1">{title}</h3>
                  <p className="text-xs text-gray-400 font-light mb-3">{subtitle}</p>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
