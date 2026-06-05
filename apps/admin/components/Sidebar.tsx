"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
} from "lucide-react";
import { logout } from "@/app/login/actions";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/resources", label: "Resources", icon: FileText },
  { href: "/users", label: "Users", icon: Users },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({ email }: { email: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-60"} shrink-0 border-r border-border bg-surface flex flex-col transition-[width] duration-200`}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-4 h-[65px]">
        {!collapsed && (
          <Image
            src="/logo.png"
            alt="Chapter"
            width={140}
            height={46}
            className="h-8 w-auto object-contain dark:invert"
            priority
          />
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-surface-2 font-medium text-foreground"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className={`shrink-0 ${active ? "text-accent" : ""}`} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* User + theme + logout */}
      <div className="border-t border-border p-2">
        <ThemeToggle collapsed={collapsed} />
        {!collapsed && <p className="px-3 pb-2 pt-2 text-xs text-muted truncate">{email}</p>}
        <form action={logout}>
          <button
            type="submit"
            title={collapsed ? "Sign out" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && "Sign out"}
          </button>
        </form>
      </div>
    </aside>
  );
}
