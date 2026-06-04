"use client";

import { useState } from "react";
import DarkCTASection from "@/components/ui/DarkCTASection";
import { submitRecruitmentForm } from "@/actions/forms";
import FormStatus from "@/components/ui/FormStatus";

type Status = "idle" | "loading" | "success" | "error";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const result = await submitRecruitmentForm(new FormData(e.currentTarget));
    if (result.ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <DarkCTASection
      id="apply"
      label="Apply Now"
      heading="Start Your"
      headingAccent="Chapter Today"
      description="Fill out the form and a member of our recruitment team will reach out within 24 hours."
    >
      {status === "success" ? (
        <div className="py-8">
          <FormStatus status="success" successMessage="Application received! Our recruitment team will be in touch within 24 hours." />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              required
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
          />
          <select
            name="experience"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light"
          >
            <option value="">Years of Experience</option>
            <option>New / Pre-Licensed</option>
            <option>1–3 Years</option>
            <option>3–7 Years</option>
            <option>7+ Years</option>
          </select>
          <select
            name="commission"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light"
          >
            <option value="">Preferred Commission Model</option>
            <option>100% / Flat Fee</option>
            <option>80/20 Split</option>
            <option>Not Sure Yet</option>
          </select>
          <textarea
            name="message"
            placeholder="Tell us a bit about yourself…"
            rows={4}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light resize-none"
          />
          <FormStatus status={status} error={errorMsg} />
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting…" : "Submit Application"}
            </button>
            <label className="flex-1 border border-white/20 text-white text-sm font-light tracking-widest uppercase py-4 text-center cursor-pointer hover:border-white transition-colors">
              Upload Resume
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </label>
          </div>
        </form>
      )}
    </DarkCTASection>
  );
}
