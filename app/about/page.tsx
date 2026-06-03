import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";

function OurStory() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Chapter Office"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Story</p>
            <h2 data-reveal className="text-4xl md:text-5xl font-light text-black leading-tight mb-8">
              A New <span className="font-serif italic">Chapter</span><br />for Winnipeg
            </h2>
            <div data-reveal className="space-y-4 text-gray-500 font-light leading-relaxed text-sm">
              <p>
                Chapter was founded with a single belief: that real estate in Winnipeg deserved a better experience. Not just a better transaction — a better relationship between clients and their properties, from the first showing to long-term ownership.
              </p>
              <p>
                Our founders combined decades of brokerage experience with a modern, technology-forward approach to build a platform that handles every dimension of real estate — buying, selling, managing, and investing — under one roof.
              </p>
              <p>
                Today, Chapter is one of Winnipeg's fastest-growing real estate companies, with over 1,200 units under management, hundreds of successful transactions, and a team of dedicated professionals who put clients first.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-3 mt-10 text-sm font-light tracking-widest uppercase group">
              <span>Get In Touch</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div data-stagger className="grid md:grid-cols-2 gap-px bg-gray-200">
          <div className="bg-white p-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light">Our Mission</p>
            <h3 data-reveal className="text-3xl font-light text-black mb-6 leading-tight">
              To simplify real estate and create lasting value for every client.
            </h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              We exist to make property ownership, investment, and management accessible, transparent, and rewarding — for first-time buyers, seasoned investors, and everyone in between.
            </p>
          </div>
          <div className="bg-black p-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light">Our Vision</p>
            <h3 data-reveal className="text-3xl font-light text-white mb-6 leading-tight">
              To become the most trusted real estate platform in Canada.
            </h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Starting in Winnipeg, we&apos;re building a scalable, technology-driven platform that sets a new standard for how real estate companies operate and serve their communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { icon: Heart, title: "Integrity", description: "We do what we say. Transparency in every transaction, every relationship, every decision." },
    { icon: Lightbulb, title: "Innovation", description: "We embrace technology and new approaches to deliver better outcomes for clients." },
    { icon: Target, title: "Service", description: "Client-first, always. We measure our success by the satisfaction of those we serve." },
    { icon: TrendingUp, title: "Growth", description: "We invest in our team, our clients, and our communities for sustainable long-term success." },
  ];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">What We Stand For</p>
          <h2 data-reveal className="text-4xl md:text-5xl font-light text-black">Our Values</h2>
        </div>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-10">
              <Icon size={24} className="text-[#c8a96e] mb-6" strokeWidth={1} />
              <h3 className="text-xl font-light text-black mb-3">{title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamGrid({ members }: { members: { name: string; role: string; bio: string; image: string }[] }) {
  return (
    <div data-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map(({ name, role, bio, image }) => (
        <div key={name} className="group">
          <div className="aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
          </div>
          <p className="text-sm font-light text-black">{name}</p>
          <p className="text-xs text-[#c8a96e] font-light mt-0.5 mb-2">{role}</p>
          <p className="text-xs text-gray-400 font-light leading-relaxed hidden md:block">{bio}</p>
        </div>
      ))}
    </div>
  );
}

function LeadershipTeam() {
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

function Careers() {
  return (
    <section className="py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Join the Team</p>
            <h2 data-reveal className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Build Your Career<br />at Chapter
            </h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              We&apos;re growing fast and looking for talented agents, property managers, and professionals who share our values and ambition.
            </p>
          </div>
          <div className="space-y-4">
            <Link href="/recruitment" className="bg-[#c8a96e] text-black text-sm font-light tracking-widest uppercase px-10 py-5 hover:bg-white transition-colors inline-block">
              View Open Positions
            </Link>
            <p className="text-gray-500 font-light text-sm">
              Competitive commission structures · Mentorship · Modern tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero label="About Chapter" heading="Built on Integrity." headingAccent="Driven by Vision." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80" />
      <OurStory />
      <MissionVision />
      <Values />
      <LeadershipTeam />
      <Careers />
    </>
  );
}
