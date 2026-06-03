import { Heart, Lightbulb, Target, TrendingUp } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", description: "We do what we say. Transparency in every transaction, every relationship, every decision." },
  { icon: Lightbulb, title: "Innovation", description: "We embrace technology and new approaches to deliver better outcomes for clients." },
  { icon: Target, title: "Service", description: "Client-first, always. We measure our success by the satisfaction of those we serve." },
  { icon: TrendingUp, title: "Growth", description: "We invest in our team, our clients, and our communities for sustainable long-term success." },
];

export default function Values() {
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
