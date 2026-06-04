"use client";
import { useEditor } from "@/lib/editor/EditorContext";
import SectionNav from "./SectionNav";
import FieldRenderer from "./FieldRenderer";
import { Loader2, X } from "lucide-react";

const SECTIONS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "brokerage", label: "Brokerage" },
  { key: "property-management", label: "Property Mgmt" },
  { key: "investments", label: "Investments" },
  { key: "recruitment", label: "Recruitment" },
  { key: "resources", label: "Resources" },
  { key: "contact", label: "Contact" },
];

export default function EditorPanel() {
  const { isEditing, activeSection, setActiveSection, pendingContent, updateField, save, discard, isSaving, isDirty, exitEditor, loadSection } = useEditor();

  if (!isEditing) return null;

  const sectionData = pendingContent[activeSection];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col h-[420px] bg-[#0f0f0f] border-t border-[#1f1f1f] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1f1f1f] shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#c8a96e] tracking-widest uppercase">✏ Chapter Editor</span>
          <span className="text-xs text-[#333] font-light">·</span>
          <span className="text-xs text-[#666] font-light">{SECTIONS.find(s => s.key === activeSection)?.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={discard}
              className="text-xs text-[#666] hover:text-white transition-colors px-3 py-1.5 font-light tracking-widest uppercase"
            >
              Discard
            </button>
          )}
          <button
            onClick={save}
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2 text-xs bg-[#c8a96e] text-black px-4 py-1.5 font-medium tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 size={12} className="animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={exitEditor}
            className="text-[#444] hover:text-white transition-colors p-1.5 ml-1"
            title="Exit editor"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left nav */}
        <SectionNav
          sections={SECTIONS}
          activeSection={activeSection}
          onSelect={(key) => { setActiveSection(key); loadSection(key); }}
        />

        {/* Right form */}
        <div className="flex-1 overflow-y-auto p-4">
          {!sectionData ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={18} className="animate-spin text-[#c8a96e]" />
            </div>
          ) : (
            <FieldRenderer
              data={sectionData}
              path=""
              onChange={(path, value) => updateField(activeSection, path, value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
