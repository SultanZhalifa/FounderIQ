"use client";

import { useCallback, useRef, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { toolSchemas } from "@/lib/validations";
import { useFounderIQStore } from "@/store";
import type { AnalysisResultData, ToolId } from "@/types";

/**
 * Custom hook wrapping useObject for streaming structured AI analysis.
 * Handles submission, loading state, and persists the completed result to the
 * store so it can be revisited from History, exported, and shared.
 */
export function useAnalyze<T extends ToolId>(tool: T) {
  const schema = toolSchemas[tool];
  const saveRecord = useFounderIQStore((s) => s.saveRecord);

  // The idea is needed inside onFinish, which closes over the submit-time value.
  const lastIdeaRef = useRef("");
  const [analyzedIdea, setAnalyzedIdea] = useState("");
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/analyze",
    schema,
    onFinish({ object, error }) {
      if (error || !object) return;
      setSavedRecordId(
        saveRecord({ tool, idea: lastIdeaRef.current, result: object as AnalysisResultData })
      );
    },
  });

  const analyze = useCallback(
    (idea: string) => {
      const trimmed = idea.trim();
      if (!trimmed || isLoading) return;

      lastIdeaRef.current = trimmed;
      setAnalyzedIdea(trimmed);
      setSavedRecordId(null);
      submit({ tool, idea: trimmed });
    },
    [tool, isLoading, submit]
  );

  return {
    /** The partially-streamed result object (DeepPartial). */
    result: object,
    /** Whether the stream is currently active. */
    isLoading,
    /** Any error that occurred during streaming. */
    error,
    /** Submit an idea for analysis. */
    analyze,
    /** Stop the current stream. */
    stop,
    /** The idea text that produced the current result. */
    analyzedIdea,
    /** Id of the saved record, available once streaming completes. */
    savedRecordId,
  };
}
