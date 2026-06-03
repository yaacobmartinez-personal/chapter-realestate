"use client";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { CheckCircle, ArrowRight, Home, Building2, Wrench, BarChart3, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

function Overview() {
  const benefits = [
    { icon: BarChart3, title: "Maximize Returns", desc: "Strategic pricing and low vacancy rates keep your income consistent and growing." },
    { icon: Shield, title: "Quality Tenants", desc: "Rigorous screening process ensures only qualified, reliable tenants occupy your property." },
    { icon: Wrench, title: "Full Maintenance", desc: "24/7 emergency response, preventative programs, and trusted vendor networks." },
    { icon: Clock, title: "Save Time", desc: "We handle everything — you check your statement and collect your returns." },
  ];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Why Chapter PM</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
              Property Management<br />Done Right
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">
              Chapter&apos;s property management division handles everything from tenant acquisition to monthly reporting, so you can enjoy passive income without the stress of day-to-day management.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[480px] overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Property Management"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-10">
              <Icon size={24} className="text-[#c8a96e] mb-6" strokeWidth={1} />
              <h3 className="text-lg font-light text-black mb-3">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const serviceTypes = [
    {
      title: "Leasing Services",
      items: ["Property marketing & advertising", "Tenant screening & background checks", "Lease preparation & signing", "Move-in/out coordination"],
    },
    {
      title: "Full Management",
      items: ["Rent collection & disbursement", "Maintenance coordination", "Regular property inspections", "Monthly financial reporting"],
    },
    {
      title: "Maintenance Services",
      items: ["24/7 emergency maintenance", "Trusted vendor network", "Preventative maintenance programs", "Renovation coordination"],
    },
  ];
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Services</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Everything Included</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-6">
          {serviceTypes.map(({ title, items }) => (
            <div key={title} className="bg-white p-10">
              <h3 className="text-xl font-light text-black mb-6 pb-6 border-b border-gray-100">{title}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                    <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyTypes() {
  const types = [
    { icon: Home, title: "Residential", subtitle: "Single-Family & Condos", desc: "Single-family homes, duplexes, and condominiums — we manage the full spectrum of residential properties with care.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", href: "#residential" },
    { icon: Building2, title: "Multi-Family", subtitle: "Apartment Buildings", desc: "Streamlined management for multi-unit buildings with centralized reporting and efficient tenant coordination.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", href: "#residential" },
    { icon: Building2, title: "Commercial", subtitle: "Office, Retail & Mixed-Use", desc: "Commercial leasing, tenant coordination, and full facilities management for office, retail, and mixed-use assets.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", href: "#commercial" },
  ];
  return (
    <section id="residential" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Property Types</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">We Manage It All</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-6">
          {types.map(({ icon: Icon, title, subtitle, desc, image }) => (
            <div key={title} className="group overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <Icon size={20} className="text-[#c8a96e] mb-4" strokeWidth={1} />
                <h3 className="text-xl font-light text-black mb-1">{title}</h3>
                <p className="text-xs text-gray-400 font-light mb-3">{subtitle}</p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Leasing Only",
      fee: "One Month's Rent",
      desc: "Perfect for landlords who want help finding quality tenants.",
      features: ["Property marketing", "Tenant screening", "Lease preparation", "Move-in coordination"],
      cta: "Get Started",
    },
    {
      name: "Full Management",
      fee: "8–10% of Rent",
      desc: "Complete hands-off management from lease to lease.",
      features: ["Everything in Leasing", "Rent collection", "Maintenance coordination", "Inspections & reporting", "24/7 emergency support"],
      cta: "Get Started",
      featured: true,
    },
    {
      name: "Premium Portfolio",
      fee: "Custom Pricing",
      desc: "Tailored for multi-unit and commercial property owners.",
      features: ["Everything in Full Management", "Dedicated portfolio manager", "Commercial leasing", "Custom reporting", "Investor dashboard"],
      cta: "Contact Us",
    },
  ];
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Pricing</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Simple, Transparent Fees</h2>
        </div>
        <div data-stagger className="grid md:grid-cols-3 gap-px bg-gray-200">
          {plans.map(({ name, fee, desc, features, cta, featured }) => (
            <div key={name} className={`p-10 ${featured ? "bg-black text-white" : "bg-white"}`}>
              <p className={`text-xs tracking-widest uppercase font-light mb-4 ${featured ? "text-[#c8a96e]" : "text-gray-400"}`}>{name}</p>
              <p className={`text-3xl font-light mb-2 ${featured ? "text-white" : "text-black"}`}>{fee}</p>
              <p className={`text-sm font-light mb-8 ${featured ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
              <ul className="space-y-3 mb-10">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm font-light ${featured ? "text-gray-300" : "text-gray-600"}`}>
                    <CheckCircle size={14} className={`mt-0.5 shrink-0 ${featured ? "text-[#c8a96e]" : "text-[#c8a96e]"}`} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/contact#book" className={`block text-center text-sm font-light tracking-widest uppercase py-4 transition-colors ${featured ? "bg-[#c8a96e] text-black hover:bg-white" : "border border-gray-200 text-gray-700 hover:border-black hover:text-black"}`}>
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnerTenantPortals() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div data-stagger className="grid md:grid-cols-2 gap-6">
          <div id="owners" className="bg-black text-white p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">For Owners</p>
            <h3 data-reveal className="text-3xl font-light mb-4">Owner Portal</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
              Access monthly statements, maintenance logs, inspection reports, and financial summaries — anytime, anywhere.
            </p>
            <ul className="space-y-3 mb-10">
              {["Monthly statements & reports", "Maintenance request tracking", "Lease documentation", "Year-end tax summaries"].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                  <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-[#c8a96e] hover:text-white transition-colors group">
              Access Owner Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div id="tenants" className="bg-[#f7f7f7] p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">For Tenants</p>
            <h3 data-reveal className="text-3xl font-light mb-4 text-black">Tenant Portal</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
              Pay rent online, submit maintenance requests, and manage your lease documents — all in one easy portal.
            </p>
            <ul className="space-y-3 mb-10">
              {["Pay rent online", "Submit maintenance requests", "View lease documents", "Track maintenance status"].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                  <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-black hover:text-[#c8a96e] transition-colors group">
              Access Tenant Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreeAnalysisCTA() {
  return (
    <section id="analysis" className="py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Free Rental Analysis</p>
            <h2 data-reveal className="text-4xl md:text-5xl font-light leading-tight mb-6">
              How Much Is Your<br /><span className="font-serif italic">Property Worth?</span>
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">
              Get a free rental analysis from our property management team. We&apos;ll assess your property&apos;s rental potential and show you exactly what we can do for you.
            </p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
              <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <input type="text" placeholder="Property Address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light">
              <option>Property Type</option>
              <option>Single-Family</option>
              <option>Multi-Family</option>
              <option>Condo</option>
              <option>Commercial</option>
            </select>
            <button type="submit" className="w-full bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase py-4 hover:bg-white transition-colors">
              Request Free Analysis
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero label="Property Management" heading="Hands-Off." headingAccent="High Returns." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80" />
      <Overview />
      <Services />
      <PropertyTypes />
      <Pricing />
      <OwnerTenantPortals />
      <FreeAnalysisCTA />
    </>
  );
}
