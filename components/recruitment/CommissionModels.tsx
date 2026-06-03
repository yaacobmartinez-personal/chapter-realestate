"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const models = [
  {
    name: "Brokerage Fee Model",
    structure: "100% Commission",
    fee: "Flat monthly fee",
    best: "High-volume producers",
    features: [
      "Keep 100% of your commission",
      "Flat monthly brokerage fee",
      "Full access to all tools & support",
      "Ideal for $500K+ annual GCI",
    ],
  },
  {
    name: "Split Model",
    structure: "80/20 Split",
    fee: "No monthly fee",
    best: "Growing agents",
    features: [
      "80% to agent, 20% to Chapter",
      "No monthly overhead",
      "All training & mentorship included",
      "Ideal for agents building their business",
    ],
    featured: true,
  },
];

export default function CommissionModels() {
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
            Commission Structure
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-black">
            Choose Your <span className="font-serif italic">Model</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-px bg-gray-200">
          {models.map(({ name, structure, fee, best, features, featured }, i) => (
            <motion.div
              key={name}
              className={`p-12 ${featured ? "bg-black text-white" : "bg-white"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p
                className={`text-xs tracking-widest uppercase font-light mb-4 ${
                  featured ? "text-[#c8a96e]" : "text-gray-400"
                }`}
              >
                {name}
              </p>
              <p
                className={`text-4xl font-light mb-1 ${
                  featured ? "text-white" : "text-black"
                }`}
              >
                {structure}
              </p>
              <p
                className={`text-sm font-light mb-1 ${
                  featured ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {fee}
              </p>
              <p
                className={`text-xs font-light mb-8 ${
                  featured ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Best for: {best}
              </p>
              <ul className="space-y-3 mb-10">
                {features.map((f, j) => (
                  <motion.li
                    key={f}
                    className={`flex items-start gap-3 text-sm font-light ${
                      featured ? "text-gray-300" : "text-gray-600"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 + j * 0.07 + 0.3 }}
                  >
                    <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <Link
                href="#apply"
                className={`block text-center text-sm font-light tracking-widest uppercase py-4 transition-colors ${
                  featured
                    ? "bg-[#c8a96e] text-black hover:bg-white"
                    : "border border-gray-200 text-gray-700 hover:border-black hover:text-black"
                }`}
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
