"use client";
import { motion } from "framer-motion";
import { TrendingUp, Building2, ChevronRight } from "lucide-react";

const opps = [
  {
    icon: TrendingUp,
    title: "Joint Ventures",
    desc: "Partner with Chapter on residential and commercial development projects. We bring the deals, you bring the capital — we share the returns.",
    tag: "Active",
  },
  {
    icon: Building2,
    title: "Multifamily Acquisitions",
    desc: "Access off-market multifamily opportunities curated by our acquisition team. Build a cash-flowing portfolio with expert guidance.",
    tag: "Active",
  },
  {
    icon: Building2,
    title: "Development Projects",
    desc: "Ground-up development opportunities in Winnipeg's fastest-growing corridors, through the Barso Group development arm.",
    tag: "Upcoming",
  },
];

const stats = [
  { number: "$50M+", label: "Assets Under Development" },
  { number: "22%", label: "Average IRR" },
  { number: "18", label: "Projects Completed" },
  { number: "85+", label: "Active Investors" },
];

export default function Opportunities() {
  return (
    <section id="opportunities" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
              Opportunities
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              Invest With
              <br />
              <span className="font-serif italic">Confidence</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">
              Chapter&apos;s investment division connects qualified investors with
              curated real estate opportunities — from income-producing multifamily
              assets to ground-up development projects.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ number, label }, i) => (
              <motion.div
                key={label}
                className="border border-gray-100 p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ borderColor: "#c8a96e", transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-light text-[#c8a96e] mb-1">{number}</p>
                <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {opps.map(({ icon: Icon, title, desc, tag }, i) => (
            <motion.div
              key={title}
              className="group p-10 border border-gray-100 hover:border-black transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="flex items-center justify-between mb-6">
                <Icon size={22} className="text-[#c8a96e]" strokeWidth={1} />
                <span
                  className={`text-xs tracking-widest uppercase font-light px-3 py-1 ${
                    tag === "Active"
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-400"
                  }`}
                >
                  {tag}
                </span>
              </div>
              <h3 className="text-xl font-light text-black mb-3">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                {desc}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
                <span className="tracking-widest uppercase font-light">Learn More</span>
                <ChevronRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
