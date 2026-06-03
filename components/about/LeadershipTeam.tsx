import TeamGrid from "./TeamGrid";

const managingPartners = [
  { name: "Alex Barsoum", role: "Managing Partner & Founder", bio: "15+ years in Winnipeg real estate. Alex founded Chapter with a vision to modernize local property services.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "Priya Sharma", role: "Managing Partner, Investments", bio: "Background in finance and development, leading Chapter's investment and Barso Group divisions.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
];

const brokers = [
  { name: "Marcus Leblanc", role: "Broker of Record", bio: "Licensed since 2005, Marcus ensures Chapter maintains the highest compliance and ethical standards.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "James Okafor", role: "Senior Broker", bio: "Award-winning agent specializing in luxury residential and commercial transactions.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { name: "Diana Chen", role: "Broker & Marketing Director", bio: "Drives Chapter's brand, digital presence, and agent marketing support systems.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

const pmLeaders = [
  { name: "Sarah Mitchell", role: "Director of Property Management", bio: "A property management veteran with a track record of maximizing returns for landlord clients.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "David Park", role: "Senior Property Manager", bio: "Oversees residential portfolios across Winnipeg with a focus on tenant satisfaction and NOI growth.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Nina Torres", role: "Commercial PM Lead", bio: "Specializes in office and retail asset management, lease renewals, and CAM reconciliations.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80" },
];

const groups = [
  { label: "Managing Partners", heading: "Leadership", members: managingPartners },
  { label: "Brokerage", heading: "Broker Profiles", members: brokers },
  { label: "Property Management", heading: "PM Leadership", members: pmLeaders },
];

export default function LeadershipTeam() {
  return (
    <section id="team" className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section title */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Leadership</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">The People Behind Chapter</h2>
        </div>

        {/* Three groups */}
        <div className="space-y-20">
          {groups.map(({ label, heading, members }) => (
            <div key={label}>
              {/* Group divider + label */}
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
