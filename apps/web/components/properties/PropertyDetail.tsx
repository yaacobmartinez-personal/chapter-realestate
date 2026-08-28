"use client";

import { cover, gallery } from "@chapter/db";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Car, Calendar, Hash, Check, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/data/properties";
import PropertyCarousel from "./PropertyCarousel";
import PropertyMap from "./PropertyMap";
import { submitPropertyInquiry } from "@/actions/forms";
import FormStatus from "@/components/ui/FormStatus";

interface PropertyDetailProps {
  property: Property;
  related: Property[];
}

function PropertyInquiryForm({ property }: { property: Property }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    fd.set("property", `${property.address} — ${property.price} (MLS® ${property.mls})`);
    const result = await submitPropertyInquiry(fd);
    if (result.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <div className="bg-black text-white p-8">
      <p className="text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-3 font-light">Interested?</p>
      <h3 className="text-xl font-light mb-6">Book a Private Showing</h3>
      {status === "success" ? (
        <FormStatus status="success" successMessage="Thanks! An agent will reach out within 24 hours." />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" type="text" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
          <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
          <input name="phone" type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
          <textarea name="message" placeholder="Questions or preferred showing times…" rows={3} className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light resize-none" />
          <FormStatus status={status} error={errorMsg} />
          <button type="submit" disabled={status === "loading"} className="w-full text-center text-xs tracking-widest uppercase font-light px-6 py-4 bg-[#c8a96e] text-black hover:bg-[#b8996e] transition-colors duration-200 disabled:opacity-50">
            {status === "loading" ? "Sending…" : "Request Showing"}
          </button>
          <p className="text-xs text-gray-500 font-light text-center">No obligation. Response within 24 hrs.</p>
        </form>
      )}
    </div>
  );
}

export default function PropertyDetail({ property, related }: PropertyDetailProps) {
  return (
    <div className="bg-white">
      <PropertyCarousel images={gallery(property.images, property.image)} address={property.address} tag={property.tag} />

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">{property.type}</p>
                <h1 className="text-4xl md:text-5xl font-light text-black mb-3">{property.price}</h1>
                <p className="text-lg text-gray-700 font-light mb-1">{property.address}</p>
                <p className="text-sm text-gray-400 font-light flex items-center gap-1 mb-10">
                  <MapPin size={13} /> {property.area}, {property.city}, {property.province}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-gray-100 py-8 mb-10">
                  {[
                    { icon: Bed, label: "Bedrooms", value: property.beds },
                    { icon: Bath, label: "Bathrooms", value: property.baths },
                    { icon: Square, label: "Square Feet", value: property.sqft },
                    { icon: Car, label: "Garage", value: `${property.garage} car` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center">
                      <Icon size={18} className="mx-auto text-[#c8a96e] mb-2" />
                      <p className="text-xl font-light text-black">{value}</p>
                      <p className="text-xs text-gray-400 font-light mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <h2 className="text-xl font-light text-black mb-4">About This Property</h2>
                <p className="text-gray-600 font-light leading-relaxed mb-12">{property.description}</p>

                {/* Features */}
                <h2 className="text-xl font-light text-black mb-6">Features & Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                      <Check size={14} className="text-[#c8a96e] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-1"
            >
              {/* Details card */}
              <div className="bg-[#f7f7f7] p-8 mb-6">
                <h3 className="text-sm tracking-widest uppercase font-light text-gray-400 mb-6">Property Details</h3>
                <dl className="space-y-4">
                  {[
                    { icon: Calendar, label: "Year Built", value: property.yearBuilt },
                    { icon: Square, label: "Lot Size", value: property.lot },
                    { icon: Hash, label: "MLS®", value: property.mls },
                    { icon: MapPin, label: "Neighbourhood", value: property.area },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                        <Icon size={13} />
                        {label}
                      </div>
                      <span className="text-sm text-black font-light">{value}</span>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Inquiry form */}
              <PropertyInquiryForm property={property} />
            </motion.div>
          </div>
        </div>
      </section>

      <PropertyMap
        lng={property.coordinates.lng}
        lat={property.coordinates.lat}
        address={property.address}
        city={property.city}
        province={property.province}
      />

      {/* Related listings */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">More Properties</p>
                <h2 className="text-3xl font-light text-black">Similar Listings</h2>
              </div>
              <Link href="/properties" className="flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black group transition-colors">
                View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={`/properties/${p.slug}`} className="group block bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image fill src={cover(p.image, p.images)} alt={p.address} className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                      <span className="absolute top-4 left-4 bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">{p.tag}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-xl font-light text-black mb-1">{p.price}</p>
                      <p className="text-sm text-gray-600 font-light mb-1">{p.address}</p>
                      <p className="text-xs text-gray-400 font-light flex items-center gap-1 mb-4"><MapPin size={11} /> {p.area}</p>
                      <div className="flex gap-3 text-xs text-gray-500 font-light border-t border-gray-100 pt-4">
                        <span>{p.beds} Beds</span><span>·</span><span>{p.baths} Baths</span><span>·</span><span>{p.sqft} sqft</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
