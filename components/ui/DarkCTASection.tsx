"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DarkCTASectionProps {
  id?: string;
  label: string;
  heading: string;
  headingAccent?: string;
  description: string;
  children: ReactNode;
  alignItems?: "start" | "center";
  leftAction?: ReactNode;
}

export default function DarkCTASection({
  id,
  label,
  heading,
  headingAccent,
  description,
  children,
  alignItems = "start",
  leftAction,
}: DarkCTASectionProps) {
  return (
    <section id={id} className="py-28 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 ${alignItems === "center" ? "items-center" : "items-start"}`}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
              {label}
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              {heading}
              {headingAccent && (
                <>
                  <br />
                  <span className="font-serif italic">{headingAccent}</span>
                </>
              )}
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">
              {description}
            </p>
            {leftAction && <div className="mt-10">{leftAction}</div>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
