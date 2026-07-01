"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/actions/forms";
import FormStatus from "@/components/ui/FormStatus";

type Status = "idle" | "loading" | "success" | "error";

export default function LandlordLead() {
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
    <section id="analysis" className="py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Landlords</p>
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
            We&apos;d Love to <span className="font-serif italic">Hear from You</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-sm max-w-lg mx-auto mb-12">
            Tell us about your property and rental goals. A Chapter property manager will reach out
            to discuss how we can maximize your returns — hands-off.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Tags this submission as a property-management lead in the stored fields */}
          <input type="hidden" name="interest" value="Property Management" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="firstName" type="text" placeholder="First Name" required className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <input name="lastName" type="text" placeholder="Last Name" className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="email" type="email" placeholder="Email Address" required className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
            <input name="phone" type="tel" placeholder="Phone Number" className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light" />
          </div>
          <textarea name="message" placeholder="Tell us about your property (address, type, number of units)…" rows={4} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#c8a96e] transition-colors font-light resize-none" />
          <label className="flex items-start gap-3 text-xs text-gray-400 font-light">
            <input type="checkbox" name="consent" required className="mt-0.5 accent-[#c8a96e]" />
            Yes, I agree to be contacted and to receive helpful emails from Chapter Real Estate.
          </label>
          <FormStatus status={status} error={errorMsg} />
          {status !== "success" && (
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Request a Consultation
            </motion.button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
