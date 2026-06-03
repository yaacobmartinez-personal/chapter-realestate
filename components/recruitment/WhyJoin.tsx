"use client";
import { motion } from "framer-motion";
import { Laptop, BarChart3, Users, Award } from "lucide-react";

const reasons = [
  {
    icon: BarChart3,
    title: "Industry-Leading Commission",
    desc: "Keep more of what you earn with competitive split structures designed to reward top producers.",
  },
  {
    icon: Laptop,
    title: "Modern Technology",
    desc: "CRM systems, marketing automation, digital transaction management, and AI tools — all included.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    desc: "A team-first environment where senior agents mentor new talent and everyone wins together.",
  },
  {
    icon: Award,
    title: "Brand & Marketing",
    desc: "Professional marketing support, listing photography, social media assets, and a brand that attracts clients.",
  },
];

export default function WhyJoin() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
              Why Agents Move to Chapter
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              The Platform
              <br />
              <span className="font-serif italic">You Deserve</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">
              Top agents choose Chapter because we invest in their success — with
              better tools, better support, and better culture than any other
              brokerage in Winnipeg.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[480px] overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Chapter Team"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="bg-white p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={22} className="text-[#c8a96e] mb-6" strokeWidth={1} />
              </motion.div>
              <h3 className="text-lg font-light text-black mb-3">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
