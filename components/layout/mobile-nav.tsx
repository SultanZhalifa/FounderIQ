"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks";
import { TOOLS, ToolIcon } from "./sidebar";

export function MobileNav() {
  const pathname = usePathname();
  const isMobile = useMobile(768);

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around h-14">
        {TOOLS.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 relative transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-foreground rounded-full" />
              )}
              <ToolIcon id={tool.id} className={cn("w-5 h-5", isActive && "text-foreground")} />
              <span className="text-[9px] font-medium tracking-wide">
                {tool.name.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
