"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, Shield, Wrench, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pmBenefits } from "@/lib/data/property-management";

const iconMap: Record<string, LucideIcon> = { BarChart3, Shield, Wrench, Clock };

export default function Overview() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Why Chapter PM</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              Property Management<br />Done Right
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">
              Chapter&apos;s property management division handles everything from tenant acquisition to monthly reporting, so you can enjoy passive income without the stress of day-to-day management.
            </p>
          </motion.div>
          <motion.div
            className="relative h-120 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              fill
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Property Management"
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {pmBenefits.map(({ iconKey, title, desc }) => {
            const Icon = iconMap[iconKey];
            return (
              <div key={title} className="bg-white p-10">
                <Icon size={24} className="text-[#c8a96e] mb-6" strokeWidth={1} />
                <h3 className="text-lg font-light text-black mb-3">{title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
