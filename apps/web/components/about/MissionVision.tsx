export default function MissionVision() {
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
