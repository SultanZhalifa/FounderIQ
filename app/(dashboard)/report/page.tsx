"use client";

import { useEffect, useRef, useState } from "react";
import { useReport } from "@/hooks";
import { ResultView, ResultActions } from "@/components/tools";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  ValidateSkeleton,
  CanvasSkeleton,
  PitchSkeleton,
  MarketSkeleton,
} from "@/components/shared";
import { reportToMarkdown, slugify, TOOL_LABELS } from "@/lib/export";
import type { AnalysisResultData, ToolId } from "@/types";

const SECTIONS: { tool: ToolId; Skeleton: React.ComponentType }[] = [
  { tool: "validate", Skeleton: ValidateSkeleton },
  { tool: "canvas", Skeleton: CanvasSkeleton },
  { tool: "pitch", Skeleton: PitchSkeleton },
  { tool: "market", Skeleton: MarketSkeleton },
];

const reportIcon = (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="8" y1="9" x2="10" y2="9" />
  </svg>
);

export default function ReportPage() {
  const { tools, runAll, isLoading, analyzedIdea } = useReport();
  const [idea, setIdea] = useState("");

  // Hydrate from a shared `?idea=` link and optionally auto-run (`?run=1`).
  const handled = useRef(false);
  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("idea");
    if (!shared) return;
    const shouldRun = params.get("run") === "1";

    const url = new URL(window.location.href);
    url.searchParams.delete("idea");
    url.searchParams.delete("run");
    window.history.replaceState({}, "", url.pathname + url.search);

    // Defer state updates out of the effect body to satisfy the
    // no-setState-in-effect rule (matches the IdeaInput convention).
    const timer = setTimeout(() => {
      setIdea(shared);
      if (shouldRun) runAll(shared);
    }, 0);
    return () => clearTimeout(timer);
  }, [runAll]);

  const onGenerate = () => {
    const trimmed = idea.trim();
    if (trimmed.length >= 10 && !isLoading) runAll(trimmed);
  };

  const anyActive = SECTIONS.some(({ tool }) => tools[tool].isLoading || tools[tool].result);
  const completed = SECTIONS.filter(({ tool }) => tools[tool].result && !tools[tool].isLoading).map(
    ({ tool }) => ({ tool, result: tools[tool].result as AnalysisResultData })
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="text-muted-foreground">{reportIcon}</div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Full Report</h1>
          <p className="text-xs text-muted-foreground">
            Run all four tools on one idea for a complete startup brief
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-border bg-card overflow-hidden mb-6 print:hidden">
        <Textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your startup idea — the problem, your target customer, the solution, and how you make money..."
          rows={5}
          className="border-0 bg-transparent resize-none focus-visible:ring-0 text-sm leading-relaxed px-5 pt-5 pb-3 placeholder:text-muted-foreground/40"
        />
        <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground/50">
            {idea.trim().length > 0 && idea.trim().length < 10
              ? `Please enter at least ${10 - idea.trim().length} more characters`
              : "Generates Validation, Canvas, Pitch & Market in parallel"}
          </span>
          <Button
            onClick={onGenerate}
            disabled={idea.trim().length < 10 || isLoading}
            size="sm"
            className="bg-foreground hover:bg-foreground/90 text-background disabled:opacity-30"
          >
            {isLoading ? "Generating..." : "Generate report"}
          </Button>
        </div>
      </div>

      {/* Combined export */}
      {completed.length > 0 && (
        <div className="mb-6">
          <ResultActions
            markdown={reportToMarkdown(analyzedIdea || idea, completed)}
            filenameBase={`founderiq-report-${slugify(analyzedIdea || idea)}`}
          />
        </div>
      )}

      {/* Sections */}
      {anyActive ? (
        <div className="flex flex-col gap-8">
          {SECTIONS.map(({ tool, Skeleton }) => {
            const state = tools[tool];
            if (!state.isLoading && !state.result) return null;
            return (
              <section key={tool}>
                <div className="text-[10px] text-muted-foreground tracking-[2px] font-bold uppercase mb-3 pb-2 border-b border-border">
                  {TOOL_LABELS[tool]}
                </div>
                {state.isLoading && !state.result ? (
                  <Skeleton />
                ) : (
                  <ResultView tool={tool} result={state.result as AnalysisResultData} />
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={reportIcon}
          title="Generate a complete report"
          description="Enter your idea above and get a VC-grade validation, a full Business Model Canvas, an investor pitch, and market intelligence — all at once."
        />
      )}
    </div>
  );
}
