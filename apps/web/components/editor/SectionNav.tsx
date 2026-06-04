"use client";

interface Section { key: string; label: string; }

interface Props {
  sections: Section[];
  activeSection: string;
  onSelect: (key: string) => void;
}

export default function SectionNav({ sections, activeSection, onSelect }: Props) {
  return (
    <nav className="w-[180px] shrink-0 border-r border-[#1f1f1f] overflow-y-auto py-2">
      {sections.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`w-full text-left px-4 py-2.5 text-xs font-light tracking-widest uppercase transition-colors ${
            activeSection === key
              ? "text-[#c8a96e] bg-[#1a1a1a]"
              : "text-[#555] hover:text-white hover:bg-[#161616]"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
