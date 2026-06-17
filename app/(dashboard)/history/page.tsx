"use client";

import Link from "next/link";
import { useFounderIQStore } from "@/store";
import { useHydrated } from "@/hooks";
import { ToolIcon } from "@/components/layout/sidebar";
import { EmptyState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TOOL_LABELS } from "@/lib/export";
import { formatRelativeTime } from "@/lib/format";

export default function HistoryPage() {
  // Records live in localStorage; wait for hydration to avoid a premature
  // "empty" flash and a server/client mismatch.
  const mounted = useHydrated();

  const records = useFounderIQStore((s) => s.records);
  const removeRecord = useFounderIQStore((s) => s.removeRecord);
  const clearRecords = useFounderIQStore((s) => s.clearRecords);

  const historyIcon = (
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
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{historyIcon}</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">History</h1>
            <p className="text-xs text-muted-foreground">Your saved analyses, ready to revisit</p>
          </div>
        </div>
        {mounted && records.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm("Clear all saved analyses? This cannot be undone.")) clearRecords();
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      {mounted && records.length === 0 && (
        <EmptyState
          icon={historyIcon}
          title="No saved analyses yet"
          description="Run any tool and your results are saved here automatically — open them anytime to export or share."
        />
      )}

      <div className="space-y-2">
        {mounted &&
          records.map((record) => (
            <div
              key={record.id}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <Link
                href={`/history/${record.id}`}
                className="flex-1 flex items-center gap-3 min-w-0 px-4 py-3.5"
              >
                <span className="text-muted-foreground flex-shrink-0">
                  <ToolIcon id={record.tool} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium truncate">{record.idea}</span>
                  <span className="block text-[11px] text-muted-foreground/60">
                    {TOOL_LABELS[record.tool]} · {formatRelativeTime(record.createdAt)}
                  </span>
                </span>
              </Link>
              <button
                onClick={() => removeRecord(record.id)}
                aria-label="Delete this analysis"
                title="Delete"
                className="flex-shrink-0 mr-3 p-1.5 rounded-md text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
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
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
