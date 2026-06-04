"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Home, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { homeServices } from "@/lib/data/home";

const iconMap: Record<string, LucideIcon> = { Building2, Home, TrendingUp, Users };

export default function Services() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">One Platform,<br />Every Service</h2>
          </motion.div>
          <motion.p
            className="text-gray-500 font-light max-w-xs text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Chapter consolidates all aspects of real estate into one seamless, modern platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {homeServices.map(({ iconKey, title, description, href, accent }, i) => {
            const Icon = iconMap[iconKey];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={href} className="group bg-white p-10 flex flex-col gap-6 hover:bg-black transition-colors duration-500 h-full">
                  <motion.div
                    className="w-12 h-12 border border-gray-200 group-hover:border-white/20 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={20} className="text-gray-400 group-hover:text-[#c8a96e] transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-[#c8a96e] tracking-widest uppercase font-light mb-3">{accent}</p>
                    <h3 className="text-xl font-light text-black group-hover:text-white mb-3 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 font-light leading-relaxed transition-colors">{description}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-xs text-gray-400 group-hover:text-[#c8a96e] transition-colors">
                    <span className="tracking-widest uppercase font-light">Learn More</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
