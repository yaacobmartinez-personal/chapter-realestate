"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const categories = [
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", label: "Residential" },
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", label: "Commercial" },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", label: "Investment" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", label: "Luxury" },
];

const benefits = [
  "Access to all MLS listings + off-market properties",
  "Dedicated buyer's agent at no cost to you",
  "Neighbourhood expertise across all of Winnipeg",
  "Negotiation specialists with proven track records",
];

export default function BuySection() {
  return (
    <section id="buy" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Buying</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">Find Your<br /><span className="font-serif italic">Perfect Home</span></h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-sm text-sm">From first-time buyers to seasoned investors, our agents guide you through every step — from search to keys in hand.</p>
            <ul className="space-y-3 mb-10">
              {benefits.map((item, i) => (
                <motion.li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-light"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <ChevronRight size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{item}
                </motion.li>
              ))}
            </ul>
            <Link href="/contact#book" className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">Book a Showing</Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map(({ image, label }, i) => (
              <motion.div key={label} className="relative overflow-hidden group cursor-pointer aspect-square"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <span className="text-white text-xs tracking-widest uppercase font-light">{label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
