"use client";

import { useAnalyze, useIdeaFromUrl } from "@/hooks";
import { IdeaInput } from "@/components/tools/idea-input";
import { PitchResultView } from "@/components/tools/pitch-result";
import { ResultActions } from "@/components/tools/result-actions";
import { PitchSkeleton, EmptyState } from "@/components/shared";
import { analysisToMarkdown, slugify } from "@/lib/export";
import { buildShareUrl } from "@/lib/share";
import type { PitchResult } from "@/types";

export default function PitchPage() {
  const { result, isLoading, error, analyze, analyzedIdea } = useAnalyze("pitch");
  useIdeaFromUrl("pitch", analyze);

  const toolIcon = (
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <IdeaInput
        tool="pitch"
        onAnalyze={analyze}
        isLoading={isLoading}
        toolName="Pitch Crafter"
        toolTagline="Craft an investor-ready pitch in seconds"
        toolIcon={toolIcon}
      />

      {error && (
        <div className="text-sm text-destructive p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-4">
          Analysis failed. Please check your API key or description, and try again.
        </div>
      )}

      {isLoading && !result && <PitchSkeleton />}

      {result && <PitchResultView data={result as Partial<PitchResult>} />}

      {result && !isLoading && analyzedIdea && (
        <ResultActions
          className="mt-4"
          markdown={analysisToMarkdown("pitch", analyzedIdea, result as PitchResult)}
          filenameBase={`founderiq-pitch-${slugify(analyzedIdea)}`}
          shareUrl={buildShareUrl("pitch", analyzedIdea, true)}
        />
      )}

      {!result && !isLoading && !error && (
        <EmptyState
          icon={toolIcon}
          title="Craft your investor pitch"
          description="Share your idea and get a punchy tagline, elevator pitch, and complete investor narrative."
        />
      )}
    </div>
  );
}
