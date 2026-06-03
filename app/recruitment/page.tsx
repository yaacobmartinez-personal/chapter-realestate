"use client";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { CheckCircle, Laptop, BarChart3, Users, Award } from "lucide-react";

function WhyJoin() {
  const reasons = [
    { icon: BarChart3, title: "Industry-Leading Commission", desc: "Keep more of what you earn with competitive split structures designed to reward top producers." },
    { icon: Laptop, title: "Modern Technology", desc: "CRM systems, marketing automation, digital transaction management, and AI tools — all included." },
    { icon: Users, title: "Collaborative Culture", desc: "A team-first environment where senior agents mentor new talent and everyone wins together." },
    { icon: Award, title: "Brand & Marketing", desc: "Professional marketing support, listing photography, social media assets, and a brand that attracts clients." },
  ];
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Why Agents Move to Chapter</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">The Platform<br /><span className="font-serif italic">You Deserve</span></h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm max-w-sm">Top agents choose Chapter because we invest in their success — with better tools, better support, and better culture than any other brokerage in Winnipeg.</p>
          </motion.div>
          <motion.div className="relative h-[480px] overflow-hidden"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Chapter Team" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} className="bg-white p-10"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Icon size={22} className="text-[#c8a96e] mb-6" strokeWidth={1} />
              </motion.div>
              <h3 className="text-lg font-light text-black mb-3">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommissionModels() {
  const models = [
    { name: "Brokerage Fee Model", structure: "100% Commission", fee: "Flat monthly fee", best: "High-volume producers", features: ["Keep 100% of your commission","Flat monthly brokerage fee","Full access to all tools & support","Ideal for $500K+ annual GCI"] },
    { name: "Split Model", structure: "80/20 Split", fee: "No monthly fee", best: "Growing agents", features: ["80% to agent, 20% to Chapter","No monthly overhead","All training & mentorship included","Ideal for agents building their business"], featured: true },
  ];
  return (
    <section className="py-28 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Commission Structure</p>
          <h2 className="text-4xl md:text-5xl font-light text-black">Choose Your <span className="font-serif italic">Model</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-px bg-gray-200">
          {models.map(({ name, structure, fee, best, features, featured }, i) => (
            <motion.div key={name} className={`p-12 ${featured ? "bg-black text-white" : "bg-white"}`}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className={`text-xs tracking-widest uppercase font-light mb-4 ${featured ? "text-[#c8a96e]" : "text-gray-400"}`}>{name}</p>
              <p className={`text-4xl font-light mb-1 ${featured ? "text-white" : "text-black"}`}>{structure}</p>
              <p className={`text-sm font-light mb-1 ${featured ? "text-gray-400" : "text-gray-500"}`}>{fee}</p>
              <p className={`text-xs font-light mb-8 ${featured ? "text-gray-500" : "text-gray-400"}`}>Best for: {best}</p>
              <ul className="space-y-3 mb-10">
                {features.map((f, j) => (
                  <motion.li key={f} className={`flex items-start gap-3 text-sm font-light ${featured ? "text-gray-300" : "text-gray-600"}`}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.15 + j * 0.07 + 0.3 }}
                  >
                    <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                  </motion.li>
                ))}
              </ul>
              <Link href="#apply" className={`block text-center text-sm font-light tracking-widest uppercase py-4 transition-colors ${featured ? "bg-[#c8a96e] text-black hover:bg-white" : "border border-gray-200 text-gray-700 hover:border-black hover:text-black"}`}>Apply Now</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentBenefits() {
  const benefits = ["Professional listing photography & videography","Branded social media content & templates","Lead generation & CRM integration","In-house transaction coordinator","Mentorship from top-producing agents","Regular training & market education","Flexible office & co-working access","Referral network across all divisions"];
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div className="relative h-[600px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" alt="Agent Benefits" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Agent Benefits</p>
            <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-8">Everything You<br /><span className="font-serif italic">Need to Succeed</span></h2>
            <div className="divide-y divide-gray-100">
              {benefits.map((b, i) => (
                <motion.div key={b} className="flex items-center gap-3 text-sm text-gray-600 font-light py-3"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
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

function ApplyForm() {
  return (
    <section id="apply" className="py-28 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Apply Now</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">Start Your<br /><span className="font-serif italic">Chapter Today</span></h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">Fill out the form and a member of our recruitment team will reach out within 24 hours.</p>
          </motion.div>
          <motion.form className="space-y-4"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
              <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light">
              <option>Years of Experience</option><option>New / Pre-Licensed</option><option>1–3 Years</option><option>3–7 Years</option><option>7+ Years</option>
            </select>
            <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light">
              <option>Preferred Commission Model</option><option>100% / Flat Fee</option><option>80/20 Split</option><option>Not Sure Yet</option>
            </select>
            <textarea placeholder="Tell us a bit about yourself..." rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light resize-none" />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase py-4 hover:bg-white transition-colors">Submit Application</button>
              <label className="flex-1 border border-white/20 text-white text-sm font-light tracking-widest uppercase py-4 text-center cursor-pointer hover:border-white transition-colors">
                Upload Resume<input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default function RecruitmentPage() {
  return (
    <>
      <PageHero label="Join Chapter" heading="Elevate Your" headingAccent="Real Estate Career." image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80" />
      <WhyJoin />
      <CommissionModels />
      <AgentBenefits />
      <ApplyForm />
    </>
  );
}
