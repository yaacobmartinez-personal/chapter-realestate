"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buyerGuideIntro, buyerGuideClosing, buyerGuideSteps } from "@/lib/data/brokerage";

export default function BuyerGuide() {
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
            Your 10-Step Home Buying Journey
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {buyerGuideIntro}
          </motion.p>
        </div>
      </section>

      {/* Steps — alternating image / text */}
      <div>
        {buyerGuideSteps.map(({ step, title, paragraphs, image }, i) => {
          const reversed = i % 2 === 1;
          return (
            <section key={step} className={reversed ? "bg-[#f7f7f7]" : "bg-white"}>
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Image */}
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
                    <span className="absolute bottom-0 left-0 bg-black/80 text-white text-5xl md:text-6xl font-light px-6 py-3 tabular-nums">
                      {step}
                    </span>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    className={reversed ? "lg:order-1" : ""}
                    initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Step {step}</p>
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

      {/* Closing CTA */}
      <section className="py-28 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light">Welcome Home</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Ready to <span className="font-serif italic text-[#c8a96e]">Begin?</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-xl mx-auto">
              {buyerGuideClosing}
            </p>
            <Link
              href="/contact#book"
              className="inline-flex items-center gap-3 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors"
            >
              Talk to a Chapter Agent <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
