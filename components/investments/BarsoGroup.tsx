"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { barsoEntities } from "@/lib/data/investments";

export default function BarsoGroup() {
  return (
    <section id="barso" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Development Group</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">The Barso Group</h2>
          <p className="text-gray-500 font-light text-sm mt-4 max-w-md leading-relaxed">
            Chapter&apos;s sister development group, Barso, spans residential construction, commercial concrete, and mixed-use development.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {barsoEntities.map(({ name, desc, image }, i) => (
            <motion.div
              key={name}
              className="group overflow-hidden bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  fill
                  src={image}
                  alt={name}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-light text-black mb-3">{name}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
