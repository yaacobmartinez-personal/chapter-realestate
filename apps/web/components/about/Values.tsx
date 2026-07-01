import { Heart, Lightbulb, Users, Award, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { companyValues } from "@/lib/data/about";

const iconMap: Record<string, LucideIcon> = { Heart, Lightbulb, Users, Award, TrendingUp, Zap };

export default function Values() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">What We Stand For</p>
          <h2 data-reveal className="text-5xl md:text-6xl font-light text-black">Our Values</h2>
        </div>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {companyValues.map(({ iconKey, title, description }, i) => {
            const Icon = iconMap[iconKey];
            return (
              <div
                key={title}
                className="group bg-white p-12 lg:p-14 flex flex-col hover:bg-[#faf8f4] transition-colors"
              >
                <div className="flex items-center gap-5 mb-8">
                  <span className="w-20 h-20 flex items-center justify-center rounded-full border border-[#c8a96e]/30 text-[#c8a96e] group-hover:bg-[#c8a96e] group-hover:text-white transition-colors shrink-0">
                    <Icon size={34} strokeWidth={1} />
                  </span>
                  <span className="text-5xl font-light text-gray-100 tabular-nums leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-black mb-4">{title}</h3>
                <p className="text-base text-gray-500 font-light leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
