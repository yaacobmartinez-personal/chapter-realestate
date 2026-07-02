import TeamGrid from "./TeamGrid";
import { getLeadership } from "@/lib/data/leadership";

export default async function LeadershipTeam() {
  const members = await getLeadership();
  return (
    <section id="team" className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Leadership</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Our Leadership</h2>
        </div>
        <TeamGrid members={members} />
      </div>
    </section>
  );
}
