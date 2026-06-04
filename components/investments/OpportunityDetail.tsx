"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Building2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { InvestmentOpportunity, ContentBlock } from "@/lib/data/investments";

const iconMap: Record<string, LucideIcon> = { TrendingUp, Building2 };

interface OpportunityDetailProps {
  opportunity: InvestmentOpportunity;
  related: InvestmentOpportunity[];
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading":
      return <h2 key={i} className="text-2xl font-light text-black mt-12 mb-4">{block.text}</h2>;
    case "paragraph":
      return <p key={i} className="text-gray-600 font-light leading-relaxed mb-6">{block.text}</p>;
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

export default function OpportunityDetail({ opportunity, related }: OpportunityDetailProps) {
  const Icon = iconMap[opportunity.iconKey] ?? TrendingUp;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-black pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-4 mb-8">
              <Icon size={28} className="text-[#c8a96e]" strokeWidth={1} />
              <span className={`text-xs tracking-widest uppercase font-light px-3 py-1 ${opportunity.tag === "Active" ? "bg-[#c8a96e] text-black" : "border border-white/20 text-gray-400"}`}>
                {opportunity.tag}
              </span>
            </div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Investment Opportunity</p>
            <h1 className="text-5xl md:text-6xl font-light text-white leading-tight max-w-3xl mb-6">{opportunity.title}</h1>
            <p className="text-gray-400 font-light text-lg max-w-xl leading-relaxed">{opportunity.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/investments"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black transition-colors mb-12 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Back to Investments
              </Link>
              <div>{opportunity.body.map((block, i) => renderBlock(block, i))}</div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-32 space-y-6">
                <div className="bg-[#f7f7f7] p-7">
                  <h3 className="text-xs tracking-widest uppercase font-light text-gray-400 mb-5">Opportunity Status</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs tracking-widest uppercase font-light px-3 py-1.5 ${opportunity.tag === "Active" ? "bg-black text-white" : "border border-gray-300 text-gray-400"}`}>
                      {opportunity.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {opportunity.tag === "Active"
                      ? "This opportunity is currently accepting qualified investor inquiries."
                      : "This opportunity is in preparation. Register your interest to be notified when details are available."}
                  </p>
                </div>

                <div className="bg-black text-white p-7">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-3 font-light">Investor Relations</p>
                  <h3 className="text-lg font-light mb-5 leading-snug">
                    {opportunity.tag === "Active" ? "Request Investment Details" : "Register Your Interest"}
                  </h3>
                  <Link
                    href="/contact"
                    className="block w-full text-center text-xs tracking-widest uppercase font-light px-5 py-3.5 bg-[#c8a96e] text-black hover:bg-[#b8996e] transition-colors duration-200"
                  >
                    Contact Investor Relations
                  </Link>
                  <p className="text-xs text-gray-500 font-light text-center mt-4">Confidential. Response within 24 hours.</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related opportunities */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-light">More Opportunities</p>
                <h2 className="text-3xl font-light text-black">Also Consider</h2>
              </div>
              <Link href="/investments#opportunities" className="flex items-center gap-2 text-xs tracking-widest uppercase font-light text-gray-400 hover:text-black group transition-colors">
                All Opportunities <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((opp, i) => {
                const RelIcon = iconMap[opp.iconKey] ?? TrendingUp;
                return (
                  <motion.div
                    key={opp.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <Link href={`/investments/${opp.slug}`} className="group block p-8 bg-white border border-gray-100 hover:border-black transition-colors hover:-translate-y-1 duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <RelIcon size={20} className="text-[#c8a96e]" strokeWidth={1} />
                        <span className={`text-xs tracking-widest uppercase font-light px-3 py-1 ${opp.tag === "Active" ? "bg-black text-white" : "border border-gray-200 text-gray-400"}`}>{opp.tag}</span>
                      </div>
                      <h3 className="text-xl font-light text-black mb-2 group-hover:text-[#c8a96e] transition-colors">{opp.title}</h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{opp.desc}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
