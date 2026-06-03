"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "First-Time Buyer's Guide",
    desc: "A complete walkthrough of the home buying process in Winnipeg — from mortgage to move-in.",
    tag: "Buyers",
  },
  {
    title: "Landlord's Guide to Property Management",
    desc: "Everything property owners need to know about maximizing returns and reducing headaches.",
    tag: "Landlords",
  },
  {
    title: "Tenant Handbook",
    desc: "Rights, responsibilities, and tips for tenants renting through Chapter.",
    tag: "Tenants",
  },
  {
    title: "Real Estate Investing 101",
    desc: "How to evaluate opportunities, build a portfolio, and generate passive income through real estate.",
    tag: "Investors",
  },
];

export default function Guides() {
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
            Guides
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-black">
            Free <span className="font-serif italic">Guides</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map(({ title, desc, tag }, i) => (
            <motion.div
              key={title}
              className="group bg-white p-10 flex gap-8 items-start cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="w-12 h-12 bg-black flex items-center justify-center shrink-0"
                whileHover={{ backgroundColor: "#c8a96e" }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#c8a96e] text-xs font-light tracking-widest group-hover:text-black transition-colors">
                  PDF
                </span>
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-[#c8a96e] tracking-widest uppercase font-light mb-2">
                  {tag}
                </p>
                <h3 className="text-lg font-light text-black mb-2 group-hover:text-[#c8a96e] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
                  {desc}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
                  <span className="tracking-widest uppercase font-light">
                    Download Free
                  </span>
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
