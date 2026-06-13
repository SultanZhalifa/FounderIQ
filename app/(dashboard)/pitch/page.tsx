"use client";

import { useAnalyze } from "@/hooks";
import { IdeaInput } from "@/components/tools/idea-input";
import { PitchResultView } from "@/components/tools/pitch-result";
import { PitchSkeleton, EmptyState } from "@/components/shared";

export default function PitchPage() {
  const { result, isLoading, error, analyze } = useAnalyze("pitch");

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
          Analysis failed. Please check your API key and try again.
        </div>
      )}

      {isLoading && !result && <PitchSkeleton />}

      {result && <PitchResultView data={result} />}

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
