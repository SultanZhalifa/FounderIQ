"use client";

import Link from "next/link";
import { useMobile } from "@/hooks";
import { useFounderIQStore } from "@/store";

export function Header() {
  const isMobile = useMobile(768);
  const toggleMobileSidebar = useFounderIQStore((s) => s.toggleMobileSidebar);

  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
          title="Open menu"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="FounderIQ" className="w-6 h-6 rounded-md" />
          <span className="text-sm font-bold tracking-tight">FounderIQ</span>
        </Link>
      </div>
    </header>
  );
}
