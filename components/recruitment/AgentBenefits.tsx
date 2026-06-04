"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { agentBenefits } from "@/lib/data/recruitment";

export default function AgentBenefits() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            className="relative h-[600px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              fill
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
              alt="Agent Benefits"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Agent Benefits</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-8">
              Everything You<br /><span className="font-serif italic">Need to Succeed</span>
            </h2>
            <div className="divide-y divide-gray-100">
              {agentBenefits.map((b, i) => (
                <motion.div
                  key={b}
                  className="flex items-center gap-3 text-sm text-gray-600 font-light py-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <CheckCircle size={14} className="text-[#c8a96e] shrink-0" />{b}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
