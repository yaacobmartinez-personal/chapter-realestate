"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sellingSteps } from "@/lib/data/brokerage";

export default function SellSection() {
  return (
    <section id="sell" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Selling</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">Sell Smarter.<br /><span className="font-serif italic">Get More.</span></h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-sm text-sm">Our proven selling process maximizes your home&apos;s value through precision marketing, expert staging guidance, and skilled negotiation.</p>
            <Link href="/contact#book" className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">
              Get Your Free Valuation <ArrowRight size={14} />
            </Link>
          </motion.div>
          <div className="divide-y divide-gray-200">
            {sellingSteps.map(({ step, title, desc }, i) => (
              <motion.div key={step} className="py-8 flex gap-8"
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-[#c8a96e] font-light tracking-widest pt-1">{step}</span>
                <div>
                  <h3 className="text-lg font-light text-black mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
