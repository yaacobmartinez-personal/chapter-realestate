interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div data-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map(({ name, role, bio, image }) => (
        <div key={name} className="group">
          <div className="aspect-3/4 overflow-hidden bg-gray-200 mb-4">
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
