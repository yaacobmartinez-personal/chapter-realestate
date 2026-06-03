"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How do I start working with Chapter as a buyer?",
    a: "Contact us or book a free consultation. We'll match you with an agent who specializes in your target neighbourhoods and price range.",
  },
  {
    q: "What does property management cost?",
    a: "Our leasing-only service is one month's rent. Full management is 8–10% of monthly rent. Volume discounts apply for multi-unit portfolios.",
  },
  {
    q: "How long does it take to find a tenant?",
    a: "Typically 2–4 weeks from marketing launch, depending on property type and price. Our average vacancy is under 18 days.",
  },
  {
    q: "Do you work with investors looking to buy income properties?",
    a: "Yes — our investment team specializes in sourcing and evaluating income properties and off-market opportunities.",
  },
  {
    q: "Can I transfer my license to Chapter?",
    a: "Yes. We accept license transfers from other brokerages. Contact our recruitment team for a confidential conversation.",
  },
];

export default function FAQ() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-black">
            Common <span className="font-serif italic">Questions</span>
          </h2>
        </motion.div>
        <div className="divide-y divide-gray-100">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={q}
              className="py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="text-base font-light text-black mb-3">{q}</p>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {a}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 pt-12 border-t border-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-500 font-light text-sm mb-4">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase group"
          >
            <span>Contact Us</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
