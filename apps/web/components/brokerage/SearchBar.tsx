"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <motion.section
      className="bg-white py-10 border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1 flex items-center gap-3 border border-gray-200 px-5 py-4">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Search by address, neighbourhood, or MLS#" className="flex-1 text-sm font-light text-gray-700 placeholder-gray-400 outline-none bg-transparent" />
          </div>
          <select className="border border-gray-200 px-5 py-4 text-sm font-light text-gray-600 bg-white outline-none min-w-40">
            <option>All Types</option><option>Residential</option><option>Commercial</option><option>Investment</option>
          </select>
          <select className="border border-gray-200 px-5 py-4 text-sm font-light text-gray-600 bg-white outline-none min-w-40">
            <option>Any Price</option><option>Under $400K</option><option>$400K – $700K</option><option>$700K – $1M</option><option>$1M+</option>
          </select>
          <button className="bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">Search</button>
        </div>
      </div>
    </motion.section>
  );
}
