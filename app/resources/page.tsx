"use client";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

function BlogInsights() {
  const posts = [
    { tag: "Market Update", date: "May 2025", title: "Winnipeg Housing Market: Spring 2025 Overview", excerpt: "Inventory remains tight as buyer demand continues to outpace supply in key neighbourhoods.", readTime: "5 min read", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
    { tag: "Investor Tips", date: "April 2025", title: "Why Multifamily in Winnipeg is Outperforming Single-Family", excerpt: "Rental demand is hitting record highs. Here's what investors need to know.", readTime: "7 min read", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
    { tag: "Property Management", date: "April 2025", title: "5 Ways Professional PM Maximizes Your ROI", excerpt: "From reducing vacancy to preventative maintenance, professional management pays for itself.", readTime: "4 min read", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
    { tag: "Buying Guide", date: "March 2025", title: "First-Time Buyer's Complete Guide to Winnipeg Real Estate", excerpt: "Everything you need to know before making your first home purchase — from pre-approval to closing.", readTime: "10 min read", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
    { tag: "Market Update", date: "March 2025", title: "Neighbourhood Spotlight: River Heights & Crescentwood", excerpt: "Two of Winnipeg's most sought-after neighbourhoods — what's driving demand in 2025.", readTime: "6 min read", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80" },
    { tag: "Company News", date: "February 2025", title: "Chapter Expands Property Management Portfolio to 1,200 Units", excerpt: "A milestone for Chapter as our property management division continues to grow.", readTime: "3 min read", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  ];
  const [featured, ...rest] = posts;
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Blog & Insights</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Latest from <span className="font-serif italic">Chapter</span></h2>
        </motion.div>
        {/* Featured */}
        <motion.div className="group grid md:grid-cols-2 gap-8 mb-12 cursor-pointer border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
          {rest.map(({ tag, date, title, excerpt, readTime, image }, i) => (
            <motion.article key={title} className="group bg-white border border-gray-100 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

function Guides() {
  const guides = [
    { title: "First-Time Buyer's Guide", desc: "A complete walkthrough of the home buying process in Winnipeg — from mortgage to move-in.", tag: "Buyers" },
    { title: "Landlord's Guide to Property Management", desc: "Everything property owners need to know about maximizing returns and reducing headaches.", tag: "Landlords" },
    { title: "Tenant Handbook", desc: "Rights, responsibilities, and tips for tenants renting through Chapter.", tag: "Tenants" },
    { title: "Real Estate Investing 101", desc: "How to evaluate opportunities, build a portfolio, and generate passive income through real estate.", tag: "Investors" },
  ];
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Guides</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Free <span className="font-serif italic">Guides</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map(({ title, desc, tag }, i) => (
            <motion.div key={title} className="group bg-white p-10 flex gap-8 items-start cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <motion.div className="w-12 h-12 bg-black flex items-center justify-center shrink-0"
                whileHover={{ backgroundColor: "#c8a96e" }} transition={{ duration: 0.2 }}
              >
                <span className="text-[#c8a96e] text-xs font-light tracking-widest group-hover:text-black transition-colors">PDF</span>
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-[#c8a96e] tracking-widest uppercase font-light mb-2">{tag}</p>
                <h3 className="text-lg font-light text-black mb-2 group-hover:text-[#c8a96e] transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-black transition-colors">
                  <span className="tracking-widest uppercase font-light">Download Free</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do I start working with Chapter as a buyer?", a: "Contact us or book a free consultation. We'll match you with an agent who specializes in your target neighbourhoods and price range." },
    { q: "What does property management cost?", a: "Our leasing-only service is one month's rent. Full management is 8–10% of monthly rent. Volume discounts apply for multi-unit portfolios." },
    { q: "How long does it take to find a tenant?", a: "Typically 2–4 weeks from marketing launch, depending on property type and price. Our average vacancy is under 18 days." },
    { q: "Do you work with investors looking to buy income properties?", a: "Yes — our investment team specializes in sourcing and evaluating income properties and off-market opportunities." },
    { q: "Can I transfer my license to Chapter?", a: "Yes. We accept license transfers from other brokerages. Contact our recruitment team for a confidential conversation." },
  ];
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Common <span className="font-serif italic">Questions</span></h2>
        </motion.div>
        <div className="divide-y divide-gray-100">
          {faqs.map(({ q, a }, i) => (
            <motion.div key={q} className="py-8"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="text-base font-light text-black mb-3">{q}</p>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{a}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-12 pt-12 border-t border-gray-100"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-500 font-light text-sm mb-4">Still have questions?</p>
          <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase group">
            <span>Contact Us</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero label="Resources" heading="Insights &" headingAccent="Expertise." image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1800&q=80" />
      <BlogInsights />
      <Guides />
      <FAQ />
    </>
  );
}
