"use client";

import Link from "next/link";
import { useMobile } from "@/hooks";

export function Header() {
  const isMobile = useMobile(768);

  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="FounderIQ" className="w-7 h-7 rounded-md" />
          <span className="text-sm font-bold tracking-tight">FounderIQ</span>
        </Link>
      </div>
    </header>
  );
}
