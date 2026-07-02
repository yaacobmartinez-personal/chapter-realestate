"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BuyerGuideStep } from "@/lib/data/buyer-guide";

export default function BuySection({ steps }: { steps: BuyerGuideStep[] }) {
  return (
    <section id="buy" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Buying — The 10-Step Program</p>
          <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
            Your Path to<br /><span className="font-serif italic">Homeownership</span>
          </h2>
          <p className="text-gray-500 font-light leading-relaxed text-sm">
            A step-by-step guide for homebuyers across Manitoba — designed to feel empowering, not
            stressful. From first-time buyers to seasoned investors, Chapter Real Estate guides you
            through every stage, from search to keys in hand.
          </p>
        </motion.div>

        {/* 10 steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
          {steps.map(({ id, step, title, shortDesc }, i) => (
            <motion.div
              key={id}
              className="bg-[#f7f7f7] p-8 lg:p-10 flex gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-3xl font-light text-[#c8a96e] leading-none shrink-0 tabular-nums">
                {step}
              </span>
              <div>
                <h3 className="text-lg font-light text-black mb-2">{title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/buyers-guide"
            className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors"
          >
            Read the Full Buyer&apos;s Guide
          </Link>
          <Link
            href="/contact#book"
            className="inline-flex items-center gap-3 border border-gray-300 text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-black transition-colors"
          >
            Start Your Home Search
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
