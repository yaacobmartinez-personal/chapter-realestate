"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/data/resources";

export default function FAQ() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Common <span className="font-serif italic">Questions</span></h2>
        </motion.div>
        <div className="divide-y divide-gray-100">
          {faqs.map(({ q, a }, i) => (
            <motion.div key={q} className="py-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <p className="text-base font-light text-black mb-3">{q}</p>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{a}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-12 pt-12 border-t border-gray-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <p className="text-gray-500 font-light text-sm mb-4">Still have questions?</p>
          <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase group">
            <span>Contact Us</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
