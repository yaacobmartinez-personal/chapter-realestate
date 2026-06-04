import Link from "next/link";
import { FooterLinkGroup } from "./types";

interface FooterLinkColumnProps {
  group: FooterLinkGroup;
}

export default function FooterLinkColumn({ group }: FooterLinkColumnProps) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-5">
        {group.title}
      </h4>
      <ul className="space-y-3">
        {group.links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-gray-400 hover:text-white font-light"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
