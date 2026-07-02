"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { rentalCategories, type RentalUnit } from "@/lib/data/rentals";

export default function AvailableRentals({ rentals }: { rentals: RentalUnit[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof rentalCategories)[number]>("All");

  const filtered =
    activeFilter === "All"
      ? rentals
      : rentals.filter((u) => u.category === activeFilter);

  return (
    <section id="residential" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div id="commercial" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Available Rentals</p>
            <h2 className="text-4xl md:text-5xl font-light text-black">Residential & Commercial</h2>
            <p className="text-gray-500 font-light text-sm mt-4 max-w-md">
              Current residential and commercial units available for rent across Winnipeg and Manitoba,
              all managed by Chapter.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {rentalCategories.map((f) => (
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

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 font-light py-16 text-center">No units available in this category right now — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((u, i) => (
              <motion.div
                key={u.id}
                className="group bg-white border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <Link href={`/rentals/${u.id}`} className="block">
                  <div className="relative overflow-hidden aspect-4/3">
                    <Image
                      fill
                      src={u.image}
                      alt={u.address}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">{u.category}</span>
                    <span className="absolute top-4 right-4 bg-[#c8a96e] text-black text-xs tracking-widest uppercase px-3 py-1.5 font-light">{u.status}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-2xl font-light text-black mb-2">{u.rent}</p>
                    <p className="text-sm text-gray-700 font-light mb-1">{u.address}</p>
                    <p className="text-xs text-gray-400 font-light flex items-center gap-1 mb-4"><MapPin size={11} /> {u.area}, Winnipeg</p>
                    <div className="flex gap-4 text-xs text-gray-500 font-light border-t border-gray-100 pt-4">
                      {u.category === "Residential" ? (
                        <>
                          <span className="flex items-center gap-1"><Bed size={12} /> {u.beds}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Bath size={12} /> {u.baths}</span>
                          <span>·</span>
                        </>
                      ) : null}
                      <span className="flex items-center gap-1"><Square size={12} /> {u.sqft} sqft</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
