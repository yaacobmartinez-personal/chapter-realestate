import { getMissionVision } from "@/lib/data/mission-vision";

export default async function MissionVision() {
  const items = await getMissionVision();
  if (items.length === 0) return null;

  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div data-stagger className="grid md:grid-cols-2 gap-px bg-gray-200">
          {items.map(({ id, label, heading, body }, i) => {
            const dark = i % 2 === 1;
            return (
              <div key={id} className={`p-16 ${dark ? "bg-black" : "bg-white"}`}>
                <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-6 font-light">{label}</p>
                <h3 data-reveal className={`text-3xl font-light mb-6 leading-tight ${dark ? "text-white" : "text-black"}`}>
                  {heading}
                </h3>
                <p className={`font-light text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
