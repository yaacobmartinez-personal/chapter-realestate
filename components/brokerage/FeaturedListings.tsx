"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const listings = [
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", price: "$879,000", address: "142 Wellington Crescent", area: "Crescentwood", beds: 4, baths: 3, sqft: "3,200", tag: "New Listing" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", price: "$1,250,000", address: "890 Waverly St", area: "River Heights", beds: 5, baths: 4, sqft: "4,500", tag: "Luxury" },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", price: "$425,000", address: "33 Linwood St", area: "St. Vital", beds: 3, baths: 2, sqft: "1,800", tag: "Investment" },
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", price: "$649,000", address: "55 Academy Rd", area: "Tuxedo", beds: 4, baths: 3, sqft: "2,600", tag: "New Listing" },
  { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", price: "$2,100,000", address: "12 Oakenwald Ave", area: "Fort Garry", beds: 6, baths: 5, sqft: "6,200", tag: "Luxury" },
  { image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", price: "$339,000", address: "201 Leila Ave", area: "Garden City", beds: 3, baths: 2, sqft: "1,450", tag: "Investment" },
];

const filters = ["All", "Residential", "Luxury", "Investment"];

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Properties</p>
            <h2 className="text-4xl md:text-5xl font-light text-black">Featured Listings</h2>
          </motion.div>
          <motion.div className="flex gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {filters.map((f) => (
              <button key={f} className={`text-xs tracking-widest uppercase font-light px-4 py-2 border transition-colors ${f === "All" ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black hover:text-black"}`}>{f}</button>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l, i) => (
            <motion.div key={l.address} className="group bg-white border border-gray-100 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="relative overflow-hidden aspect-4/3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.address} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
