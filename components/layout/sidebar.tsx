"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFounderIQStore } from "@/store";
import { useMobile } from "@/hooks";
import type { ToolMeta } from "@/types";

const TOOLS: ToolMeta[] = [
  { id: "validate", name: "Idea Validator", tagline: "VC-grade scoring", href: "/validate" },
  { id: "canvas", name: "Business Canvas", tagline: "Full BMC in seconds", href: "/canvas" },
  { id: "pitch", name: "Pitch Crafter", tagline: "Investor-ready pitch", href: "/pitch" },
  { id: "market", name: "Market Intel", tagline: "Size your market", href: "/market" },
];

function ToolIcon({ id, className }: { id: string; className?: string }) {
  const iconClass = cn("w-4 h-4", className);
  switch (id) {
    case "validate":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "canvas":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case "pitch":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "market":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

export { ToolIcon, TOOLS };

export function Sidebar() {
  const pathname = usePathname();
  const history = useFounderIQStore((s) => s.history);
  const loadFromHistory = useFounderIQStore((s) => s.loadFromHistory);
  const isTablet = useMobile(1024);
  const isMobile = useMobile(768);

  if (isMobile) return null;

  const collapsed = isTablet;

  return (
    <aside
      className={cn(
        "flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className={cn("border-b border-sidebar-border", collapsed ? "p-3" : "px-5 py-4")}>
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="FounderIQ" className="w-8 h-8 rounded-lg flex-shrink-0" />
          {!collapsed && (
            <div>
              <div className="text-sm font-bold tracking-tight">FounderIQ</div>
              <div className="text-[9px] text-muted-foreground tracking-[1.5px] font-semibold uppercase">
                AI CO-FOUNDER
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {!collapsed && (
          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-2 mb-2 uppercase">
            TOOLS
          </div>
        )}
        {TOOLS.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg mb-0.5 transition-colors",
                collapsed ? "p-2 justify-center" : "px-2.5 py-2",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              title={collapsed ? tool.name : undefined}
            >
              <ToolIcon id={tool.id} className={isActive ? "text-foreground" : undefined} />
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-[13px] font-medium truncate">{tool.name}</div>
                  <div
                    className={cn(
                      "text-[10px] truncate",
                      isActive ? "text-foreground/60" : "text-muted-foreground/40"
                    )}
                  >
                    {tool.tagline}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* History */}
      {!collapsed && history.length > 0 && (
        <div className="border-t border-sidebar-border p-3">
          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-1 mb-2 uppercase">
            RECENT
          </div>
          <div className="space-y-0.5">
            {history.slice(0, 5).map((entry) => (
              <button
                key={entry.id}
                onClick={() => loadFromHistory(entry)}
                className="w-full text-left px-2 py-1.5 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors truncate"
                title={entry.idea}
              >
                {entry.idea.slice(0, 40)}
                {entry.idea.length > 40 ? "..." : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
