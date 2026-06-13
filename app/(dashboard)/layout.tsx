"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Header } from "@/components/layout/header";
import { useFounderIQStore } from "@/store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useFounderIQStore((s) => s.sidebarCollapsed);

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 pb-20 md:pb-8 flex justify-center">
          <div
            className={cn(
              "w-full transition-all duration-300 ease-in-out",
              sidebarCollapsed ? "max-w-3xl" : "max-w-5xl"
            )}
          >
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
