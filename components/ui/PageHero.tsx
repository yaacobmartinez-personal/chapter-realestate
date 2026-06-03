"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeroProps {
  label: string;
  heading: string;
  headingAccent?: string;
  image: string;
}

export default function PageHero({ label, heading, headingAccent, image }: PageHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative pt-48 pb-24 bg-black text-white overflow-hidden min-h-[42vh] flex items-end">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-110"
        style={{ backgroundImage: `url('${image}')`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

      {/* Animated side accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-[#c8a96e]/25"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "top" }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-4 font-light"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {label}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl md:text-7xl font-light leading-tight max-w-3xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heading}
            {headingAccent && (
              <><br /><span className="font-serif italic text-[#c8a96e]">{headingAccent}</span></>
            )}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}
