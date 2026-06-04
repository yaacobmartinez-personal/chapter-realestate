"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import { pmCtaBenefits } from "@/lib/data/home";

export default function PMCta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="py-28 bg-black text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-15 bg-cover bg-center scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80')", y: bgY }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Property Management</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">Your Property.<br /><span className="font-serif italic text-[#c8a96e]">Fully Managed.</span></h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm">Let Chapter handle everything — from finding quality tenants to keeping your property in top condition — while you enjoy the returns.</p>
          </motion.div>

          <div>
            <ul className="space-y-4 mb-10">
              {pmCtaBenefits.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-3 text-sm text-gray-300 font-light"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <CheckCircle size={16} className="text-[#c8a96e] mt-0.5 shrink-0" />{b}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/property-management#analysis" className="bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors">Free Rental Analysis</Link>
              <Link href="/property-management" className="border border-white/20 text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-white transition-colors">Learn More</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
