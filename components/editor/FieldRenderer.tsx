"use client";
import ArrayField from "./ArrayField";

interface Props {
  data: unknown;
  path: string;
  onChange: (path: string, value: unknown) => void;
  label?: string;
  depth?: number;
}

export default function FieldRenderer({ data, path, onChange, label, depth = 0 }: Props) {
  if (data === null || data === undefined) return null;

  if (Array.isArray(data)) {
    return (
      <ArrayField
        items={data}
        path={path}
        onChange={onChange}
        label={label}
        depth={depth}
      />
    );
  }

  if (typeof data === "object") {
    return (
      <div className={depth > 0 ? "border border-[#1f1f1f] p-3 mb-3" : ""}>
        {label && depth > 0 && (
          <p className="text-[10px] text-[#c8a96e] tracking-widest uppercase mb-2 font-medium">{label}</p>
        )}
        {Object.entries(data as Record<string, unknown>).map(([key, val]) => (
          <FieldRenderer
            key={key}
            data={val}
            path={path ? `${path}.${key}` : key}
            onChange={onChange}
            label={key}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }

  // Primitive leaf
  const fieldLabel = label ?? path.split(".").pop() ?? path;

  return (
    <div className="mb-2 flex items-center gap-2">
      <label className="text-[10px] text-[#555] font-light tracking-wider uppercase w-28 shrink-0 truncate" title={fieldLabel}>
        {fieldLabel}
      </label>
      {typeof data === "boolean" ? (
        <input
          type="checkbox"
          checked={data}
          onChange={(e) => onChange(path, e.target.checked)}
          className="accent-[#c8a96e]"
        />
      ) : typeof data === "number" ? (
        <input
          type="number"
          value={data}
          onChange={(e) => onChange(path, Number(e.target.value))}
          className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-light px-2 py-1.5 outline-none focus:border-[#c8a96e] transition-colors"
        />
      ) : (
        <input
          type="text"
          value={String(data)}
          onChange={(e) => onChange(path, e.target.value)}
          className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-light px-2 py-1.5 outline-none focus:border-[#c8a96e] transition-colors"
        />
      )}
    </div>
  );
}
