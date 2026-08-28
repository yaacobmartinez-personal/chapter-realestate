"use client";

import { cover } from "@chapter/db";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { propertyTypes, type Property } from "@/lib/data/properties";

export default function PropertyGrid({ properties }: { properties: Property[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered: Property[] =
    activeFilter === "All"
      ? properties
      : properties.filter((p) => p.type === activeFilter);

  return (
    <section className="py-20 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-14">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`text-xs tracking-widest uppercase font-light px-5 py-2.5 border transition-all duration-200 ${
                activeFilter === type
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {type}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-light self-center">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={`/properties/${property.slug}`} className="group block bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <Image
                      fill
                      src={cover(property.image, property.images)}
                      alt={property.address}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">
                      {property.tag}
                    </span>
                    <span className="absolute top-4 right-4 bg-white/90 text-black text-xs tracking-widest uppercase px-3 py-1.5 font-light">
                      {property.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-2xl font-light text-black mb-1">{property.price}</p>
                    <p className="text-sm text-gray-700 font-light mb-1">{property.address}</p>
                    <p className="text-xs text-gray-400 font-light flex items-center gap-1 mb-5">
                      <MapPin size={11} /> {property.area}, {property.city}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 font-light border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1"><Bed size={12} /> {property.beds}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Bath size={12} /> {property.baths}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Square size={12} /> {property.sqft} sqft</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
