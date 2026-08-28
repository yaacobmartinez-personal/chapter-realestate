"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

/** Kebab dropdown. Children are the menu rows (buttons/forms). */
export default function DropdownMenu({
  children,
  align = "right",
  label = "Actions",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="grid h-8 w-8 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-2 hover:text-foreground"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            onClick={(e) => {
              // Submitting a form is the click's *default action*, which the
              // browser runs after handlers finish. Closing here flushes
              // synchronously and unmounts the form first, so the submit never
              // happens — this is why menu deletes silently did nothing.
              //
              // Leave the menu open for submit buttons: the server action
              // revalidates and the row (menu included) re-renders anyway.
              if ((e.target as HTMLElement).closest("button[type='submit']")) return;
              setOpen(false);
            }}
            className={`absolute z-20 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export const menuItemCls =
  "block w-full px-4 py-2 text-left text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground";
