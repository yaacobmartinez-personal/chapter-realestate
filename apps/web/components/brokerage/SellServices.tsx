"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  sellerIntro,
  sellerClosing,
  sellerSections,
  sellerListingSupport,
  sellerMarketingTools,
} from "@/lib/data/brokerage";

export default function SellServices() {
  return (
    <>
      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Services for Sellers
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {sellerIntro}
          </motion.p>
        </div>
      </section>

      {/* Editorial sections — alternating image / text */}
      <div>
        {sellerSections.map(({ title, paragraphs, image }, i) => {
          const reversed = i % 2 === 1;
          return (
            <section key={title} className={reversed ? "bg-[#f7f7f7]" : "bg-white"}>
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <motion.div
                    className={`relative aspect-4/3 overflow-hidden ${reversed ? "lg:order-2" : ""}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      fill
                      src={image}
                      alt={title}
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                  <motion.div
                    className={reversed ? "lg:order-1" : ""}
                    initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h2 className="text-3xl md:text-4xl font-light text-black leading-tight mb-6">{title}</h2>
                    <div className="space-y-4">
                      {paragraphs.map((p, idx) => (
                        <p key={idx} className="text-gray-500 font-light leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Full-service listing support + marketing tools */}
      <section className="py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Full-Service Listing Support</p>
            <h3 className="text-2xl md:text-3xl font-light text-black mb-4">Working with a Chapter agent, you will:</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
              Our agents have access to the brokerage&apos;s entire database of market information —
              historical stats as well as current real estate reports.
            </p>
            <ul className="space-y-4">
              {sellerListingSupport.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-600 font-light"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Check size={15} className="text-[#c8a96e] mt-0.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Eye-Capturing Marketing</p>
            <h3 className="text-2xl md:text-3xl font-light text-black mb-4">Your property, beautifully showcased</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
              Our marketing support lets your agent efficiently deliver materials that showcase your
              property — so they can focus on refining your listing strategy and getting you top dollar.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {sellerMarketingTools.map((tool, i) => (
                <motion.li
                  key={tool}
                  className="flex items-start gap-2.5 text-sm text-gray-600 font-light"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Check size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />
                  {tool}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-28 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light">Make a Strategic Sale</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Ready to <span className="font-serif italic text-[#c8a96e]">Sell?</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-xl mx-auto">{sellerClosing}</p>
            <Link
              href="/contact#book"
              className="inline-flex items-center gap-3 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors"
            >
              Get Your Free Home Valuation <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
