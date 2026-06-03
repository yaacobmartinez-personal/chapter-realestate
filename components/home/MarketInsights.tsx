"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const posts = [
  { tag: "Market Update", date: "May 2025", title: "Winnipeg Housing Market: Spring 2025 Overview", excerpt: "Inventory remains tight as buyer demand continues to outpace supply in key neighbourhoods." },
  { tag: "Investor Tips", date: "April 2025", title: "Why Multifamily in Winnipeg is Outperforming Single-Family", excerpt: "Rental demand is hitting record highs. Here's what investors need to know." },
  { tag: "Property Management", date: "April 2025", title: "5 Ways Professional PM Maximizes Your ROI", excerpt: "From reducing vacancy to preventative maintenance, professional management pays for itself." },
];

export default function MarketInsights() {
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Insights</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">Market &amp; News</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href="/resources" className="flex items-center gap-2 text-sm font-light tracking-widest uppercase text-gray-400 hover:text-black group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(({ tag, date, title, excerpt }, i) => (
            <motion.article
              key={title}
              className="bg-white p-8 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Hover gold line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-[#c8a96e]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-[#c8a96e] tracking-widest uppercase font-light">{tag}</span>
                <span className="text-gray-200">·</span>
                <span className="text-xs text-gray-400 font-light">{date}</span>
              </div>
              <h3 className="text-lg font-light text-black mb-3 group-hover:text-[#c8a96e] transition-colors leading-snug">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
                <span className="tracking-widest uppercase font-light">Read More</span>
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
