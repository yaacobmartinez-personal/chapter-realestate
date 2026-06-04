"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { whyPillars } from "@/lib/data/home";

export default function WhyChapter() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Difference</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">Why Choose<br /><span className="font-serif italic">Chapter</span></h2>
            <p className="text-gray-500 font-light mt-6 leading-relaxed max-w-sm text-sm">We built Chapter to be different — combining the relationships of a boutique firm with the tools and scale of a modern platform.</p>
            <Link href="/about" className="inline-flex items-center gap-3 mt-10 text-sm font-light tracking-widest uppercase group">
              <span>Our Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="divide-y divide-gray-100">
            {whyPillars.map(({ number, title, description }, i) => (
              <motion.div
                key={number}
                className="py-8 flex gap-8 hover:bg-gray-50 px-4 -mx-4 transition-colors group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.span
                  className="text-xs text-[#c8a96e] font-light tracking-widest pt-1"
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                >
                  {number}
                </motion.span>
                <div>
                  <h3 className="text-lg font-light text-black mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
