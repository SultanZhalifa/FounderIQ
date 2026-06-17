"use client";

import { useAnalyze, useIdeaFromUrl } from "@/hooks";
import { IdeaInput } from "@/components/tools/idea-input";
import { ValidateResultView } from "@/components/tools/validate-result";
import { ResultActions } from "@/components/tools/result-actions";
import { ValidateSkeleton, EmptyState } from "@/components/shared";
import { analysisToMarkdown, slugify } from "@/lib/export";
import { buildShareUrl } from "@/lib/share";
import type { ValidateResult } from "@/types";

export default function ValidatePage() {
  const { result, isLoading, error, analyze, analyzedIdea } = useAnalyze("validate");
  useIdeaFromUrl("validate", analyze);

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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <IdeaInput
        tool="validate"
        onAnalyze={analyze}
        isLoading={isLoading}
        toolName="Idea Validator"
        toolTagline="Get a VC-grade score with actionable feedback"
        toolIcon={toolIcon}
      />

      {error && (
        <div className="text-sm text-destructive p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-4">
          Analysis failed. Please check your API key or description, and try again.
        </div>
      )}

      {isLoading && !result && <ValidateSkeleton />}

      {result && <ValidateResultView data={result as Partial<ValidateResult>} />}

      {result && !isLoading && analyzedIdea && (
        <ResultActions
          className="mt-4"
          markdown={analysisToMarkdown("validate", analyzedIdea, result as ValidateResult)}
          filenameBase={`founderiq-validate-${slugify(analyzedIdea)}`}
          shareUrl={buildShareUrl("validate", analyzedIdea, true)}
        />
      )}

      {!result && !isLoading && !error && (
        <EmptyState
          icon={toolIcon}
          title="Validate your startup idea"
          description="Paste your idea above and get an instant AI-powered VC-grade analysis with scores and actionable feedback."
        />
      )}
    </div>
  );
}
