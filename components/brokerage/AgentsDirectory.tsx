"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const agents = [
  { name: "James Okafor", specialties: "Luxury · River Heights · Tuxedo", phone: "(204) 555-0101", email: "james@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80", listings: 12 },
  { name: "Maria Santos", specialties: "First-Time Buyers · St. Vital · Transcona", phone: "(204) 555-0102", email: "maria@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80", listings: 8 },
  { name: "Tyler Nguyen", specialties: "Investment · Commercial · Fort Rouge", phone: "(204) 555-0103", email: "tyler@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80", listings: 15 },
  { name: "Aisha Kamara", specialties: "Condos · Downtown · The Exchange", phone: "(204) 555-0104", email: "aisha@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80", listings: 9 },
];

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
              <div className="overflow-hidden bg-gray-100 aspect-3/4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
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
