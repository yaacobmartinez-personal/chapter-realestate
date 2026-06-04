import DarkCTASection from "@/components/ui/DarkCTASection";

export default function ApplyForm() {
  return (
    <DarkCTASection
      id="apply"
      label="Apply Now"
      heading="Start Your"
      headingAccent="Chapter Today"
      description="Fill out the form and a member of our recruitment team will reach out within 24 hours."
    >
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light"
        />
        <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light">
          <option>Years of Experience</option>
          <option>New / Pre-Licensed</option>
          <option>1–3 Years</option>
          <option>3–7 Years</option>
          <option>7+ Years</option>
        </select>
        <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-400 outline-none focus:border-[#c8a96e] transition-colors font-light">
          <option>Preferred Commission Model</option>
          <option>100% / Flat Fee</option>
          <option>80/20 Split</option>
          <option>Not Sure Yet</option>
        </select>
        <textarea
          placeholder="Tell us a bit about yourself..."
          rows={4}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#c8a96e] transition-colors font-light resize-none"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase py-4 hover:bg-white transition-colors"
          >
            Submit Application
          </button>
          <label className="flex-1 border border-white/20 text-white text-sm font-light tracking-widest uppercase py-4 text-center cursor-pointer hover:border-white transition-colors">
            Upload Resume
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          </label>
        </div>
      </form>
    </DarkCTASection>
  );
}
