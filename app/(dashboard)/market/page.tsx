"use client";

import { useAnalyze } from "@/hooks";
import { IdeaInput } from "@/components/tools/idea-input";
import { MarketResultView } from "@/components/tools/market-result";
import { MarketSkeleton, EmptyState } from "@/components/shared";

export default function MarketPage() {
  const { result, isLoading, error, analyze } = useAnalyze("market");

  const toolIcon = (
    <svg
      className="w-5 h-5"
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

  return (
    <div className="max-w-4xl mx-auto">
      <IdeaInput
        tool="market"
        onAnalyze={analyze}
        isLoading={isLoading}
        toolName="Market Intel"
        toolTagline="Deep market analysis with TAM/SAM/SOM and competitive landscape"
        toolIcon={toolIcon}
      />

      {error && (
        <div className="text-sm text-destructive p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-4">
          Analysis failed. Please check your API key or description, and try again.
        </div>
      )}

      {isLoading && !result && <MarketSkeleton />}

      {result && <MarketResultView data={result as Partial<import("@/types").MarketResult>} />}

      {!result && !isLoading && !error && (
        <EmptyState
          icon={toolIcon}
          title="Analyze your market"
          description="Get instant market sizing, competitor analysis, and go-to-market strategy powered by AI."
        />
      )}
    </div>
  );
}
