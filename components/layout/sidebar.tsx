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

/** Workspace destinations that aren't single analysis tools. */
const WORKSPACE_LINKS = [
  { id: "report", name: "Full Report", tagline: "All 4 tools at once", href: "/report" },
  { id: "history", name: "History", tagline: "Saved analyses", href: "/history" },
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
          aria-hidden="true"
          focusable="false"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "report":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
          <line x1="8" y1="9" x2="10" y2="9" />
        </svg>
      );
    case "history":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M3 3v5h5" />
          <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
          <path d="M12 7v5l4 2" />
        </svg>
      );
    default:
      return null;
  }
}

export { ToolIcon, TOOLS, WORKSPACE_LINKS };

export function Sidebar() {
  const pathname = usePathname();
  const records = useFounderIQStore((s) => s.records);
  const sidebarCollapsed = useFounderIQStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useFounderIQStore((s) => s.toggleSidebar);
  const isTablet = useMobile(1024);
  const isMobile = useMobile(768);

  if (isMobile) return null;

  const collapsed = sidebarCollapsed || isTablet;

  return (
    <aside
      data-app-chrome
      className={cn(
        "flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo and Toggle */}
      <div
        className={cn(
          "border-b border-sidebar-border flex items-center justify-between",
          collapsed ? "p-3 flex-col gap-3" : "px-5 py-4"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <img src="/logo.svg" alt="FounderIQ" className="w-8 h-8 rounded-lg flex-shrink-0" />
          {!collapsed && (
            <div className="truncate">
              <div className="text-sm font-bold tracking-tight">FounderIQ</div>
              <div className="text-[9px] text-muted-foreground tracking-[1.5px] font-semibold uppercase">
                AI CO-FOUNDER
              </div>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors flex-shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            {collapsed ? (
              <>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v16" />
                <path d="m14 9 3 3-3 3" />
              </>
            ) : (
              <>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v16" />
                <path d="m16 15-3-3 3-3" />
              </>
            )}
          </svg>
        </button>
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

        {!collapsed && (
          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-2 mb-2 mt-4 uppercase">
            WORKSPACE
          </div>
        )}
        {WORKSPACE_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg mb-0.5 transition-colors",
                collapsed ? "p-2 justify-center" : "px-2.5 py-2",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              title={collapsed ? link.name : undefined}
            >
              <ToolIcon id={link.id} className={isActive ? "text-foreground" : undefined} />
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-[13px] font-medium truncate">{link.name}</div>
                  <div
                    className={cn(
                      "text-[10px] truncate",
                      isActive ? "text-foreground/60" : "text-muted-foreground/40"
                    )}
                  >
                    {link.tagline}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Recent saved analyses */}
      {!collapsed && records.length > 0 && (
        <div className="border-t border-sidebar-border p-3">
          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-1 mb-2 uppercase">
            RECENT
          </div>
          <div className="space-y-0.5">
            {records.slice(0, 5).map((record) => (
              <Link
                key={record.id}
                href={`/history/${record.id}`}
                className="block w-full text-left px-2 py-1.5 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors truncate"
                title={record.idea}
              >
                {record.idea.slice(0, 40)}
                {record.idea.length > 40 ? "..." : ""}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
