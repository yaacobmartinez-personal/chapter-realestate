"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Search } from "lucide-react";
import { agents } from "@/lib/data/brokerage";

export default function AgentsDirectory() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");

  const specialties = useMemo(
    () => ["All", ...Array.from(new Set(agents.map((a) => a.specialties)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents.filter((a) => {
      const matchesSpecialty = specialty === "All" || a.specialties === specialty;
      const matchesQuery =
        q === "" ||
        a.name.toLowerCase().includes(q) ||
        a.specialties.toLowerCase().includes(q);
      return matchesSpecialty && matchesQuery;
    });
  }, [query, specialty]);

  return (
    <section id="agents" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Agents</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Meet Our Team</h2>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialty…"
              aria-label="Search agents"
              className="w-full border border-gray-200 pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light"
            />
          </div>
          <div className="md:ml-auto">
            <label className="sr-only" htmlFor="agent-specialty">Filter by specialty</label>
            <select
              id="agent-specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full md:w-auto border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none focus:border-black transition-colors font-light bg-white"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Specialties" : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-light mb-8">
          {filtered.length} {filtered.length === 1 ? "agent" : "agents"}
        </p>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 font-light py-16 text-center">
            No agents match your search. Try a different name or specialty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(({ id, name, specialties, phone, email, image, listings }, i) => (
              <motion.div
                key={id}
                className="group border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
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
        )}
      </div>
    </section>
  );
}
