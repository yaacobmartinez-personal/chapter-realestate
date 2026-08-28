"use client";

import { cover } from "@chapter/db";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import type { BlogPost, ContentBlock } from "@/lib/data/resources";

interface ArticleDetailProps {
  article: BlogPost;
  related: BlogPost[];
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={i} className="text-2xl font-light text-black mt-12 mb-4">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p key={i} className="text-gray-600 font-light leading-relaxed mb-6">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mb-6 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-600 font-light">
              <span className="w-1 h-1 rounded-full bg-[#c8a96e] mt-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default function ArticleDetail({ article, related }: ArticleDetailProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[55vh] bg-black overflow-hidden">
        <Image
          fill
          src={cover(article.image)}
          alt={article.title}
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-8 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs text-[#c8a96e] tracking-widest uppercase font-light">{article.tag}</span>
              <span className="text-gray-500">·</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-light">
                <Calendar size={11} />{article.date}
              </span>
              <span className="text-gray-500">·</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-light">
                <Clock size={11} />{article.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight max-w-4xl">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black transition-colors mb-12 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Back to Resources
              </Link>

              <p className="text-xl text-gray-500 font-light leading-relaxed mb-10 border-l-2 border-[#c8a96e] pl-6">
                {article.excerpt}
              </p>

              <div>
                {article.body.map((block, i) => renderBlock(block, i))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-32 space-y-8">
                {/* Article info */}
                <div className="bg-[#f7f7f7] p-7">
                  <h3 className="text-xs tracking-widest uppercase font-light text-gray-400 mb-5">Article Info</h3>
                  <dl className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag size={13} className="text-[#c8a96e]" />
                      <span className="text-sm font-light text-black">{article.tag}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={13} className="text-[#c8a96e]" />
                      <span className="text-sm font-light text-black">{article.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={13} className="text-[#c8a96e]" />
                      <span className="text-sm font-light text-black">{article.readTime}</span>
                    </div>
                  </dl>
                </div>

                {/* CTA */}
                <div className="bg-black text-white p-7">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-3 font-light">Chapter Real Estate</p>
                  <h3 className="text-lg font-light mb-5 leading-snug">Have questions about the Winnipeg market?</h3>
                  <Link
                    href="/contact"
                    className="block w-full text-center text-xs tracking-widest uppercase font-light px-5 py-3.5 bg-[#c8a96e] text-black hover:bg-[#b8996e] transition-colors duration-200"
                  >
                    Talk to an Agent
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">Keep Reading</p>
                <h2 className="text-3xl font-light text-black">More Insights</h2>
              </div>
              <Link href="/resources" className="flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black group transition-colors">
                All Articles <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={`/resources/${post.slug}`} className="group block bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <Image fill src={cover(post.image)} alt={post.title} className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-[#c8a96e] tracking-widest uppercase font-light">{post.tag}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400 font-light">{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-light text-black leading-snug group-hover:text-[#c8a96e] transition-colors">{post.title}</h3>
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
