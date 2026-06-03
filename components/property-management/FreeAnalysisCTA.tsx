import DarkCTASection from "@/components/ui/DarkCTASection";

export default function FreeAnalysisCTA() {
  return (
    <DarkCTASection
      id="analysis"
      label="Free Rental Analysis"
      heading="How Much Is Your"
      headingAccent="Property Worth?"
      description="Get a free rental analysis from our property management team. We'll assess your property's rental potential and show you exactly what we can do for you."
    >
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
    </DarkCTASection>
  );
}
