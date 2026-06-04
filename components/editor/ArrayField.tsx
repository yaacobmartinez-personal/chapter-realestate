"use client";
import { Plus, Trash2 } from "lucide-react";
import FieldRenderer from "./FieldRenderer";

interface Props {
  items: unknown[];
  path: string;
  onChange: (path: string, value: unknown) => void;
  label?: string;
  depth?: number;
}

export default function ArrayField({ items, path, onChange, label, depth = 0 }: Props) {
  const fieldLabel = label ?? path.split(".").pop() ?? path;

  function removeItem(index: number) {
    const next = items.filter((_, i) => i !== index);
    onChange(path, next);
  }

  function addItem() {
    // Clone the shape of the first item, or add empty string
    const template = items.length > 0
      ? JSON.parse(JSON.stringify(items[0]))
      : typeof items[0] === "string" ? "" : {};
    // Clear the values of the template
    const blank = typeof template === "object" && template !== null
      ? clearValues(template)
      : "";
    onChange(path, [...items, blank]);
  }

  return (
    <div className="mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] text-[#c8a96e] tracking-widest uppercase font-medium">{fieldLabel}</p>
        <button
          onClick={addItem}
          className="flex items-center gap-1 text-[10px] text-[#555] hover:text-[#c8a96e] transition-colors"
        >
          <Plus size={10} /> Add
        </button>
      </div>

      {items.map((item, i) => (
        <div key={i} className="relative group mb-2 border border-[#1e1e1e] hover:border-[#2a2a2a]">
          {/* Remove button */}
          <button
            onClick={() => removeItem(i)}
            className="absolute top-1.5 right-1.5 text-[#333] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 z-10"
          >
            <Trash2 size={11} />
          </button>

          {typeof item === "object" && item !== null ? (
            <div className="p-2 pr-6">
              {Object.entries(item as Record<string, unknown>).map(([key, val]) => (
                <FieldRenderer
                  key={key}
                  data={val}
                  path={`${path}.${i}.${key}`}
                  onChange={onChange}
                  label={key}
                  depth={(depth ?? 0) + 1}
                />
              ))}
            </div>
          ) : (
            <div className="px-2 py-1 pr-6">
              <input
                type="text"
                value={String(item)}
                onChange={(e) => onChange(`${path}.${i}`, e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-light px-2 py-1.5 outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function clearValues(obj: unknown): unknown {
  if (Array.isArray(obj)) return [];
  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, clearValues(v)]));
  }
  if (typeof obj === "number") return 0;
  if (typeof obj === "boolean") return false;
  return "";
}
