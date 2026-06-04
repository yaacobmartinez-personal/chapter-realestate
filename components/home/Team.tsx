"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { homeTeamMembers } from "@/lib/data/home";

export default function Team() {
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">The Team</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">Meet Chapter</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link href="/about#team" className="flex items-center gap-2 text-sm font-light tracking-widest uppercase text-gray-400 hover:text-black group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {homeTeamMembers.map(({ name, role, image }, i) => (
            <motion.div
              key={name}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-200 mb-4 relative">
                <Image
                  fill
                  src={image}
                  alt={name}
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <motion.div
                  className="absolute inset-0 bg-[#c8a96e]/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm font-light text-black">{name}</p>
              <p className="text-xs text-gray-400 font-light mt-0.5">{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
