"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFounderIQStore } from "@/store";
import { useMobile } from "@/hooks";
import { TOOLS, WORKSPACE_LINKS, ToolIcon } from "./sidebar";

export function MobileSidebar() {
  const pathname = usePathname();
  const records = useFounderIQStore((s) => s.records);
  const mobileSidebarOpen = useFounderIQStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useFounderIQStore((s) => s.setMobileSidebarOpen);
  const isMobile = useMobile(768);

  if (!isMobile) return null;

  const handleNavClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        data-app-chrome
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out",
          mobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* Drawer panel */}
      <aside
        data-app-chrome
        className={cn(
          "fixed top-0 bottom-0 left-0 w-[280px] z-50 bg-sidebar border-r border-sidebar-border flex flex-col h-full transition-transform duration-300 ease-in-out transform",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header with Logo and Close Toggle */}
        <div className="border-b border-sidebar-border p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 min-w-0" onClick={handleNavClick}>
            <img src="/logo.svg" alt="FounderIQ" className="w-8 h-8 rounded-lg flex-shrink-0" />
            <div>
              <div className="text-sm font-bold tracking-tight">FounderIQ</div>
              <div className="text-[9px] text-muted-foreground tracking-[1.5px] font-semibold uppercase">
                AI CO-FOUNDER
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors flex-shrink-0"
            title="Close menu"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* New chat button / landing page link */}
        <div className="p-3">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 justify-center w-full py-2.5 px-4 rounded-xl border border-border bg-accent/30 hover:bg-accent/80 text-sm font-medium transition-all duration-200"
          >
            <svg
              className="w-4 h-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New analysis
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-2.5 mb-2 uppercase">
            TOOLS
          </div>
          {TOOLS.map((tool) => {
            const isActive = pathname === tool.href;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg mb-1 transition-colors px-3 py-2.5",
                  isActive
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <ToolIcon
                  id={tool.id}
                  className={isActive ? "text-foreground w-5 h-5" : "w-5 h-5"}
                />
                <div className="min-w-0">
                  <div className="text-[13px] truncate">{tool.name}</div>
                  <div className="text-[10px] text-muted-foreground/45 truncate">
                    {tool.tagline}
                  </div>
                </div>
              </Link>
            );
          })}

          <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-2.5 mb-2 mt-4 uppercase">
            WORKSPACE
          </div>
          {WORKSPACE_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg mb-1 transition-colors px-3 py-2.5",
                  isActive
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <ToolIcon
                  id={link.id}
                  className={isActive ? "text-foreground w-5 h-5" : "w-5 h-5"}
                />
                <div className="min-w-0">
                  <div className="text-[13px] truncate">{link.name}</div>
                  <div className="text-[10px] text-muted-foreground/45 truncate">
                    {link.tagline}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Recent saved analyses */}
        {records.length > 0 && (
          <div className="border-t border-sidebar-border p-3 max-h-[30dvh] overflow-y-auto">
            <div className="text-[9px] text-muted-foreground/50 tracking-[2.5px] font-bold px-1 mb-2 uppercase">
              RECENT
            </div>
            <div className="space-y-1">
              {records.slice(0, 5).map((record) => (
                <Link
                  key={record.id}
                  href={`/history/${record.id}`}
                  onClick={handleNavClick}
                  className="w-full text-left px-2 py-2 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors truncate block"
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
    </>
  );
}
