"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, ArrowLeft, ArrowRight } from "lucide-react";
import type { RentalUnit } from "@/lib/data/rentals";

export default function RentalDetail({
  rental,
  related,
}: {
  rental: RentalUnit;
  related: RentalUnit[];
}) {
  const gallery = rental.images.length > 0 ? rental.images : [rental.image];
  const [current, setCurrent] = useState(0);
  const isResidential = rental.category === "Residential";

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[52vh] md:h-[62vh] bg-black">
        <Image
          fill
          src={gallery[current]}
          alt={rental.address}
          className="object-cover opacity-90"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </section>

      {/* Thumbnail strip — only when there is more than one image */}
      {gallery.length > 1 && (
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex gap-2 overflow-x-auto scrollbar-none">
            {gallery.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setCurrent(i)}
                aria-label={`View photo ${i + 1}`}
                className={`relative flex-shrink-0 h-16 w-24 overflow-hidden transition-all duration-200 ${
                  i === current ? "ring-1 ring-[#c8a96e] opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image fill src={img} alt="" className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link href="/property-management#residential" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black transition-colors mb-10">
            <ArrowLeft size={14} /> All Rentals
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Chips — above the price */}
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">{rental.category}</span>
                <span className="bg-[#c8a96e] text-black text-xs tracking-widest uppercase px-3 py-1.5 font-light">{rental.status}</span>
              </div>

              <p className="text-4xl md:text-5xl font-light text-black mb-3">{rental.rent}</p>
              <p className="text-lg font-light text-gray-700 mb-1">{rental.address}</p>
              <p className="flex items-center gap-1.5 text-sm font-light text-gray-400 mb-10">
                <MapPin size={14} className="text-[#c8a96e]" /> {rental.area}, Winnipeg, Manitoba
              </p>

              <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-8 max-w-md">
                {isResidential && (
                  <>
                    <div className="text-center">
                      <Bed size={20} className="mx-auto mb-2 text-[#c8a96e]" strokeWidth={1} />
                      <p className="text-lg font-light text-black">{rental.beds}</p>
                      <p className="text-xs font-light text-gray-400 mt-0.5">Beds</p>
                    </div>
                    <div className="text-center">
                      <Bath size={20} className="mx-auto mb-2 text-[#c8a96e]" strokeWidth={1} />
                      <p className="text-lg font-light text-black">{rental.baths}</p>
                      <p className="text-xs font-light text-gray-400 mt-0.5">Baths</p>
                    </div>
                  </>
                )}
                <div className="text-center">
                  <Square size={20} className="mx-auto mb-2 text-[#c8a96e]" strokeWidth={1} />
                  <p className="text-lg font-light text-black">{rental.sqft}</p>
                  <p className="text-xs font-light text-gray-400 mt-0.5">Sqft</p>
                </div>
              </div>
            </motion.div>

            {/* Enquiry card */}
            <motion.aside
              className="lg:sticky lg:top-28 self-start border border-gray-100 p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">Interested?</p>
              <h2 className="text-2xl font-light text-black mb-4">Enquire about this unit</h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                Book a viewing or ask us anything about this {rental.category.toLowerCase()} rental — a
                Chapter property manager will get back to you.
              </p>
              <Link
                href={`/contact?interest=Property%20Management&ref=${encodeURIComponent(rental.address)}#book`}
                className="inline-flex w-full items-center justify-center gap-3 bg-black text-white text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-[#c8a96e] transition-colors"
              >
                Request a Viewing <ArrowRight size={14} />
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related rentals */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-light text-black mb-10">More {rental.category} Rentals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/rentals/${r.id}`} className="group bg-white border border-gray-100 overflow-hidden">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      fill
                      src={r.image}
                      alt={r.address}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-4 right-4 bg-[#c8a96e] text-black text-xs tracking-widest uppercase px-3 py-1.5 font-light">{r.status}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xl font-light text-black mb-1">{r.rent}</p>
                    <p className="text-sm text-gray-700 font-light mb-1">{r.address}</p>
                    <p className="text-xs text-gray-400 font-light flex items-center gap-1"><MapPin size={11} /> {r.area}, Winnipeg</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
