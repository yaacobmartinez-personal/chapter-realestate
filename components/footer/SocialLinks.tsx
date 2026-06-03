import { socialLinks } from "./footerData";

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          aria-label={social.name}
          className="w-9 h-9 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
