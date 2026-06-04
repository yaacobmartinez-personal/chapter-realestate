"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DarkCTASection from "@/components/ui/DarkCTASection";
import { brokerageMarketStats } from "@/lib/data/brokerage";

export default function MarketInsights() {
  return (
    <DarkCTASection
      id="insights"
      label="Market Insights"
      heading="Know Your"
      headingAccent="Market"
      description="Our market reports give you an edge — whether you're buying your first home or building a portfolio."
      alignItems="center"
      leftAction={
        <Link href="/resources" className="inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase text-[#c8a96e] hover:text-white transition-colors group">
          View All Insights <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {brokerageMarketStats.map(({ label, value, note }, i) => (
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
    </DarkCTASection>
  );
}
