"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { agents } from "@/lib/data/brokerage";

export default function AgentsDirectory() {
  return (
    <section id="agents" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Agents</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Meet Your Agent</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map(({ name, specialties, phone, email, image, listings }, i) => (
            <motion.div key={name} className="group border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-3/4">
                <Image
                  fill
                  src={image}
                  alt={name}
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-light text-black">{name}</p>
                <p className="text-xs text-[#c8a96e] font-light mt-1 mb-3">{specialties}</p>
                <p className="text-xs text-gray-400 font-light mb-1">{listings} Active Listings</p>
                <div className="flex gap-2 mt-4">
                  <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-1 border border-gray-200 py-2 text-xs text-gray-500 hover:border-black hover:text-black transition-colors font-light"><Phone size={11} /> Call</a>
                  <a href={`mailto:${email}`} className="flex-1 flex items-center justify-center gap-1 border border-gray-200 py-2 text-xs text-gray-500 hover:border-black hover:text-black transition-colors font-light"><Mail size={11} /> Email</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
