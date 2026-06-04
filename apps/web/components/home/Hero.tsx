"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-45 scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80')", y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Animated gold line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-[#c8a96e]/30"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            className="text-xs tracking-[0.35em] uppercase text-[#c8a96e] mb-6 font-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Winnipeg&apos;s Modern Real Estate Platform
          </motion.p>

          {/* Heading — line by line stagger */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05]">A New</span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <em className="block text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#c8a96e] leading-[1.05]">Chapter</em>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05]">Begins Here</span>
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-gray-300 font-light text-lg max-w-xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Buy, sell, invest, and manage property with Winnipeg&apos;s most forward-thinking real estate firm.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Link href="/brokerage#buy" className="bg-white text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] hover:text-white transition-colors">Buy a Home</Link>
            <Link href="/brokerage#sell" className="border border-white text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors">Sell a Home</Link>
            <Link href="/property-management" className="border border-white/30 text-white/80 text-sm font-light tracking-widest uppercase px-8 py-4 hover:border-white hover:text-white transition-colors">Property Management</Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/20 relative overflow-hidden"
          animate={{ scaleY: [1, 1, 1] }}
        >
          <motion.div
            className="w-full bg-[#c8a96e] h-4 absolute top-0"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
