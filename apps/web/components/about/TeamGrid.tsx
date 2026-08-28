import { cover } from "@chapter/db";
import Image from "next/image";
import type { TeamMember } from "@/lib/data/leadership";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div data-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map(({ id, name, role, bio, image }) => (
        <div key={id} className="group">
          <div className="relative aspect-3/4 overflow-hidden bg-gray-200 mb-4">
            <Image
              fill
              src={cover(image)}
              alt={name}
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <p className="text-sm font-light text-black">{name}</p>
          <p className="text-xs text-[#c8a96e] font-light mt-0.5 mb-2">{role}</p>
          <p className="text-xs text-gray-400 font-light leading-relaxed hidden md:block">{bio}</p>
        </div>
      ))}
    </div>
  );
}
