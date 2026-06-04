"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DarkCTASection from "@/components/ui/DarkCTASection";
import { investorSteps } from "@/lib/data/investments";

export default function InvestorRelations() {
  return (
    <DarkCTASection
      id="relations"
      label="Investor Relations"
      heading="The Investment"
      headingAccent="Process"
      description="We make real estate investment straightforward, transparent, and profitable. Here's how we work together."
      leftAction={
        <Link href="/contact" className="inline-flex items-center gap-3 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors">
          Contact Investor Relations <ArrowRight size={14} />
        </Link>
      }
    >
      <div className="divide-y divide-white/10">
        {investorSteps.map(({ step, title, desc }, i) => (
          <motion.div
            key={step}
            className="py-8 flex gap-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-xs text-[#c8a96e] font-light tracking-widest pt-1">{step}</span>
            <div>
              <h3 className="text-lg font-light text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DarkCTASection>
  );
}
