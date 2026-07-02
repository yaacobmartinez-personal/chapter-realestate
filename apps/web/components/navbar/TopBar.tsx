import { socialIcon } from "@/components/social-icons";
import type { SocialLink } from "@/lib/data/social";

interface TopBarProps {
  scrolled: boolean;
  socialLinks: SocialLink[];
}

export default function TopBar({ scrolled, socialLinks }: TopBarProps) {
  if (socialLinks.length === 0) return null;
  return (
    <div className={`hidden lg:block border-b transition-colors ${scrolled ? "border-gray-100" : "border-white/10"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-end h-9 gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                scrolled ? "text-gray-400 hover:text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {socialIcon(social.name)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
