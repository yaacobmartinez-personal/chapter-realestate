import TeamGrid from "./TeamGrid";
import { leadershipGroups } from "@/lib/data/about";

export default function LeadershipTeam() {
  return (
    <section id="team" className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Leadership</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">The People Behind Chapter</h2>
        </div>

        <div className="space-y-20">
          {leadershipGroups.map(({ label, heading, members }) => (
            <div key={label}>
              <div data-reveal className="flex items-center gap-6 mb-10">
                <span className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] font-light whitespace-nowrap">{label}</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs tracking-[0.2em] uppercase text-gray-300 font-light whitespace-nowrap hidden md:block">{heading}</span>
              </div>
              <TeamGrid members={members} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
