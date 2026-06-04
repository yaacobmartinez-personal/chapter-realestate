"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { blogPosts } from "@/lib/data/resources";

export default function BlogInsights() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Blog & Insights</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Latest from <span className="font-serif italic">Chapter</span></h2>
        </motion.div>

        {/* Featured post */}
        <motion.div
          className="group grid md:grid-cols-2 gap-8 mb-12 cursor-pointer border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              fill
              src={featured.image}
              alt={featured.title}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-[#c8a96e] tracking-widest uppercase font-light">{featured.tag}</span>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400 font-light">{featured.readTime}</span>
            </div>
            <h3 className="text-2xl font-light text-black mb-4 leading-snug group-hover:text-[#c8a96e] transition-colors">{featured.title}</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
              <span className="tracking-widest uppercase font-light">Read Article</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(({ tag, title, excerpt, readTime, image }, i) => (
            <motion.article
              key={title}
              className="group bg-white border border-gray-100 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  fill
                  src={image}
                  alt={title}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-[#c8a96e] tracking-widest uppercase font-light">{tag}</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-400 font-light">{readTime}</span>
                </div>
                <h3 className="text-lg font-light text-black mb-3 leading-snug group-hover:text-[#c8a96e] transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
                  <span className="tracking-widest uppercase font-light">Read More</span>
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
