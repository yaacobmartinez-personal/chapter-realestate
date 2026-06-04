"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { offices, businessHours } from "@/lib/data/contact";
import { submitContactForm } from "@/actions/forms";
import FormStatus from "@/components/ui/FormStatus";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const result = await submitContactForm(new FormData(e.currentTarget));
    if (result.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Contact Information</p>
            <h2 className="text-4xl font-light text-black mb-10">We&apos;re Here <span className="font-serif italic">to Help</span></h2>
            <div className="space-y-10">
              {offices.map(({ name, address, city, phone, email }, i) => (
                <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}>
                  <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-4">{name}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600 font-light">
                      <MapPin size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />
                      <div><p>{address}</p><p>{city}</p></div>
                    </div>
                    <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-gray-600 font-light hover:text-black transition-colors">
                      <Phone size={14} className="text-[#c8a96e] shrink-0" />{phone}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-gray-600 font-light hover:text-black transition-colors">
                      <Mail size={14} className="text-[#c8a96e] shrink-0" />{email}
                    </a>
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-4">Business Hours</p>
                <div className="space-y-2">
                  {businessHours.map(({ day, hours }, i) => (
                    <motion.div key={day} className="flex items-center gap-3 text-sm font-light" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
                      <Clock size={14} className="text-[#c8a96e] shrink-0" />
                      <span className="text-gray-700 w-40">{day}</span>
                      <span className="text-gray-400">{hours}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            id="book"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Send a Message</p>
            <h2 className="text-3xl font-light text-black mb-8">Book a <span className="font-serif italic">Consultation</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" type="text" placeholder="First Name" required className="border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
                <input name="lastName" type="text" placeholder="Last Name" className="border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              </div>
              <input name="email" type="email" placeholder="Email Address" required className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              <input name="phone" type="tel" placeholder="Phone Number" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              <select name="interest" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none focus:border-black transition-colors font-light bg-white">
                <option value="">I&apos;m interested in…</option>
                <option>Buying a Home</option>
                <option>Selling a Home</option>
                <option>Property Management</option>
                <option>Real Estate Investment</option>
                <option>Joining Chapter as an Agent</option>
                <option>Other</option>
              </select>
              <textarea name="message" placeholder="Tell us more about your needs…" rows={4} className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light resize-none" />
              <FormStatus status={status} error={errorMsg} />
              {status !== "success" && (
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-black text-white text-sm font-light tracking-widest uppercase py-4 hover:bg-[#c8a96e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Send Message
                </motion.button>
              )}
              <p className="text-xs text-gray-400 font-light text-center">We typically respond within 24 hours.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
