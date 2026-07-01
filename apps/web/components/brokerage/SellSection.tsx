"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SellSection() {
  return (
    <section id="sell" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Selling</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              Make a<br /><span className="font-serif italic">Strategic Sale.</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-md text-sm">
              Chapter&apos;s agents leverage deep Manitoba market knowledge to help sellers net the best
              possible price — through full-service listing support, eye-capturing marketing, and expert
              negotiation from evaluation to closing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sellers"
                className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors"
              >
                Explore Selling with Chapter <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact#book"
                className="inline-flex items-center gap-3 border border-gray-300 text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-black transition-colors"
              >
                Free Home Valuation
              </Link>
            </div>
          </motion.div>

          <motion.ul
            className="grid sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {[
              "Property Evaluation & CMA",
              "Full-Service Listing Support",
              "Eye-Capturing Marketing",
              "Expert Negotiation",
            ].map((item) => (
              <li key={item} className="bg-[#f7f7f7] p-8 text-sm font-light text-black flex items-center">
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
