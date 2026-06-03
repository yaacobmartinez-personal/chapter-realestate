"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-28 bg-black text-white overflow-hidden relative">
      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white/5"
            style={{ left: `${20 + i * 20}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Ready to Start<br /><span className="font-serif italic text-[#c8a96e]">Your Journey?</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm">Whether you&apos;re buying, selling, investing, or looking for professional property management — we&apos;re here.</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact#book" className="bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-10 py-5 hover:bg-white transition-colors inline-block">Book Consultation</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className="border border-white/20 text-white text-sm font-light tracking-widest uppercase px-10 py-5 hover:border-white transition-colors inline-block">Contact Us</Link>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-white/10">
              <a href="tel:+12045550100" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors font-light">
                <Phone size={14} className="text-[#c8a96e]" />(204) 555-0100
              </a>
              <span className="flex items-center gap-3 text-sm text-gray-400 font-light">
                <MapPin size={14} className="text-[#c8a96e]" />Winnipeg, Manitoba
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
