import { socialIcon } from "@/components/social-icons";
import type { SocialLink } from "@/lib/data/social";

interface TopBarProps {
  socialLinks: SocialLink[];
}

export default function TopBar({ socialLinks }: TopBarProps) {
  if (socialLinks.length === 0) return null;
  return (
    <div className="hidden lg:block border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-end h-9 gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              {socialIcon(social.name)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
