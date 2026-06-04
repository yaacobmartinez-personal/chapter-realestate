"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { properties, propertyTypes } from "@/lib/data/properties";
import { useState } from "react";

const listingFilters = ["All", ...propertyTypes.filter((t) => t !== "All")];

export default function FeaturedListings() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? properties
    : properties.filter((p) => p.type === activeFilter);

  return (
    <section id="listings" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Properties</p>
            <h2 className="text-4xl md:text-5xl font-light text-black">Featured Listings</h2>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {listingFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs tracking-widest uppercase font-light px-4 py-2 border transition-colors ${activeFilter === f ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black hover:text-black"}`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, i) => (
            <motion.div
              key={l.id}
              className="group bg-white border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <Link href={`/properties/${l.slug}`} className="block">
                <div className="relative overflow-hidden aspect-4/3">
                  <Image
                    fill
                    src={l.image}
                    alt={l.address}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
