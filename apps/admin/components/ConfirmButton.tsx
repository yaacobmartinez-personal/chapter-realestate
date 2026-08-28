"use client";

/**
 * Submit button that asks for confirmation before the form posts.
 *
 * `title` / `aria-label` matter where the child is an icon: without them the
 * button has no accessible name and no hover hint.
 */
export default function ConfirmButton({
  message,
  className,
  children,
  title,
  "aria-label": ariaLabel,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      title={title}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
