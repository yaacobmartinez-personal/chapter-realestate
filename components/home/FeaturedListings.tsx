"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { homeFeaturedListings } from "@/lib/data/home";

export default function FeaturedListings() {
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
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Properties</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">Featured Listings</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href="/brokerage#listings" className="flex items-center gap-2 text-sm font-light tracking-widest uppercase text-gray-400 hover:text-black group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeFeaturedListings.map((l, i) => (
            <motion.div
              key={l.address}
              className="group bg-white overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  fill
                  src={l.image}
                  alt={l.address}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-4 left-4 bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">{l.tag}</span>
              </div>
              <div className="p-6">
                <p className="text-2xl font-light text-black mb-2">{l.price}</p>
                <p className="text-sm text-gray-700 font-light mb-1">{l.address}</p>
                <p className="text-xs text-gray-400 font-light flex items-center gap-1 mb-4"><MapPin size={11} /> {l.area}, Winnipeg</p>
                <div className="flex gap-4 text-xs text-gray-500 font-light border-t border-gray-100 pt-4">
                  <span>{l.beds} Beds</span><span>·</span><span>{l.baths} Baths</span><span>·</span><span>{l.sqft} sqft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
