import Link from "next/link";
import DarkCTASection from "@/components/ui/DarkCTASection";

export default function Careers() {
  return (
    <DarkCTASection
      label="Join the Team"
      heading="Build Your Career"
      headingAccent="at Chapter"
      description="We're growing fast and looking for talented agents, property managers, and professionals who share our values and ambition."
      alignItems="center"
    >
      <div className="space-y-4">
        <Link href="/recruitment" className="bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-10 py-5 hover:bg-white transition-colors inline-block">
          View Open Positions
        </Link>
        <p className="text-gray-500 font-light text-sm">
          Competitive commission structures · Mentorship · Modern tools
        </p>
      </div>
    </DarkCTASection>
  );
}
