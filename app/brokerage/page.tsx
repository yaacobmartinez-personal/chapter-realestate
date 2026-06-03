"use client";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { ArrowRight, Search, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

function SearchBar() {
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
          <select className="border border-gray-200 px-5 py-4 text-sm font-light text-gray-600 bg-white outline-none min-w-[160px]">
            <option>All Types</option><option>Residential</option><option>Commercial</option><option>Investment</option>
          </select>
          <select className="border border-gray-200 px-5 py-4 text-sm font-light text-gray-600 bg-white outline-none min-w-[160px]">
            <option>Any Price</option><option>Under $400K</option><option>$400K – $700K</option><option>$700K – $1M</option><option>$1M+</option>
          </select>
          <button className="bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">Search</button>
        </div>
      </div>
    </motion.section>
  );
}

function BuySection() {
  const categories = [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", label: "Residential" },
    { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", label: "Commercial" },
    { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", label: "Investment" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", label: "Luxury" },
  ];
  return (
    <section id="buy" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Buying</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">Find Your<br /><span className="font-serif italic">Perfect Home</span></h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-sm text-sm">From first-time buyers to seasoned investors, our agents guide you through every step — from search to keys in hand.</p>
            <ul className="space-y-3 mb-10">
              {["Access to all MLS listings + off-market properties","Dedicated buyer's agent at no cost to you","Neighbourhood expertise across all of Winnipeg","Negotiation specialists with proven track records"].map((item, i) => (
                <motion.li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-light"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <ChevronRight size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{item}
                </motion.li>
              ))}
            </ul>
            <Link href="/contact#book" className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">Book a Showing</Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map(({ image, label }, i) => (
              <motion.div key={label} className="relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "1" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <span className="text-white text-xs tracking-widest uppercase font-light">{label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedListings() {
  const listings = [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", price: "$879,000", address: "142 Wellington Crescent", area: "Crescentwood", beds: 4, baths: 3, sqft: "3,200", tag: "New Listing" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", price: "$1,250,000", address: "890 Waverly St", area: "River Heights", beds: 5, baths: 4, sqft: "4,500", tag: "Luxury" },
    { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", price: "$425,000", address: "33 Linwood St", area: "St. Vital", beds: 3, baths: 2, sqft: "1,800", tag: "Investment" },
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", price: "$649,000", address: "55 Academy Rd", area: "Tuxedo", beds: 4, baths: 3, sqft: "2,600", tag: "New Listing" },
    { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", price: "$2,100,000", address: "12 Oakenwald Ave", area: "Fort Garry", beds: 6, baths: 5, sqft: "6,200", tag: "Luxury" },
    { image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", price: "$339,000", address: "201 Leila Ave", area: "Garden City", beds: 3, baths: 2, sqft: "1,450", tag: "Investment" },
  ];
  return (
    <section id="listings" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Properties</p>
            <h2 className="text-4xl md:text-5xl font-light text-black">Featured Listings</h2>
          </motion.div>
          <motion.div className="flex gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {["All", "Residential", "Luxury", "Investment"].map((f) => (
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
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
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

function SellSection() {
  const steps = [
    { step: "01", title: "Free Home Valuation", desc: "We assess your property's market value using real data and local expertise." },
    { step: "02", title: "Custom Marketing Strategy", desc: "Professional photography, virtual tours, social media campaigns, and MLS exposure." },
    { step: "03", title: "Agent Representation", desc: "Your dedicated listing agent handles all showings, negotiations, and paperwork." },
    { step: "04", title: "Close & Move", desc: "We guide you through conditions, inspections, and a smooth closing process." },
  ];
  return (
    <section id="sell" className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Selling</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">Sell Smarter.<br /><span className="font-serif italic">Get More.</span></h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-sm text-sm">Our proven selling process maximizes your home&apos;s value through precision marketing, expert staging guidance, and skilled negotiation.</p>
            <Link href="/contact#book" className="inline-flex items-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors">
              Get Your Free Valuation <ArrowRight size={14} />
            </Link>
          </motion.div>
          <div className="divide-y divide-gray-200">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div key={step} className="py-8 flex gap-8"
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-[#c8a96e] font-light tracking-widest pt-1">{step}</span>
                <div>
                  <h3 className="text-lg font-light text-black mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentsDirectory() {
  const agents = [
    { name: "James Okafor", specialties: "Luxury · River Heights · Tuxedo", phone: "(204) 555-0101", email: "james@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80", listings: 12 },
    { name: "Maria Santos", specialties: "First-Time Buyers · St. Vital · Transcona", phone: "(204) 555-0102", email: "maria@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80", listings: 8 },
    { name: "Tyler Nguyen", specialties: "Investment · Commercial · Fort Rouge", phone: "(204) 555-0103", email: "tyler@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80", listings: 15 },
    { name: "Aisha Kamara", specialties: "Condos · Downtown · The Exchange", phone: "(204) 555-0104", email: "aisha@chapterrealestate.ca", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80", listings: 9 },
  ];
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
              <div className="overflow-hidden bg-gray-100" style={{ aspectRatio: "3/4" }}>
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

function MarketInsights() {
  const stats = [
    { label: "Avg. Days on Market", value: "18", note: "Winnipeg 2025" },
    { label: "Avg. Sale Price", value: "$432K", note: "YTD 2025" },
    { label: "List-to-Sale Ratio", value: "101%", note: "Q1 2025" },
    { label: "Active Listings", value: "2,840", note: "Current" },
  ];
  return (
    <section id="insights" className="py-28 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Market Insights</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">Know Your<br /><span className="font-serif italic">Market</span></h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm mb-10">Our market reports give you an edge — whether you&apos;re buying your first home or building a portfolio.</p>
            <Link href="/resources" className="inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase text-[#c8a96e] hover:text-white transition-colors group">
              View All Insights <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, note }, i) => (
              <motion.div key={label} className="border border-white/10 p-8"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(200,169,110,0.4)", transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-light text-[#c8a96e] mb-1">{value}</p>
                <p className="text-xs text-gray-400 font-light mb-1">{label}</p>
                <p className="text-xs text-gray-600 font-light">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BrokeragePage() {
  return (
    <>
      <PageHero label="Real Estate Brokerage" heading="Buy. Sell." headingAccent="Succeed." image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" />
      <SearchBar />
      <BuySection />
      <FeaturedListings />
      <SellSection />
      <AgentsDirectory />
      <MarketInsights />
    </>
  );
}
