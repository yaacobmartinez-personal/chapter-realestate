"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Award, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pmStrengths, pmProcess } from "@/lib/data/property-management";

const iconMap: Record<string, LucideIcon> = { BarChart3, Award, Heart };

export default function Overview() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  });
  const ringsY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const ringsRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">For Landlords</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              The Chapter Advantage<br />for Landlords
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-md">
              Whether you have a single property or a portfolio of rental units, managing rental
              properties can be complex and time-consuming. At Chapter, we offer a comprehensive
              property management solution to help you maximize your rental income and minimize the
              hassles of ownership.
            </p>
          </motion.div>
          <motion.div
            className="relative h-120 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              fill
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Property Management"
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
          {pmStrengths.map(({ iconKey, title, desc }) => {
            const Icon = iconMap[iconKey];
            return (
              <div key={title} className="bg-white p-10">
                <Icon size={28} className="text-[#c8a96e] mb-6" strokeWidth={1} />
                <h3 className="text-lg font-light text-black mb-3">{title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>

        {/* Chapter's Process */}
        <div ref={processRef} className="mt-28 relative overflow-hidden">
          {/* Subtle decorative concentric rings — parallax on scroll */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            style={{ y: ringsY, rotate: ringsRotate }}
            className="pointer-events-none absolute -right-40 -top-28 w-[600px] h-[600px] text-[#c8a96e] opacity-20 will-change-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="300" cy="300" r="90" />
            <circle cx="300" cy="300" r="160" />
            <circle cx="300" cy="300" r="230" />
            <circle cx="300" cy="300" r="299" />
          </motion.svg>

          <motion.div
            className="relative max-w-2xl mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Chapter&apos;s Process</p>
            <h2 className="text-5xl md:text-6xl font-light text-black leading-tight mb-6">
              Simple,<br />Start to Finish
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-base">
              We keep property management refreshingly simple. Whether you own a single unit or a
              growing portfolio, Chapter takes care of every stage of the rental lifecycle — from the
              first consultation to the end of tenancy — so owning a rental in Manitoba stays easy and
              hands-off for you. Ten clear steps, no guesswork.
            </p>
          </motion.div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
            {pmProcess.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                className="bg-white p-10 lg:p-14 flex gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-5xl lg:text-6xl font-light text-[#c8a96e] leading-none shrink-0 tabular-nums">{step}</span>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-light text-black mb-3">{title}</h3>
                  <p className="text-base text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
