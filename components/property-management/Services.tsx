import { CheckCircle } from "lucide-react";
import { pmServiceTypes } from "@/lib/data/property-management";

export default function Services() {
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Services</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Everything Included</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-6">
          {pmServiceTypes.map(({ title, items }) => (
            <div key={title} className="bg-white p-10">
              <h3 className="text-xl font-light text-black mb-6 pb-6 border-b border-gray-100">{title}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                    <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
