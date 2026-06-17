"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useFounderIQStore } from "@/store";
import { useHydrated } from "@/hooks";
import { ResultView, ResultActions } from "@/components/tools";
import { EmptyState } from "@/components/shared";
import { recordToMarkdown, slugify, TOOL_LABELS } from "@/lib/export";
import { buildSharePath, buildShareUrl } from "@/lib/share";
import { formatRelativeTime } from "@/lib/format";

export default function HistoryDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const mounted = useHydrated();

  const record = useFounderIQStore((s) => s.records.find((r) => r.id === id));

  const backLink = (
    <Link
      href="/history"
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 print:hidden"
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back to history
    </Link>
  );

  if (mounted && !record) {
    return (
      <div className="max-w-3xl mx-auto">
        {backLink}
        <EmptyState
          title="Analysis not found"
          description="This saved analysis no longer exists. It may have been deleted or cleared."
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {backLink}

      {record && (
        <>
          <div className="mb-5">
            <div className="text-[10px] text-muted-foreground tracking-[2px] font-bold uppercase mb-1">
              {TOOL_LABELS[record.tool]} · {formatRelativeTime(record.createdAt)}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{record.idea}</p>
          </div>

          <ResultView tool={record.tool} result={record.result} />

          <div className="flex flex-wrap items-center gap-2 mt-5 print:hidden">
            <ResultActions
              markdown={recordToMarkdown(record)}
              filenameBase={`founderiq-${record.tool}-${slugify(record.idea)}`}
              shareUrl={buildShareUrl(record.tool, record.idea, true)}
            />
            <Link
              href={buildSharePath(record.tool, record.idea, true)}
              className="inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted transition-colors"
            >
              Re-run
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
