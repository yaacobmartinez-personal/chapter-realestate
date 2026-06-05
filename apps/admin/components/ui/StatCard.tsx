import Link from "next/link";

export default function StatCard({
  label,
  value,
  icon,
  href,
  tone = "neutral",
}: {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  href?: string;
  tone?: "neutral" | "accent" | "warning";
}) {
  const iconTone =
    tone === "accent" ? "text-accent" : tone === "warning" ? "text-warning" : "text-muted";

  const inner = (
    <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-ring/50">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        {icon && <span className={iconTone}>{icon}</span>}
      </div>
      <p className="mt-3 text-3xl font-semibold tabular text-foreground">{value}</p>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
