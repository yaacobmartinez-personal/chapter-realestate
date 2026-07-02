import { getSocialLinks } from "@/lib/data/social";
import { socialIcon } from "@/components/social-icons";

export default async function SocialLinks() {
  const links = await getSocialLinks();
  return (
    <div className="flex gap-4">
      {links.map((social) => (
        <a
          key={social.id}
          href={social.href}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
        >
          {socialIcon(social.name)}
        </a>
      ))}
    </div>
  );
}
